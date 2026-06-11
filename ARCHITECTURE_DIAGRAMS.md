# Vineyard Website - Visual Architecture Diagrams

## 1. User Journey Flow

```
START: User visits vineyard-haven.com
│
├─ Landing Page (/)
│  ├─ Hero Section → Catches attention with property image
│  ├─ Featured Projects → Browse 3 showcase projects
│  ├─ Company Stats → Build trust (10+ years, 500+ families)
│  ├─ Feature Benefits → Why choose us (6 reasons)
│  ├─ Testimonials → Customer reviews
│  └─ CTA Buttons → "Browse All Properties" / "Contact Us"
│
├─ Browse Properties (/properties) [User clicks "Browse All"]
│  ├─ Search Bar → Find by project name
│  ├─ Filter Section
│  │  ├─ Type: Villa, Apartment, Plot
│  │  ├─ Status: Ongoing, Ready, Under Construction
│  │  └─ Price Range: Slider
│  ├─ Grid Display → All 4+ properties shown
│  ├─ Click Property Card
│  │  └─ Navigate to Property Detail (/projects/vineyard-signature-villas)
│  │
│  └─ Property Detail Page
│     ├─ Full Image Gallery
│     ├─ Complete Specifications
│     ├─ Amenities List
│     ├─ Nearby Location
│     └─ Contact Form → Lead Capture
│
├─ About Us (/about) [Optional - Learn about company]
│  ├─ Company Story
│  ├─ Founder Profile
│  ├─ Team Overview
│  ├─ Why Us (6 reasons)
│  ├─ Service Timeline
│  └─ FAQs
│
├─ Contact Us (/contact) [Lead capture]
│  ├─ Contact Form
│  │  ├─ Name (required)
│  │  ├─ Email (required, validated)
│  │  ├─ Phone (required, 10 digits)
│  │  ├─ Property Interest (dropdown)
│  │  ├─ Budget (optional)
│  │  └─ Message
│  ├─ Validation → Zod schema checks all fields
│  └─ Submit → Sends to backend API
│
└─ END: Lead captured / Property inquiry sent
```

---

## 2. Component Hierarchy & Data Flow

