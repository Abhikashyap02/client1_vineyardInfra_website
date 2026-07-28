from sqlalchemy.orm import Session, selectinload
from app import models, schemas
from typing import Optional, List
from decimal import Decimal
import random
from datetime import datetime, date

def search_properties(
    db: Session,
    max_budget: Optional[Decimal] = None,
    location: Optional[str] = None,
    property_type: Optional[str] = None,  # maps to sub_type
    bhk: Optional[int] = None,            # maps to bedrooms
    ready_to_move: Optional[bool] = None,
    under_construction: Optional[bool] = None,
    category: Optional[str] = None,
    city: Optional[str] = None,
) -> List[models.Property]:
    # Query with selectinload to eagerly load the relationship tables
    query = db.query(models.Property).options(
        selectinload(models.Property.variants),
        selectinload(models.Property.media),
        selectinload(models.Property.features)
    )

    # Join variants table if filtering by variant-level parameters
    has_variant_filter = (max_budget is not None and max_budget > 0) or (bhk is not None)
    if has_variant_filter:
        query = query.join(models.Property.variants)

    # Apply base table filters
    if category:
        query = query.filter(models.Property.category.ilike(f"%{category}%"))
    if city:
        query = query.filter(models.Property.city.ilike(f"%{city}%"))
    if location:
        query = query.filter(models.Property.location.ilike(f"%{location}%"))
    if property_type:
        query = query.filter(models.Property.sub_type.ilike(f"%{property_type}%"))
    
    # Possession status mapped from boolean criteria
    if ready_to_move is not None and ready_to_move:
        query = query.filter(models.Property.possession_status.ilike("%ready%"))
    if under_construction is not None and under_construction:
        query = query.filter(models.Property.possession_status.ilike("%construction%"))

    # Apply variant filters
    if max_budget is not None and max_budget > 0:
        query = query.filter(models.PropertyVariant.price <= max_budget)
    if bhk is not None:
        query = query.filter(models.PropertyVariant.bedrooms == bhk)

    # Prevent duplicate Property rows if variants were joined
    if has_variant_filter:
        query = query.distinct()

    return query.all()

def get_property_by_slug(db: Session, slug: str) -> Optional[models.Property]:
    return db.query(models.Property).options(
        selectinload(models.Property.variants),
        selectinload(models.Property.media),
        selectinload(models.Property.features),
        selectinload(models.Property.faqs)
    ).filter(models.Property.slug == slug).first()

def create_lead(db: Session, lead: schemas.LeadCreate) -> models.Lead:
    lead_data = lead.model_dump()
    
    # 1. Resolve or create lead to avoid duplicating entries
    db_lead = None
    email = lead_data.get("email")
    phone = lead_data.get("phone")
    if email:
        db_lead = db.query(models.Lead).filter(models.Lead.email == email).first()
    if not db_lead and phone:
        db_lead = db.query(models.Lead).filter(models.Lead.phone == phone).first()

    if db_lead:
        # Update existing lead fields
        if lead_data.get("full_name"):
            db_lead.full_name = lead_data.get("full_name")
        if lead_data.get("property_id"):
            db_lead.property_id = lead_data.get("property_id")
        if lead_data.get("budget"):
            db_lead.budget = lead_data.get("budget")
        if lead_data.get("preferred_location"):
            db_lead.preferred_location = lead_data.get("preferred_location")
        if lead_data.get("interested_in"):
            db_lead.interested_in = lead_data.get("interested_in")
        if lead_data.get("source"):
            db_lead.source = lead_data.get("source")
        if lead_data.get("message"):
            db_lead.message = lead_data.get("message")
        if lead_data.get("purpose"):
            db_lead.purpose = lead_data.get("purpose")
        if lead_data.get("priority"):
            db_lead.priority = lead_data.get("priority")
        if lead_data.get("lead_score"):
            db_lead.lead_score = lead_data.get("lead_score")
        if lead_data.get("investment_horizon"):
            db_lead.investment_horizon = lead_data.get("investment_horizon")
        if lead_data.get("investment_goal"):
            db_lead.investment_goal = lead_data.get("investment_goal")
        if lead_data.get("agent_summary"):
            db_lead.agent_summary = lead_data.get("agent_summary")
        db_lead.updated_at = datetime.utcnow()
    else:
        db_lead = models.Lead(
            property_id=lead_data.get("property_id"),
            full_name=lead_data.get("full_name"),
            phone=lead_data.get("phone"),
            email=lead_data.get("email"),
            budget=lead_data.get("budget"),
            preferred_location=lead_data.get("preferred_location"),
            interested_in=lead_data.get("interested_in"),
            source=lead_data.get("source") or "Direct",
            message=lead_data.get("message"),
            lead_status=lead_data.get("lead_status") or "new",
            purpose=lead_data.get("purpose"),
            priority=lead_data.get("priority"),
            lead_score=lead_data.get("lead_score"),
            investment_horizon=lead_data.get("investment_horizon"),
            investment_goal=lead_data.get("investment_goal"),
            agent_summary=lead_data.get("agent_summary")
        )
        db.add(db_lead)

    try:
        db.flush()

        # If visit_date is provided, create a site visit booking record
        visit_date_val = lead_data.get("visit_date")
        if visit_date_val:
            # Resolve property
            prop = None
            if lead_data.get("property_id"):
                prop = db.query(models.Property).filter(models.Property.id == lead_data.get("property_id")).first()
            if not prop and lead_data.get("interested_in"):
                prop = db.query(models.Property).filter(models.Property.name.ilike(lead_data.get("interested_in"))).first()
            
            if not prop:
                # Safe fallback to first property
                prop = db.query(models.Property).first()

            if prop:
                # Parse preferred date and time
                try:
                    visit_date = datetime.strptime(visit_date_val, "%Y-%m-%d").date()
                except ValueError:
                    try:
                        visit_date = datetime.strptime(visit_date_val, "%d/%m/%Y").date()
                    except ValueError:
                        visit_date = date.today()

                visit_time = None
                visit_time_val = lead_data.get("visit_time")
                if visit_time_val:
                    try:
                        if "AM" in visit_time_val or "PM" in visit_time_val:
                            visit_time = datetime.strptime(visit_time_val, "%I:%M %p").time()
                        else:
                            visit_time = datetime.strptime(visit_time_val, "%H:%M").time()
                    except ValueError:
                        visit_time = None

                # Generate booking reference
                date_str = visit_date.strftime("%Y%m%d")
                rand_num = random.randint(1000, 9999)
                booking_ref = f"VIN-{date_str}-{rand_num}"

                db_visit = models.SiteVisit(
                    lead_id=db_lead.id,
                    property_id=prop.id,
                    visit_date=visit_date,
                    visit_time=visit_time,
                    status="ACTIVE",
                    booking_ref=booking_ref
                )
                db.add(db_visit)
                db.flush()
                # Set transient attribute on db_lead
                db_lead.booking_ref = booking_ref

        db.commit()
        db.refresh(db_lead)
        return db_lead
    except Exception as e:
        db.rollback()
        raise e

