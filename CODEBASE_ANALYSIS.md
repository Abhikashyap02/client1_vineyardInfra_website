# Vineyard Haven Growth — Codebase Architecture & Build Plan

## 🎯 Project Overview

**Project Name:** Vineyard Infra - Premium Real Estate Website  
**Type:** Full-Stack Web Application (Frontend-focused)  
**Technology Stack:** React 19 + TanStack Start + TypeScript + Tailwind CSS + Shadcn/UI  
**Purpose:** Lead generation and property discovery platform for luxury real estate in Dehradun

---

## 📊 Architecture Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           USER BROWSER (Frontend)                              │
│  ┌────────────────────────────────────────────────────────────────────────────┐ │
│  │  React 19 Application (Client-Side)                                        │ │
│  │  ├─ TanStack Router (URL Navigation)                                      │ │
│  │  │  ├─ File-based Routes (/src/routes/)                                  │ │
│  │  │  │  ├─ / (Home Page)                                                 │ │
│  │  │  │  ├─ /properties (Property Listings)                                │ │
│  │  │  │  ├─ /about (About Us)                                             │ │
│  │  │  │  └─ /contact (Contact Form)                                       │ │
│  │  │  └─ __root.tsx (Main Layout Wrapper)                                  │ │
│  │  │                                                                         │ │
│  │  ├─ State Management                                                      │ │
│  │  │  ├─ React Query (@tanstack/react-query)                              │ │
│  │  │  │  └─ Query caching, real-time data fetching                        │ │
│  │  │  ├─ React Hook Form + Zod                                            │ │
│  │  │  │  └─ Form validation & handling                                    │ │
│  │  │  └─ useState/Context (Local state)                                    │ │
│  │  │                                                                         │ │
│  │  ├─ UI Component Library (shadcn/ui)                                      │ │
│  │  │  ├─ Radix UI (Headless components)                                    │ │
│  │  │  ├─ Lucide Icons (24 icons imported)                                  │ │
│  │  │  └─ 50+ Pre-built Components                                          │ │
│  │  │     ├─ accordion, alert, button, card, dialog                         │ │
│  │  │     ├─ form, input, select, tabs, modal                              │ │
│  │  │     └─ charts, carousel, sidebar, drawer                             │ │
│  │  │                                                                         │ │
│  │  ├─ Styling                                                               │ │
│  │  │  ├─ Tailwind CSS v4 (@tailwindcss/vite)                             │ │
│  │  │  ├─ Class Variance Authority (CVA)                                    │ │
│  │  │  └─ CSS Modules (Compiled to /src/styles.css)                        │ │
│  │  │                                                                         │ │
│  │  └─ Special Features                                                      │ │
│  │     ├─ Mobile Navigation (Responsive menu)                               │ │
│  │     ├─ Error Boundary (Error catching)                                   │ │
│  │     ├─ Scroll Restoration                                                │ │
│  │     └─ Toast Notifications (Sonner)                                      │ │
│  └────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
                                       ↓
                          ┌────────────────────────┐
                          │  SSR / Server Handler  │
                          │  (src/server.ts)       │
                          └────────────────────────┘
                                       ↓
        ┌──────────────────────────────┴──────────────────────────────┐
        │                                                              │
   ┌────▼────────────────┐                          ┌─────────────────▼───┐
   │ TanStack Start Dev   │                          │ Nitro Server        │
   │ Server               │                          │ (Cloudflare Workers)│
   │                      │                          │                     │
   │ • Hot reloading      │                          │ • SSR rendering     │
   │ • Dev middleware     │                          │ • API endpoints     │
   │ • Request handling   │                          │ • Error wrapping    │
   └──────────────────────┘                          └─────────────────────┘
                                                                 ↓
                                                    ┌────────────────────────┐
                                                    │ Server Functions      │
                                                    │ (/src/lib/api/)       │
                                                    │ • example.functions.ts │
                                                    └────────────────────────┘