```
┌─ ROOT LAYOUT (__root.tsx)
│  [Header] [Navigation] [Mobile Menu]
│  [Page Content - Outlet]
│  [Footer]
│
├─ PAGE ROUTES (File-based)
│  │
│  ├─ HOME (index.tsx)
│  │  ├─ HeroSection
│  │  │  ├─ BannerImage
│  │  │  ├─ HeadingText
│  │  │  └─ CTAButton → Links to /properties
│  │  │
│  │  ├─ FeaturedProjects
│  │  │  ├─ ProjectCard
│  │  │  │  ├─ Image
│  │  │  │  ├─ Badge (NEW/PREMIUM)
│  │  │  │  ├─ Name
│  │  │  │  ├─ Location
│  │  │  │  ├─ Price
│  │  │  │  └─ Button → Click to /properties/$slug
│  │  │  ├─ ProjectCard
│  │  │  └─ ProjectCard
│  │  │
│  │  ├─ StatsSection
│  │  │  ├─ Stat (10+ Years)
│  │  │  ├─ Stat (500+ Families)
│  │  │  ├─ Stat (₹750 Cr+ Sold)
│  │  │  └─ Stat (20+ Projects)
│  │  │
│  │  ├─ FeaturesSection
│  │  │  ├─ FeatureCard (Market Expertise)
│  │  │  ├─ FeatureCard (Premium Projects)
│  │  │  ├─ FeatureCard (Transparent)
│  │  │  ├─ FeatureCard (Expert Team)
│  │  │  ├─ FeatureCard (24/7 Support)
│  │  │  └─ FeatureCard (Post-Sale Service)
│  │  │
│  │  └─ CTASection
│  │     └─ Button → Contact form CTA
│  │
│  ├─ PROPERTIES LISTING (properties.tsx)
│  │  ├─ SearchBar (useState → filter by name)
│  │  │
│  │  ├─ FilterPanel
│  │  │  ├─ TypeFilter (Villa/Apt/Plot)
│  │  │  ├─ StatusFilter (Ongoing/Ready)
│  │  │  └─ PriceSlider (0-200 lakhs)
│  │  │
│  │  ├─ PropertyGrid (useMemo → optimize rendering)
│  │  │  ├─ PropertyCard
│  │  │  │  ├─ Image
│  │  │  │  ├─ Name
│  │  │  │  ├─ Location with Icon
│  │  │  │  ├─ Price
│  │  │  │  ├─ Specs (BHK, Area, Type)
│  │  │  │  ├─ Tags
│  │  │  │  └─ Button → Navigate to /projects/$slug
│  │  │  ├─ PropertyCard
│  │  │  ├─ PropertyCard
│  │  │  └─ PropertyCard
│  │  │
│  │  └─ Pagination (optional - if many properties)
│  │
│  ├─ PROPERTY DETAIL (projects.$slug.tsx)
│  │  ├─ ImageGallery
│  │  │  └─ Multiple property images
│  │  │
│  │  ├─ ProjectInfo
│  │  │  ├─ Name
│  │  │  ├─ Location
│  │  │  ├─ Price Range
│  │  │  ├─ Specifications (BHK, Area, Type)
│  │  │  └─ Project Status Badge
│  │  │
│  │  ├─ Amenities Section
│  │  │  └─ List of 5-8 amenities with icons
│  │  │
│  │  ├─ Description
│  │  │
│  │  ├─ Location Map
│  │  │  └─ Map with nearby landmarks
│  │  │
│  │  ├─ ContactForm (React Hook Form)
│  │  │  ├─ Name (required)
│  │  │  ├─ Email (required)
│  │  │  ├─ Phone (required)
│  │  │  └─ SubmitButton
│  │  │
│  │  └─ RelatedProjects
│  │     └─ Show 3 similar properties
│  │
│  ├─ ABOUT (about.tsx)
│  │  ├─ HeroSection
│  │  ├─ CompanyStory
│  │  ├─ FounderProfile
│  │  ├─ TeamGrid (if team photos available)
│  │  ├─ WhyUsSection (6 reasons)
│  │  ├─ TimelineSection (service process)
│  │  ├─ FAQAccordion
│  │  │  ├─ Q: How long do you take? → A: 30-45 days
│  │  │  ├─ Q: Do you handle documentation? → A: Yes
│  │  │  ├─ Q: Post-purchase support? → A: Yes
│  │  │  └─ [+3-5 more FAQs]
│  │  │
│  │  └─ CTASection → "Ready to start?" → Contact page
│  │
│  └─ CONTACT (contact.tsx)
│     ├─ HeroSection
│     ├─ ContactForm (React Hook Form + Zod)
│     │  ├─ Name field (text input)
│     │  ├─ Email field (email validation)
│     │  ├─ Phone field (number validation)
│     │  ├─ Message field (textarea)
│     │  ├─ FormErrors (if validation fails)
│     │  └─ SubmitButton
│     │
│     └─ CompanyInfo
│        ├─ Phone number with icon + clickable link
│        ├─ Email with icon + clickable link
│        ├─ Office address with icon + map link
│        └─ Business hours
│
└─ SHARED COMPONENTS
   ├─ MobileNav (Hamburger menu for mobile)
   ├─ Navigation (Desktop nav)
   ├─ Header (Logo + Nav)
   ├─ Footer (Copyright + Quick Links)
   ├─ ErrorBoundary (404, 500 pages)
   └─ [50+ UI Components from shadcn/ui]
```

---

## 3. Data Structure Example

### Property Object Schema
```typescript
interface Property {
  id: string;                    // Unique identifier
  slug: string;                  // URL-friendly name
  name: string;                  // Display name
  location: string;              // City/area
  type: "Villa" | "Apartment" | "Plot" | "Commercial";
  category: "Residential" | "Commercial" | "Luxury" | "Investment";
  status: "Ongoing" | "Ready to Move" | "Under Construction" | "Upcoming";
  priceMin: number;              // Minimum price (in lakhs)
  priceLabel: string;            // "₹1.45 Cr*"
  area: string;                  // "2200 - 3000 Sq.Ft."
  bhk: string;                   // "3, 4 BHK"
  amenities: string[];           // ["Clubhouse", "Pool", "Gym"]
  desc: string;                  // Description
  tags: string[];                // ["Featured", "Hot Property"]
  img: string;                   // Image path
  featured?: boolean;            // Show on home page
}

// Example property object:
const property = {
  id: "p1",
  slug: "vineyard-signature-villas",
  name: "Vineyard Signature Villas",
  location: "Mussoorie Road, Dehradun",
  type: "Villa",
  category: "Luxury",
  status: "Ongoing",
  priceMin: 145,
  priceLabel: "₹1.45 Cr*",
  area: "2200 – 3000 Sq.Ft.",
  bhk: "3, 4 BHK",
  amenities: ["Clubhouse", "Pool", "Landscaped Gardens"],
  desc: "Hill-view luxury villas with private decks and curated interiors.",
  tags: ["Featured", "Hot Property"],
  img: projectVilla,
  featured: true,
};
```

