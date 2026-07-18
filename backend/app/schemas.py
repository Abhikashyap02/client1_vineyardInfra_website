from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime, date, time
from decimal import Decimal
from uuid import UUID

# Property Schemas
class PropertyBase(BaseModel):
    slug: str
    name: str
    category: Optional[str] = None
    sub_type: Optional[str] = None
    location: str
    city: Optional[str] = None
    state: Optional[str] = None
    starting_price: Optional[Decimal] = None
    possession_status: Optional[str] = None
    short_description: Optional[str] = None
    about: Optional[str] = None
    why_choose: Optional[str] = None
    brochure_url: Optional[str] = None
    google_map_url: Optional[str] = None
    featured: bool = False
    status: Optional[str] = None

class PropertyCreate(PropertyBase):
    pass

class PropertyVariantResponse(BaseModel):
    id: UUID
    property_id: UUID
    variant_name: Optional[str] = None
    area: Optional[str] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    price: Optional[Decimal] = None
    facing: Optional[str] = None
    front_road: Optional[str] = None
    availability: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class PropertyMediaResponse(BaseModel):
    id: UUID
    property_id: UUID
    media_type: Optional[str] = None
    media_url: str
    title: Optional[str] = None
    is_hero: bool = False
    display_order: Optional[int] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class PropertyFeatureResponse(BaseModel):
    id: UUID
    property_id: UUID
    feature_type: Optional[str] = None
    feature_name: str
    display_order: Optional[int] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class PropertyResponse(PropertyBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    variants: List[PropertyVariantResponse] = []
    media: List[PropertyMediaResponse] = []
    features: List[PropertyFeatureResponse] = []

    model_config = ConfigDict(from_attributes=True)


# Lead Schemas
class LeadCreate(BaseModel):
    property_id: Optional[UUID] = None
    full_name: str
    phone: str
    email: EmailStr
    budget: Optional[str] = None
    preferred_location: Optional[str] = None
    interested_in: Optional[str] = None
    source: Optional[str] = None
    message: Optional[str] = None
    lead_status: Optional[str] = None

class LeadResponse(LeadCreate):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Site Visit Schemas
class SiteVisitCreate(BaseModel):
    lead_id: UUID
    property_id: UUID
    visit_date: date
    visit_time: time
    status: Optional[str] = "ACTIVE"
    notes: Optional[str] = None

class SiteVisitResponse(SiteVisitCreate):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# FAQ Schemas
class FAQBase(BaseModel):
    question: str
    answer: str

class FAQCreate(FAQBase):
    property_id: UUID
    display_order: Optional[int] = None

class FAQResponse(FAQBase):
    id: UUID
    property_id: UUID
    display_order: Optional[int] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PropertyDetailResponse(PropertyResponse):
    faqs: List[FAQResponse] = []


# ==========================================
# Legacy Aliases / Deprecated Schemas
# Keep definitions to prevent import crashes in routes/CRUD not yet fully refactored
# ==========================================

class AppointmentCreate(BaseModel):
    property_name: str
    preferred_date: str
    preferred_time: str
    contact_details: str
    status: Optional[str] = "ACTIVE"
    booking_ref: Optional[str] = None

class AppointmentResponse(AppointmentCreate):
    id: UUID
    status: str
    booking_ref: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ChatHistoryCreate(BaseModel):
    session_id: str
    role: str
    content: str

class ChatHistoryResponse(ChatHistoryCreate):
    id: UUID
    timestamp: datetime

    model_config = ConfigDict(from_attributes=True)
