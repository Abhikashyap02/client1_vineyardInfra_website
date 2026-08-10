import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

def check_database():
    backend_env_path = r"c:\Users\kashy\OneDrive\Desktop\vineyard Website\vineyard-haven-growth\backend\.env"
    load_dotenv(backend_env_path)

    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("DATABASE_URL is not configured in .env!")
        return

    engine = create_engine(db_url)
    with engine.connect() as conn:
        # Get count of total properties
        total = conn.execute(text("SELECT COUNT(*) FROM properties")).scalar()
        print(f"Total properties: {total}")
        
        # Get count of featured properties
        featured_count = conn.execute(text("SELECT COUNT(*) FROM properties WHERE featured = true")).scalar()
        print(f"Featured properties (true): {featured_count}")
        
        # Get count of non-featured properties
        non_featured_count = conn.execute(text("SELECT COUNT(*) FROM properties WHERE featured = false OR featured IS NULL")).scalar()
        print(f"Non-featured properties (false/null): {non_featured_count}")
        
        # Print list of properties and their featured status
        result = conn.execute(text("SELECT name, slug, featured FROM properties"))
        print("\nProperties List:")
        for r in result:
            print(f"- {r[0]} ({r[1]}): featured={r[2]}")

if __name__ == "__main__":
    check_database()
