import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

def run_migration():
    # Load dotenv
    backend_env_path = r"c:\Users\kashy\OneDrive\Desktop\vineyard Website\vineyard-haven-growth\backend\.env"
    load_dotenv(backend_env_path)

    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("DATABASE_URL is not configured in .env!")
        return

    print("Target Database URL:", db_url.split("@")[-1]) # print safe portion of URL
    engine = create_engine(db_url)

    statements = [
        # Properties indexes
        "CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties (featured);",
        "CREATE INDEX IF NOT EXISTS idx_properties_category ON properties (category);",
        "CREATE INDEX IF NOT EXISTS idx_properties_sub_type ON properties (sub_type);",
        "CREATE INDEX IF NOT EXISTS idx_properties_location ON properties (location);",
        "CREATE INDEX IF NOT EXISTS idx_properties_city ON properties (city);",

        # Property variants indexes
        "CREATE INDEX IF NOT EXISTS idx_property_variants_property_id ON property_variants (property_id);",
        "CREATE INDEX IF NOT EXISTS idx_property_variants_price ON property_variants (price);",
        "CREATE INDEX IF NOT EXISTS idx_property_variants_bedrooms ON property_variants (bedrooms);",

        # Property media indexes
        "CREATE INDEX IF NOT EXISTS idx_property_media_property_id ON property_media (property_id);",

        # Property features indexes
        "CREATE INDEX IF NOT EXISTS idx_property_features_property_id ON property_features (property_id);",

        # FAQs indexes
        "CREATE INDEX IF NOT EXISTS idx_faqs_property_id ON faqs (property_id);",

        # Leads indexes
        "CREATE INDEX IF NOT EXISTS idx_leads_property_id ON leads (property_id);",
        "CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);",
        "CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads (phone);",

        # Site visits indexes
        "CREATE INDEX IF NOT EXISTS idx_site_visits_property_id ON site_visits (property_id);",
        "CREATE INDEX IF NOT EXISTS idx_site_visits_lead_id ON site_visits (lead_id);",
    ]

    with engine.connect() as conn:
        for statement in statements:
            try:
                print(f"Executing SQL: {statement}")
                conn.execute(text(statement))
                conn.commit()
                print("Index created/already exists.")
            except Exception as e:
                print(f"SQL Error executing: {statement}\nDetails: {e}")

    print("\nDatabase indexing migration successfully finished!")

if __name__ == "__main__":
    run_migration()
