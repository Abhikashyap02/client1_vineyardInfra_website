import uuid
from sqlalchemy import Column, String, Boolean, DateTime, Text, Numeric, ForeignKey, Integer, Date, Time
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    category = Column(String, nullable=True)
    sub_type = Column(String, nullable=True)
    location = Column(String, nullable=False)
    city = Column(String, nullable=True)
    state = Column(String, nullable=True)
    starting_price = Column(Numeric, nullable=True)
    possession_status = Column(String, nullable=True)
    short_description = Column(Text, nullable=True)
    about = Column(Text, nullable=True)
    why_choose = Column(Text, nullable=True)
    brochure_url = Column(String, nullable=True)
    google_map_url = Column(String, nullable=True)
    featured = Column(Boolean, default=False)
    status = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    variants = relationship("PropertyVariant", back_populates="property", cascade="all, delete-orphan")
    media = relationship("PropertyMedia", back_populates="property", cascade="all, delete-orphan")
    features = relationship("PropertyFeature", back_populates="property", cascade="all, delete-orphan")
    faqs = relationship("FAQ", back_populates="property", cascade="all, delete-orphan")
    leads = relationship("Lead", back_populates="property")
    site_visits = relationship("SiteVisit", back_populates="property")


class PropertyVariant(Base):
    __tablename__ = "property_variants"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id", ondelete="CASCADE"), nullable=False)
    variant_name = Column(String, nullable=True)
    area = Column(String, nullable=True)
    bedrooms = Column(Integer, nullable=True)
    bathrooms = Column(Integer, nullable=True)
    price = Column(Numeric, nullable=True)
    facing = Column(String, nullable=True)
    front_road = Column(String, nullable=True)
    availability = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    property = relationship("Property", back_populates="variants")


class PropertyMedia(Base):
    __tablename__ = "property_media"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id", ondelete="CASCADE"), nullable=False)
    media_type = Column(String, nullable=True)
    media_url = Column(String, nullable=False)
    title = Column(String, nullable=True)
    is_hero = Column(Boolean, default=False)
    display_order = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    property = relationship("Property", back_populates="media")


class PropertyFeature(Base):
    __tablename__ = "property_features"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id", ondelete="CASCADE"), nullable=False)
    feature_type = Column(String, nullable=True)
    feature_name = Column(String, nullable=False)
    display_order = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    property = relationship("Property", back_populates="features")


class Lead(Base):
    __tablename__ = "leads"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id", ondelete="SET NULL"), nullable=True)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    budget = Column(String, nullable=True)
    preferred_location = Column(String, nullable=True)
    interested_in = Column(String, nullable=True)
    source = Column(String, nullable=True)
    message = Column(Text, nullable=True)
    lead_status = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    property = relationship("Property", back_populates="leads")
    site_visits = relationship("SiteVisit", back_populates="lead", cascade="all, delete-orphan")


class SiteVisit(Base):
    __tablename__ = "site_visits"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lead_id = Column(UUID(as_uuid=True), ForeignKey("leads.id", ondelete="CASCADE"), nullable=False)
    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id", ondelete="CASCADE"), nullable=False)
    visit_date = Column(Date, nullable=False)
    visit_time = Column(Time, nullable=False)
    status = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    property = relationship("Property", back_populates="site_visits")
    lead = relationship("Lead", back_populates="site_visits")


class FAQ(Base):
    __tablename__ = "faqs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id", ondelete="CASCADE"), nullable=False)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    display_order = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    property = relationship("Property", back_populates="faqs")
