from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Numeric
from datetime import datetime
from app.database import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    property_type = Column(String(100), nullable=False)  # Villa, Apartment, Plot
    price = Column(Numeric(12, 2), nullable=False)  # in Rupees
    bhk = Column(Integer, nullable=True)
    ready_to_move = Column(Boolean, default=False)
    under_construction = Column(Boolean, default=False)
    description = Column(Text, nullable=True)
    area = Column(String(100), nullable=True)  # sqft or sqyd
    image_url = Column(String(500), nullable=True)
    amenities = Column(String(500), nullable=True)  # Comma-separated list

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(255), nullable=False)
    budget = Column(String(100), nullable=True)
    preferred_location = Column(String(255), nullable=True)
    purpose = Column(String(100), nullable=True)  # Investment, Self Use
    priority = Column(String(50), default="normal")  # normal, high
    
    # CRM Lead scoring & Investment fields
    lead_score = Column(String(50), default="Cold")  # Hot, Warm, Cold
    investment_horizon = Column(String(100), nullable=True)
    investment_goal = Column(String(255), nullable=True)
    agent_summary = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    property_name = Column(String(255), nullable=False)
    preferred_date = Column(String(100), nullable=False)
    preferred_time = Column(String(100), nullable=False)
    contact_details = Column(String(255), nullable=False)
    status = Column(String(50), default="ACTIVE")  # ACTIVE, COMPLETED, CANCELLED, EXPIRED
    booking_ref = Column(String(100), unique=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class FAQ(Base):
    __tablename__ = "faq"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String(500), nullable=False)
    answer = Column(Text, nullable=False)

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(255), index=True, nullable=False)
    role = Column(String(50), nullable=False)  # user, assistant
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
