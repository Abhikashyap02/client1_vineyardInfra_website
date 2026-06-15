from decimal import Decimal
from app.database import SessionLocal, Base, engine
from app.models import Property, FAQ

def seed_data():
    # Recreate tables to apply schema modifications (drop and rebuild)
    print("Dropping all existing tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables with new schema...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Seed Properties
        properties = [
            Property(
                name="Vineyard Signature Villas",
                location="Mussoorie Road, Dehradun",
                property_type="Villa",
                price=Decimal("14500000.00"),  # 1.45 Cr
                bhk=4,
                ready_to_move=False,
                under_construction=True,
                area="2200-3000 sqft",
                description="Ultra-luxury smart villas nestled in the foothills of Mussoorie. Features private terrace, modular kitchen, and scenic mountain views.",
                image_url="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
                amenities="Private Terrace, Modular Kitchen, Smart Home Automation, Scenic Mountain Views, Gated Security"
            ),
            Property(
                name="Vineyard High Grove",
                location="Sahastradhara Road, Dehradun",
                property_type="Apartment",
                price=Decimal("7800000.00"),  # 78 L
                bhk=3,
                ready_to_move=False,
                under_construction=True,
                area="1200-1950 sqft",
                description="Premium high-rise apartments with state-of-the-art club house, panoramic views, and 24/7 security.",
                image_url="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
                amenities="Luxury Clubhouse, Breathtaking Swimming Pool, Fully Equipped Gym, 24/7 Security, Jogging Track"
            ),
            Property(
                name="Vineyard Green County",
                location="Harrawala, Dehradun",
                property_type="Plot",
                price=Decimal("2250000.00"),  # 22.5 L
                bhk=None,
                ready_to_move=True,
                under_construction=False,
                area="100-300 sqyd",
                description="Gated community plots with wide tar roads, underground electricity, water supply, and beautifully landscaped gardens.",
                image_url="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
                amenities="Underground Electricity, Gated Gated Entry, 30ft Tar Roads, 24/7 Water Supply, Landscaped Gardens"
            )
        ]
        
        db.add_all(properties)
        
        # Seed FAQs
        faqs = [
            FAQ(
                question="RERA Approved?",
                answer="Yes, all Vineyard Infra projects are 100% RERA approved. Registration numbers: Signature Villas (RERA-UK-0824001), High Grove (RERA-UK-0924003)."
            ),
            FAQ(
                question="Possession Date?",
                answer="Possession timelines:\n• Vineyard Signature Villas: Possession starts December 2026.\n• Vineyard High Grove: Possession starts June 2027.\n• Vineyard Green County Plots: Ready for registry and immediate possession/construction."
            ),
            FAQ(
                question="Loan Available?",
                answer="Yes, all our projects are pre-approved for home loans by major public and private banks including SBI, HDFC, ICICI, LIC Housing Finance, and Axis Bank. We assist with up to 90% loan funding depending on eligibility."
            ),
            FAQ(
                question="Maintenance Charges?",
                answer="For villas and apartments, maintenance charges are estimated at ₹2 to ₹3 per sqft per month. This covers 24/7 security, clubhouse upkeep, swimming pool, common area lighting, garbage collection, and landscaping."
            ),
            FAQ(
                question="Amenities?",
                answer="Our projects boast world-class amenities including:\n• Luxury Clubhouse & Gymnasium\n• Breathtaking Infinity Swimming Pool\n• Jogging track & landscaped gardens\n• 24/7 3-Tier Security with CCTV\n• Electric Vehicle (EV) Charging Stations\n• Power Backup & Continuous Water Supply."
            )
        ]
        
        db.add_all(faqs)
        
        db.commit()
        print("Database successfully seeded with properties and FAQs!")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
