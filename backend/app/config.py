import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Vineyard Infra Chatbot Backend"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./chatbot.db")
    CORS_ORIGINS: list[str] = [
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://192.168.1.6:8080",
        "http://192.168.1.6:3000",
        "http://192.168.1.6:5173",
    ]

    class Config:
        case_sensitive = True

settings = Settings()