```

---

## 📁 Directory Structure Explained

```
vineyard-haven-growth/
│
├── 📄 Configuration Files
│   ├── package.json         ← Project metadata & dependencies (60+ packages)
│   ├── vite.config.ts       ← Vite build configuration (uses @lovable.dev/vite-tanstack-config)
│   ├── tsconfig.json        ← TypeScript compiler settings (ES2022 target)
│   ├── eslint.config.js     ← Code quality rules
│   ├── components.json      ← Shadcn/UI component registry
│   └── bunfig.toml          ← Bun package manager config
│
└── 📂 src/ (Source Code)
    │
    ├── 📄 Entry Points
    │   ├── start.ts         ← TanStack Start initialization (middleware setup)
    │   ├── server.ts        ← Server-side entry (SSR error handling)
    │   ├── router.tsx       ← Route tree creation & React Query client
    │   └── routeTree.gen.ts ← Auto-generated file-based route tree
    │
    ├── 📂 routes/ (Page Components - File-Based Routing)
    │   ├── __root.tsx       ← Root layout (wraps all pages with headers/footers)
    │   ├── index.tsx        ← Home page (hero, projects showcase, features)
    │   ├── properties.tsx   ← Property listing page (filterable catalog)
    │   ├── about.tsx        ← About us page (company story, team)
    │   ├── contact.tsx      ← Contact form (lead generation)
    │   ├── projects.$slug.tsx ← Dynamic property detail page
    │   └── README.md        ← Route documentation
    │
    ├── 📂 components/ (Reusable React Components)
    │   ├── MobileNav.tsx    ← Responsive mobile menu
    │   │
    │   └── 📂 ui/ (Shadcn/UI Components - Base UI Building Blocks)
    │       ├── button.tsx         ← Pressable element
    │       ├── card.tsx           ← Container with border/shadow
    │       ├── dialog.tsx         ← Modal dialog
    │       ├── form.tsx           ← React Hook Form wrapper
    │       ├── input.tsx          ← Text input field
    │       ├── accordion.tsx      ← Collapsible sections
    │       ├── tabs.tsx           ← Tab navigation
    │       ├── select.tsx         ← Dropdown selection
    │       ├── checkbox.tsx       ← Checkable input
    │       ├── radio-group.tsx    ← Radio button groups
    │       ├── slider.tsx         ← Range selector
    │       ├── chart.tsx          ← Recharts wrapper
    │       ├── carousel.tsx       ← Image carousel
    │       ├── breadcrumb.tsx     ← Navigation breadcrumbs
    │       ├── pagination.tsx     ← Page navigation
    │       ├── alert.tsx          ← Alert box
    │       ├── tooltip.tsx        ← Hover tooltips
    │       ├── popover.tsx        ← Floating content
    │       ├── avatar.tsx         ← User profile images
    │       ├── badge.tsx          ← Status labels
    │       ├── dropdown-menu.tsx  ← Context menus
    │       ├── sidebar.tsx        ← Collapsible sidebar
    │       ├── drawer.tsx         ← Slide-out panel
    │       ├── sheet.tsx          ← Bottom sheet
    │       ├── navigation-menu.tsx ← Complex nav
    │       ├── command.tsx        ← Command palette
    │       ├── progress.tsx       ← Progress bar
    │       ├── skeleton.tsx       ← Loading placeholder
    │       ├── scroll-area.tsx    ← Custom scrollable area
    │       ├── resizable.tsx      ← Resizable panels
    │       ├── toggle.tsx         ← Toggle button
    │       ├── toggle-group.tsx   ← Toggle button groups
    │       ├── switch.tsx         ← Toggle switch
    │       ├── calendar.tsx       ← Date picker
    │       ├── sonner.tsx         ← Toast notifications
    │       └── [+30 more components]
    │
    ├── 📂 hooks/ (Custom React Hooks)
    │   └── use-mobile.tsx   ← Hook to detect mobile viewport
    │
    ├── 📂 lib/ (Utility Functions & Helpers)
    │   ├── config.server.ts        ← Server-only environment config (never sent to browser)
    │   ├── error-capture.ts        ← Global error catcher
    │   ├── error-page.ts           ← 500 error page renderer
    │   ├── lovable-error-reporting.ts ← Lovable error logging service
    │   ├── utils.ts                ← General utilities (likely has cn() for classnames)
    │   │
    │   └── 📂 api/
    │       └── example.functions.ts ← Server functions (TanStack query integration)
    │
    ├── 📂 assets/ (Static Images & Media)
    │   ├── hero-property.jpg
    │   ├── founder.jpg
    │   ├── project-villa.jpg
    │   ├── project-apartments.jpg
    │   ├── project-plots.jpg
    │   └── interior-living.jpg
    │
    └── 📄 styles.css ← Global Tailwind CSS compiled output
