from fastapi import FastAPI, Depends, HTTPException, Query, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional, Any
from decimal import Decimal
from datetime import datetime
import logging
import time
from collections import defaultdict

from app.database import get_db, Base, engine
from app.config import settings
from app import crud, schemas, models
from app.services.google_sheets import append_lead_to_sheet

logger = logging.getLogger("app.main")

# Auto-create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    docs_url="/docs" if settings.SHOW_DOCS else None,
    redoc_url="/redoc" if settings.SHOW_DOCS else None,
    openapi_url="/openapi.json" if settings.SHOW_DOCS else None,
)

# Centralized IP extraction supporting reverse proxies
def get_client_ip(request: Request) -> str:
    x_forwarded_for = request.headers.get("x-forwarded-for")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0].strip()
    
    cf_connecting_ip = request.headers.get("cf-connecting-ip")
    if cf_connecting_ip:
        return cf_connecting_ip.strip()
    
    return request.client.host if request.client else "unknown"

# Memory-based rate limiter dependency
def rate_limit(max_requests: int, window_seconds: int):
    records = defaultdict(list)
    
    def dependency(request: Request):
        ip = get_client_ip(request)
        now = time.time()
        
        # Filter old timestamps
        records[ip] = [t for t in records[ip] if now - t < window_seconds]
        
        if len(records[ip]) >= max_requests:
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please try again later."
            )
        
        records[ip].append(now)
        
    return dependency

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=settings.CORS_ORIGINS_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up GZip compression middleware (for responses >= 1000 bytes)
app.add_middleware(
    GZipMiddleware,
    minimum_size=1000
)

# Print startup values for Railway log auditing
print(f"STARTUP: settings.CORS_ORIGINS = {settings.CORS_ORIGINS}", flush=True)
print(f"STARTUP: settings.CORS_ORIGINS_REGEX = {settings.CORS_ORIGINS_REGEX}", flush=True)
for m in app.user_middleware:
    if m.cls.__name__ == "CORSMiddleware":
        print(f"STARTUP: CORSMiddleware options = {m.kwargs}", flush=True)


# Set up Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
    response.headers["Content-Security-Policy"] = "default-src 'none'; frame-ancestors 'none'"
    return response
# Root endpoint
@app.get("/")
def read_root():
    return {"status": "ok", "message": "Vineyard Infra Chatbot API is online"}

def map_property_to_card(p: models.Property) -> schemas.PropertyCardResponse:
    import re
    
    # 1. Resolve primary/hero image
    primary_image_url = None
    if p.media:
        hero = next((m for m in p.media if m.is_hero), None)
        if hero:
            primary_image_url = hero.media_url
        else:
            img_media = next((m for m in p.media if m.media_type == "image" or not m.media_type), None)
            primary_image_url = img_media.media_url if img_media else p.media[0].media_url

    # 2. Get bedroom (BHK) summary (e.g. "2, 3 BHK")
    bedrooms_summary = None
    if p.variants:
        bd_list = sorted(list(set(v.bedrooms for v in p.variants if v.bedrooms and v.bedrooms > 0)))
        if bd_list:
            bedrooms_summary = f"{', '.join(str(b) for b in bd_list)} BHK"
        elif p.sub_type == "Plot":
            first_var = next((v.variant_name for v in p.variants if v.variant_name), None)
            bedrooms_summary = first_var or "Residential Plots"
    elif p.sub_type == "Plot":
        bedrooms_summary = "Residential Plots"

    # 3. Get bathroom summary (e.g. "2-3" or "2")
    bathrooms_summary = None
    if p.variants:
        bt_list = sorted(list(set(v.bathrooms for v in p.variants if v.bathrooms and v.bathrooms > 0)))
        if bt_list:
            if len(bt_list) == 1:
                bathrooms_summary = str(bt_list[0])
            else:
                bathrooms_summary = f"{bt_list[0]}-{bt_list[-1]}"

    # 4. Get area summary (e.g. "1200 - 1950 Sq.Ft.")
    area_summary = None
    if p.variants:
        areas = [v.area for v in p.variants if v.area]
        if areas:
            parsed = []
            for a in areas:
                nums = re.findall(r'\d+', a)
                if nums:
                    parsed.append((a, int(nums[0])))
            if parsed:
                parsed.sort(key=lambda x: x[1])
                min_a = parsed[0]
                max_a = parsed[-1]
                suffix = "Sq.Yd." if ("yd" in min_a[0].lower() or "yard" in min_a[0].lower()) else "Sq.Ft."
                if min_a[1] == max_a[1]:
                    area_summary = f"{min_a[1]} {suffix}"
                else:
                    area_summary = f"{min_a[1]} – {max_a[1]} {suffix}"
            else:
                area_summary = areas[0]

    # 5. Get amenities
    amenities = []
    if p.features:
        amenities = [f.feature_name for f in p.features if f.feature_type and f.feature_type.upper() == "AMENITY"]

    return schemas.PropertyCardResponse(
        id=p.id,
        slug=p.slug,
        name=p.name,
        location=p.location,
        category=p.category,
        sub_type=p.sub_type,
        starting_price=p.starting_price,
        possession_status=p.possession_status,
        short_description=p.short_description,
        featured=p.featured,
        primary_image_url=primary_image_url,
        bedrooms_summary=bedrooms_summary,
        bathrooms_summary=bathrooms_summary,
        area_summary=area_summary,
        amenities=amenities
    )

