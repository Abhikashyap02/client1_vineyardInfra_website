from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from decimal import Decimal

# Property Schemas
class PropertyBase(BaseModel):
    name: str
    location: str
    property_type: str
    price: Decimal
    bhk: Optional[int] = None
    ready_to_move: bool = False
    under_construction: bool = False
    description: Optional[str] = None
    area: Optional[str] = None
    image_url: Optional[str] = None
    amenities: Optional[str] = None

class PropertyCreate(PropertyBase):
    pass

class PropertyResponse(PropertyBase):
    id: int

    class Config:
        from_attributes = True

# Lead Schemas
class LeadCreate(BaseModel):
    full_name: str
    phone: str
    email: EmailStr
    budget: Optional[str] = None
    preferred_location: Optional[str] = None
    purpose: Optional[str] = None
    priority: Optional[str] = "normal"
    lead_score: Optional[str] = "Cold"
    investment_horizon: Optional[str] = None
    investment_goal: Optional[str] = None
    agent_summary: Optional[str] = None

class LeadResponse(LeadCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Appointment Schemas
class AppointmentCreate(BaseModel):
    property_name: str
    preferred_date: str
    preferred_time: str
    contact_details: str
    status: Optional[str] = "ACTIVE"
    booking_ref: Optional[str] = None

class AppointmentResponse(AppointmentCreate):
    id: int
    status: str
    booking_ref: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# FAQ Schemas
class FAQBase(BaseModel):
    question: str
    answer: str

class FAQCreate(FAQBase):
    pass

class FAQResponse(FAQBase):
    id: int

    class Config:
        from_attributes = True

# Chat History Schemas
class ChatHistoryCreate(BaseModel):
    session_id: str
    role: str
    content: str

class ChatHistoryResponse(ChatHistoryCreate):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