---

## 4. State Management Flow

```
┌─ REACT QUERY (Server State)
│  └─ useQuery("properties") → Fetches from /api/properties
│     ├─ Caches data (default 5 min)
│     ├─ Auto-refetch on window focus
│     └─ Handles loading, error, success states
│
├─ REACT HOOK FORM (Form State)
│  └─ useForm(schema: contactSchema)
│     ├─ watch() → Get current form values
│     ├─ register() → Connect form fields
│     ├─ handleSubmit() → Handle form submission
│     └─ formState.errors → Show validation errors
│
├─ USESTATE (Local Component State)
│  ├─ filters: { type, status, priceRange } → On /properties
│  ├─ open: boolean → Mobile menu open/closed
│  ├─ searchTerm: string → Search input
│  └─ selectedImage: number → Gallery active image
│
└─ CONTEXT (Optional - Not Currently Used)
   └─ Could store: user info, theme, preferences
```

---

## 5. Request-Response Cycle (Data Flow)

### Example: User Searches for Properties

```
USER BROWSER                           SERVER
     │                                    │
     │  1. Types in search box            │
     │     (e.g., "villa")                │
     │                                    │
     ├─ Updates searchTerm state          │
     │  (triggers re-render)              │
     │                                    │
     ├─ Grid filters locally using        │
     │  useMemo()                         │
     │                                    │
     ├─ Displays filtered results         │
     │                                    │
     │  2. User clicks property card      │
     ├──────────────────────────────────► │
     │  Request: GET /properties/         │
     │  vineyard-signature-villas         │
     │                                    │
     │                                    ├─ Looks up property data
     │                                    │
     │◄──────────────────────────────────┤
     │  Response: Property JSON           │
     │  { name, price, amenities, etc }   │
     │                                    │
     ├─ React renders detail page         │
     │                                    │
     │  3. User fills contact form        │
     ├─ Form validation with Zod          │
     │  (happens locally - NO server call)│
     │                                    │
     │  4. User clicks "Submit"           │
     ├──────────────────────────────────► │
     │  Request: POST /api/contact        │
     │  Body: { name, email, phone,       │
     │          message }                 │
     │                                    │
     │                                    ├─ Validates server-side
     │                                    │
     │                                    ├─ Saves lead to database
     │                                    │
     │                                    ├─ Sends confirmation email
     │                                    │
     │◄──────────────────────────────────┤
     │  Response: { success: true }       │
     │                                    │
     ├─ Shows toast notification:         │
     │  "Form submitted!"                 │
     │                                    │
     └─ END                               └─ END
```

---

## 6. Routing Architecture

```
File Structure              →    Generated Routes
────────────────────────────────────────────────

src/routes/
├── __root.tsx             →    Root layout (wraps all routes)
├── index.tsx              →    GET / (home page)
├── about.tsx              →    GET /about
├── contact.tsx            →    GET /contact
├── properties.tsx         →    GET /properties
└── projects.$slug.tsx     →    GET /projects/:slug (dynamic)


Route Tree Generated:
────────────────────

/__root
  /
  /about
  /contact
  /properties
  /projects/$slug
    ├─ /projects/vineyard-signature-villas
    ├─ /projects/vineyard-high-grove
    ├─ /projects/vineyard-green-county
    └─ /projects/vineyard-crown-residences


Navigation Example:
──────────────────

// In any component:
import { Link, useNavigate } from "@tanstack/react-router";

// Declarative navigation:
<Link to="/properties">
  Browse All Properties
</Link>

// Programmatic navigation:
const navigate = useNavigate();
navigate({ to: `/projects/${propertySlug}` });
```

---

## 7. Component Reusability Patterns

### Pattern: Reusable Card Component

