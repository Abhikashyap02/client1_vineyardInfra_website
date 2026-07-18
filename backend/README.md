# Vineyard Haven Growth - Backend Documentation

This is the documentation for the backend API of the Vineyard Haven Growth portal. The backend is built specifically to power the interactive site chatbot, property search, lead generation, site-visit booking, and FAQs.

---

## 🛠️ Technology Stack

1. **Web Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
2. **Database ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
3. **Database Engine**: [SQLite](https://www.sqlite.org/) (File-based database: `backend/chatbot.db`)
4. **Data Validation**: [Pydantic v2](https://docs.pydantic.dev/)
5. **Config Management**: `pydantic-settings` & `python-dotenv`
6. **Server**: [Uvicorn](https://www.uvicorn.org/)

---

## 📁 Directory Structure

```
backend/
├── chatbot.db             # SQLite database file
├── requirements.txt       # Python dependencies
└── app/
    ├── __init__.py
    ├── config.py          # Application configuration (CORS settings, database URLs)
    ├── database.py        # SQLAlchemy engine, session maker, and DB dependency injection
    ├── models.py          # Database models (SQLAlchemy ORM tables)
    ├── schemas.py         # Request/Response data models (Pydantic)
    ├── crud.py            # Database CRUD helper functions
    ├── main.py            # FastAPI app initialization, routes, and CORS setup
    └── seed.py            # Database setup script with sample properties and FAQs
```

---

## 💾 Database Schema (`models.py`)

The application models the following database tables:

### 1. `properties`
Stores details of the real estate listings.
*   `id`: Integer (Primary Key)
*   `name`: String(255)
*   `location`: String(255)
*   `property_type`: String(100) (e.g. `Villa`, `Apartment`, `Plot`)
*   `price`: Numeric(12, 2) (Price in INR)
*   `bhk`: Integer (Nullable)
*   `ready_to_move`: Boolean
*   `under_construction`: Boolean
*   `description`: Text
*   `area`: String(100) (e.g., `2200-3000 sqft`)
*   `image_url`: String(500)
*   `amenities`: String(500) (Comma-separated)

### 2. `leads`
Captures user information for CRM lead generation and scoring.
*   `id`: Integer (Primary Key)
*   `full_name`: String(255)
*   `phone`: String(50)
*   `email`: String(255)
*   `budget`: String(100)
*   `preferred_location`: String(255)
*   `purpose`: String(100) (Investment, Self Use)
*   `priority`: String(50) (Default: `normal`)
*   `lead_score`: String(50) (Default: `Cold`, e.g., Hot, Warm, Cold)
*   `investment_horizon`: String(100)
*   `investment_goal`: String(255)
*   `agent_summary`: Text
*   `created_at`: DateTime

### 3. `appointments`
Manages site-visit bookings requested by the user.
*   `id`: Integer (Primary Key)
*   `property_name`: String(255)
*   `preferred_date`: String(100)
*   `preferred_time`: String(100)
*   `contact_details`: String(255)
*   `status`: String(50) (Default: `ACTIVE`, options: `ACTIVE`, `COMPLETED`, `CANCELLED`, `EXPIRED`)
*   `booking_ref`: String(100) (Unique)
*   `created_at`: DateTime

### 4. `faq`
Pre-defined questions and answers for customer service.
*   `id`: Integer (Primary Key)
*   `question`: String(500)
*   `answer`: Text

### 5. `chat_history`
Persists the conversation between users and the assistant.
*   `id`: Integer (Primary Key)
*   `session_id`: String(255)
*   `role`: String(50) (`user`, `assistant`)
*   `content`: Text
*   `timestamp`: DateTime

---

## 🔌 API Endpoints (`main.py`)

All API requests are sent to `http://localhost:8000/`.

### 🧭 General
*   `GET /`: Status endpoint to check if the API is online.

### 🔍 Properties
*   `GET /search-properties`: Returns a list of properties matched based on optional query filters:
    *   `max_budget`: Decimal (INR)
    *   `location`: String
    *   `property_type`: String (`Villa`, `Apartment`, `Plot`)
    *   `bhk`: Integer
    *   `ready_to_move`: Boolean
    *   `under_construction`: Boolean

### 👤 Leads & CRM
*   `POST /create-lead`: Creates a qualified lead in the CRM database. Leads are scored (Hot/Warm/Cold) based on details provided (such as if they have budget, phone, and timeline information).

### 📅 Site Visit Appointments
*   `POST /book-visit`: Reserves a site visit appointment and returns a unique booking reference.
*   `GET /appointments?contact=<phone_or_email>`: Fetches all appointments linked to a customer's contact details.
*   `PATCH /appointments/{appointment_id}/status?status=<new_status>`: Updates the status of a booking (e.g. to CANCELLED).
*   `PATCH /appointments/{appointment_id}`: Reschedules the date/time of a booking.

### ❓ FAQs
*   `GET /faqs`: Retrieves the list of knowledge-base questions and answers.

### 💬 Chat History
*   `GET /chat-history/{session_id}`: Retrieves previous messages in the current user session.
*   `POST /chat-history`: Appends a new user or assistant message to the session memory.

---

## 🚀 Setup & Execution Guide

### 1. Installation
Install the required packages in a Python virtual environment:
```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate it
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Database Seeding & Initialization
Rebuild the local database and load seed properties and FAQs:
```bash
python -m app.seed
```
*Note: This drops existing tables in `chatbot.db` and recreates them with starter data.*

### 3. Running the Server
Run the FastAPI application locally using Uvicorn:
```bash
uvicorn app.main:app --reload --port 8000
```
The API documentation page will be available at:
*   Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
*   ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)
