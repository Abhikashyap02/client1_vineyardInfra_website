import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Resolve paths
backend_root = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(backend_root)

# Load environment variables
load_dotenv(os.path.join(project_root, ".env"))

def enable_rls():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("Error: DATABASE_URL environment variable is not set.")
        sys.exit(1)
        
    print(f"Connecting to database to enable RLS...")
    
    # We do not use RLS on SQLite (it is a Postgres-only feature in Supabase)
    if db_url.startswith("sqlite"):
        print("SQLite database detected. RLS is not supported or required for SQLite local development.")
        return

    tables = [
        "properties",
        "property_variants",
        "property_media",
        "property_features",
        "leads",
        "site_visits",
        "faqs"
    ]
    
    engine = create_engine(db_url)
    
    with engine.connect() as conn:
        for table in tables:
            try:
                # Enable Row Level Security
                enable_statement = f"ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;"
                print(f"Executing: {enable_statement}")
                conn.execute(text(enable_statement))
                
                # In Supabase, once RLS is enabled, all select/insert/update/delete REST actions 
                # are denied by default unless policies are created. Since our backend uses 
                # the postgres superuser, it bypasses RLS. We do not create any permissive policies,
                # thereby achieving a strict 'default deny' status for any public REST API access.
                
                conn.commit()
                print(f"Successfully enabled RLS on table '{table}'")
            except Exception as e:
                print(f"Error enabling RLS on table '{table}': {e}")
                
    print("Database RLS configuration completed!")

if __name__ == "__main__":
    enable_rls()