```tsx
// Base card component (used 50+ times across site)
<Card>
  <CardHeader>
    <CardTitle>Project Name</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>

// Used in:
├─ Featured projects on home page
├─ Properties grid on /properties
├─ Related projects on detail page
├─ Team cards on /about
└─ Stats cards on home page
```

### Pattern: Feature List Component

```tsx
const features = [
  {
    icon: TrendingUp,           // Lucide icon component
    title: "Market Expertise",  // Heading
    desc: "In-depth knowledge..." // Description
  },
  // +5 more features
];

// Rendered as:
features.map(feature => (
  <div key={feature.title}>
    <feature.icon />
    <h3>{feature.title}</h3>
    <p>{feature.desc}</p>
  </div>
))
```

---

## 8. Development Environment Setup

```
┌─────────────────────────────────────────────────────────┐
│  package.json                                           │
│  (Defines 60+ dependencies)                             │
└─────────────────────────────────────────────────────────┘
                           ↓
            ┌──────────────────────────────┐
            │  npm install                 │
            │  (Installs all packages)     │
            └──────────────────────────────┘
                           ↓
        ┌──────────────────────────────────┐
        │  vite.config.ts                  │
        │  (Vite build configuration)      │
        └──────────────────────────────────┘
                           ↓
    ┌──────────────────────────────────────┐
    │  npm run dev                         │
    │  (Starts Vite dev server)            │
    └──────────────────────────────────────┘
             ↓                         ↓
    ┌──────────────┐          ┌──────────────┐
    │ React App    │          │  Hot Reload  │
    │ Port 3000    │◄────────►│  (auto save) │
    └──────────────┘          └──────────────┘
                           ↓
                ┌──────────────────────┐
                │  Browser             │
                │  http://localhost:3000
                └──────────────────────┘
```

---

## 9. Build & Deployment Pipeline

```
┌─ Development
│  ├─ npm run dev
│  │  ├─ Start Vite dev server
│  │  ├─ Enable hot module replacement (HMR)
│  │  └─ Show TypeScript errors in browser overlay
│  │
│  └─ npm run lint
│     └─ Check code quality with ESLint
│
├─ Quality Assurance
│  ├─ npm run format
│  │  └─ Auto-format code with Prettier
│  │
│  ├─ npm run build:dev
│  │  └─ Build with source maps (debugging)
│  │
│  └─ npm run preview
│     └─ Preview production build locally
│
└─ Production
   ├─ npm run build
   │  ├─ TypeScript type checking
   │  ├─ Minification & optimization
   │  ├─ Bundle splitting (code-splitting)
   │  ├─ Tree-shaking (remove unused code)
   │  └─ Output → dist/ folder
   │
   ├─ Deploy dist/ to:
   │  ├─ Cloudflare Pages (Nitro SSR)
   │  ├─ Vercel (Next.js compatible)
   │  ├─ Netlify (static hosting)
   │  └─ Your server (Node.js with Nitro)
   │
   └─ Monitor:
      ├─ Error tracking (Lovable error reporting)
      ├─ Performance metrics
      └─ User analytics
```

---

## 10. Technology Stack Pyramid

```
                            ┌─────────────┐
                            │   Your App  │
                            │  (React TSX)│
                            └─────────────┘
                                  ↑
                    ┌─────────────────────────────┐
                    │      UI Layer               │
                    │  Shadcn/UI (50+ components)│
                    │  Tailwind CSS (styling)     │
                    │  Lucide Icons (graphics)    │
                    └─────────────────────────────┘
                                  ↑
                    ┌─────────────────────────────┐
                    │   Framework Layer           │
                    │  React 19 (core)            │
                    │  TanStack Router (routing)  │
                    │  TanStack Start (SSR)       │
                    │  React Query (data)         │
                    └─────────────────────────────┘
                                  ↑
                    ┌─────────────────────────────┐
                    │   Build & Dev Tools         │
                    │  Vite (bundler)             │
                    │  TypeScript (type-safety)   │
                    │  ESLint + Prettier (quality)│
                    │  Nitro (server engine)      │
                    └─────────────────────────────┘
                                  ↑
                    ┌─────────────────────────────┐
                    │   Browser / Runtime         │
                    │  JavaScript Engine          │
                    │  DOM API                    │
                    │  Network Stack              │
                    └─────────────────────────────┘
```

---

**Visual Architecture Guide**  
**Version:** 1.0  
**Last Updated:** June 9, 2026
