# Automatically generated seed data from remote database
from decimal import Decimal
from datetime import datetime
from app.database import SessionLocal, Base, engine
from app.models import Property, PropertyVariant, PropertyMedia, PropertyFeature, FAQ
import uuid

def seed_data():
    print("Dropping all existing tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables with new schema...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        print("Seeding properties...")
        prop_0 = Property(
            id=uuid.UUID('be9bc0c0-8c08-4e31-9890-81f2e2fc98b9'),
            slug='platinum-township',
            name='Platinum Township',
            category='Residential',
            sub_type='Plot',
            location='Chandpur–Sahaspur Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('40000.00'),
            possession_status='Oct-2027\n',
            short_description='Escape the Chaos. Embrace Wellness at Platinum Township, Dehradun. Looking for the perfect spot to build your dream home? Welcome to Platinum Township on Chandpur–Sahaspur Road, an exclusive, MDDA-approved, and RERA-registered gated community. Perfectly blending modern convenience with a unique, Ayurveda-inspired wellness theme, this premium development features just 108 freehold residential plots surrounded by lush greenery and clean air. Secure your piece of paradise today at special soft-launch prices before the upcoming price hike!',
            about="Platinum Township is a beautifully planned 10.27-acre residential community designed for families who want more than just a piece of land—they want a balanced, peaceful lifestyle. Located near the prestigious Ecole Globale International Girls' School, this township offers the perfect escape from city noise while keeping you seamlessly connected to schools, hospitals, markets, and travel hubs. Inspired by the healing principles of Ayurveda, the township is organized around the five natural elements (Earth, Water, Fire, Air, and Space) to promote everyday health and happiness.",
            why_choose='100% Approved & Secure: Fully MDDA-approved and RERA-registered, ensuring peace of mind and easier bank loan approvals. Guaranteed Price Growth: Soft-launch price of ₹40,000/Sq. Yd. before increasing to ₹45,000/Sq. Yd. Unique Wellness Living: Ayurveda-inspired community with 501 planned trees, herbal gardens, and a health club. Perfect Location: Peaceful surroundings with easy access to markets and hospitals. Risk-Free Booking: ₹2,00,000 EOI, fully refundable.',
            brochure_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/%20platinum-township/Platinum%20Township%20Brochure.pdf',
            google_map_url='https://maps.app.goo.gl/nnwfAiRtaqboHdes9',
            featured=True,
            status='Active'
        )
        db.add(prop_0)
        
        prop_1 = Property(
            id=uuid.UUID('55521eb8-a828-4437-9e09-8d06a3751580'),
            slug='sangam-valley',
            name='Sangam Valley',
            category='Residential',
            sub_type='Apartment',
            location='Main Sahastradhara Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('11600000.00'),
            possession_status='Oct 2026',
            short_description='🌟 Sangam Valley – Luxury 2 & 3 BHK Apartments 🌟 Experience premium urban living amidst pristine nature right on Main Sahastradhara Road, Dehradun. This MDDA & RERA approved gated society offers spacious modern homes packed with elite features like a 10th-floor common terrace garden, multi-level clubhouse, and a 5-tier security setup.',
            about='Developed over a premium 1.57-acre campus, Sangam Valley brings you the ultimate balance of nature and modern lifestyle. The community is fully equipped with high-speed elevators, air-conditioned entrance lobbies, and eco-friendly features like EV charging hubs, rainwater harvesting, and solar support. Inside each 2 and 3 BHK flat, enjoy premium specs including imported marble floors, modular kitchens with built-in appliances, and independent VRF air conditioning setups.',
            why_choose='100% Legal & Approved: Vetted and cleared by both MDDA and UKRERA (Reg No. UKREP05240000558). Premium Location: Centrally situated right on Sahastradhara Road with rapid connectivity to core city points, elite schools, and hospitals. \nTop-Tier 5-Tier Security: Round-the-clock defense featuring smart video door phones, over 100 CCTV systems, and alert Quick Response Teams. Sustainable Elements: Built intelligently with dedicated rainwater collection systems, an eco-friendly Sewage Treatment Plant, and common EV charging ports.',
            brochure_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/sangam-valley/Sangam%20Valley%20Brochure.pdf',
            google_map_url='https://maps.app.goo.gl/KdvZEEpxkwsP9qnf7',
            featured=True,
            status='Active'
        )
        db.add(prop_1)
        
        prop_2 = Property(
            id=uuid.UUID('6433ad9e-1953-40b4-94b9-cc6d6ca26658'),
            slug='vivanta-greens',
            name='Vivanta Greens',
            category='Residential',
            sub_type='Plot',
            location='Mandakini Vihar, Sahastradhara Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('85000.00'),
            possession_status='Immediate',
            short_description='Build Your Dream Premium Villa at Vivanta Greens, Dehradun. Discover an elite 15-bigha gated plotted development nestled in the highly sought-after Mandakini Vihar neighborhood. Offering exceptional dual connectivity to both Sahastradhara Road and Canal Road, this fully MDDA-approved and RERA-registered premium community features just 48 exclusive residential plots. \nEnjoy top-tier neighborhood living under the Nagar Nigam jurisdiction, complete with beautiful parks and sports amenities. Secure your choice of plot today at ₹85,000 per Sq. Yd. before this limited inventory sells out!',
            about='Vivanta Greens is a premium residential plotted development sprawling across a massive 15 bighas of land in Mandakini Vihar, Dehradun. The project is highly exclusive, featuring a limited layout of only 48 residential plots with multiple facings available, ensuring a low-density, sophisticated neighborhood atmosphere. Falling under the Nagar Nigam jurisdiction, it offers smooth access to public infrastructure while boasting a strategic dual-connectivity route that links directly to both Sahastradhara Road and Canal Road. The development is designed with wide 30 ft and 40 ft internal roads and offers immediate possession for construction.',
            why_choose='100% Legal & Approved: Fully MDDA-approved and RERA-registered, making it completely secure for bank loans and hassle-free registry. The Dual-Road Advantage: Exceptional daily convenience with smooth, traffic-free connectivity to both Sahastradhara Road and Canal Road. Nagar Nigam Benefits: Located within municipal limits, ensuring clean roads, regular municipal water support, waste collection, and efficient street lighting. ',
            brochure_url=None,
            google_map_url=None,
            featured=False,
            status='Active'
        )
        db.add(prop_2)
        
        prop_3 = Property(
            id=uuid.UUID('e9ef47ca-9a85-4a87-b5b4-0d98ac7afa86'),
            slug='orchid-park',
            name='Orchid Park Plot',
            category='Residential',
            sub_type='Plot',
            location='Orchid Park, Chalang, Nagal Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('75000.00'),
            possession_status='Immediate',
            short_description='Premium East-Facing Residential Plot Available at Orchid Park, Dehradun. Grab this rare opportunity to build your ideal home in the serene and peaceful Orchid Park enclave, situated along Chalang, Nagal Road.',
            about='This residential plot is a premium individual property offering located in the peaceful neighborhood of Orchid Park at Chalang, Nagal Road, Dehradun. Spanning a total area of 234 Sq. Yards with clear dimensions of $34 \\times 60$, the land is structurally ideal for building a custom independent villa, complete with room for a private parking setup and individual green spaces. The plot benefits from a highly desired East-facing alignment, ensuring plenty of natural morning light, and sits directly on a wide 30 Ft. internal approach road. The property comes with immediate possession status for hassle-free registration and construction.',
            why_choose='Perfect Dimensions: Features an excellent, clean $34 \\times 60$ configuration totaling 234 Sq. Yards, making it highly efficient for standard architectural villa maps.\nReady to Build: Zero waiting time with clear titles and immediate possession status, enabling you to buy, register, and start your building construction instantly.',
            brochure_url=None,
            google_map_url=None,
            featured=False,
            status='Active'
        )
        db.add(prop_3)
        
        prop_4 = Property(
            id=uuid.UUID('428dcc23-eafa-43f4-aeeb-fde49d3b28cf'),
            slug='dhanyari-plot',
            name='Plot in Dhaniyari, Thano Road',
            category='Residential',
            sub_type='Plot',
            location='Dhaniyari, Thano Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('42000.00'),
            possession_status='Immediate',
            short_description='Affordable Residential Plots Available at Dhaniyari, Thano Road, Dehradun. Unlock your chance to own a premium plot in the rapidly growing and naturally scenic belt of Thano Road.',
            about='This residential plotting project provides prime investment and home-building opportunities located along the sought-after Thano Road corridor in Dhaniyari, Dehradun. Designed to cater to various space requirements, buyers can choose from multiple plot cuts starting from a compact 100 Sq. Yds. up to a spacious 233 Sq. Yds. The layout features neatly planned 25 Ft. wide approach roads, offering seamless connectivity and a well-organized neighborhood structure.',
            why_choose='Excellent Value Pricing: Offered at a highly lucrative price point of ₹42,000 per Sq. Yard, ensuring high future appreciation potential along the rising Thano Road belt.',
            brochure_url=None,
            google_map_url=None,
            featured=False,
            status='Active'
        )
        db.add(prop_4)
        
        prop_5 = Property(
            id=uuid.UUID('8bf2c1a6-9cfe-4194-af12-ae119468e21a'),
            slug='plot-on-sahastradhara-road',
            name='Plot on Sahastradhara Road',
            category='Residential',
            sub_type='Plot',
            location='Rajeshwar Nagar Phase 1 Ext., Sahastradhara Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('85000.00'),
            possession_status='Immediate',
            short_description="Premium Corner Residential Plot for Sale in Rajeshwar Nagar Phase 1 Ext., Dehradun. Don't miss this rare opportunity to secure a highly valuable residential plot located in the premium residential belt of Rajeshwar Nagar",
            about='This highly premium land parcel is an individual residential plot located inside the established and prime enclave of Rajeshwar Nagar Phase 1 Ext., Sahastradhara Road, Dehradun. Offering a massive total space of 382 Sq. Yards with highly functional layout dimensions of $80 \\times 43$, the property is absolutely perfect for designing a luxury independent bungalow, duplex villa, or multi-family luxury residence. The property boasts an exceptional dual-facing profile (East & North facing), which ensures maximum open ventilation, premium Vaastu layout possibilities, and plenty of continuous natural light. Fronted smoothly by a wide 30 Ft. internal approach road infrastructure, the plot is completely ready with immediate possession for swift registry and construction setup.',
            why_choose='Premium Corner/Dual Facing Profile: Boasts a rare, highly sought-after East & North facing combination\nGenerous Dimensions: A beautifully proportioned $80 \\times 43$ foot clear dimension totaling 382 Sq. Yards',
            brochure_url=None,
            google_map_url=None,
            featured=False,
            status='Active'
        )
        db.add(prop_5)
        
        prop_6 = Property(
            id=uuid.UUID('4a4cf89f-fb49-4272-8b5f-ccb22b565543'),
            slug='shikhar-heights',
            name='Shikhar Heights',
            category='Residential',
            sub_type='Apartment',
            location='Dhoran Road, Near Ghati, River Valley',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('10500000.00'),
            possession_status='Ready to Move',
            short_description='Ready-to-Move 3 BHK Luxury Flat for Sale at Shikhar Heights, Dehradun. Step into a life of ease and sophistication with this premium 1800 Sqft luxury apartment located on Dhoran Road, near Ghati (River Valley). Completely ready to move in, this gorgeous flat features high-end false ceilings, premium Moto brand vitrified tiles, and Jaguar bathroom fittings.',
            about='Shikhar Heights presents an ultra-premium residential living experience nestled in the calm and scenic River Valley belt along Dhoran Road, Dehradun. This spacious 1800 Sqft 3 BHK apartment is designed with precision, delivering ready-to-move convenience paired with exceptional semi-furnished inclusions. Every bedroom comes beautifully fitted with spacious built-in almirahs, while customized TV panels are elegantly installed across all rooms and the main drawing area. The home features a fully modular kitchen equipped with a branded chimney and pre-installed geysers. The entire property is structured with high-speed elevator access, secure covered car parking slots, and strict round-the-clock digital security monitoring.',
            why_choose='Zero Waiting / Ready to Move: Skip the construction delays entirely—this luxury 3 BHK flat is fully complete, beautifully polished, and waiting for you to move right in. High-End Branded Fittings. Hassle-Free HDFC Bank Financing: Fully cleared property profiles with quick loan processing ties directly established via HDFC Bank, making your home purchase financially smooth. Complete Luxury Setup: Comes heavily pre-equipped with essential appliances and aesthetic finishes including elegant false ceilings, fancy lighting fixtures, branded fans, geysers, and completely ready AC copper pipe connections.',
            brochure_url=None,
            google_map_url=None,
            featured=False,
            status='Active'
        )
        db.add(prop_6)
        
        prop_7 = Property(
            id=uuid.UUID('66f68a66-4a45-4e52-8abe-a5bd3a690260'),
            slug='yash-hill-view',
            name='Yash Hill View',
            category='Residential',
            sub_type='Appartment',
            location='Chalang, Sahastradhara Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('6500000.00'),
            possession_status='Immediate',
            short_description='Ready-to-Move 2 BHK Premium Builder Floor for Sale at Yash Hill View, Dehradun. Experience the perfect mix of independent living and scenic beauty at Chalang, just off the highly connected Sahastradhara Road corridor. This premium 1100 Sq. Ft. builder floor offers an auspicious East-facing layout, ensuring bright, well-ventilated interiors with natural sunlight.',
            about='Yash Hill View offers an elite and private residential experience through its limited builder floor units located in the peaceful yet rapidly developing neighborhood of Chalang, Sahastradhara Road, Dehradun. Spanning a highly efficient super built-up area of 1100 Sq. Ft., this 2 BHK configuration is tailored perfectly for families who prefer low-density setups over massive, crowded apartment complexes. The property boasts a highly coveted East-facing orientation that fulfills standard Vaastu design parameters while offering excellent cross-ventilation. Facing a clean 25 Ft. wide internal approach road, it comes with full immediate possession, making it ideal for buyers looking to sign registries and move in right away.',
            why_choose='Highly Coveted East Facing: Strict compliance with top-tier Vaastu guidelines, assuring beautiful morning sunlight, positive energy flow, and natural daytime illumination.\nStrategic Prime Connectivity: Tucked in the calm hills of Chalang while remaining seamlessly linked to the bustling healthcare, education, and shopping hubs of Sahastradhara Road',
            brochure_url=None,
            google_map_url=None,
            featured=False,
            status='Active'
        )
        db.add(prop_7)
        
        prop_8 = Property(
            id=uuid.UUID('e10540f3-e55e-4e6a-8677-f3617f19da74'),
            slug='luxury-villa-sahastradhara-road',
            name='Beautiful Luxury Villa on Sahastradhara Road',
            category='Residential',
            sub_type='Villa',
            location='On Main Sahastradhara Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('25000000.00'),
            possession_status='Ready to Move',
            short_description='Ultra-Luxury 4 BHK MDDA-Approved Villa for Sale on Sahastradhara Road, Dehradun. Indulge in premium living with this stunning 4,000 sq.ft. covered area villa built on a 177-178 sq.yd. auspicious "Gau Mukhi" plot. Situated in an elite, registered residential society with direct 270-degree Mussoorie mountain views, this independent corner-feel home boasts its own swimming pool, an expansive rooftop party space with a bar and fountain, and a dedicated servant room.',
            about='This premium independent residential house is an architectural masterpiece located in a posh, highly secured gated community right near the IT Park and lush green Reserved Forest belt of Sahastradhara Road, Dehradun. Spanning approximately 4,000 sq.ft. of built-up area, the villa features an expertly engineered column structural design constructed with premium UltraTech Cement and TMT Bar FE500 steel. The 4 BHK configuration is highly luxurious—offering a dressing area and private balconies for every single bedroom. Designed with professional architectural plans, three-side open ventilation, premium semi-furnished woodworks (wardrobes, modular kitchen, custom TV walls), and a dedicated servant room with an attached bath, it offers unmatched luxury and security.',
            why_choose='100% Legal & Approved: Fully MDDA layout approved with complete structural design, architectural map layouts, and electrical/plumbing plans fully checked.\nBreathtaking Scenic Views: Perfectly oriented North-East ("Gau Mukhi" plot shapes) offering a stunning, uninterrupted 270-degree view of Mussoorie and surrounding hills.',
            brochure_url=None,
            google_map_url=None,
            featured=True,
            status='Active'
        )
        db.add(prop_8)
        
        prop_9 = Property(
            id=uuid.UUID('17899a11-dd91-4be5-91ec-07daa9081824'),
            slug='3bhk-house-in-dwarka-enclave',
            name='3BHK House in Dwarka Enclave',
            category='Residential',
            sub_type='House/Villa',
            location='Dwarka Enclave, Sahastradhara Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('18500000.00'),
            possession_status='Ready to Move',
            short_description="Ready-to-Move 3 BHK Luxury House/Villa for Sale at Dwarka Enclave, Sahastradhara Road, Dehradun. Embrace an upscale lifestyle in one of Dehradun's most premium and highly sought-after residential sectors. Built beautifully on a generous 155 Sq. Yards plot, this magnificent 3 BHK independent house offers a spacious architectural design perfect for modern family living. Positioned perfectly on a wide 30 Ft. road layout",
            about='This premium independent villa stands as an exceptional residential offering located within the peaceful, highly secure, and gated environment of Dwarka Enclave, right along the prime Sahastradhara Road corridor in Dehradun. Spanning a total land area of 155 Sq. Yards, this 3 BHK house features an expansive floor plan boasting large bedrooms, premium modular configurations, and well-positioned balconies that invite excellent natural ventilation and daylighting. The property fronts smoothly onto a wide 30 Ft. internal approach road layout, allowing for hassle-free vehicle entry, turning, and visitor parking. With absolute clear documentation and immediate possession status, it offers a seamless buying experience for immediate movement.',
            why_choose='Premium Enclave Location: Situated within Dwarka Enclave on Sahastradhara Road,\nGenerous Plot Size: Built on a beautifully proportioned 155 Sq.\nWide 30 Ft. Road Frontage: Enjoys direct access from a wide 30 feet internal road layout, providing excellent approach conditions, open views, and seamless multi-vehicle driving comfort.',
            brochure_url=None,
            google_map_url=None,
            featured=False,
            status='Active'
        )
        db.add(prop_9)
        
        prop_10 = Property(
            id=uuid.UUID('49ae7449-3629-48fe-b088-5f33148090ad'),
            slug='3bhk-house-in-rajeshwar-nagar',
            name='3BHK House in Rajeshwar Nagar',
            category='Residential',
            sub_type='House/Villa',
            location='Rajeshwar Nagar Phase 6, Sahastradhara Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('11000000.00'),
            possession_status='Ready to move',
            short_description='Ready-to-Move 3 BHK Independent House for Sale at Rajeshwar Nagar Phase 6, Dehradun. Secure an incredible deal on Sahastradhara Road with this independent 3 BHK villa built on a 100 Sq. Yards plot. Situated in the well-connected locality of Rajeshwar Nagar Phase 6, this South-facing home sits on a clean 25 Ft. wide internal road layout. With clear documentation and immediate possession available, this beautiful property is offered at a highly attractive price of ₹1.10 Cr!',
            about='This independent residential villa offers a cozy yet spacious living environment in Rajeshwar Nagar Phase 6, right off the prime Sahastradhara Road corridor in Dehradun. Constructed over a 100 Sq. Yards land parcel, this 3 BHK house features a smart architectural layout designed to maximize functional space, natural light, and comfortable daily living. Facing a 25 Ft. wide approach road, it ensures smooth access and easy vehicle movement. Offering absolute immediate possession, it is perfect for homebuyers looking to complete the registry and move into a high-demand Dehradun residential area right away.',
            why_choose='High-Demand Location: Positioned in Rajeshwar Nagar Phase 6 along Sahastradhara Road, providing excellent access to top schools, markets, hospitals, and public transport. Independent Living Advantage: Enjoy the complete privacy, ownership, and peaceful atmosphere of an independent house/villa. Wide Approach Road: Fronted by a 25 Ft. internal road, ensuring effortless driving, turning space, and parking convenience.',
            brochure_url=None,
            google_map_url=None,
            featured=False,
            status='Active'
        )
        db.add(prop_10)
        
        prop_11 = Property(
            id=uuid.UUID('e5d84a81-cf5d-421a-97d2-b0d656999ac3'),
            slug='3bhk-house-in-drone-vatika',
            name='3BHK House in Drone Vatika',
            category='Residential',
            sub_type='House/Villa',
            location='Drone Vatika, Sahastradhara Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('16500000.00'),
            possession_status='Ready to move',
            short_description="Ready-to-Move 3 BHK Independent House/Villa for Sale at Drone Vatika, Sahastradhara Road, Dehradun. Discover superior comfort in one of Dehradun's most established residential enclaves. Constructed thoughtfully on a 122 Sq. Yards plot, this independent 3 BHK villa offers modern layout efficiencies, bright family spaces, and great connectivity. Situated on a wide 25 Ft. internal road with South-facing orientation, this clear-titled property is available for immediate possession and registration at an incredible price of ₹1.65 Cr!",
            about='Positioned inside the serene and secure neighborhood of Drone Vatika along the rapidly appreciating Sahastradhara Road corridor in Dehradun, this independent 3 BHK residential house provides an ideal mix of privacy and convenience. Spanning a plot area of 122 Sq. Yards, the home is engineered to deliver comfortable room dimensions, spacious living areas, and functional domestic planning. The property directly faces a neat 25 Ft. wide approach road, allowing for effortless vehicle driving and parking access. Featuring absolute clear paperwork and immediate possession readiness, it offers a hassle-free transition into a dream Dehradun home.',
            why_choose='Sought-After Prime Location: Situated in Drone Vatika on Sahastradhara Road, placing you right near top-tier schools, prominent commercial hubs, markets, and healthcare services. Independent Plot Ownership: Built on a standalone 122 Sq. Yards land parcel, guaranteeing complete privacy, independent floor usage, and strong long-term property appreciation. Wide Road Frontage: Fronted by a 25 Ft. wide internal layout that ensures smooth dual-vehicle passing, comfortable parking, and an airy street view.',
            brochure_url=None,
            google_map_url=None,
            featured=False,
            status='Active'
        )
        db.add(prop_11)
        
        prop_12 = Property(
            id=uuid.UUID('d5cd3bb1-6723-4864-90f6-edd03ba984b2'),
            slug='clarks-residency',
            name='Clarks Residency',
            category='Residential',
            sub_type='Apartment',
            location='Gujrada Mansing, Sahastradhara Road',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('7800000.00'),
            possession_status='Ready to move',
            short_description='Smart 3 BHK Premium Flats for Sale at Clarks Residency, Dehradun. Experience next-generation living just 400 meters off Sahastradhara Road in Gujrada Mansing. Spanning 1150 Sq. Ft. plus 325 Sq. Ft. of balcony/extra space, these exclusive 3 BHK apartments are fully integrated with Alexa Voice Control Smart Home automation. Featuring a low-density 4-story structure with only 3 flats per floor, top-tier Birla lift access right to the rooftop, private gazebo setups, and robust dual-water infrastructure, secure your dream home today for an unbeatable price of ₹78 Lakhs!',
            about='Clarks Residency is a modern boutique residential complex situated in the serene yet highly connected belt of Gujrada Mansing, Sahastradhara Road, Dehradun. Designed with a focus on privacy and convenience, the project comprises a 4-floor layout housing just 3 flats per floor. Each spacious 3 BHK unit offers a 1150 Sq. Ft. main built-up area complimented by 325 Sq. Ft. of additional utility/balcony area. The apartments are pre-fitted with cutting-edge tech including Alexa Voice Control, touch-operated chimneys, and luxury Jaguar bath fittings. Residents enjoy full rooftop access complete with a relaxing gazebo, backed by 24/7 common-area power backup and a heavy-duty water setup consisting of an individual 1,000L tank per unit, a 55,000L underground reservoir, and a 7" deep submersible borewell.',
            why_choose='Next-Gen Smart Home Setup: Fully automated Alexa voice control technology pre-integrated into your home for effortless lighting and power management.\n Low-Density Exclusive Living: Boutique 4-story structure with only 3 flats per floor, guaranteeing high privacy, less noise, and efficient common utility usage. \nUnmatched Water & Utility Infrastructure: Equipped with an individual water motor and 1,000L tank for every flat, a massive 55,000L underground storage, and a dedicated 7" submersible borewell to ensure uninterrupted water supply. \nRooftop Leisure & Modern Amenities: Features direct Birla lift access all the way to the top floor, a luxury rooftop gazebo, covered parking for 1 car and 2 wheelers, and automated common area power backup.',
            brochure_url=None,
            google_map_url=None,
            featured=False,
            status='Active'
        )
        db.add(prop_12)
        
        prop_13 = Property(
            id=uuid.UUID('dbb30647-25b4-4a9c-ba37-c48c92dc3c3e'),
            slug='aviraj-apartments',
            name='Aviraj Apartments',
            category='Residential',
            sub_type='Apartment',
            location='Sahastradhara Road, Dehradun',
            city='Dehradun',
            state='Uttarakhand',
            starting_price=Decimal('7500000.00'),
            possession_status='Ready to Move',
            short_description='🌟 Aviraj Apartments – Luxury 2 & 3 BHK Flats 🌟 Experience modern luxury in a premium residential gated complex located on Sahastradhara Road, Dehradun.',
            about='Aviraj Apartments is a premium residential community designed for comfort and modern lifestyle. Situated in a highly accessible area on Sahastradhara Road, the apartments feature high-quality finishes, spacious balconies, modular kitchen layouts, and standard clubhouse facilities.',
            why_choose='Prime Location: Centrally located on Sahastradhara Road with rapid connectivity to IT Park, shopping malls, and prime schools.\nModern Comforts: Features standard elevators, parking space, power backup, and landscaped balconies.\nTrusted Quality: Built with premium materials, vitrified flooring, and modern plumbing.\nLoan Pre-Approved: Pre-approved for fast housing loans by major nationalized banks.',
            brochure_url=None,
            google_map_url=None,
            featured=True,
            status='Active'
        )
        db.add(prop_13)
        

        print('Seeding variants...')
        db.add(PropertyVariant(
            id=uuid.UUID('4c4851d0-6c2d-4bb2-9810-f6a916633b77'),
            property_id=prop_0.id,
            variant_name='Residential Plots',
            area='180–769 Sq. Yd.',
            bedrooms=None,
            bathrooms=None,
            price=Decimal('40000.00'),
            facing='All Facing Available\n',
            front_road='30 Ft. Road\n',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('5586902b-6108-4e5a-b31b-5100b2b18bb5'),
            property_id=prop_1.id,
            variant_name='2BHK',
            area='1445 Sq. Ft. - 1552 Sq. Ft.\n',
            bedrooms=2,
            bathrooms=2,
            price=Decimal('11600000.00'),
            facing='All Facing\n',
            front_road='110 Ft. Road\n',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('e8df9dcd-5e88-4567-9f07-3edf3d8464bb'),
            property_id=prop_1.id,
            variant_name='3BHK',
            area='2607 Sq. Ft. - 2662 Sq. Ft.\n',
            bedrooms=3,
            bathrooms=3,
            price=Decimal('20900000.00'),
            facing='All facing ',
            front_road='110 Ft. Road\n',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('03031f91-c1ad-4a90-9e6a-98193095791b'),
            property_id=prop_2.id,
            variant_name='Residential plots',
            area='180 Sq. Yd. up to 400 Sq. Yd',
            bedrooms=None,
            bathrooms=None,
            price=Decimal('85000.00'),
            facing='All Facing\n',
            front_road='30Ft',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('153872d3-a28f-4c6c-9a1d-541ecad6a72f'),
            property_id=prop_3.id,
            variant_name='Residential plot',
            area='234 Sq. Yard\n',
            bedrooms=None,
            bathrooms=None,
            price=Decimal('75000.00'),
            facing='East Facing',
            front_road='30 Ft',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('e10b1adf-0e2d-4a2a-a1fa-5e29d4ad2e8d'),
            property_id=prop_4.id,
            variant_name='Residential plots',
            area='100 Sq. Yds. To 233 Sq. Yds.\n',
            bedrooms=None,
            bathrooms=None,
            price=Decimal('42000.00'),
            facing=None,
            front_road='25ft',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('8a482c2e-8f92-4f83-a21c-41949312e73a'),
            property_id=prop_5.id,
            variant_name='Residential Plot',
            area='382 Sq. Yard\n',
            bedrooms=None,
            bathrooms=None,
            price=Decimal('85000.00'),
            facing='East & North\n',
            front_road='30ft',
            availability='Available\n'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('81dd1ac7-0920-484b-a4a5-56c4250105f4'),
            property_id=prop_6.id,
            variant_name='3 BHK Luxury Apartment',
            area='1800 Sqft',
            bedrooms=3,
            bathrooms=3,
            price=Decimal('10500000.00'),
            facing=None,
            front_road='30Ft',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('87035fad-b842-4a06-b4fd-4d73f40ae10f'),
            property_id=prop_7.id,
            variant_name='2BHK',
            area='1100 Sq. Ft.\n',
            bedrooms=2,
            bathrooms=2,
            price=Decimal('6500000.00'),
            facing='East\n',
            front_road='25 Ft. Road\n',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('d31b3e26-5b40-47fc-8713-251684bb6be1'),
            property_id=prop_8.id,
            variant_name='4 BHK',
            area='178 sq.yd',
            bedrooms=4,
            bathrooms=6,
            price=Decimal('25000000.00'),
            facing='North- East Facing',
            front_road='25ft',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('dd3bb35f-6055-4784-8688-05e49137dfd8'),
            property_id=prop_9.id,
            variant_name='3BHK',
            area='155 Sq.Yrds',
            bedrooms=3,
            bathrooms=3,
            price=Decimal('18500000.00'),
            facing=None,
            front_road='30 Ft',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('bbee9899-1d09-4411-bcbe-3143e33abbe0'),
            property_id=prop_10.id,
            variant_name='3BHK',
            area='100 Sq. Yards\n',
            bedrooms=3,
            bathrooms=3,
            price=Decimal('11000000.00'),
            facing='South facing',
            front_road='25 Ft. Road\n',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('52f4c689-0c25-416a-bd24-b1b2ddee7b71'),
            property_id=prop_11.id,
            variant_name='3BHK',
            area='122 Sq. Yards\n',
            bedrooms=3,
            bathrooms=3,
            price=Decimal('16500000.00'),
            facing='South\n',
            front_road='25 Ft. Road\n',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('87081c4e-312f-49e4-b534-45d61b03c63d'),
            property_id=prop_12.id,
            variant_name='2BHK',
            area='975 Sq. Ft. + 325 Sq. Ft.',
            bedrooms=2,
            bathrooms=2,
            price=Decimal('6800000.00'),
            facing='South & East Facing\n',
            front_road='30 Ft. Road\n',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('a4d06ae9-251a-490c-9c2e-49fa3f971afe'),
            property_id=prop_12.id,
            variant_name='3BHK',
            area='1150 Sq. Ft. + 325 Sq. Ft.',
            bedrooms=3,
            bathrooms=3,
            price=Decimal('7800000.00'),
            facing='',
            front_road='30 Ft. Road\n',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('690f69cf-25a3-4f90-9dc4-4596476722cb'),
            property_id=prop_13.id,
            variant_name='2BHK',
            area='1250 Sq. Ft.',
            bedrooms=2,
            bathrooms=2,
            price=Decimal('7500000.00'),
            facing='East Facing',
            front_road='30 Ft. Road',
            availability='Available'
        ))
        db.add(PropertyVariant(
            id=uuid.UUID('532c54da-b28c-409a-8748-8c525a0773cb'),
            property_id=prop_13.id,
            variant_name='3BHK',
            area='1650 Sq. Ft.',
            bedrooms=3,
            bathrooms=3,
            price=Decimal('9800000.00'),
            facing='North-East Facing',
            front_road='30 Ft. Road',
            availability='Available'
        ))

        print('Seeding media...')
        db.add(PropertyMedia(
            id=uuid.UUID('0ab793ab-9f5c-4ce8-a9b1-5f0e9230a697'),
            property_id=prop_13.id,
            media_type='Hero Image',
            media_url='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
            title='Aviraj Apartments Exterior Facade',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('1b5ac0af-9e1e-42ee-b829-31e4b5eea612'),
            property_id=prop_13.id,
            media_type='Gallery Image',
            media_url='https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
            title='Aviraj Apartments Interior Living',
            is_hero=False,
            display_order=2
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('4129def0-e73c-4464-8808-16d0d6c71f0b'),
            property_id=prop_0.id,
            media_type='Hero Image',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/%20platinum-township/hero-image.jpg',
            title='Platinum Township luxury Plot for sale on Chandpur–Sahaspur Road Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('2ee75ba9-8f3e-4353-8678-722248381ea0'),
            property_id=prop_0.id,
            media_type='Gallery 4',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/%20platinum-township/Platinum_Township.jpeg',
            title='Premium layout and modern architecture of Platinum Township Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('3803c1a7-47df-4762-ba46-0a38e6a9fa48'),
            property_id=prop_0.id,
            media_type='Gallery1',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/%20platinum-township/Platinum_Township%20(1).jpeg',
            title='Living spaces and premium specifications of Platinum Township Plot',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('a59d9d6a-0f16-4d9e-9cd5-55d10404bc54'),
            property_id=prop_0.id,
            media_type='gallery3',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/%20platinum-township/Platinum_Township(4).jpeg',
            title='Green surroundings and scenic mountain views at Platinum Township',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('e8e47243-8ea0-415d-af6f-bb6fe850114a'),
            property_id=prop_0.id,
            media_type='Gallery2',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/%20platinum-township/Platinum_Township(3).jpeg',
            title='Internal road view and landscape at Platinum Township Chandpur–Sahaspur Road',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('a29a2b2a-4b76-4895-9af1-dadbb375a928'),
            property_id=prop_1.id,
            media_type='Hero image',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/sangam-valley/hero.jpg.png',
            title='Sangam Valley luxury Apartment for sale on Main Sahastradhara Road Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('2e8f1076-f336-4041-b268-5df532ed8f79'),
            property_id=prop_1.id,
            media_type='G2',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/sangam-valley/G3.jpeg',
            title='Premium layout and modern architecture of Sangam Valley Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('4cfdaf04-0a61-47e3-a4f6-a1e3951816fb'),
            property_id=prop_1.id,
            media_type='G1',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/sangam-valley/G1.jpeg',
            title='Living spaces and premium specifications of Sangam Valley Apartment',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('bec8b062-e08b-4012-8236-89699edab197'),
            property_id=prop_1.id,
            media_type='G3',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/sangam-valley/G2.jpeg',
            title='Green surroundings and scenic mountain views at Sangam Valley',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('c4d78424-4bb5-4eac-afef-63e7897e86a4'),
            property_id=prop_1.id,
            media_type='video-sangam',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/sangam-valley/8_and_9.mp4',
            title='Internal road view and landscape at Sangam Valley Main Sahastradhara Road',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('d5ab1cc5-2e7b-48d7-8dcc-caa9e9f8830d'),
            property_id=prop_1.id,
            media_type='G4',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/sangam-valley/G4.jpeg',
            title='Exterior facade and designer layout at Sangam Valley Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('e84620a1-d0dc-4567-adf8-8fb9249f3002'),
            property_id=prop_1.id,
            media_type='G6',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/sangam-valley/G6.jpeg',
            title='Gated community Apartment view at Sangam Valley Main Sahastradhara Road',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('059b5203-ad0c-4012-97d3-c84c3166aeda'),
            property_id=prop_2.id,
            media_type='Hero ',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/Vivanta-Greens/hero.jpeg',
            title='Vivanta Greens luxury Plot for sale on Mandakini Vihar, Sahastradhara Road Dehradun',
            is_hero=True,
            display_order=None
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('39f01b32-8add-4159-a878-d76819a7ff3a'),
            property_id=prop_2.id,
            media_type='vivanta-4',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/Vivanta-Greens/2(3).jpeg',
            title='Premium layout and modern architecture of Vivanta Greens Dehradun',
            is_hero=False,
            display_order=5
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('55cbe79e-84f7-4e9e-8218-8349341c6191'),
            property_id=prop_2.id,
            media_type='vivanta-2',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/Vivanta-Greens/2(2).jpeg',
            title='Living spaces and premium specifications of Vivanta Greens Plot',
            is_hero=False,
            display_order=3
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('9464b877-1fc8-4e79-b069-d82d5ed53868'),
            property_id=prop_2.id,
            media_type='vivanta-layout',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/Vivanta-Greens/2(5).jpg',
            title='Green surroundings and scenic mountain views at Vivanta Greens',
            is_hero=False,
            display_order=6
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('beccc7f2-c1dd-4b78-9495-98c270d7189b'),
            property_id=prop_2.id,
            media_type='vivanta-3',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/Vivanta-Greens/2(4).jpeg',
            title='Internal road view and landscape at Vivanta Greens Mandakini Vihar, Sahastradhara Road',
            is_hero=False,
            display_order=4
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('dfeb45ca-1c57-4fa3-a8af-d2ac517f531f'),
            property_id=prop_2.id,
            media_type='vivanta-1',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/Vivanta-Greens/2(1).jpeg',
            title='Exterior facade and designer layout at Vivanta Greens Dehradun',
            is_hero=False,
            display_order=2
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('8641d9d8-2e58-46f1-8126-3f8d101163ea'),
            property_id=prop_3.id,
            media_type='Hero-orchid park',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/orchid-park/hero.jpeg',
            title='Orchid Park Plot luxury Plot for sale on Orchid Park, Chalang, Nagal Road Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('23dc156e-88b9-4ccd-b817-edb8fd4dab8d'),
            property_id=prop_3.id,
            media_type='img2-orchid',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/orchid-park/3(5).jpeg',
            title='Premium layout and modern architecture of Orchid Park Plot Dehradun',
            is_hero=False,
            display_order=2
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('57537786-c760-4e60-bf07-34c49c093d78'),
            property_id=prop_3.id,
            media_type='img1-orchid',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/orchid-park/3(1).jpeg',
            title='Living spaces and premium specifications of Orchid Park Plot Plot',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('6440d6bb-c4bd-4702-9a56-ae629e09ee8a'),
            property_id=prop_3.id,
            media_type='img3-orchid',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/orchid-park/3(3).jpeg',
            title='Green surroundings and scenic mountain views at Orchid Park Plot',
            is_hero=False,
            display_order=3
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('c2b1de04-7b36-4845-8367-7dfd95940113'),
            property_id=prop_3.id,
            media_type='img4-orchid',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/orchid-park/3(4).jpeg',
            title='Internal road view and landscape at Orchid Park Plot Orchid Park, Chalang, Nagal Road',
            is_hero=False,
            display_order=4
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('e4cf3ea0-e3ac-432b-b3b6-202f390dca4b'),
            property_id=prop_4.id,
            media_type='hero_dhanyari',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/dhanyari-plot/hero.jpeg',
            title='Plot in Dhaniyari, Thano Road luxury Plot for sale on Dhaniyari, Thano Road Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('b0e52116-3d85-4ed3-a360-efc38b1709a5'),
            property_id=prop_4.id,
            media_type='img2_dhanyari',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/dhanyari-plot/4(3).jpeg',
            title='Premium layout and modern architecture of Plot in Dhaniyari, Thano Road Dehradun',
            is_hero=False,
            display_order=2
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('b45b69b6-253c-4fca-b2e8-3a09d9d35066'),
            property_id=prop_4.id,
            media_type='img1_dhanyari',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/dhanyari-plot/4(2).jpeg',
            title='Living spaces and premium specifications of Plot in Dhaniyari, Thano Road Plot',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('c1ef31e0-0966-4bc8-87ea-1b2d4939265c'),
            property_id=prop_4.id,
            media_type='img3_dhanyari',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/dhanyari-plot/4(4).jpeg',
            title='Green surroundings and scenic mountain views at Plot in Dhaniyari, Thano Road',
            is_hero=False,
            display_order=3
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('e4a5594c-e5f4-4dc3-9e95-7356daadadd6'),
            property_id=prop_5.id,
            media_type='hero-rajeshwar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/plot-on-sahastradhara-road/5(2).jpeg?updatedAt=1784470327890',
            title='Plot on Sahastradhara Road luxury Plot for sale on Rajeshwar Nagar Phase 1 Ext., Sahastradhara Road Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('56b62e5d-2f27-40ba-b596-ec959fa9c26a'),
            property_id=prop_5.id,
            media_type='sh1',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/plot-on-sahastradhara-road/5(1).jpeg?updatedAt=1784470327796',
            title='Premium layout and modern architecture of Plot on Sahastradhara Road Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('669af76f-6dd2-4ea2-93b9-f96a9779a96a'),
            property_id=prop_6.id,
            media_type='hero-shikar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/shikhar-height/hero.jpeg',
            title='Shikhar Heights luxury Apartment for sale on Dhoran Road, Near Ghati, River Valley Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('29287e90-e64c-421f-8ca3-9d4b36208270'),
            property_id=prop_6.id,
            media_type='img2-shikar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/shikhar-height/WhatsApp%20Image%202026-07-19%20at%208.29.27%20PM%20(2).jpeg',
            title='Premium layout and modern architecture of Shikhar Heights Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('4966fcf0-cf37-4d45-b1df-d39ed7354f42'),
            property_id=prop_6.id,
            media_type='img4-shikar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/shikhar-height/WhatsApp%20Image%202026-07-19%20at%208.29.24%20PM.jpeg',
            title='Living spaces and premium specifications of Shikhar Heights Apartment',
            is_hero=False,
            display_order=4
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('5163a3c1-8590-4860-8094-64196ddd3110'),
            property_id=prop_6.id,
            media_type='img5-shikar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/shikhar-height/WhatsApp%20Image%202026-07-19%20at%208.29.25%20PM%20(2).jpeg',
            title='Green surroundings and scenic mountain views at Shikhar Heights',
            is_hero=False,
            display_order=5
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('71941b45-8c0e-42ac-9f8b-8f2e3a04d66e'),
            property_id=prop_6.id,
            media_type='img3-shikar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/shikhar-height/WhatsApp%20Image%202026-07-19%20at%208.29.27%20PM.jpeg',
            title='Internal road view and landscape at Shikhar Heights Dhoran Road, Near Ghati, River Valley',
            is_hero=False,
            display_order=3
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('8d5305b4-6704-4c29-82ec-843bc744b9a2'),
            property_id=prop_6.id,
            media_type='img2-shikar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/shikhar-height/WhatsApp%20Image%202026-07-19%20at%208.29.27%20PM%20(1).jpeg',
            title='Exterior facade and designer layout at Shikhar Heights Dehradun',
            is_hero=False,
            display_order=2
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('976fb00e-b2bb-4c69-89d1-a28240580eca'),
            property_id=prop_6.id,
            media_type='img6-shikar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/shikhar-height/WhatsApp%20Image%202026-07-19%20at%208.29.25%20PM%20(1).jpeg',
            title='Gated community Apartment view at Shikhar Heights Dhoran Road, Near Ghati, River Valley',
            is_hero=False,
            display_order=6
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('b23af6b4-2967-41cb-aea9-39480ace8548'),
            property_id=prop_6.id,
            media_type='img1-shikar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/shikhar-height/WhatsApp%20Image%202026-07-19%20at%208.29.26%20PM%20(1).jpeg',
            title='Premium layout and modern architecture of Shikhar Heights Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('b734c314-bc2b-420f-8336-9d2156a365d2'),
            property_id=prop_7.id,
            media_type='Hero-yash',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/yash-hill-view/Hero',
            title='Yash Hill View luxury Appartment for sale on Chalang, Sahastradhara Road Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('1156db55-353c-4a67-98bf-b018d518d32a'),
            property_id=prop_7.id,
            media_type='img2-yash',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/yash-hill-view/20(5).jpeg',
            title='Premium layout and modern architecture of Yash Hill View Dehradun',
            is_hero=False,
            display_order=2
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('474ef7fd-9073-4a9e-ab5d-c52341538f36'),
            property_id=prop_7.id,
            media_type='img4-yash',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/yash-hill-view/20(2).jpeg',
            title='Living spaces and premium specifications of Yash Hill View Appartment',
            is_hero=False,
            display_order=4
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('55732a98-3550-4566-b39e-cf3bf357f4bd'),
            property_id=prop_7.id,
            media_type='img1-yash',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/yash-hill-view/20(4).jpeg',
            title='Green surroundings and scenic mountain views at Yash Hill View',
            is_hero=False,
            display_order=2
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('6d9c768c-efde-43d6-9fd7-be530ca4fadb'),
            property_id=prop_7.id,
            media_type='img3-yash',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/yash-hill-view/20(3).jpeg',
            title='Internal road view and landscape at Yash Hill View Chalang, Sahastradhara Road',
            is_hero=False,
            display_order=3
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('04f19123-ebbe-4a6e-8886-68ce6f7a27cb'),
            property_id=prop_8.id,
            media_type='Hero-villa',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/villa-sahastradhara/hero.jpeg',
            title='Beautiful Luxury Villa on Sahastradhara Road luxury Villa for sale on On Main Sahastradhara Road Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('1bbf3ae0-2a70-472c-a15a-a7e642f61525'),
            property_id=prop_8.id,
            media_type='villa-img3',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/villa-sahastradhara/WhatsApp%20Image%202026-07-19%20at%209.30.37%20PM%20(1).jpeg',
            title='Premium layout and modern architecture of Beautiful Luxury Villa on Sahastradhara Road Dehradun',
            is_hero=False,
            display_order=3
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('39a82eb5-2159-402d-ba15-af9738b39ca7'),
            property_id=prop_8.id,
            media_type='villa-img5',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/villa-sahastradhara/WhatsApp%20Image%202026-07-19%20at%209.30.38%20PM%20(1).jpeg',
            title='Living spaces and premium specifications of Beautiful Luxury Villa on Sahastradhara Road Villa',
            is_hero=False,
            display_order=5
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('4a6bf6c2-8f2f-4c54-8852-ef2b1de063ee'),
            property_id=prop_8.id,
            media_type='villa-img1',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/villa-sahastradhara/WhatsApp%20Image%202026-07-19%20at%209.30.39%20PM%20(1).jpeg',
            title='Green surroundings and scenic mountain views at Beautiful Luxury Villa on Sahastradhara Road',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('77ae32ba-3152-4360-be3c-cc437b290bc5'),
            property_id=prop_8.id,
            media_type='villa-img8',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/villa-sahastradhara/WhatsApp%20Image%202026-07-19%20at%209.30.40%20PM.jpeg',
            title='Internal road view and landscape at Beautiful Luxury Villa on Sahastradhara Road On Main Sahastradhara Road',
            is_hero=False,
            display_order=8
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('8afa1c6b-24c2-437f-b046-921b0fdbabb5'),
            property_id=prop_8.id,
            media_type='villa-img7',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/villa-sahastradhara/WhatsApp%20Image%202026-07-19%20at%209.30.42%20PM%20(3).jpeg',
            title='Exterior facade and designer layout at Beautiful Luxury Villa on Sahastradhara Road Dehradun',
            is_hero=False,
            display_order=7
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('90a4c755-51d9-48ef-9f32-a817477d776e'),
            property_id=prop_8.id,
            media_type='villa-img4',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/villa-sahastradhara/WhatsApp%20Image%202026-07-19%20at%209.30.38%20PM.jpeg',
            title='Gated community Villa view at Beautiful Luxury Villa on Sahastradhara Road On Main Sahastradhara Road',
            is_hero=False,
            display_order=4
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('92bb90a7-9123-4539-aff7-19c71cbd2e4a'),
            property_id=prop_8.id,
            media_type='villa-img2',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/villa-sahastradhara/WhatsApp%20Image%202026-07-19%20at%209.30.39%20PM%20(2).jpeg',
            title='Premium layout and modern architecture of Beautiful Luxury Villa on Sahastradhara Road Dehradun',
            is_hero=False,
            display_order=2
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('c2e20805-dfa7-4755-8b38-89c025e64cc0'),
            property_id=prop_8.id,
            media_type='villa-img6',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/villa-sahastradhara/WhatsApp%20Image%202026-07-19%20at%209.30.37%20PM.jpeg',
            title='Living spaces and premium specifications of Beautiful Luxury Villa on Sahastradhara Road Villa',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('d27b97b2-943a-4780-8e79-2a67b50d5ffe'),
            property_id=prop_8.id,
            media_type='villa-img10',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/villa-sahastradhara/WhatsApp%20Image%202026-07-19%20at%209.30.41%20PM%20(3).jpeg',
            title='Green surroundings and scenic mountain views at Beautiful Luxury Villa on Sahastradhara Road',
            is_hero=False,
            display_order=10
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('f208e1aa-e14a-4b55-9fb9-0fe003bc2a99'),
            property_id=prop_8.id,
            media_type='villa-img9',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/villa-sahastradhara/WhatsApp%20Image%202026-07-19%20at%209.30.41%20PM.jpeg',
            title='Internal road view and landscape at Beautiful Luxury Villa on Sahastradhara Road On Main Sahastradhara Road',
            is_hero=False,
            display_order=9
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('651062df-6ee4-413d-bf38-5dd4c9f79052'),
            property_id=prop_9.id,
            media_type='Hero-dwarka',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-dwarka/hero?updatedAt=1784479982519',
            title='3BHK House in Dwarka Enclave luxury House/Villa for sale on Dwarka Enclave, Sahastradhara Road Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('013ec20f-4515-4a6a-ac37-4b2f84634271'),
            property_id=prop_9.id,
            media_type='dwarka-img3',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-dwarka/21(6).jpeg?updatedAt=1784479982295',
            title='Premium layout and modern architecture of 3BHK House in Dwarka Enclave Dehradun',
            is_hero=False,
            display_order=3
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('5221b4ec-9f75-4736-a73a-52afc9932c56'),
            property_id=prop_9.id,
            media_type='dwarka-img4',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-dwarka/21(7).jpeg?updatedAt=1784479982475',
            title='Living spaces and premium specifications of 3BHK House in Dwarka Enclave House/Villa',
            is_hero=False,
            display_order=4
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('7e5002d6-50ea-4dc2-9958-05fa4827779a'),
            property_id=prop_9.id,
            media_type='dwarka-img2',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-dwarka/21(4).jpeg?updatedAt=1784479982176',
            title='Green surroundings and scenic mountain views at 3BHK House in Dwarka Enclave',
            is_hero=False,
            display_order=2
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('826c32de-3a50-46a6-8623-c2c7fd7000f3'),
            property_id=prop_9.id,
            media_type='dwarka-img5',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-dwarka/21(5).jpeg?updatedAt=1784479982482',
            title='Internal road view and landscape at 3BHK House in Dwarka Enclave Dwarka Enclave, Sahastradhara Road',
            is_hero=False,
            display_order=5
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('8835041a-18f5-4d0f-a9e2-e751eeebe4cb'),
            property_id=prop_9.id,
            media_type='dwarka-img1',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-dwarka/21(3).jpeg?updatedAt=1784479982131',
            title='Exterior facade and designer layout at 3BHK House in Dwarka Enclave Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('4b0d826b-d3eb-4dff-9fbc-9e33875daffe'),
            property_id=prop_10.id,
            media_type='hero-rajeswarnagar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-rajeswarnagar/hero',
            title='3BHK House in Rajeshwar Nagar luxury House/Villa for sale on Rajeshwar Nagar Phase 6, Sahastradhara Road Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('3023b470-d223-4bf4-a767-20a6405e0661'),
            property_id=prop_10.id,
            media_type='img3-rajeswarnagar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-rajeswarnagar/22(2).jpeg',
            title='Premium layout and modern architecture of 3BHK House in Rajeshwar Nagar Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('38c14a92-11a0-4686-add6-a62a4e19e3b8'),
            property_id=prop_10.id,
            media_type='img1-rajeswarnagar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-rajeswarnagar/22(5).jpeg',
            title='Living spaces and premium specifications of 3BHK House in Rajeshwar Nagar House/Villa',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('62d9c9cd-e972-4f34-bf85-d2a24537e24d'),
            property_id=prop_10.id,
            media_type='img5-rajeswarnagar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-rajeswarnagar/22(4).jpeg',
            title='Green surroundings and scenic mountain views at 3BHK House in Rajeshwar Nagar',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('89c1b3cb-f3a1-476d-8a04-122f94a0de57'),
            property_id=prop_10.id,
            media_type='img4-rajeswarnagar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-rajeswarnagar/22(3).jpeg',
            title='Internal road view and landscape at 3BHK House in Rajeshwar Nagar Rajeshwar Nagar Phase 6, Sahastradhara Road',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('d04cc9d3-9ae1-4116-a55f-adb2e677bfa9'),
            property_id=prop_10.id,
            media_type='img2-rajeswarnagar',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-rajeswarnagar/22(2).jpeg',
            title='Exterior facade and designer layout at 3BHK House in Rajeshwar Nagar Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('6fd5cc4f-c407-459d-9060-3eaeb740e9e3'),
            property_id=prop_11.id,
            media_type='hero-drone-vatika',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-drone-vatika/Hero',
            title='3BHK House in Drone Vatika luxury House/Villa for sale on Drone Vatika, Sahastradhara Road Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('05b15f33-2175-42fe-a876-c6b4f0d5c642'),
            property_id=prop_11.id,
            media_type='img2-drone-vatika',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-drone-vatika/24(5).jpeg',
            title='Premium layout and modern architecture of 3BHK House in Drone Vatika Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('2524dbdb-dd9a-47ea-9827-c5150557c84b'),
            property_id=prop_11.id,
            media_type='img3-drone-vatika',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-drone-vatika/24(2).jpeg',
            title='Living spaces and premium specifications of 3BHK House in Drone Vatika House/Villa',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('4d330343-90ff-4a62-8e57-36ea78283a86'),
            property_id=prop_11.id,
            media_type='img4-drone-vatika',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-drone-vatika/24(2).jpeg',
            title='Green surroundings and scenic mountain views at 3BHK House in Drone Vatika',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('8a0deb24-a6c7-47d0-b2f4-247b367ef391'),
            property_id=prop_11.id,
            media_type='img1-drone-vatika',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-drone-vatika/24(4).jpeg',
            title='Internal road view and landscape at 3BHK House in Drone Vatika Drone Vatika, Sahastradhara Road',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('c356f3ef-08fb-4bb8-b650-cc3a86d907d2'),
            property_id=prop_11.id,
            media_type='img5-drone-vatika',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-drone-vatika/24(7).jpeg',
            title='Exterior facade and designer layout at 3BHK House in Drone Vatika Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('e30907a9-4f18-4681-9c71-05f242696f62'),
            property_id=prop_11.id,
            media_type='img7-drone-vatika',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-drone-vatika/26(6).jpeg',
            title='Gated community House/Villa view at 3BHK House in Drone Vatika Drone Vatika, Sahastradhara Road',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('fb54dd64-558a-43d2-b43c-411ada67acb8'),
            property_id=prop_11.id,
            media_type='img6-drone-vatika',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/house-drone-vatika/24(3).jpeg',
            title='Premium layout and modern architecture of 3BHK House in Drone Vatika Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('43fbdda3-af96-4932-a11d-53c44a370539'),
            property_id=prop_12.id,
            media_type='hero-clark',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/clarks-residency/hero',
            title='Clarks Residency luxury Apartment for sale on Gujrada Mansing, Sahastradhara Road Dehradun',
            is_hero=True,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('06cc42ed-25f5-4e4b-afb6-d8f4c43fa5d4'),
            property_id=prop_12.id,
            media_type='img9-clark',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/clarks-residency/WhatsApp%20Image%202026-07-23%20at%203.18.58%20PM.jpeg',
            title='Premium layout and modern architecture of Clarks Residency Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('57d92f01-646c-43b7-8ff7-4bd77a12f64a'),
            property_id=prop_12.id,
            media_type='img2-clark',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/clarks-residency/WhatsApp%20Image%202026-07-23%20at%203.18.59%20PM.jpeg',
            title='Living spaces and premium specifications of Clarks Residency Apartment',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('624d92a7-1a7c-4e59-8a61-dba8b7f9f5e5'),
            property_id=prop_12.id,
            media_type='img7-clark',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/clarks-residency/WhatsApp%20Image%202026-07-23%20at%203.18.58%20PM%20(2).jpeg',
            title='Green surroundings and scenic mountain views at Clarks Residency',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('897145b6-017c-4f17-88a3-d27f447635d8'),
            property_id=prop_12.id,
            media_type='img6-clark',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/clarks-residency/WhatsApp%20Image%202026-07-23%20at%203.18.57%20PM.jpeg',
            title='Internal road view and landscape at Clarks Residency Gujrada Mansing, Sahastradhara Road',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('8d117d1f-398e-4405-a9d6-8a4075f3ac71'),
            property_id=prop_12.id,
            media_type='img3-clark',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/clarks-residency/WhatsApp%20Image%202026-07-23%20at%203.18.58%20PM%20(1).jpeg',
            title='Exterior facade and designer layout at Clarks Residency Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('937d19e3-7d93-4847-8447-e56345329e4e'),
            property_id=prop_12.id,
            media_type='img4-clark',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/clarks-residency/WhatsApp%20Image%202026-07-23%20at%203.18.57%20PM%20(1).jpeg',
            title='Gated community Apartment view at Clarks Residency Gujrada Mansing, Sahastradhara Road',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('97f14aa9-37a2-4bb7-8663-5f09c87ff1ef'),
            property_id=prop_12.id,
            media_type='img8-clark',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/clarks-residency/WhatsApp%20Image%202026-07-23%20at%203.18.59%20PM%20(1).jpeg',
            title='Premium layout and modern architecture of Clarks Residency Dehradun',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('b1865027-7509-4938-9150-e073df7fccf6'),
            property_id=prop_12.id,
            media_type='img1-clark',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/clarks-residency/WhatsApp%20Image%202026-07-23%20at%203.18.56%20PM.jpeg',
            title='Living spaces and premium specifications of Clarks Residency Apartment',
            is_hero=False,
            display_order=1
        ))
        db.add(PropertyMedia(
            id=uuid.UUID('bd146044-ea4f-48fb-b880-c2c885032b9c'),
            property_id=prop_12.id,
            media_type='img2-clark',
            media_url='https://ik.imagekit.io/vineyard/Vineyard%20Infra/clarks-residency/WhatsApp%20Image%202026-07-23%20at%203.18.56%20PM%20(1).jpeg',
            title='Green surroundings and scenic mountain views at Clarks Residency',
            is_hero=False,
            display_order=1
        ))

        print('Seeding features...')
        db.add(PropertyFeature(
            id=uuid.UUID('5c43fc59-f6a8-4c17-acc2-839aec758f1e'),
            property_id=prop_0.id,
            feature_type='Approval',
            feature_name='MDDA & RERA Approved',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('293ee072-2175-4b75-8e67-ab68166ba653'),
            property_id=prop_0.id,
            feature_type='Gated Community',
            feature_name='Live with complete peace of mind in a beautifully planned, safe, and exclusive neighborhood with a grand entry gateway',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('43fd9c75-fd1e-4c6e-a24d-f1a30d9bc121'),
            property_id=prop_0.id,
            feature_type='30 ft Road',
            feature_name='Enjoy wide, spacious internal roads (ranging from 25 ft, 30 ft, to 40 ft) that make driving and walking smooth and stress-free',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('b0cba1c7-e38a-463b-8cd1-301006f16640'),
            property_id=prop_0.id,
            feature_type='Ojas Club (Community & Wellness Hub)',
            feature_name='A dedicated 225 sq. m. community space planned for lifestyle-led experiences and relaxation:  Wellness Spaces: Dedicated yoga and stretching area for your daily health routine.  Social & Leisure: Resident lounge, indoor activity area, and a quiet reading corner.  Community Room: A multipurpose space perfect for family events and community workshops.  ',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('e190f63f-5848-42eb-b788-7b3fa2bd18cf'),
            property_id=prop_0.id,
            feature_type='Ayurveda-Inspired Green Spaces',
            feature_name='Over 10% of the entire township area is dedicated to beautifully landscaped parks and thematic gardens:  501 Planned Trees: Providing plenty of shade, clean air, and seasonal beauty.  Prakriti & Amrit Udyan: Large nature-led green lawns designed for family relaxation and outdoor living.  Herbal Green Pockets: Specialized sensory gardens like Tulsi Vatika and Brahmi Vatika planted with beneficial herbs',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('cfa90a90-37df-4bc5-85c6-2bd357aa3ef0'),
            property_id=prop_0.id,
            feature_type='Smart & Reliable Infrastructure',
            feature_name='Everything is neatly tucked underground to keep the township looking beautiful, clean, and organized:  Power & Light: Safe, underground electrical cabling provision alongside modern street lighting. \nWater Management: Continuous water supply network supported by a dedicated water tank and tube well. \nEco-Friendly Utilities: Built-in Sewage Treatment Plant (STP) and systematic stormwater drainage. \nEntry & Security: Grand Platinum Township Gateway and Platinum Circle for secure, monitored entry and exit.  ',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('88dca1b8-4bd5-40a3-bc8e-3bab31cb8eaa'),
            property_id=prop_1.id,
            feature_type='Sky-High Luxury & Leisure',
            feature_name="10th Floor Terrace Garden: A stunning common rooftop garden for all residents to enjoy fresh air and beautiful mountain views.\n\nKids & Fitness Zones: Dedicated children's play area, a card room, and a fully loaded modern gym to help you reach your health goals",
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('59a40c74-b443-48bc-a3e4-3ac343643686'),
            property_id=prop_1.id,
            feature_type='Five-Star Daily Comforts',
            feature_name='Grand Welcomes: Walk into a fully air-conditioned main entrance lobby featuring ultra-premium finishes.\n\nPower & Backup: Uninterrupted living with reliable 100% power backup provisions\n\nSmart Interiors: Every flat comes provisioned for advanced, energy-efficient VRF air-conditioning and features premium noise-reducing 3-track aluminum windows',
            display_order=2
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('85f0116b-cad4-4498-ba75-33d6f889671f'),
            property_id=prop_1.id,
            feature_type='Elite 5-Tier Security',
            feature_name='24/7 Monitoring: Manned surveillance at entry and exit gates alongside a dedicated Quick Response Team (QRT).\n\n100+ CCTV Cameras: Complete peace of mind with continuous digital eyes monitoring all common areas.\n\nSafe Structure: Built with an advanced fire-fighting and smoke detection setup, with structural integrity designed explicitly for Earthquake Zone 4.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('21f3d2dc-a886-42b0-aa50-c716fb719f47'),
            property_id=prop_2.id,
            feature_type='Dual-Road Connectivity',
            feature_name='Seamlessly connect to both Sahastradhara Road and Canal Road, making your daily commute smooth and traffic-free.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('a2fe8d2e-ba54-4adb-ba0c-a419e8247409'),
            property_id=prop_2.id,
            feature_type='Nagar Nigam Jurisdiction',
            feature_name='Benefit from top-notch civic maintenance, regular waste management, public street lighting, and efficient municipal water infrastructure.',
            display_order=2
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('02d1b018-d218-4141-b7c3-c197686343a7'),
            property_id=prop_2.id,
            feature_type='Ultra-Low Density Community',
            feature_name='MDDA-approved and RERA-registered, Spreading just 48 premium plots across a massive 15-bigha campus guarantees maximum privacy and an elite, quiet neighborhood feel.',
            display_order=3
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('72567372-0d77-4f0f-90a7-e77178a66e53'),
            property_id=prop_3.id,
            feature_type='Facing',
            feature_name='East-Facing, Highly preferred orientation that ensures maximum morning sunlight, excellent ventilation, and strict compliance with premium Vaastu guidelines.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('9864f78e-4d0c-4a3b-bf64-cf6b3e76efaa'),
            property_id=prop_3.id,
            feature_type='Dimensions',
            feature_name='Features a clean, standard $34 \\times 60$ configuration totaling 234 Sq. Yards, making it highly efficient for standard architectural maps and layout planning.',
            display_order=2
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('ca2a6d9c-cf42-4a87-b6bb-eb1f2f2d5eec'),
            property_id=prop_3.id,
            feature_type='Location Advantage',
            feature_name='Premium individual property offering located in the peaceful neighborhood of Orchid Park at Chalang, Nagal Road, Dehradun',
            display_order=4
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('faff3bef-c171-4cf2-83c8-2897ae33a402'),
            property_id=prop_4.id,
            feature_type='Budget-Friendly Pricing',
            feature_name='Offered at an incredibly competitive price of just ₹42,000 per Sq. Yard, making it one of the most affordable options in a high-growth investment zone.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('a9cffb7e-8eda-4327-8cb6-0cfac04a90f0'),
            property_id=prop_4.id,
            feature_type='Flexible Plot Layouts',
            feature_name='Available in different cuts ranging from 100 Sq. Yds. up to 233 Sq. Yds., giving you the freedom to choose the exact size that fits your budget and design requirements.',
            display_order=2
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('1ee79015-c6d3-4918-b611-f48af3a71502'),
            property_id=prop_4.id,
            feature_type='25ft Wide Road',
            feature_name='Enjoy convenient access and smooth neighborhood traffic flow with neatly planned 25 feet wide approach roads throughout the development.',
            display_order=3
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('f87bd2d4-8d49-4560-9296-da21a4accd94'),
            property_id=prop_5.id,
            feature_type='Dual Facing',
            feature_name='East & North facing: A rare, highly sought-after corner combination that ensures strict compliance with top-tier Vaastu guidelines, excellent ventilation, and continuous natural morning light.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('78a8b304-e4ec-4f04-b38f-31235f6db941'),
            property_id=prop_5.id,
            feature_type='Massive Villa-Sized Dimension',
            feature_name='Features a beautifully wide $80 \\times 43$ foot clear dimension totaling 382 Sq. Yards',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('cd449839-8ca5-4ee8-81f0-f5ced0140f09'),
            property_id=prop_6.id,
            feature_type='Premium Interior Features',
            feature_name='Designer Woodworks: Elegant, spacious almirahs pre-installed in all bedrooms, along with sleek customized TV panels fitted in the drawing-room and every individual bedroom.\n\nChef’s Modular Kitchen: Fully functional modular kitchen layout completely equipped with a premium branded chimney and pre-installed water geyser.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('ae43c999-62e3-4d12-91b7-b9a7dbb0a52a'),
            property_id=prop_6.id,
            feature_type='Structural & Building Amenities',
            feature_name='Covered Car Parking: Safe, designated stilt/basement covered parking zones ensuring protection for your vehicles.\n\nModern Lift Facility: High-speed passenger elevator access connecting smoothly from the parking levels right to your apartment floor entrance door.',
            display_order=2
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('a089ef91-c859-4881-a900-eb6927c14780'),
            property_id=prop_7.id,
            feature_type='Key Highlighted Features',
            feature_name='Premium Builder Floor Concept: Provides the perfect balance of independent floor ownership and low-density living, offering much more privacy compared to highly crowded high-rise societies.\n\nAuspicious East-Facing Design: Carefully aligned to match premium Vaastu parameters, inviting abundant natural morning sunlight and continuous fresh air circulation into your living spaces.\n\nHassle-Free Road Access: Set on a clean, wide 25 Ft. internal approach road that provides smooth vehicle driving, easy parking access, and an open feel.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('4725e05b-5e4d-4dac-b512-78cb29406870'),
            property_id=prop_8.id,
            feature_type='Premium In-House Luxuries',
            feature_name='Features a private swimming pool and a spectacular rooftop party space beautifully designed with a dedicated bar and water fountain area.\n\nStunning 270° Mountain Views: Highly desirable North-East facing "Gau Mukhi" plot layout that captures an uninterrupted, breathtaking view of Mussoorie and the surrounding reserve forest.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('6403a38e-12d4-4238-9ff7-f5adeef8bfc3'),
            property_id=prop_8.id,
            feature_type='Elite Architectural Layout',
            feature_name='Spans approximately 4,000 sq.ft. of covered space, offering 4 luxurious bedrooms (each with a private balcony and dressing area), 6 total bathrooms, a store room, and a dedicated servant room with an attached bath.',
            display_order=2
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('04924781-ed74-4122-a071-4d252e09716c'),
            property_id=prop_8.id,
            feature_type='Top-Tier Branded Finishes',
            feature_name='Premium interiors equipped with customized wardrobes, a modular kitchen with acrylic mica woodwork, Legrand switches, Polycab wiring, and luxury Jaquar lighting and bath fittings.',
            display_order=3
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('7f8d2acc-c0f9-4e7a-90fb-6dda86a02fd7'),
            property_id=prop_9.id,
            feature_type='Independent Luxury Living',
            feature_name='Enjoy the absolute privacy and long-term asset value of a premium 3 BHK independent house/villa layout built on a generous 155 Sq. Yards plot.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('c94bba14-25e7-4798-9651-e6118b2b7f81'),
            property_id=prop_10.id,
            feature_type='Independent Villa Layout',
            feature_name='Enjoy complete ownership, privacy, and long-term value with an independent 3 BHK layout constructed over a 100 Sq. Yards plot.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('a7eb4c23-60c9-49fe-a1d8-9be71453fe94'),
            property_id=prop_10.id,
            feature_type='Prime Sahastradhara Road Location',
            feature_name='Nestled in Rajeshwar Nagar Phase 6, placing you in a vibrant, highly sought-after neighborhood close to top schools, healthcare, and daily markets.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('33f7ac2f-3d2f-44ab-b5c5-38bc4fd70623'),
            property_id=prop_10.id,
            feature_type='Smooth 25 Ft. Road Frontage',
            feature_name='Fronted directly by a wide 25-foot internal road, ensuring effortless vehicle access, convenient parking, and an open street view, immediate possession status—buy, register, and move right in.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('f637ef07-d2ea-4ec1-93d7-7121428a553b'),
            property_id=prop_11.id,
            feature_type='Independent Villa Layout',
            feature_name='Enjoy complete privacy, freedom, and high resale value with a standalone 3 BHK house built on a 122 Sq. Yards plot.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('94b80741-0512-4226-893c-7a174880741f'),
            property_id=prop_11.id,
            feature_type='Prime Location',
            feature_name='Situated in a peaceful and secure enclave right off the booming Sahastradhara Road, offering easy access to top schools, hospitals, and shopping centers.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('3c6d0bb2-61d4-4342-ab2a-73d6a3ddfe6a'),
            property_id=prop_11.id,
            feature_type='Wide Road Access',
            feature_name='Directly fronted by a clean 25 feet internal road, ensuring smooth vehicle movement and hassle-free parking and Clear-titled property with immediate possession status.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('fea8c09a-bc12-461c-9982-e69d67056221'),
            property_id=prop_12.id,
            feature_type='Alexa Smart Home Integration',
            feature_name='Experience futuristic living with pre-installed Alexa voice-controlled smart home automation for effortless control over lighting and appliances.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('8b03b781-1e80-4785-b425-36015039102f'),
            property_id=prop_12.id,
            feature_type='Low-Density Boutique Living',
            feature_name='A private 4-story building layout with only 3 flats per floor, ensuring peaceful living, improved privacy, and minimum noise.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('e9d38811-be45-495b-a484-307587b30d45'),
            property_id=prop_12.id,
            feature_type='Exceptional Water Security',
            feature_name='Equipped with an individual water motor and 1,000L tank for every flat, a massive 55,000L underground storage reservoir, and a dedicated 7" submersible borewell.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('3b211970-f329-4315-b2a8-e050048267ea'),
            property_id=prop_12.id,
            feature_type='Rooftop Leisure Deck',
            feature_name='Enjoy common rooftop access featuring a stylish relaxing gazebo and direct Birla lift access going all the way up to the rooftop.',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('2431d44b-2bdf-43a0-bbc1-fff926268625'),
            property_id=prop_13.id,
            feature_type='AMENITY',
            feature_name='Laminated Wooden Flooring',
            display_order=1
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('78a3e2f1-4801-4628-bfc6-998a842e792d'),
            property_id=prop_13.id,
            feature_type='AMENITY',
            feature_name='Fully Equipped Gymnasium',
            display_order=2
        ))
        db.add(PropertyFeature(
            id=uuid.UUID('6fb428ea-3778-42bf-aa89-57a221a48f62'),
            property_id=prop_13.id,
            feature_type='AMENITY',
            feature_name='24/7 Gated Security',
            display_order=3
        ))

        print('Seeding FAQs...')
        db.add(FAQ(
            id=uuid.UUID('0a7b38a0-c280-4a10-a4f6-f8c7077f8f3f'),
            property_id=prop_0.id,
            question='Where is Platinum Township located?',
            answer="The project is located on Horawala Road (Chandpur–Sahaspur Road), Dehradun, near the prestigious Ecole Globale International Girls' School.",
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('d2e74b87-7220-4b62-b41d-dadc6acd9bba'),
            property_id=prop_0.id,
            question='Is this property legally approved?',
            answer='Yes, completely. The project is fully approved by the Mussoorie Dehradun Development Authority (MDDA Layout Approval No. L/0023/25-26) and is registered with UKRERA (Registration No. UKREP03260000723)',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('1542ea1c-aa25-456b-bf7d-e62c0b61946b'),
            property_id=prop_0.id,
            question='What is the unique theme of this project?',
            answer='It is Dehradun’s first Ayurveda-inspired wellness plotted development, designed around natural elements with over 501 trees and dedicated herbal gardens like Tulsi Vatika and Brahmi Vatika.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('44aaf60a-65e0-4c25-855b-94076a88bc50'),
            property_id=prop_0.id,
            question='What is the current booking price?',
            answer='We are currently offering a special Soft Launch Price of ₹40,000 per Sq. Yard for a limited time.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('59a7aae9-a160-4062-8524-d663dc71a288'),
            property_id=prop_0.id,
            question='What are the available plot sizes?',
            answer='Freehold residential plot sizes range from 180Sq. Yd. to 769 Sq. Yd..  ',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('02cddb45-4b31-4285-9c58-0172adf75123'),
            property_id=prop_0.id,
            question='What is the payment plan for buying a plot?',
            answer='We offer a highly convenient and simple 4-stage equal payment plan (25% : 25% : 25% : 25%).  ',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('47e7f848-1484-4b87-9e67-5dc1e2ebb091'),
            property_id=prop_1.id,
            question='Where is Sangam Valley located?',
            answer='The project is located in the heart of the city on the bustling Sahastradhara Road, Dehradun, offering excellent connectivity to major city hubs, schools, and hospitals.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('243cc676-fe58-43b8-98e2-b3e8228c5a56'),
            property_id=prop_1.id,
            question='Is this project legally approved?',
            answer='Yes, Sangam Valley is fully approved by MDDA and is registered under UKRERA (Registration No. UKREP05240000558), ensuring your investment is secure and verified.',
            display_order=2
        ))
        db.add(FAQ(
            id=uuid.UUID('98b3062d-aa4b-40f4-ae13-2b962446dd43'),
            property_id=prop_1.id,
            question='What is the size of the project?',
            answer='The project is spread across a premium 1.57-acre campus, designed to provide an open, airy, and luxurious urban sanctuary.  ',
            display_order=3
        ))
        db.add(FAQ(
            id=uuid.UUID('cef7e7d2-864e-40c4-8915-fd81e7a2c6d2'),
            property_id=prop_1.id,
            question='How secure is the society?',
            answer='Safety is a priority with our advanced 5-tier security system, which includes 24x7 surveillance, over 100 CCTV cameras, video door phones in every apartment',
            display_order=4
        ))
        db.add(FAQ(
            id=uuid.UUID('a052ae46-239c-4316-a3b9-f38fcee5ef4b'),
            property_id=prop_1.id,
            question='What is the payment plan for booking an apartment?',
            answer='Please fill out our inquiry form or connect with our sales expert to receive the detailed, step-by-step payment plan tailored to the construction stages of the project.  ',
            display_order=5
        ))
        db.add(FAQ(
            id=uuid.UUID('d856d776-d592-4f94-8ad6-2fd8e2e08fc2'),
            property_id=prop_2.id,
            question='Where is Vivanta Greens located and how is the connectivity?',
            answer='The project is located inside Mandakini Vihar, Dehradun, and offers unique dual connectivity, allowing you to access the property easily from both Sahastradhara Road and Canal Road.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('a8ec2774-4d1c-43f0-ae9d-6618412ba211'),
            property_id=prop_2.id,
            question='Is the project legally verified?',
            answer='Yes, the project is completely safe for investment as it is fully MDDA-approved and RERA-registered. Additionally, it falls under the official jurisdiction of the Nagar Nigam, ensuring standard municipal civic facilities.',
            display_order=2
        ))
        db.add(FAQ(
            id=uuid.UUID('0043f05e-a231-41bf-b228-a39a9d50e94e'),
            property_id=prop_2.id,
            question='What are the plot sizes and options available?',
            answer='The plots range in size from 180 Sq. Yd. to 400 Sq. Yd. The project features an "All Facing" layout, giving you the freedom to choose your preferred Vaastu-compliant direction across a limited inventory of just 48 plots.',
            display_order=3
        ))
        db.add(FAQ(
            id=uuid.UUID('b7550054-f216-469b-8b3e-64e7684ed7fe'),
            property_id=prop_2.id,
            question='What is the price, and can I start building immediately?',
            answer='The asking price is ₹85,000 per Sq. Yd. (slightly negotiable). The development offers immediate possession, meaning you can register your land and start constructing your dream villa right away.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('026f0411-edc9-4503-8eb6-28d2b9309317'),
            property_id=prop_3.id,
            question='Where exactly is this plot located?',
            answer='The property is located in the peaceful residential area of Orchid Park, Chalang, Nagal Road, Dehradun.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('a56867fe-f993-49ee-bb60-ac59aad94fee'),
            property_id=prop_3.id,
            question='What are the exact dimensions and total size of the plot?',
            answer='The plot has a clean, standard dimension of $34 \\times 60$ feet, making a total area of 234 Sq. Yards.',
            display_order=2
        ))
        db.add(FAQ(
            id=uuid.UUID('4b2b8789-d5cd-44c6-8f73-ccc9b4353220'),
            property_id=prop_3.id,
            question='What is the road width in front of the property?',
            answer='The plot sits directly on a wide 30 Ft. road, ensuring easy vehicle access, hassle-free turning space, and highly desirable East-facing plot.',
            display_order=4
        ))
        db.add(FAQ(
            id=uuid.UUID('6ebd3c6d-de38-4997-aa47-30da136b71da'),
            property_id=prop_3.id,
            question='What is the asking price, and can I start construction immediately?',
            answer='The price is ₹75,000 per Sq. Yard. The property comes with immediate possession, meaning you can register the land and start building your custom villa right away.',
            display_order=5
        ))
        db.add(FAQ(
            id=uuid.UUID('f57fb8d7-d535-40f1-8bb9-f8ba7c0927ab'),
            property_id=prop_4.id,
            question='Where exactly are these residential plots located?',
            answer='The property is located in Dhanyari, Thano Road, Dehradun, offering premium residential land with a beautiful, scenic forest view.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('48fadf09-299a-4f5c-b3b9-3e66888154db'),
            property_id=prop_4.id,
            question='What are the nearest major landmarks and distances?',
            answer='The plots are strategically situated near the Raipur International Stadium, just 6 KM from Raipur Chowk and 20 KM from the Jolly Grant Airport, making the location highly accessible.',
            display_order=2
        ))
        db.add(FAQ(
            id=uuid.UUID('94ab738e-71f0-4ae6-8bfd-46c92cf161db'),
            property_id=prop_4.id,
            question='What is the current price per square yard?',
            answer='The plots are currently available at a competitive rate of ₹42,000 per Sq. Yard.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('052125ad-1e4b-4f1d-adb8-ab0363934671'),
            property_id=prop_5.id,
            question='Where exactly is this plot located?',
            answer='The property is located in the well-established, premium neighborhood of Rajeshwar Nagar Phase 1 Ext., right off Sahastradhara Road, Dehradun.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('7f72b0ac-2cfe-40e4-a557-7a55e67a1ca3'),
            property_id=prop_5.id,
            question='What are the plot dimensions and total area?',
            answer='The plot has highly functional dimensions of $80 \\times 43$ feet, making a generous total area of 382 Sq. Yards.',
            display_order=2
        ))
        db.add(FAQ(
            id=uuid.UUID('d464f1c9-87dd-43e0-894b-167dbfe953a7'),
            property_id=prop_5.id,
            question='What direction does the plot face and what is the road width?',
            answer='This is a premium property featuring a dual East & North facing profile, sitting directly on a wide 30 Ft. road for easy vehicle accessibility and an open layout feel.',
            display_order=3
        ))
        db.add(FAQ(
            id=uuid.UUID('551bbbee-3449-41a2-a739-015ce9e63ed6'),
            property_id=prop_5.id,
            question='What is the current price and timeline for construction?',
            answer='The current market price is ₹85,000 per Sq. Yard. The property features immediate possession, allowing you to complete your registry and start building your custom dream bungalow instantly.',
            display_order=4
        ))
        db.add(FAQ(
            id=uuid.UUID('59ec8d63-7724-46de-b919-fd028e308fa6'),
            property_id=prop_6.id,
            question='Where exactly is Shikhar Heights located?',
            answer='The project is situated in a highly scenic and peaceful residential belt on Dhoran Road, Near Ghati, River Valley, Dehradun.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('bba22b86-e659-4b11-9f5b-cc3ee7712f15'),
            property_id=prop_6.id,
            question='What is the apartment size and configuration?',
            answer='Shikhar Heights features ultra-spacious 3 BHK luxury apartments with a generous super built-up area of 1800 Sqft.',
            display_order=2
        ))
        db.add(FAQ(
            id=uuid.UUID('f9ba8fdb-9f07-4660-91ed-422a5f760e61'),
            property_id=prop_6.id,
            question='Can I move in immediately?',
            answer='Yes! The property is completely Ready to Move, meaning you can skip all construction delays, finish your registration, and move into your new home right away.',
            display_order=3
        ))
        db.add(FAQ(
            id=uuid.UUID('dfece58c-613e-40b0-ad91-b71006ee35e0'),
            property_id=prop_6.id,
            question='Is bank financing available for this property?',
            answer='Yes, a hassle-free home loan facility is fully available and pre-tied up through HDFC Bank for quick processing and approvals.',
            display_order=4
        ))
        db.add(FAQ(
            id=uuid.UUID('c72fbee5-8fa3-444f-a3c6-9fa84de9d3dc'),
            property_id=prop_6.id,
            question='What amenities does the building provide?',
            answer='The project offers highly essential daily conveniences including secure covered car parking, a modern lift/elevator facility, and continuous CCTV security surveillance in all common areas.',
            display_order=5
        ))
        db.add(FAQ(
            id=uuid.UUID('71456f0b-4690-4096-9af4-acbe448ea484'),
            property_id=prop_7.id,
            question='Where exactly is Yash Hill View located?',
            answer='The property is located in the peaceful yet highly accessible residential enclave of Chlang, just off Sahastradhara Road, Dehradun.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('a0e6721a-eacc-4af7-adc5-1912f8508307'),
            property_id=prop_7.id,
            question='What type of property is this and what is its size?',
            answer='This is a premium 2 BHK Builder Floor featuring a spacious and highly functional super built-up area of 1100 Sq. Ft.',
            display_order=2
        ))
        db.add(FAQ(
            id=uuid.UUID('16f8cad6-a002-4729-8163-ffd258ef2bff'),
            property_id=prop_7.id,
            question='What is the current asking price for the builder floor?',
            answer='This premium home is available at an exceptional value of ₹65 Lakhs.',
            display_order=3
        ))
        db.add(FAQ(
            id=uuid.UUID('3b4e269d-62ad-4b51-b7b4-0c916ce5b959'),
            property_id=prop_7.id,
            question='How soon can I move into the house?',
            answer='The property features immediate possession status, meaning the construction is entirely complete, polished, and ready for you to finish the registry and move right in!',
            display_order=4
        ))
        db.add(FAQ(
            id=uuid.UUID('ce0ae305-8021-4063-b8c9-2ff90cf7fdab'),
            property_id=prop_8.id,
            question='Where exactly is this villa located?',
            answer='The villa is situated in a posh, on main sahastradhara road. It sits in close proximity to IT Park, elite schools, markets, and a lush green reserve forest.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('106a7931-e2a7-41b8-b1fe-44e9eafce431'),
            property_id=prop_8.id,
            question='What are the plot dimensions and total covered area?',
            answer='The villa is built on an auspicious 177–178 Sq. Yd. "Gau Mukhi" plot shape and features a massive covered area of approximately 4,000 Sq. Ft.',
            display_order=2
        ))
        db.add(FAQ(
            id=uuid.UUID('a0515447-103e-4405-8b67-75cec5fcb47c'),
            property_id=prop_8.id,
            question='Is this property legally approved by local authorities?',
            answer='Yes, the house map is completely MDDA-approved. The entire property comes with fully engineered column structural layouts and professional architectural blueprints (including electrical and plumbing drawings).',
            display_order=3
        ))
        db.add(FAQ(
            id=uuid.UUID('5a2a06b6-017d-431f-8ed3-754d813bd8a2'),
            property_id=prop_8.id,
            question='What is the asking price, and can I move in immediately?',
            answer='The asking price is ₹2.50 Cr (Negotiable). The property is completely Ready to Move, allowing you to execute the registry and start living your luxury lifestyle without any delays.',
            display_order=4
        ))
        db.add(FAQ(
            id=uuid.UUID('465fe7fa-be90-48b0-8741-54c9c3f5a6d8'),
            property_id=prop_9.id,
            question='Where exactly is this independent house located?',
            answer='The property is situated in the premium and secure residential pocket of Dwarka Enclave, Sahastradhara Road, Dehradun.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('14e15bd2-655b-4101-826f-d051c109795c'),
            property_id=prop_9.id,
            question='What is the configuration and land area of the property?',
            answer='This is a spacious 3 BHK independent house/villa constructed on a well-proportioned 155 Sq. Yards plot.',
            display_order=2
        ))
        db.add(FAQ(
            id=uuid.UUID('6d9a278c-a839-4773-b72a-0b08985bc1e9'),
            property_id=prop_9.id,
            question='What is the asking price for this 3 BHK villa?',
            answer='The property is available at an exceptional value of ₹1.85 Cr.',
            display_order=3
        ))
        db.add(FAQ(
            id=uuid.UUID('26d26508-0956-4c29-9ac0-ac76aaaf8e24'),
            property_id=prop_9.id,
            question='Is there any waiting period for construction or possession?',
            answer='No, the house features immediate possession status, meaning the keys are ready, the paperwork is clear, and you can move in immediately after registry.',
            display_order=4
        ))
        db.add(FAQ(
            id=uuid.UUID('c6fa0ed8-9214-4c52-9845-f5f19a14e30f'),
            property_id=prop_10.id,
            question='Where exactly is this independent house located?',
            answer='The property is located in Rajeshwar Nagar Phase 6, Sahastradhara Road, Dehradun.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('45c4c853-17a6-46b2-a54a-1f48ac784f7d'),
            property_id=prop_10.id,
            question='What is the plot area and configuration of the house?',
            answer='This is a 3 BHK independent house/villa built on a 100 Sq. Yards plot.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('34b7e908-b534-41cc-84c6-4568d6e61af5'),
            property_id=prop_10.id,
            question='Which direction does the house face and what is the road width?',
            answer='The house is South-facing and sits directly on a wide 25 Ft. internal road.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('153d9054-620a-43af-af95-a85904e048ec'),
            property_id=prop_10.id,
            question='What is the asking price for this property?',
            answer='The asking price for this ready-to-move 3 BHK villa is ₹1.10 Cr.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('538c3336-8535-44d3-8547-eb1590500a4e'),
            property_id=prop_11.id,
            question='Where exactly is this independent house located?',
            answer='The villa is located in the peaceful and well-connected neighborhood of Drone Vatika, Sahastradhara Road, Dehradun.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('e6690519-a1ca-45f8-ad21-40aabbdfae6a'),
            property_id=prop_11.id,
            question='What is the plot size and property configuration?',
            answer='This is a 3 BHK independent house/villa constructed on a 122 Sq. Yards plot.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('2a673109-47fe-4db0-b514-ae4ac9f9d3cb'),
            property_id=prop_11.id,
            question='Which direction does the house face, and how wide is the road?',
            answer='The house has a South-facing orientation and faces a wide 25 Ft. internal road.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('a89e0488-8893-437e-bc08-68eae8b59e05'),
            property_id=prop_11.id,
            question='What is the asking price for this property?',
            answer='The property is available at an asking price of ₹1.65 Cr.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('96efa7ab-cfad-4943-9404-cd386734498e'),
            property_id=prop_11.id,
            question='Is the villa ready to move in?',
            answer='Yes, the house features immediate possession status, so you can execute the registry and move in right away.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('48075432-ac91-4a51-9805-418abf80b767'),
            property_id=prop_12.id,
            question='Where is Clarks Residency located and how far is it from the main road?',
            answer='The project is located in Gujrada Mansing, Sahastradhara Road, Dehradun, just 400 meters off the main Sahastradhara.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('ef23a80a-a8c3-423f-bc9c-b2ef309887c8'),
            property_id=prop_12.id,
            question='What is the configuration and area of the flats?',
            answer='The project offers 3 BHK apartments with a total space of 1,150 Sq. Ft. built-up area + 325 Sq. Ft. balcony/extra utility area.',
            display_order=1
        ))
        db.add(FAQ(
            id=uuid.UUID('b3d45dfd-6159-437b-84a4-46927bca92e5'),
            property_id=prop_12.id,
            question='What is the asking price and parking setup?',
            answer='The asking price is ₹78 Lakhs for 3BHK and ₹65 lakhs for 2BHK. Each flat includes dedicated parking space for 1 car and 2 wheelers, along with automatic power backup for common areas and a guard room for 24/7 security.',
            display_order=1
        ))

        db.commit()
        print("Database successfully seeded with properties, variants, media, features, and FAQs!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
