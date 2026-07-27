import sys
import os
import uuid
from datetime import datetime

# Adjust search path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from app.main import app
from app.database import SessionLocal
from app import models

client = TestClient(app)

def test_create_lead_endpoint():
    print("==================================================")
    print("Running API Integration Test via TestClient")
    print("==================================================")

    # 1. Prepare unique lead data
    test_phone = f"+91 {uuid.uuid4().int % 10000000000:010d}"
    test_email = f"user_{uuid.uuid4().hex[:6]}@example.com"
    
    payload = {
        "full_name": "Integration Test User",
        "phone": test_phone,
        "email": test_email,
        "interested_in": "Vineyard Haven Villa",
        "source": "Chatbot Lead",
        "message": "Formula Injection Test: =1+2",
        "visit_date": datetime.now().strftime("%Y-%m-%d"),
        "visit_time": "14:30"
    }

    # 2. Call endpoint
    print(f"Sending POST /create-lead for {test_email}...")
    response = client.post("/create-lead", json=payload)

    # 3. Assertions
    print(f"Response Status Code: {response.status_code}")
    print(f"Response JSON: {response.json()}")

    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    res_data = response.json()
    assert res_data["full_name"] == payload["full_name"]
    assert res_data["phone"] == payload["phone"]
    assert res_data["email"] == payload["email"]

    # 4. Verify database state directly
    print("\nVerifying database state...")
    db = SessionLocal()
    try:
        db_lead = db.query(models.Lead).filter(models.Lead.email == test_email).first()
        assert db_lead is not None, "Lead was not saved to the database!"
        print(f"SUCCESS: Lead found in database with ID: {db_lead.id}")
        
        # Verify site visit was also created
        assert len(db_lead.site_visits) > 0, "SiteVisit was not saved to the database!"
        db_visit = db_lead.site_visits[0]
        print(f"SUCCESS: SiteVisit booking reference: {db_visit.booking_ref}")
        print(f"SUCCESS: SiteVisit date: {db_visit.visit_date}, time: {db_visit.visit_time}")
    finally:
        db.close()

    print("\n[RESULT] API Integration Test Passed Successfully!")
    print("==================================================")

if __name__ == "__main__":
    test_create_lead_endpoint()
