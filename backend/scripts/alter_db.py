import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

def run_migration():
    # Load dotenv
    backend_env_path = r"c:\Users\kashy\OneDrive\Desktop\vineyard Website\vineyard-haven-growth\backend\.env"
    load_dotenv(backend_env_path)

    db_url = os.getenv("DATABASE_URL", "sqlite:///./chatbot.db")
    print("Migrating database at URL:", db_url)

    engine = create_engine(db_url)
    
    statements = [
        # Leads columns
        "ALTER TABLE leads ADD COLUMN IF NOT EXISTS purpose TEXT;",
        "ALTER TABLE leads ADD COLUMN IF NOT EXISTS priority TEXT;",
        "ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_score TEXT;",
        "ALTER TABLE leads ADD COLUMN IF NOT EXISTS investment_horizon TEXT;",
        "ALTER TABLE leads ADD COLUMN IF NOT EXISTS investment_goal TEXT;",
        "ALTER TABLE leads ADD COLUMN IF NOT EXISTS agent_summary TEXT;",
        
        # Site visits columns
        "ALTER TABLE site_visits ADD COLUMN IF NOT EXISTS booking_ref TEXT;",
    ]
    
    with engine.connect() as conn:
        for statement in statements:
            try:
                print(f"Executing: {statement}")
                conn.execute(text(statement))
                conn.commit()
                print("Success")
            except Exception as e:
                print(f"Error executing statement: {e}")

    print("Database migration completed!")

if __name__ == "__main__":
    run_migration()