```

---

## 🔧 Technology Stack Breakdown

### Frontend Framework
- **React 19.2.0** - Modern UI library with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **TanStack Start 1.167.50** - Full-stack React framework built on Vite
- **TanStack Router 1.168.25** - File-based client-side routing

### UI & Styling
- **Tailwind CSS 4.2.1** - Utility-first CSS framework
- **Shadcn/UI** - Copy-paste React component library (50+ pre-built components)
- **Radix UI** - Headless component primitives (accessibility-first)
- **Lucide React 0.575** - Icon library (24 icons used)
- **CVA (Class Variance Authority)** - Component variants
- **Tailwind Merge** - Smart class merging

### State Management & Data
- **React Query 5.83.0** - Server state management (data fetching, caching)
- **React Hook Form 7.71.2** - Efficient form state management
- **Zod 3.24.2** - TypeScript-first schema validation

### UI Utilities
- **Embla Carousel** - React carousel for images
- **React Resizable Panels** - Draggable panel resizer
- **Recharts 2.15.4** - React charting library
- **React Day Picker** - Date picker component
- **Sonner** - Toast notification library
- **Vaul** - Drawer component
- **cmdk** - Command/search palette
- **Input OTP** - OTP input field
- **date-fns** - Date utilities

### Development Tools
- **Vite 7.3.1** - Lightning-fast build tool
- **Nitro 3.0** - Server engine (Cloudflare Workers compatible)
- **ESLint 9.32.0** - Code quality & linting
- **Prettier 3.7.3** - Code formatting
- **@lovable.dev/vite-tanstack-config** - Pre-configured Vite + TanStack setup

---

## 🏗️ Build Plan for Junior Developer

### Phase 1: Project Setup & Environment (Day 1)

#### 1.1 Understand the Project Structure
```bash
# Clone/Open the project
cd vineyard-haven-growth

# Install all dependencies
npm install

# Verify installation
npm run dev  # Should start dev server on http://localhost:3000
```

#### 1.2 Key Concepts to Learn
- **File-based Routing**: Routes are created by files in `src/routes/`
  - `index.tsx` = `/` (home page)
  - `about.tsx` = `/about` page
  - `$slug` = dynamic route parameter
  
- **TypeScript + React**: Every component has `.tsx` extension
  - Props are typed with interfaces
  - State is type-safe with TypeScript

- **Tailwind CSS**: No CSS files needed!
  - Classes like `bg-blue-500`, `text-xl`, `flex`, `grid`
  - Build output → `src/styles.css`

---

### Phase 2: Frontend Architecture (Days 2-3)

#### 2.1 Route Layer (URL Navigation)
```
src/routes/ = Where pages live
├── __root.tsx      (Wrapper for all pages - header, footer, metadata)
├── index.tsx       (Home - hero, featured projects, stats)
├── properties.tsx  (All properties list - filterable)
├── about.tsx       (Company story & team)
├── contact.tsx     (Lead capture form)
└── projects.$slug.tsx (Single property detail view)
```

**Flow:**
1. User types URL (e.g., `/properties`)
2. TanStack Router matches to `properties.tsx`
3. Route component renders
4. Wrapped by `__root.tsx` (layout)

#### 2.2 Component Layer (UI Building Blocks)
```
src/components/
├── MobileNav.tsx        (Responsive hamburger menu)
└── ui/                  (50+ shadcn/ui components)
    ├── button.tsx       (Clickable button)
    ├── card.tsx         (Content container)
    ├── form.tsx         (Form wrapper)
    ├── input.tsx        (Text input)
    ├── dialog.tsx       (Modal popup)
    └── [+45 more]
