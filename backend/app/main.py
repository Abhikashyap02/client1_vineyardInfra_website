from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from decimal import Decimal

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
    max_budget: Optional[Decimal] = Query(None, description="Max budget in INR (Rupees)"),
    location: Optional[str] = Query(None, description="Location filter"),
    property_type: Optional[str] = Query(None, description="Property type (e.g. Villa, Apartment, Plot)"),
    bhk: Optional[int] = Query(None, description="BHK filter"),
    ready_to_move: Optional[bool] = Query(None, description="Ready to move status"),
    under_construction: Optional[bool] = Query(None, description="Under construction status"),
    db: Session = Depends(get_db),
):
    return crud.search_properties(
        db,
        max_budget=max_budget,
        location=location,
        property_type=property_type,
        bhk=bhk,
        ready_to_move=ready_to_move,
        under_construction=under_construction,
    )

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
    appointment_id: int,
    preferred_date: Optional[str] = Query(None),
    preferred_time: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    db_appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    if preferred_date:
        db_appointment.preferred_date = preferred_date
    if preferred_time:
        db_appointment.preferred_time = preferred_time
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

# 4. FAQ System
@app.get("/faqs", response_model=List[schemas.FAQResponse])
def get_faqs(db: Session = Depends(get_db)):
    return crud.get_faqs(db)

# 5. Chat History
@app.get("/chat-history/{session_id}", response_model=List[schemas.ChatHistoryResponse])
def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    return crud.get_chat_history(db, session_id)

@app.post("/chat-history", response_model=schemas.ChatHistoryResponse)
def create_chat_message(message: schemas.ChatHistoryCreate, db: Session = Depends(get_db)):
    return crud.create_chat_message(db, message)
