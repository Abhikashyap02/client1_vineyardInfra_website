from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional, Any
from decimal import Decimal
from datetime import datetime

from app.database import get_db, Base, engine
from app.config import settings
from app import crud, schemas, models

app = FastAPI(title=settings.PROJECT_NAME)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
@app.post("/create-lead", response_model=schemas.LeadResponse)
def create_lead(lead: schemas.LeadCreate, db: Session = Depends(get_db)):
    return crud.create_lead(db, lead)

# 3. Site Visit Booking
@app.post("/book-visit", response_model=schemas.AppointmentResponse)
def book_visit(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    return crud.book_visit(db, appointment)

@app.get("/appointments", response_model=List[schemas.AppointmentResponse])
def get_appointments(contact: str = Query(..., description="Contact details (phone or email)"), db: Session = Depends(get_db)):
    return crud.get_appointments_by_contact(db, contact)

@app.patch("/appointments/{appointment_id}/status", response_model=schemas.AppointmentResponse)
def update_appointment_status(appointment_id: int, status: str = Query(..., description="New status"), db: Session = Depends(get_db)):
    updated = crud.update_appointment_status(db, appointment_id, status)
    if not updated:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return updated

@app.patch("/appointments/{appointment_id}", response_model=schemas.AppointmentResponse)
def update_appointment_details(
    appointment_id: Any,
    preferred_date: Optional[str] = Query(None),
    preferred_time: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
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
            db_appointment.visit_time = datetime.strptime(preferred_time, "%H:%M").time()
        except Exception:
            pass
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

# 4. FAQ System
@app.get("/faqs", response_model=List[schemas.FAQResponse])
def get_faqs(db: Session = Depends(get_db)):
    return crud.get_faqs(db)