```

**How to use in a route:**
```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PropertyCard() {
  return (
    <Card className="p-4">
      <h3>Villa Name</h3>
      <Button>View Details</Button>
    </Card>
  );
}
```

#### 2.3 Styling Layer (Tailwind CSS)
```tsx
// No CSS files! Use class names:
<div className="
  bg-white          // white background
  rounded-lg        // rounded corners
  p-4               // padding
  shadow-lg         // drop shadow
  hover:shadow-xl   // on hover
  md:grid-cols-2    // 2 columns on medium+ screens
">
  Content
</div>
```

**Responsive Breakpoints:**
- `sm:` (640px+), `md:` (768px+), `lg:` (1024px+), `xl:` (1280px+)
- Mobile-first approach: design for mobile, then add larger screen styles

---

### Phase 3: Data & Forms (Days 4-5)

#### 3.1 State Management with React Query
```tsx
import { useQuery } from "@tanstack/react-query";

export function Properties() {
  // Fetch data server-side and cache it
  const { data, isLoading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await fetch("/api/properties");
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading properties</div>;

  return (
    <div>
      {data.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

#### 3.2 Form Handling with React Hook Form + Zod
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

// Define form schema (validation)
const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
});

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data) {
    // Send to server
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(await response.json());
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("email")} />
      <input {...form.register("phone")} />
      <textarea {...form.register("message")} />
      <Button type="submit">Send</Button>
    </form>
  );
}
```

---

### Phase 4: Build & Deployment (Days 6-7)

#### 4.1 Development
```bash
npm run dev
# Starts Vite dev server with hot reload
# Open http://localhost:3000
```

#### 4.2 Production Build
```bash
npm run build
# Creates optimized bundle in dist/
# TypeScript checked, code minified, assets optimized
```

#### 4.3 Preview Production Build
```bash
npm run preview
# Simulates production server locally
```

#### 4.4 Code Quality
```bash
npm run lint        # Check code quality
npm run format      # Auto-format code with Prettier
```

---

## 🎨 Design Pattern Examples from This Project

### Pattern 1: Home Page (`index.tsx`)
```
1. Hero Section
   - Large banner image
   - Main CTA (Call-to-action button)
   - Navigation links

2. Featured Projects Section
   - Project cards in grid
   - Tags (NEW LAUNCH, PREMIUM, ONGOING)
   - Filter functionality

3. Stats Section
   - 4 key metrics about company
   - "10+ Years", "500+ Families", etc.

4. Features Section
   - 6 value propositions
   - Icons + heading + description
   - Icon from Lucide React library

5. Testimonials/Reviews
   - Customer quotes with ratings
   - Company branding
```

### Pattern 2: Properties Page (`properties.tsx`)
```
1. Search & Filter Bar
   - Search by name
   - Filter by type (Villa/Apartment/Plot)
   - Filter by status (Ongoing/Ready/Under Construction)
   - Price range slider

2. Property Grid
   - Cards displaying: image, name, location, price, specs
   - Hover effects → show more details
   - Click → navigate to detail page

3. Detail View
   - Full image gallery
   - Complete specifications
   - Amenities list
   - Contact form for inquiry
```

### Pattern 3: Component Composition
```tsx
// Small, reusable component
function PropertyCard({ property }) {
  return (
    <Card>
      <img src={property.img} alt={property.name} />
      <h3>{property.name}</h3>
      <p>{property.location}</p>
      <Button>View Details</Button>
    </Card>
  );
}

