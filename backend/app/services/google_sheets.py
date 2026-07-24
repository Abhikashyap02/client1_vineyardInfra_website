import os
import logging
from datetime import datetime
from typing import Optional, List, Any
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from app.config import settings
from app import models

# Configure logger
logger = logging.getLogger("app.services.google_sheets")

class GoogleSheetsService:
    _instance = None
    _service = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(GoogleSheetsService, cls).__new__(cls, *args, **kwargs)
        return cls._instance

    @property
    def service(self):
        if self._service is None:
            self._service = self._init_client()
        return self._service

    def _init_client(self) -> Optional[Any]:
        """Initializes the Google Sheets client once using the configured service account."""
        credentials_file = settings.GOOGLE_SERVICE_ACCOUNT_FILE
        spreadsheet_id = settings.GOOGLE_SPREADSHEET_ID

        if not credentials_file:
            logger.error("Google Sheets initialization failed: GOOGLE_SERVICE_ACCOUNT_FILE environment variable is not set.")
            return None

        # Resolve relative credentials file path
        if not os.path.isabs(credentials_file):
            # Calculate backend project root dynamically (3 levels up from this file)
            backend_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            resolved_path = os.path.abspath(os.path.join(backend_root, credentials_file))
            logger.info(f"Resolving Google Service Account relative path: '{credentials_file}' to absolute path: '{resolved_path}'")
            credentials_file = resolved_path

        if not os.path.exists(credentials_file):
            logger.error(f"Google Sheets initialization failed: Service account file not found at {credentials_file}")
            return None


        if not spreadsheet_id:
            logger.error("Google Sheets initialization failed: GOOGLE_SPREADSHEET_ID environment variable is not set.")
            return None

        try:
            scopes = ['https://www.googleapis.com/auth/spreadsheets']
            creds = service_account.Credentials.from_service_account_file(credentials_file, scopes=scopes)
            service = build('sheets', 'v4', credentials=creds)
            logger.info("Google Sheets API client successfully initialized.")
            return service
        except Exception as e:
            logger.error(
                f"Google Sheets initialization failed: Error authenticating or creating service. Details: {str(e)}",
                exc_info=True
            )
            return None

    def get_first_worksheet_name(self) -> Optional[str]:
        """Fetches the name of the first worksheet in the spreadsheet dynamically."""
        client = self.service
        if not client:
            return None
        
        spreadsheet_id = settings.GOOGLE_SPREADSHEET_ID
        try:
            spreadsheet = client.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
            sheets = spreadsheet.get('sheets', [])
            if sheets:
                first_sheet_name = sheets[0].get('properties', {}).get('title')
                return first_sheet_name
            return None
        except Exception as e:
            logger.error(f"Failed to fetch spreadsheet metadata. Details: {str(e)}", exc_info=True)
            return None

    def append_lead_to_sheet(self, lead: models.Lead) -> bool:
        """
        Appends a lead to the first worksheet of the configured Google Spreadsheet.
        Does not raise exceptions. Logs errors and returns boolean success.
        """
        # Validate lead input
        if not lead:
            logger.error(
                "Failed to append lead to Google Sheet. Reason: Lead object is None.",
                extra={
                    "lead_id": "None",
                    "lead_source": "Unknown",
                    "property": "Unknown",
                    "reason": "Lead object is None"
                }
            )
            return False

        if not hasattr(lead, "full_name") or not lead.full_name or not hasattr(lead, "phone") or not lead.phone:
            logger.error(
                "Failed to append lead to Google Sheet. Reason: Required lead fields (full_name, phone) are missing or empty.",
                extra={
                    "lead_id": str(getattr(lead, 'id', 'Unknown')),
                    "lead_source": getattr(lead, 'source', 'Unknown') or "Unknown",
                    "property": getattr(lead, 'interested_in', 'Unknown') or "Unknown",
                    "reason": "Required lead fields missing"
                }
            )
            return False

        client = self.service
        if not client:
            logger.error(
                "Failed to append lead to Google Sheet. Reason: API client not initialized.",
                extra={
                    "lead_id": str(lead.id),
                    "lead_source": lead.source or "Unknown",
                    "property": lead.interested_in or "Unknown",
                    "reason": "API client not initialized"
                }
            )
            return False

        spreadsheet_id = settings.GOOGLE_SPREADSHEET_ID
        if not spreadsheet_id:
            logger.error(
                "Failed to append lead to Google Sheet. Reason: GOOGLE_SPREADSHEET_ID is missing.",
                extra={
                    "lead_id": str(lead.id),
                    "lead_source": lead.source or "Unknown",
                    "property": lead.interested_in or "Unknown",
                    "reason": "GOOGLE_SPREADSHEET_ID is missing"
                }
            )
            return False

        # Extract visit date and time safely from the lead's relationships
        visit_date = ""
        visit_time = ""
        try:
            if lead.site_visits:
                # Find the latest site visit record
                latest_visit = max(lead.site_visits, key=lambda x: x.created_at or datetime.min)
                if latest_visit.visit_date:
                    visit_date = latest_visit.visit_date.strftime("%Y-%m-%d")
                if latest_visit.visit_time:
                    visit_time = latest_visit.visit_time.strftime("%H:%M")
        except Exception as visit_err:
            logger.warning(f"Could not extract site visit details for lead {lead.id}: {str(visit_err)}")

        # Construct row values
        timestamp_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        raw_row_values = [
            timestamp_str,
            lead.source or "",
            lead.interested_in or "",
            lead.full_name or "",
            lead.phone or "",
            lead.email or "",
            lead.message or "",
            visit_date,
            visit_time,
            lead.lead_status or "new"
        ]

        # Sanitize to prevent Formula Injection (CSV injection)
        row_values = []
        for val in raw_row_values:
            val_str = str(val) if val is not None else ""
            if val_str.startswith(('=', '+', '-', '@')):
                val_str = "'" + val_str
            row_values.append(val_str)

        # Get first worksheet name dynamically
        sheet_name = self.get_first_worksheet_name()
        if not sheet_name:
            logger.warning("First worksheet name could not be retrieved. Defaulting range to 'A:J'.")
            range_name = "A:J"
        else:
            range_name = f"'{sheet_name}'!A:J"

        try:
            body = {
                'values': [row_values]
            }
            client.spreadsheets().values().append(
                spreadsheetId=spreadsheet_id,
                range=range_name,
                valueInputOption='USER_ENTERED',
                insertDataOption='INSERT_ROWS',
                body=body
            ).execute()
            
            logger.info(
                "Lead saved to Google Sheet",
                extra={
                    "lead_id": str(lead.id),
                    "lead_source": lead.source or "Unknown",
                    "property": lead.interested_in or "Unknown",
                    "reason": "Success"
                }
            )
            return True
        except HttpError as error:
            status_code = error.resp.status
            reason = "Google API HttpError"
            if status_code == 403:
                reason = "Permission Denied / Invalid Credentials"
            elif status_code == 404:
                reason = "Spreadsheet or Worksheet Not Found"
            elif status_code == 429:
                reason = "Rate Limit Exceeded"

            logger.error(
                f"Failed to append lead to Google Sheet. Error: {error.reason}",
                exc_info=True,
                extra={
                    "lead_id": str(lead.id),
                    "lead_source": lead.source or "Unknown",
                    "property": lead.interested_in or "Unknown",
                    "reason": f"{reason} (Status: {status_code})"
                }
            )
            return False
        except Exception as e:
            logger.error(
                "Failed to append lead to Google Sheet",
                exc_info=True,
                extra={
                    "lead_id": str(lead.id),
                    "lead_source": lead.source or "Unknown",
                    "property": lead.interested_in or "Unknown",
                    "reason": f"Unexpected error: {str(e)}"
                }
            )
            return False

# Module-level single instance initialization
_service_instance = GoogleSheetsService()

def append_lead_to_sheet(lead: models.Lead) -> bool:
    """
    Appends a lead's information to the first worksheet of the configured Google Spreadsheet.
    This is the ONE reusable function exposed by the service.
    """
    return _service_instance.append_lead_to_sheet(lead)
