# Vineyard Haven Growth
# Database Schema V1 (Source of Truth)

> Version: 1.0
> Database: PostgreSQL (Supabase)
> Status: Production Design
> Last Updated: July 2026

---

# Design Principles

This database is designed for a Real Estate Dealer Platform.

Goals:

- Store all property information.
- Support Flats, Houses, Villas, Plots and Commercial Properties.
- Allow future scaling.
- Power property listing pages.
- Power property filters.
- Power chatbot recommendations.
- Store leads.
- Store site visit bookings.
- Keep media separated from property details.

The Property is the center of the database.

Everything connects to a Property.

---

# Database Overview

Property
│
├── Property Variants
├── Property Media
├── Property Features
├── FAQs
├── Leads
└── Site Visits

---

# Table 1 : properties

Purpose

Stores the master information about every property/project.

One row = One Property.

Examples

- Rudra Residency
- Sangam Valley
- Green Valley Plots

Columns

| Column | Type |
|---------|------|
| id | UUID (Primary Key) |
| slug | TEXT (Unique) |
| name | TEXT |
| category | TEXT |
| sub_type | TEXT |
| location | TEXT |
| city | TEXT |
| state | TEXT |
| starting_price | NUMERIC |
| possession_status | TEXT |
| short_description | TEXT |
| about | TEXT |
| why_choose | TEXT |
| brochure_url | TEXT |
| google_map_url | TEXT |
| featured | BOOLEAN |
| status | TEXT |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Relationships

Property

has many

- Property Variants
- Property Media
- Property Features
- FAQs
- Site Visits
- Leads

---

# Table 2 : property_variants

Purpose

Stores multiple configurations for a property.

Examples

Apartment

- 2 BHK
- 3 BHK
- 4 BHK

Plot

- 100 Sq.Yd
- 150 Sq.Yd

House

Usually one variant.

Columns

| Column | Type |
|---------|------|
| id | UUID |
| property_id | UUID (FK → properties.id) |
| variant_name | TEXT |
| area | TEXT |
| bedrooms | INTEGER |
| bathrooms | INTEGER |
| price | NUMERIC |
| facing | TEXT |
| front_road | TEXT |
| availability | TEXT |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Relationship

Many Variants belong to one Property.

---

# Table 3 : property_media

Purpose

Stores every media file related to a property.

Supported Media

- Image
- Video
- Brochure
- Floor Plan

Columns

| Column | Type |
|---------|------|
| id | UUID |
| property_id | UUID (FK → properties.id) |
| media_type | TEXT |
| media_url | TEXT |
| title | TEXT |
| is_hero | BOOLEAN |
| display_order | INTEGER |
| created_at | TIMESTAMP |

Relationship

Many Media items belong to one Property.

---

# Table 4 : property_features

Purpose

Stores everything displayed as

- Amenities
- Highlights
- Nearby Places
- USPs

Instead of creating multiple tables, one flexible table is used.

Examples

Amenity

- Swimming Pool
- Gym

Highlight

- 24x7 Security

Nearby Place

- Max Hospital - 2km

USP

- Registry Available

Columns

| Column | Type |
|---------|------|
| id | UUID |
| property_id | UUID (FK → properties.id) |
| feature_type | TEXT |
| feature_name | TEXT |
| display_order | INTEGER |
| created_at | TIMESTAMP |

Relationship

Many Features belong to one Property.

---

# Table 5 : leads

Purpose

Stores every customer inquiry.

Sources

- Website Form
- Chatbot
- Meta Ads
- Google Ads
- WhatsApp

Columns

| Column | Type |
|---------|------|
| id | UUID |
| property_id | UUID (FK → properties.id) |
| full_name | TEXT |
| phone | TEXT |
| email | TEXT |
| budget | TEXT |
| preferred_location | TEXT |
| interested_in | TEXT |
| source | TEXT |
| message | TEXT |
| lead_status | TEXT |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Relationship

Many Leads can belong to one Property.

---

# Table 6 : site_visits

Purpose

Stores property visit bookings.

One Lead can book multiple visits.

Columns

| Column | Type |
|---------|------|
| id | UUID |
| lead_id | UUID (FK → leads.id) |
| property_id | UUID (FK → properties.id) |
| visit_date | DATE |
| visit_time | TIME |
| status | TEXT |
| notes | TEXT |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Relationship

Many Site Visits belong to one Lead.

Many Site Visits belong to one Property.

---

# Table 7 : faqs

Purpose

Stores FAQs shown on each property page.

Columns

| Column | Type |
|---------|------|
| id | UUID |
| property_id | UUID (FK → properties.id) |
| question | TEXT |
| answer | TEXT |
| display_order | INTEGER |
| created_at | TIMESTAMP |

Relationship

Many FAQs belong to one Property.

---

# Relationship Diagram

Property

├── Variants

├── Media

├── Features

├── FAQs

├── Leads

└── Site Visits

Lead

└── Site Visits

---

# Design Decisions

Why separate Variants?

Because one property can have multiple configurations.

---

Why separate Media?

One property has many images/videos.

---

Why separate Features?

One flexible table handles

- Amenities
- Highlights
- Nearby Places
- USPs

---

Why separate FAQs?

Every property has different FAQs.

---

Why separate Site Visits?

One Lead can book multiple visits.

---

Why UUID?

- Better security
- Better scalability
- Standard with Supabase

---

# Development Rules

Never infer schema from old SQLite models.

Always use this document as the source of truth.

Every SQLAlchemy model must match this document exactly.

Every CRUD function must use this schema.

Every API response must be based on this schema.

Every frontend page must consume data according to this schema.

---

END OF DATABASE SCHEMA V1