# 1. Property Search
@app.get("/search-properties", response_model=List[schemas.PropertyCardResponse])
def search_properties(
    response: Response,
    category: Optional[str] = Query(None, description="Category filter"),
    sub_type: Optional[str] = Query(None, description="Property sub-type filter"),
    city: Optional[str] = Query(None, description="City filter"),
    location: Optional[str] = Query(None, description="Location filter"),
    min_budget: Optional[Decimal] = Query(None, description="Min budget in INR"),
    max_budget: Optional[Decimal] = Query(None, description="Max budget in INR"),
    bedrooms: Optional[int] = Query(None, description="Bedrooms (BHK) filter"),
    possession_status: Optional[str] = Query(None, description="Possession status"),
    featured: Optional[bool] = Query(None, description="Featured status"),
    search_query: Optional[str] = Query(None, description="Search query in text fields"),
    db: Session = Depends(get_db),
):
    properties = crud.search_properties(
        db,
        min_budget=min_budget,
        max_budget=max_budget,
        location=location,
        property_type=sub_type,
        bhk=bedrooms,
        category=category,
        city=city,
        featured=featured,
        possession_status=possession_status,
        search_query=search_query,
    )
    response.headers["Cache-Control"] = "public, max-age=600, s-maxage=3600"
    return [map_property_to_card(p) for p in properties]

@app.get("/properties/{slug}", response_model=schemas.PropertyDetailResponse)
def get_property_by_slug(slug: str, response: Response, db: Session = Depends(get_db)):
    db_property = crud.get_property_by_slug(db, slug=slug)
    if not db_property:
        raise HTTPException(status_code=404, detail="Property not found")
    response.headers["Cache-Control"] = "public, max-age=600, s-maxage=3600"
    return db_property


@app.get("/property-options", response_model=List[schemas.PropertyOptionResponse])
def get_property_options(response: Response, db: Session = Depends(get_db)):
    response.headers["Cache-Control"] = "public, max-age=600, s-maxage=3600"
    return crud.get_property_options(db)


@app.get("/locations", response_model=List[str])
def get_locations(response: Response, db: Session = Depends(get_db)):
    response.headers["Cache-Control"] = "public, max-age=600, s-maxage=3600"
    return crud.get_unique_locations(db)

