from fastapi import FastAPI, Depends, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
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
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# 1. Property Search
@app.get("/search-properties", response_model=List[schemas.PropertyResponse])
def search_properties(
    category: Optional[str] = Query(None, description="Category (e.g. Luxury, Residential, Investment)"),
    sub_type: Optional[str] = Query(None, description="Property type (e.g. Villa, Apartment, Plot)"),
    city: Optional[str] = Query(None, description="City filter"),
    location: Optional[str] = Query(None, description="Location filter"),
    max_budget: Optional[Decimal] = Query(None, description="Max budget in INR (Rupees)"),
    bedrooms: Optional[int] = Query(None, description="Bedrooms (BHK) filter"),
    db: Session = Depends(get_db),
):
    return crud.search_properties(
        db,
        max_budget=max_budget,
        location=location,
        property_type=sub_type,
        bhk=bedrooms,
        category=category,
        city=city,
    )

@app.get("/properties/{slug}", response_model=schemas.PropertyDetailResponse)
def get_property_by_slug(slug: str, db: Session = Depends(get_db)):
    db_property = crud.get_property_by_slug(db, slug=slug)
    if not db_property:
        raise HTTPException(status_code=404, detail="Property not found")
    return db_property

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
def get_faqs(db: Session = Depends(get_db)):
    return crud.get_faqs(db)

# 5. Chat History
@app.post("/chat-history", response_model=schemas.ChatHistoryResponse)
def create_chat_message(chat: schemas.ChatHistoryCreate, db: Session = Depends(get_db)):
    return crud.create_chat_message(db, chat)

@app.get("/chat-history/{session_id}", response_model=List[schemas.ChatHistoryResponse])
def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    return crud.get_chat_history(db, session_id)
