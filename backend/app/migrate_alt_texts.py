import sys
import os
# Adjust path to import app correctly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import text
from app.database import engine

def generate_seo_title(property_name, property_type, location, city, media_type, is_hero, index):
    p_type = property_type or "Property"
    loc = location or ""
    c_city = city or "Dehradun"
    
    if is_hero:
        return f"{property_name} luxury {p_type} for sale on {loc} {c_city}"
    
    # Non-hero galleries
    themes = [
        f"Gated community {p_type} view at {property_name} {loc}",
        f"Premium layout and modern architecture of {property_name} {c_city}",
        f"Living spaces and premium specifications of {property_name} {p_type}",
        f"Green surroundings and scenic mountain views at {property_name}",
        f"Internal road view and landscape at {property_name} {loc}",
        f"Exterior facade and designer layout at {property_name} {c_city}"
    ]
    
    theme_idx = index % len(themes)
    return themes[theme_idx]

def migrate():
    with engine.begin() as connection:
        # Fetch all properties
        result = connection.execute(text("SELECT id, name, sub_type, location, city FROM properties"))
        properties = result.fetchall()
        
        print(f"Found {len(properties)} properties in database.")
        
        total_updated = 0
        for p_id, p_name, p_type, p_loc, p_city in properties:
            # Fetch all media for this property
            media_result = connection.execute(
                text("SELECT id, media_url, media_type, is_hero FROM property_media WHERE property_id = :p_id ORDER BY is_hero DESC, id"),
                {"p_id": p_id}
            )
            media_items = media_result.fetchall()
            
            print(f"\nProperty: {p_name} ({len(media_items)} media files)")
            
            for idx, (m_id, m_url, m_type, is_hero) in enumerate(media_items):
                title = generate_seo_title(p_name, p_type, p_loc, p_city, m_type, is_hero, idx)
                
                # Update
                connection.execute(
                    text("UPDATE property_media SET title = :title WHERE id = :m_id"),
                    {"title": title, "m_id": m_id}
                )
                total_updated += 1
                print(f" - Updated media {m_id}: '{title}'")
                
        print(f"\nMigration complete. Updated {total_updated} media alt titles.")

if __name__ == "__main__":
    migrate()