# 2. Lead Qualification Flow
@app.post("/create-lead", response_model=schemas.LeadResponse, dependencies=[Depends(rate_limit(5, 60))])
def create_lead(lead: schemas.LeadCreate, db: Session = Depends(get_db)):
    try:
        db_lead = crud.create_lead(db, lead)
    except Exception as e:
        import traceback
        import sys
        print(f"DEBUG: Exception type: {type(e)}", file=sys.stderr)
        print(f"DEBUG: Exception message: {str(e)}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        logger.error(f"Error creating lead: {str(e)}", exc_info=True)
        raise HTTPException(status_code=400, detail="Failed to create lead. Please check the input data and try again.")
    
    try:
        append_lead_to_sheet(db_lead)
    except Exception as sheet_err:
        logger.error(f"Unexpected error when calling append_lead_to_sheet: {str(sheet_err)}", exc_info=True)
        
    return db_lead

# 3. Site Visit Booking
@app.post("/book-visit", response_model=schemas.AppointmentResponse, dependencies=[Depends(rate_limit(5, 60))])
def book_visit(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    try:
        return crud.book_visit(db, appointment)
    except Exception as e:
        logger.error(f"Error booking visit: {str(e)}", exc_info=True)
        raise HTTPException(status_code=400, detail="Failed to book site visit. Please try again.")

@app.get("/appointments", response_model=List[schemas.AppointmentResponse], dependencies=[Depends(rate_limit(5, 60))])
def get_appointments(contact: str = Query(..., description="Contact details (phone or email)"), db: Session = Depends(get_db)):
    try:
        return crud.get_appointments_by_contact(db, contact)
    except Exception as e:
        logger.error(f"Error retrieving appointments: {str(e)}", exc_info=True)
        raise HTTPException(status_code=400, detail="Failed to retrieve appointments. Please try again.")

@app.patch("/appointments/{appointment_id}/status", response_model=schemas.AppointmentResponse, dependencies=[Depends(rate_limit(5, 60))])
def update_appointment_status(appointment_id: Any, status: str = Query(..., description="New status"), db: Session = Depends(get_db)):
    try:
        updated = crud.update_appointment_status(db, appointment_id, status)
        if not updated:
            raise HTTPException(status_code=404, detail="Appointment not found")
        return updated
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating appointment status: {str(e)}", exc_info=True)
        raise HTTPException(status_code=400, detail="Failed to update appointment status.")

@app.patch("/appointments/{appointment_id}", response_model=schemas.AppointmentResponse, dependencies=[Depends(rate_limit(5, 60))])
def update_appointment_details(
    appointment_id: Any,
    preferred_date: Optional[str] = Query(None),
    preferred_time: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    try:
        db_appointment = db.query(models.SiteVisit).filter(models.SiteVisit.id == appointment_id).first()
        if not db_appointment:
            raise HTTPException(status_code=404, detail="Appointment not found")
        if preferred_date:
            try:
                db_appointment.visit_date = datetime.strptime(preferred_date, "%Y-%m-%d").date()
            except Exception:
                pass
        if preferred_time:
            try:
                preferred_time_clean = preferred_time.strip()
                if "AM" in preferred_time_clean or "PM" in preferred_time_clean:
                    db_appointment.visit_time = datetime.strptime(preferred_time_clean, "%I:%M %p").time()
                else:
                    db_appointment.visit_time = datetime.strptime(preferred_time_clean, "%H:%M").time()
            except Exception:
                pass
        db.commit()
        db.refresh(db_appointment)
        return db_appointment
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating appointment details: {str(e)}", exc_info=True)
        raise HTTPException(status_code=400, detail="Failed to update appointment details.")

# 4. FAQ System
@app.get("/faqs", response_model=List[schemas.FAQResponse])
def get_faqs(response: Response, db: Session = Depends(get_db)):
    response.headers["Cache-Control"] = "public, max-age=600, s-maxage=3600"
    return crud.get_faqs(db)

# 5. Chat History
@app.post("/chat-history", response_model=schemas.ChatHistoryResponse)
def create_chat_message(chat: schemas.ChatHistoryCreate, db: Session = Depends(get_db)):
    return crud.create_chat_message(db, chat)

@app.get("/chat-history/{session_id}", response_model=List[schemas.ChatHistoryResponse])
def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    return crud.get_chat_history(db, session_id)


# 6. Banner Carousel Management
@app.get("/banners", response_model=List[schemas.BannerResponse])
def get_banners(response: Response, db: Session = Depends(get_db)):
    response.headers["Cache-Control"] = "public, max-age=600, s-maxage=3600"
    return crud.get_active_banners(db)

