import heroProperty from "@/assets/hero-property.jpg";
import interiorLiving from "@/assets/interior-living.jpg";
import contactHero from "@/assets/contact-hero.jpg";
import founder from "@/assets/founder.jpeg";
import expertConsultation from "@/assets/expert-consultation.jpg";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading-2"; text: string }
  | { type: "heading-3"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "list"; items: string[]; ordered?: boolean };

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  shortDescription: string;
  content: ContentBlock[];
  featuredImage: string;
  category: string;
  publishDate: string;
  readingTime: string;
  author: Author;
  tags: string[];
  faq: FAQItem[];
  isFeatured?: boolean;
}

export const CATEGORIES = [
  "All",
  "Market Insights",
  "Investment",
  "Lifestyle",
  "Buying Guide",
];

// Rich mock data for premium real estate blogs in Dehradun
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-dehradun-hotspot-luxury-real-estate",
    title: "Why Dehradun is the Next Hotspot for Luxury Real Estate Investment",
    shortDescription: "Explore the key drivers behind Dehradun's luxury housing boom, from high appreciation rates to the desire for serene foothill living.",
    featuredImage: heroProperty,
    category: "Market Insights",
    publishDate: "July 15, 2026",
    readingTime: "5 min read",
    isFeatured: true,
    author: {
      name: "Abhishek Kashyap",
      avatar: founder,
      role: "Managing Director, Vineyard Infra",
    },
    tags: ["Dehradun Real Estate", "Luxury Living", "Investment Hotspot", "Uttarakhand"],
    faq: [
      {
        question: "Which areas in Dehradun are best for luxury real estate?",
        answer: "Rajpur Road, Mussoorie Road, and Sahastradhara Road are currently the most sought-after corridors for luxury residences due to their premium connectivity, scenic valley views, and high appreciation rates.",
      },
      {
        question: "What is the average ROI for property in Dehradun?",
        answer: "Historically, premium residential projects in Dehradun have seen annual capital appreciation ranging from 8% to 12%, driven by infrastructure developments like the Delhi-Dehradun Expressway.",
      },
      {
        question: "Are luxury villas in Dehradun RERA approved?",
        answer: "Yes, all reputed developments, including those curated by Vineyard Infra, are strictly RERA registered to ensure transparency and buyer protection.",
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Dehradun, the capital of Uttarakhand, is undergoing a massive transformation. Once known primarily as a quiet retirement haven and educational hub, it has fast become one of North India's most coveted destinations for luxury real estate. High-net-worth individuals (HNIs), NRI investors, and professionals from metro cities are redirecting their capital toward the Doon Valley, seeking a blend of premium living and natural serenity.",
      },
      {
        type: "heading-2",
        text: "The Driving Forces Behind the Boom",
      },
      {
        type: "paragraph",
        text: "Several factors contribute to the rapid growth of luxury housing in Dehradun. The primary driver is the improved connectivity. The upcoming Delhi-Dehradun Expressway is set to slash travel time between the national capital and Dehradun to just under 2.5 hours, making weekend getaways and secondary homes highly practical.",
      },
      {
        type: "list",
        items: [
          "Delhi-Dehradun Expressway: Reducing travel time to 2.5 hours.",
          "Jolly Grant Airport Expansion: Increasing flight connectivity to major Indian metros.",
          "Smart City Initiatives: Enhanced local infrastructure, sanitation, and green spaces.",
          "Proximity to Hill Stations: Instant access to Mussoorie, Dhanaulti, and Rishikesh.",
        ],
      },
      {
        type: "heading-3",
        text: "Shift in Buyer Preferences",
      },
      {
        type: "paragraph",
        text: "Post-pandemic, the demand for spacious, well-ventilated homes with private outdoor areas has sky-rocketed. Modern buyers are no longer content with standard apartments; they seek premium gated communities, high-end villas with panoramic mountain views, and properties built with eco-friendly materials.",
      },
      {
        type: "quote",
        text: "Luxury is no longer just about high-end marble or gold fixtures. Today, luxury in Dehradun is defined by clean air, uninterrupted mountain vistas, open green spaces, and a community of like-minded individuals.",
        author: "Abhishek Kashyap, Founder of Vineyard Infra",
      },
      {
        type: "image",
        src: interiorLiving,
        alt: "Luxury Living Room with Mountain Views",
        caption: "Modern interior styling capturing natural light and scenic views of the surrounding hills.",
      },
      {
        type: "heading-2",
        text: "Appreciation and Investment Value",
      },
      {
        type: "paragraph",
        text: "From an investment perspective, Dehradun offers highly attractive returns. Property prices along Rajpur Road and Mussoorie Road have appreciated by 15-20% over the last two years alone. Unlike congested metros where real estate yields have plateaued, Dehradun still offers significant room for capital appreciation and premium rental yields.",
      },
      {
        type: "paragraph",
        text: "In conclusion, whether you are looking for a serene retirement home, a vacation villa, or a high-yielding real estate investment, Dehradun's luxury market presents a compelling opportunity that combines lifestyle benefits with robust financial returns.",
      },
    ],
  },
  {
    slug: "art-of-choosing-perfect-luxury-villa",
    title: "The Art of Choosing the Perfect Villa: 5 Things You Must Look For",
    shortDescription: "A comprehensive checklist for selecting a luxury villa, covering location dynamics, architectural layouts, security protocols, and builder credibility.",
    featuredImage: interiorLiving,
    category: "Buying Guide",
    publishDate: "July 12, 2026",
    readingTime: "4 min read",
    author: {
      name: "Vineyard Advisory Team",
      avatar: expertConsultation,
      role: "Property Advisory Specialists",
    },
    tags: ["Villa Selection", "Luxury Home Checklist", "Real Estate Advice", "Dehradun Property"],
    faq: [
      {
        question: "Should I buy a semi-furnished or fully furnished villa?",
        answer: "A semi-furnished villa allows you to customize the interiors to your personal aesthetic, while a fully furnished villa offers immediate possession. For luxury properties, semi-furnished is often preferred by HNIs.",
      },
      {
        question: "How important is property layout vs carpet area?",
        answer: "In luxury homes, layout efficiency and flow are more critical than raw square footage. Look for double-height ceilings, wide passages, and seamless transitions to outdoor decks.",
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Buying a luxury villa is more than a financial transaction; it is the acquisition of a lifestyle. However, with numerous developments claiming 'luxury' status, separating the average from the exceptional requires a discerning eye. Here are the 5 non-negotiable elements you should look for when choosing your luxury villa.",
      },
      {
        type: "heading-2",
        text: "1. Location and Micro-Neighborhood",
      },
      {
        type: "paragraph",
        text: "The address defines the exclusivity. Ensure that your villa is located in a quiet enclave away from traffic noise, yet maintains easy access to high-end restaurants, hospitals, and schools. Look for low-density micro-neighborhoods where the surrounding natural beauty is protected from future high-rise developments.",
      },
      {
        type: "heading-2",
        text: "2. Architectural Layout and Natural Light",
      },
      {
        type: "paragraph",
        text: "A true luxury villa should feature an architectural plan that maximizes natural light and cross-ventilation. Double-height living spaces, floor-to-ceiling windows, and private balconies that open to green valleys are hallmarks of premium design. The kitchen and staff quarters should be strategically placed to ensure privacy.",
      },
      {
        type: "quote",
        text: "A premium home should feel integrated with its surroundings. The transition from indoor luxury to outdoor landscape should be smooth and intuitive.",
        author: "Lead Designer, Vineyard Architect Studio",
      },
      {
        type: "heading-2",
        text: "3. Smart Integration and Premium Specifications",
      },
      {
        type: "paragraph",
        text: "Today's luxury is smart. Ensure the property comes pre-wired for home automation systems, including climate control, smart lighting, automated blinds, and multi-tier security cameras. High-end specifications such as Italian marble, branded kitchen fittings, and energy-efficient double-glazed windows are essential.",
      },
      {
        type: "heading-2",
        text: "4. Multi-Layered Security Systems",
      },
      {
        type: "paragraph",
        text: "Exclusivity demands safety. Your gated villa community must offer 24/7 manned security, smart visitor management cards, perimeter fencing with motion sensors, and automated gate access control. Your peace of mind is the ultimate luxury.",
      },
      {
        type: "heading-2",
        text: "5. Developer Pedigree and Legal Compliance",
      },
      {
        type: "paragraph",
        text: "Verify the track record of the developer. Have they delivered premium projects on time? Is the project fully RERA compliant? Do they have clear title deeds and occupancy certificate approvals? Partnering with trusted advisors like Vineyard Infra guarantees a hassle-free acquisition process.",
      },
    ],
  },
  {
    slug: "foothill-living-trends-modern-architecture",
    title: "Modern Architecture Meets Scenic Serenity: Trends in Foothill Living",
    shortDescription: "Discover how contemporary architecture is adapting to the hilly terrains of Dehradun, combining glass, steel, and stone to craft scenic masterpieces.",
    featuredImage: contactHero,
    category: "Lifestyle",
    publishDate: "July 08, 2026",
    readingTime: "6 min read",
    author: {
      name: "Abhishek Kashyap",
      avatar: founder,
      role: "Managing Director, Vineyard Infra",
    },
    tags: ["Foothill Architecture", "Eco-friendly Design", "Modern Homes", "Valley Views"],
    faq: [
      {
        question: "What are the structural considerations for building on a slope?",
        answer: "Slope constructions require specialized soil testing, seismic resistant reinforced concrete pile foundations, and retaining wall engineering to ensure absolute safety and durability.",
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "The foothill architecture of Dehradun is undergoing a fascinating evolution. Moving away from heavy concrete boxes, modern designers are adopting organic contemporary styles that respect the topography. The goal is simple: let the mountains take center stage.",
      },
      {
        type: "heading-2",
        text: "Biophilic Design Elements",
      },
      {
        type: "paragraph",
        text: "Biophilic design—the practice of connecting buildings to the natural environment—is the biggest trend in hill station living. Architects are utilizing local materials like river stones, timber, and slate, contrasting them with minimalist glass panels and structural steel.",
      },
      {
        type: "list",
        items: [
          "Floor-to-ceiling glass walls to frame the Mussoorie hills.",
          "Cantilevered wooden decks extending out over the valley slopes.",
          "Indoor courtyards and green walls that bring vegetation inside.",
          "Rainwater harvesting and solar roofing integrated seamlessly.",
        ],
      },
      {
        type: "quote",
        text: "We don't build on top of the hill; we build with the hill. The architecture should bow to the natural landscape.",
        author: "Vineyard Design Philosophy",
      },
      {
        type: "heading-2",
        text: "Cantilever Structures",
      },
      {
        type: "paragraph",
        text: "To overcome the challenges of sloping land, architects are using steel cantilevers. This allows living spaces to float in the air, offering spectacular, unobstructed 270-degree views of the valley while minimizing the structural footprint on the natural terrain below.",
      },
      {
        type: "paragraph",
        text: "By marrying modern engineering with natural materials, foothill homes are no longer just shelters; they are architectural works of art that enhance the physical and emotional well-being of their inhabitants.",
      },
    ],
  },
  {
    slug: "comprehensive-guide-rera-uttarakhand-property",
    title: "A Guide to RERA & Property Buying Process in Uttarakhand",
    shortDescription: "An essential roadmap for home buyers in Dehradun, explaining RERA guidelines, title verifications, registry procedures, and hidden costs.",
    featuredImage: expertConsultation,
    category: "Buying Guide",
    publishDate: "July 01, 2026",
    readingTime: "7 min read",
    author: {
      name: "Vineyard Advisory Team",
      avatar: expertConsultation,
      role: "Property Advisory Specialists",
    },
    tags: ["RERA Uttarakhand", "Property Registry", "Legal Guide", "Buying Process"],
    faq: [
      {
        question: "How do I check the RERA status of a project in Dehradun?",
        answer: "You can visit the official UK RERA website (rera.uk.gov.in) and enter the registration number of the project or search by promoter name.",
      },
      {
        question: "What is the stamp duty rate in Uttarakhand?",
        answer: "Stamp duty rates typically range between 3.75% to 5% of the circle rate value, depending on whether the property is registered in a female or male buyer's name.",
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Navigating the legalities of property acquisition in a different state can feel overwhelming. In Uttarakhand, RERA (Real Estate Regulatory Authority) has brought immense clarity and security to buyers. Let's break down the step-by-step process of purchasing your dream property legally and safely.",
      },
      {
        type: "heading-2",
        text: "Step 1: Check the RERA Registration",
      },
      {
        type: "paragraph",
        text: "Never make a booking in a project that is not registered under RERA Uttarakhand. RERA ensures that developers maintain a separate escrow account for construction funds, complete the project on time, and build according to the approved layout plan. You can verify this on the UK RERA portal.",
      },
      {
        type: "heading-2",
        text: "Step 2: Legal Title Diligence",
      },
      {
        type: "paragraph",
        text: "Request the chain of ownership documents (known as title deeds) going back at least 30 years. Ensure that there is no litigation pending. A 'Search Report' from a local advocate is highly recommended to confirm the property is free of bank mortgages or family disputes.",
      },
      {
        type: "heading-2",
        text: "Step 3: Circle Rates vs Market Rates",
      },
      {
        type: "paragraph",
        text: "In Dehradun, stamp duty is calculated on the 'circle rate' set by the government, or the actual agreement value, whichever is higher. Be sure to calculate stamp duty, registration charges (usually 1%), and advocate fees in your budget beforehand to avoid last-minute cash shortfalls.",
      },
      {
        type: "quote",
        text: "Due diligence is the foundation of a happy investment. Saving a few thousands on legal checks can cost lakhs later. Always buy from RERA approved developers.",
        author: "Vineyard Legal Head",
      },
      {
        type: "heading-2",
        text: "Step 4: Signing the Agreement to Sale",
      },
      {
        type: "paragraph",
        text: "Once satisfied with the title, sign a detailed Agreement to Sale (ATS). This document outlines payment schedules, penalty clauses for delays, and builder warranties. Ensure that all promises made by sales representatives are in writing within the ATS.",
      },
    ],
  },
  {
    slug: "maximizing-roi-plots-vs-built-up-villas",
    title: "Maximizing ROI: Land Plots vs. Builtup Luxury Properties",
    shortDescription: "A detailed analysis comparing the financial yields, tax implications, and hassle factors of investing in plots versus luxury villas.",
    featuredImage: heroProperty,
    category: "Investment",
    publishDate: "June 25, 2026",
    readingTime: "5 min read",
    author: {
      name: "Abhishek Kashyap",
      avatar: founder,
      role: "Managing Director, Vineyard Infra",
    },
    tags: ["Real Estate Investment", "Land Plots", "Luxury Villas", "ROI Analysis"],
    faq: [
      {
        question: "Which has higher capital appreciation: land or villas?",
        answer: "Raw land (plots) generally registers faster capital appreciation in developing corridors, whereas built villas generate immediate rental income in addition to solid capital gains.",
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "When investing in Dehradun's thriving property market, one of the most common dilemmas faced by investors is: 'Should I buy a residential plot of land, or invest in a finished luxury villa?' Both options have distinct profiles. Let's compare them across ROI, maintenance, and liquidity.",
      },
      {
        type: "heading-2",
        text: "Capital Appreciation Profile",
      },
      {
        type: "paragraph",
        text: "Historically, land plots have shown a higher rate of pure capital appreciation, especially in emerging hotspots like Sahastradhara Road and Harrawala. Land is a finite resource; as the city expands, raw land becomes scarcer, driving up demand exponentially.",
      },
      {
        type: "heading-2",
        text: "Rental Yield and Cash Flow",
      },
      {
        type: "paragraph",
        text: "Built-up luxury villas have the clear advantage of generating regular monthly cash flow. A well-designed villa in a gated community along Mussoorie Road can yield attractive rental income from tourists, weekenders, or corporate leases, making it perfect for investors seeking passive income.",
      },
      {
        type: "quote",
        text: "If your horizon is 10 years and you want maximum capital gains, buy a plot. If you want a combination of capital gains, lifestyle usage, and monthly income, a luxury villa is unmatched.",
        author: "Investment Desk, Vineyard Infra",
      },
      {
        type: "heading-2",
        text: "Effort and Hassle Factor",
      },
      {
        type: "paragraph",
        text: "Plots require vigilant monitoring to prevent encroachments, whereas luxury villas in gated societies are secure and managed by professional facility teams. Furthermore, constructing a home on a plot involves managing architects, contractors, and municipal approvals, which can be challenging for out-of-station investors.",
      },
    ],
  },
  {
    slug: "why-sahastradhara-road-dehradun-investment-hub",
    title: "Why Sahastradhara Road is Dehradun's Next Big Real Estate Investment Hub",
    shortDescription: "Discover why Sahastradhara Road has become the top choice for property investment in Dehradun, offering high appreciation, excellent connectivity, and proximity to IT Park.",
    featuredImage: interiorLiving,
    category: "Investment",
    publishDate: "July 20, 2026",
    readingTime: "6 min read",
    author: {
      name: "Abhishek Kashyap",
      avatar: founder,
      role: "Managing Director, Vineyard Infra",
    },
    tags: ["Sahastradhara Road", "Dehradun Investment", "Plots in Dehradun", "Real Estate Dehradun"],
    faq: [
      {
        question: "Why is Sahastradhara Road highly preferred by Delhi/NCR buyers?",
        answer: "It offers a quiet foothill lifestyle with Mussoorie views while being connected directly to IT Park, Raipur, and Mussoorie bypasses. Prices here are appreciating rapidly due to limited land supply."
      },
      {
        question: "What type of properties are available on Sahastradhara Road?",
        answer: "You can find premium gated residential plots, luxury 2/3 BHK flats, and independent builder floors. Freehold land plots are the most in-demand asset class."
      }
    ],
    content: [
      {
        type: "paragraph",
        text: "For real estate investors, particularly from the Delhi/NCR region, finding a market that combines safety, capital appreciation, and quality of life is key. In Dehradun, Sahastradhara Road has emerged as the premier corridor matching these criteria. Once a quiet road leading to natural sulphur springs, it is now the fastest-growing micro-market in the Doon Valley."
      },
      {
        type: "heading-2",
        text: "The Proximity to IT Park: A Major Employment Driver"
      },
      {
        type: "paragraph",
        text: "One of the chief catalysts for growth along Sahastradhara Road is the presence of the IT Park. As the technology and employment hub of Dehradun, IT Park attracts software companies and professionals from across India. This constant influx of high-salaried professionals has created a massive rental and purchase demand for residential properties nearby."
      },
      {
        type: "heading-2",
        text: "Outstanding Infrastructure & Connectivity"
      },
      {
        type: "paragraph",
        text: "Unlike older parts of Dehradun that face heavy traffic, Sahastradhara Road is wide, well-planned, and boasts modern amenities like underground cabling and regular municipal water supply. Key advantages include:"
      },
      {
        type: "list",
        items: [
          "IT Park Dehradun: Just 5 minutes away, driving steady rental demand.",
          "Raipur Stadium bypass: Easy travel connection to Jolly Grant Airport in under 30 minutes.",
          "Elite Schools: Proximity to top-rated institutions like Kasiga and Ecole Globale.",
          "Scenic Views: Pristine Mussoorie foothill orientation with clean mountain air."
        ]
      },
      {
        type: "paragraph",
        text: "With property prices growing at 8% to 12% annually, investing in gated residential plots or luxury apartments on Sahastradhara Road represents a highly secure and high-yielding opportunity."
      }
    ]
  },
  {
    slug: "delhi-dehradun-expressway-impact-property-rates",
    title: "Delhi to Dehradun in 2.5 Hours: How the New Expressway Impacts Property Rates",
    shortDescription: "Analyze the massive impact of the upcoming Delhi-Dehradun Expressway on local real estate prices, capital gains, and the rising demand from Delhi/NCR buyers.",
    featuredImage: contactHero,
    category: "Market Insights",
    publishDate: "July 22, 2026",
    readingTime: "5 min read",
    author: {
      name: "Abhishek Kashyap",
      avatar: founder,
      role: "Managing Director, Vineyard Infra",
    },
    tags: ["Delhi Dehradun Expressway", "Dehradun Property Rates", "NCR Buyers", "Uttarakhand Real Estate"],
    faq: [
      {
        question: "When will the Delhi-Dehradun Expressway be fully operational?",
        answer: "The expressway is nearing completion and sections are already opening. Once fully operational, it will slash transit times from Delhi/NCR to just 2.5 hours."
      },
      {
        question: "Which areas in Dehradun will benefit most from the Expressway?",
        answer: "Sahastradhara Road, Raipur, and Haridwar bypass corridors will see the highest appreciation due to direct arterial connections and low congestion compared to central Dehradun."
      }
    ],
    content: [
      {
        type: "paragraph",
        text: "Infrastructure developments have a direct, measurable correlation with property prices. The upcoming Delhi-Dehradun Expressway is currently the single largest driver of real estate value in the Doon Valley, promising to permanently alter the region's economic and residential landscape."
      },
      {
        type: "heading-2",
        text: "Slashing Travel Times for Delhi/NCR Investors"
      },
      {
        type: "paragraph",
        text: "Currently, driving from Delhi/NCR to Dehradun takes anywhere from 5 to 6 hours. The new expressway will reduce this transit time to just 2.5 hours. For second-home buyers and weekenders, this makes Dehradun as accessible as popular NCR suburbs, but with the added benefits of clean mountain air, scenic views, and cooler climates."
      },
      {
        type: "heading-2",
        text: "The Expected Spike in Land and Property Rates"
      },
      {
        type: "paragraph",
        text: "Market analysts expect real estate prices near key entry and exit junctions to appreciate significantly over the next 12 to 18 months. Gated townships, land plots, and luxury builder floors are already experiencing a surge in enquiries from investors looking to secure properties before the expressway's official opening."
      },
      {
        type: "quote",
        text: "We are seeing unprecedented interest from Delhi, Noida, and Gurugram buyers who view Dehradun not just as a retirement destination, but as a premium, highly accessible second home option.",
        author: "Abhishek Kashyap, Managing Director"
      },
      {
        type: "paragraph",
        text: "For smart investors, the window to buy at current price points is closing. Securely acquiring RERA-approved land plots or villas now is the best way to maximize returns before the expressway traffic begins."
      }
    ]
  }
];

// Service Layer API
export async function getBlogPosts(): Promise<BlogPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(BLOG_POSTS), 100);
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      resolve(post);
    }, 100);
  });
}

export async function getFeaturedBlogPost(): Promise<BlogPost | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = BLOG_POSTS.find((p) => p.isFeatured) || BLOG_POSTS[0];
      resolve(post);
    }, 100);
  });
}

export async function getRelatedBlogPosts(
  slug: string,
  category: string,
  limit = 3
): Promise<BlogPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const related = BLOG_POSTS.filter(
        (p) => p.slug !== slug && (p.category === category || category === "All")
      );
      if (related.length < limit) {
        const fallbacks = BLOG_POSTS.filter(
          (p) => p.slug !== slug && !related.find((r) => r.slug === p.slug)
        );
        related.push(...fallbacks);
      }
      resolve(related.slice(0, limit));
    }, 100);
  });
}

export async function getCategories(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(CATEGORIES), 100);
  });
}
