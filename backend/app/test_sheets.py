import sys
import os
import uuid
from datetime import datetime

# Adjust search path to include backend root
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import models
from app.services.google_sheets import append_lead_to_sheet

def test_integration():
    print("==================================================")
    print("Running Google Sheets Integration Test")
    print("==================================================")

    # 1. Create mock lead
    mock_lead = models.Lead(
        id=uuid.uuid4(),
        source="Site Visit Test",
        interested_in="Vineyard Luxury Estates",
        full_name="Test User",
        phone="+91 99999 99999",
        email="testuser@example.com",
        message="Formula injection test: =SUM(1,2)",  # Testing formula injection escaping
        lead_status="new"
    )

    # 2. Add mock site visit details
    mock_visit = models.SiteVisit(
        visit_date=datetime.now().date(),
        visit_time=datetime.now().time(),
        created_at=datetime.utcnow()
    )
    mock_lead.site_visits = [mock_visit]

    # 3. Trigger service
    print(f"Submitting Lead: {mock_lead.full_name} ({mock_lead.phone}) from source '{mock_lead.source}'...")
    success = append_lead_to_sheet(mock_lead)

    if success:
        print("\n[RESULT] SUCCESS: Lead successfully appended to Google Sheet!")
    else:
        print("\n[RESULT] FAILED: Could not append lead to Google Sheet. Please check the logs above.")
    print("==================================================")

if __name__ == "__main__":
    test_integration()
