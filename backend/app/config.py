import os
import json
from typing import Optional, Any, Union
from dotenv import load_dotenv
from pydantic import field_validator
from pydantic_settings import BaseSettings

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Vineyard Infra Chatbot Backend"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./chatbot.db")
    CORS_ORIGINS: Union[list[str], str] = [
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://192.168.1.6:8080",
        "http://192.168.1.6:3000",
        "http://192.168.1.6:5173",
    ]
    # Match any localhost (with port) and any Cloudflare Workers or Pages domain
    CORS_ORIGINS_REGEX: Optional[str] = r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$|^https://[a-zA-Z0-9_-]+\.(pages|workers)\.dev$"

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> list[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, (list, str)):
            if isinstance(v, str):
                try:
                    return json.loads(v)
                except Exception:
                    return [i.strip() for i in v.split(",") if i.strip()]
            return v
        raise ValueError(f"Invalid type for CORS_ORIGINS: {type(v)}")

    GOOGLE_SERVICE_ACCOUNT_FILE: Optional[str] = os.getenv("GOOGLE_SERVICE_ACCOUNT_FILE")
    GOOGLE_SPREADSHEET_ID: Optional[str] = os.getenv("GOOGLE_SPREADSHEET_ID")
    SHOW_DOCS: bool = os.getenv("SHOW_DOCS", "False").lower() == "true"
    GOOGLE_SERVICE_ACCOUNT_JSON: Optional[str] = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON")

    class Config:
        case_sensitive = True

settings = Settings()