// Grid of cards
export function PropertyGrid({ properties }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map(p => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}

// Used in the page route
export const Route = createFileRoute("/properties")({
  component: () => (
    <PropertyGrid properties={propertiesData} />
  ),
});
```

---

## 🔐 Server-Side Code

### src/start.ts (Entry Point)
- Creates TanStack Start instance
- Adds error middleware (catches all errors)
- Wraps errors in HTML error page

### src/server.ts (SSR Handler)
- Server-side rendering handler
- Catches unhandled errors from h3 (HTTP server)
- Returns proper HTML error pages

### src/lib/config.server.ts (Environment)
- Server-only configuration
- `.server.ts` suffix prevents code reaching browser
- Access `process.env` here safely (won't leak secrets)

---

## 🎯 Development Workflow

### Daily Development Loop:
```
1. Start dev server:          npm run dev
2. Edit file (e.g., route)    → Auto hot reload (changes instantly)
3. Test in browser            → See changes without refresh
4. Lint & format code         → npm run lint && npm run format
5. Build for production       → npm run build
6. Preview production         → npm run preview
```

### Key Developer Habits:
1. **Component First**: Build small, reusable components
2. **Type Everything**: Use TypeScript to catch bugs early
3. **CSS Classnames**: Use Tailwind, avoid custom CSS
4. **Responsive First**: Use `md:`, `lg:` prefixes for mobile-responsive design
5. **Error Handling**: Wrap data fetching with error boundaries
6. **Form Validation**: Always validate with Zod + React Hook Form

---

## 📋 Current Feature Inventory

| Feature | Location | Status |
|---------|----------|--------|
| Home Page | `/index.tsx` | ✅ Hero, Projects, Stats, Features |
| Properties Listing | `/properties.tsx` | ✅ Filterable catalog |
| Property Detail | `/projects.$slug.tsx` | ✅ Dynamic pages |
| About Us | `/about.tsx` | ✅ Company story |
| Contact Form | `/contact.tsx` | ✅ Lead capture |
| Mobile Navigation | `MobileNav.tsx` | ✅ Responsive menu |
| Error Handling | Root layout | ✅ 404, 500 error pages |
| Responsive Design | All pages | ✅ Mobile-first, TailwindCSS |

---

## 🚀 Next Steps for Junior Dev

1. **Week 1**: Understand structure, run dev server, read route files
2. **Week 2**: Create a simple new route (e.g., `/blog`)
3. **Week 3**: Add new component to existing route (e.g., new card type)
4. **Week 4**: Create form with validation (practice React Hook Form + Zod)
5. **Week 5**: Connect to data/API with React Query
6. **Week 6**: Deploy to production

---

## 🧠 Key Learning Resources

### Essential Concepts:
- **File-based Routing**: TanStack Router - `src/routes/` structure
- **Styling**: Tailwind CSS classes, responsive design
- **Components**: Shadcn/UI, Radix UI patterns
- **State**: React hooks, Context, React Query
- **Forms**: React Hook Form, Zod validation
- **TypeScript**: Type annotations, interfaces, generics

### Commands You'll Use Most:
```bash
npm run dev        # Start developing
npm run build      # Production build
npm run lint       # Check code quality
npm run format     # Fix formatting
```

---

## 💡 Pro Tips

1. **Use @ Path Alias**: `import Button from "@/components/ui/button"` (cleaner)
2. **Leverage Shadcn/UI**: 50+ components ready to use - copy-paste into `src/components/ui/`
3. **Hot Reload**: Changes save instantly during `npm run dev`
4. **Mobile-First**: Start with mobile in Tailwind, then add larger screens
5. **Error Boundaries**: Always wrap data fetching in error handling
6. **Type Safety**: Let TypeScript catch bugs - don't use `any`

---

**Created:** June 9, 2026  
**Version:** 1.0 - Initial Analysis  
**For:** Junior Developer Onboarding
