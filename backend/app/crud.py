from sqlalchemy.orm import Session
from app import models, schemas
from typing import Optional, List
from decimal import Decimal
import random
from datetime import datetime, date

def search_properties(
    db: Session,
    max_budget: Optional[Decimal] = None,
    location: Optional[str] = None,
    property_type: Optional[str] = None,
    bhk: Optional[int] = None,
    ready_to_move: Optional[bool] = None,
    under_construction: Optional[bool] = None,
) -> List[models.Property]:
    # 1. First attempt: Exact match
    query = db.query(models.Property)

    if max_budget is not None and max_budget > 0:
        query = query.filter(models.Property.price <= max_budget)
    if location:
        query = query.filter(models.Property.location.ilike(f"%{location}%"))
    if property_type:
        query = query.filter(models.Property.property_type.ilike(f"%{property_type}%"))
    if bhk is not None:
        query = query.filter(models.Property.bhk == bhk)
    if ready_to_move is not None:
        query = query.filter(models.Property.ready_to_move == ready_to_move)
    if under_construction is not None:
        query = query.filter(models.Property.under_construction == under_construction)

    results = query.all()
    if results:
        return results

    # 2. Second attempt: Similar match (Broaden budget and drop BHK/Status constraint)
    query_similar = db.query(models.Property)
    if property_type:
        query_similar = query_similar.filter(models.Property.property_type.ilike(f"%{property_type}%"))
    if max_budget is not None and max_budget > 0:
        # Allow up to 30% higher than max budget
        query_similar = query_similar.filter(models.Property.price <= max_budget * Decimal("1.30"))
    
    results = query_similar.all()
    if results:
        return results

    # 3. Third attempt: Nearby match (Same location, ignore other constraints)
    query_nearby = db.query(models.Property)
    if location:
        query_nearby = query_nearby.filter(models.Property.location.ilike(f"%{location}%"))
        
    results = query_nearby.all()
    if results:
        return results

    # 4. Fallback: Return all properties
    return db.query(models.Property).all()

def create_lead(db: Session, lead: schemas.LeadCreate) -> models.Lead:
    db_lead = models.Lead(**lead.model_dump())
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead

def check_and_update_expired_appointments(db: Session):
    today_str = date.today().strftime("%Y-%m-%d")
    expired_active = db.query(models.Appointment).filter(
        models.Appointment.status == "ACTIVE",
        models.Appointment.preferred_date < today_str
    ).all()
    for appt in expired_active:
        appt.status = "EXPIRED"
    if expired_active:
        db.commit()

def book_visit(db: Session, appointment: schemas.AppointmentCreate) -> models.Appointment:
    check_and_update_expired_appointments(db)
    
    # Generate booking ref if not present
    appt_data = appointment.model_dump()
    if not appt_data.get("booking_ref"):
        date_str = datetime.utcnow().strftime("%Y%m%d")
        rand_num = random.randint(1000, 9999)
        appt_data["booking_ref"] = f"VIN-{date_str}-{rand_num}"
        
    db_appointment = models.Appointment(**appt_data)
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

def get_appointments_by_contact(db: Session, contact: str) -> List[models.Appointment]:
    check_and_update_expired_appointments(db)
    # Match exact contact details or perform simple search
    return db.query(models.Appointment).filter(
        (models.Appointment.contact_details == contact) |
        (models.Appointment.contact_details.like(f"%{contact}%"))
    ).all()

def update_appointment_status(db: Session, appointment_id: int, status: str) -> Optional[models.Appointment]:
    db_appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if db_appointment:
        db_appointment.status = status
        db.commit()
        db.refresh(db_appointment)
    return db_appointment

def get_faqs(db: Session) -> List[models.FAQ]:
    return db.query(models.FAQ).all()

def get_chat_history(db: Session, session_id: str) -> List[models.ChatHistory]:
    return (
        db.query(models.ChatHistory)
        .filter(models.ChatHistory.session_id == session_id)
        .order_by(models.ChatHistory.timestamp.asc())
        .all()
    )

def create_chat_message(db: Session, message: schemas.ChatHistoryCreate) -> models.ChatHistory:
    db_message = models.ChatHistory(**message.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