from typing import Optional, List, Any

# Adjust settings based on database type
def check_and_update_expired_appointments(db: Session):
    today = date.today()
    expired_active = db.query(models.SiteVisit).filter(
        models.SiteVisit.status == "ACTIVE",
        models.SiteVisit.visit_date < today
    ).all()
    for visit in expired_active:
        visit.status = "EXPIRED"
    if expired_active:
        db.commit()

def book_visit(db: Session, appointment: schemas.AppointmentCreate) -> models.SiteVisit:
    try:
        check_and_update_expired_appointments(db)
        
        # 1. Resolve Property by name
        property_record = db.query(models.Property).filter(
            models.Property.name.ilike(f"%{appointment.property_name}%")
        ).first()
        if not property_record:
            property_record = db.query(models.Property).first()
            
        # 2. Resolve or create Lead using contact details
        contact = appointment.contact_details
        lead = db.query(models.Lead).filter(
            (models.Lead.email == contact) | (models.Lead.phone == contact)
        ).first()
        
        if not lead:
            is_email = "@" in contact
            lead = models.Lead(
                full_name=appointment.full_name or "Visitor",
                email=contact if is_email else None,
                phone=contact if not is_email else "0000000000",
                source="Book Site Visit"
            )
            db.add(lead)
            db.flush() # Flush to populate lead.id without committing
            
        # 3. Parse date and time safely
        try:
            visit_date = datetime.strptime(appointment.preferred_date, "%Y-%m-%d").date()
        except Exception:
            try:
                visit_date = datetime.strptime(appointment.preferred_date, "%d/%m/%Y").date()
            except Exception:
                visit_date = date.today()
                
        try:
            visit_time = datetime.strptime(appointment.preferred_time.strip(), "%H:%M").time()
        except Exception:
            try:
                visit_time = datetime.strptime(appointment.preferred_time.strip(), "%H:%M:%S").time()
            except Exception:
                visit_time = datetime.strptime("12:00", "%H:%M").time()

        # 4. Generate booking ref
        booking_ref = appointment.booking_ref
        if not booking_ref:
            date_str = datetime.utcnow().strftime("%Y%m%d")
            rand_num = random.randint(1000, 9999)
            booking_ref = f"VIN-{date_str}-{rand_num}"

        # 5. Save SiteVisit record
        db_visit = models.SiteVisit(
            lead_id=lead.id,
            property_id=property_record.id if property_record else None,
            visit_date=visit_date,
            visit_time=visit_time,
            status=appointment.status or "ACTIVE",
            notes=f"Original contact details: {appointment.contact_details}",
            booking_ref=booking_ref
        )
        db.add(db_visit)
        db.commit()
        db.refresh(db_visit)
        return db_visit
    except Exception as e:
        db.rollback()
        raise e

def get_appointments_by_contact(db: Session, contact: str) -> List[models.SiteVisit]:
    check_and_update_expired_appointments(db)
    return db.query(models.SiteVisit).join(models.Lead).filter(
        (models.Lead.email == contact) |
        (models.Lead.phone == contact) |
        (models.Lead.phone.like(f"%{contact}%")) |
        (models.Lead.email.like(f"%{contact}%"))
    ).all()

def update_appointment_status(db: Session, appointment_id: Any, status: str) -> Optional[models.SiteVisit]:
    db_visit = db.query(models.SiteVisit).filter(models.SiteVisit.id == appointment_id).first()
    if db_visit:
        db_visit.status = status
        db.commit()
        db.refresh(db_visit)
    return db_visit

def get_faqs(db: Session) -> List[models.FAQ]:
    return db.query(models.FAQ).order_by(models.FAQ.display_order.asc()).all()


def create_chat_message(db: Session, chat: schemas.ChatHistoryCreate) -> models.ChatHistory:
    db_chat = models.ChatHistory(
        session_id=chat.session_id,
        role=chat.role,
        content=chat.content
    )
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return db_chat


def get_chat_history(db: Session, session_id: str) -> List[models.ChatHistory]:
    return db.query(models.ChatHistory).filter(models.ChatHistory.session_id == session_id).order_by(models.ChatHistory.timestamp.asc()).all()


def get_property_options(db: Session) -> List[models.Property]:
    return db.query(models.Property).order_by(models.Property.name.asc()).all()


def get_unique_locations(db: Session) -> List[str]:
    results = db.query(models.Property.location).distinct().all()
    return sorted(list(set([r[0].strip() for r in results if r[0]])))
