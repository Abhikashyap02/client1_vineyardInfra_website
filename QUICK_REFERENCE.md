# Vineyard Website - Quick Reference Guide for Jr Devs

## 🚀 Getting Started (First Time Only)

```bash
# 1. Open terminal in project folder
cd vineyard-haven-growth

# 2. Install all dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:3000  ← See the app running!
```

---

## 📝 Common Development Tasks

### Task 1: Add a New Page Route
**Goal:** Create a new page like `/blog`

```bash
# 1. Create file: src/routes/blog.tsx

# 2. Copy this template:
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Vineyard Infra" },
      { name: "description", content: "Real estate tips and market insights" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div>
      <h1>Blog Page</h1>
      <p>Coming soon...</p>
    </div>
  );
}

# 3. Access at: http://localhost:3000/blog
```

### Task 2: Add a Reusable Component
**Goal:** Create a new button or card component

```bash
# 1. Create file: src/components/PropertyCard.tsx

# 2. Write component:
interface PropertyCardProps {
  name: string;
  price: string;
  image: string;
  onClick?: () => void;
}

export function PropertyCard({ name, price, image, onClick }: PropertyCardProps) {
  return (
    <div 
      onClick={onClick}
      className="rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <img src={image} alt={name} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <p className="text-green-600 font-bold">{price}</p>
    </div>
  );
}

# 3. Use in other files:
import { PropertyCard } from "@/components/PropertyCard";

export function PropertyGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <PropertyCard name="Villa" price="₹1.45 Cr" image="/villa.jpg" />
      <PropertyCard name="Apartment" price="₹78 L" image="/apt.jpg" />
    </div>
  );
}
```

### Task 3: Use a Shadcn/UI Component
**Goal:** Add a button, card, or form to your page

```bash
# 1. Import component:
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

# 2. Use in JSX:
export function PropertyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vineyard Signature Villas</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Your name" />
        <Button className="mt-4">Contact Agent</Button>
      </CardContent>
    </Card>
  );
}
```

### Task 4: Style with Tailwind CSS
**Goal:** Add responsive, beautiful styling

```tsx
// Mobile-first approach - start small, add larger screens

<div className="
  bg-white                    // white background
  rounded-lg                  // rounded corners
  p-4                         // padding 1rem
  shadow-md                   // drop shadow
  transition-all              // smooth animation
  hover:shadow-lg             // hover effect
  hover:scale-105             // zoom on hover
  md:p-6                      // more padding on medium screens
  md:grid-cols-2              // 2 columns on medium+ screens
  lg:grid-cols-3              // 3 columns on large+ screens
  xl:grid-cols-4              // 4 columns on extra large screens
">
  Content
</div>

// Common patterns:
<div className="flex items-center justify-between">    // Flexbox centered
<div className="grid grid-cols-3 gap-4">               // 3 column grid
<div className="absolute inset-0">                     // Full screen overlay
<div className="mx-auto max-w-4xl">                    // Centered container
<button className="bg-blue-500 hover:bg-blue-600">    // Button with hover
```

### Task 5: Handle a Form with Validation
**Goal:** Create a form that validates input

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 1. Define validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// 2. Create form component
export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(contactSchema),
  });

  // 3. Handle submission
  async function onSubmit(data) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        alert("Form submitted successfully!");
        form.reset();
      }
    } catch (error) {
      alert("Error submitting form");
    }
  }

  // 4. Render form
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Name field */}
      <div>
        <label>Name</label>
        <Input {...form.register("name")} placeholder="Your name" />
        {form.formState.errors.name && (
          <p className="text-red-500">{form.formState.errors.name.message}</p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label>Email</label>
        <Input {...form.register("email")} type="email" placeholder="your@email.com" />
        {form.formState.errors.email && (
          <p className="text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>

      {/* Phone field */}
      <div>
        <label>Phone</label>
        <Input {...form.register("phone")} placeholder="10-digit phone" />
        {form.formState.errors.phone && (
          <p className="text-red-500">{form.formState.errors.phone.message}</p>
        )}
      </div>

      {/* Message field */}
      <div>
        <label>Message</label>
        <textarea 
          {...form.register("message")} 
          placeholder="Your message"
          className="w-full rounded border p-2"
        />
        {form.formState.errors.message && (
          <p className="text-red-500">{form.formState.errors.message.message}</p>
        )}
      </div>

      {/* Submit button */}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
```

### Task 6: Fetch Data from Server
**Goal:** Get data and display it

```tsx
import { useQuery } from "@tanstack/react-query";

export function PropertiesList() {
  // 1. Fetch data
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await fetch("/api/properties");
      return response.json();
    },
  });

  // 2. Show loading state
  if (isLoading) return <div>Loading properties...</div>;

  // 3. Show error state
  if (error) return <div>Error: {error.message}</div>;

  // 4. Render data
  return (
    <div className="grid grid-cols-3 gap-4">
      {properties?.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

### Task 7: Navigate Between Pages
**Goal:** Create links and navigate programmatically

```tsx
import { Link, useNavigate } from "@tanstack/react-router";

export function Navigation() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Link component - declarative */}
      <Link to="/" className="text-blue-500">Home</Link>
      <Link to="/properties">Browse Properties</Link>
      <Link to="/about">About Us</Link>

      {/* Button that navigates - imperative */}
      <button onClick={() => navigate({ to: "/properties" })}>
        View All Properties
      </button>

      {/* Dynamic link to specific property */}
      <Link to={`/projects/${property.slug}`}>
        {property.name}
      </Link>
    </div>
  );
}
```

### Task 8: Make Something Responsive
**Goal:** Show different layouts on mobile vs desktop

```tsx
<div className="
  grid
  grid-cols-1          // 1 column on mobile (default)
  md:grid-cols-2       // 2 columns on medium screens (768px+)
  lg:grid-cols-3       // 3 columns on large screens (1024px+)
  xl:grid-cols-4       // 4 columns on xl screens (1280px+)
  gap-4
">
  {/* 4 items will stack on mobile, show 2x2 on tablet, 3x on desktop, 4x on xl */}
</div>

// Another example - mobile nav
<>
  {/* Hamburger menu - only on mobile */}
  <MobileNav className="md:hidden" />

  {/* Desktop nav - hidden on mobile */}
  <nav className="hidden md:flex gap-6">
    <Link to="/">Home</Link>
    <Link to="/properties">Properties</Link>
  </nav>
</>
```

---

## 🐛 Debugging & Problem Solving

### Problem: Page not reloading when I save
**Solution:**
```
1. Check if npm run dev is still running
2. Look at terminal for error messages
3. Press Ctrl+Shift+R (hard refresh browser)
4. Restart dev server: Ctrl+C then npm run dev
```

### Problem: TypeScript errors showing
**Solution:**
```
1. These are just type warnings - won't break the app
2. Hover over red squiggly line to see error
3. Add type annotation:
   const items: Property[] = [];
4. Or import correct type:
   import type { Property } from "@/types";
```

### Problem: Tailwind classes not applying
**Solution:**
```
1. Check spelling (text-blue-500, NOT text-blue)
2. Make sure class is in Tailwind config
3. Restart dev server: Ctrl+C then npm run dev
4. Clear browser cache: Ctrl+Shift+Delete
```

### Problem: "Cannot find module" error
**Solution:**
```
1. Check file path (use @ alias: @/components/...)
2. Make sure file exists
3. Check spelling (case-sensitive on Linux/Mac!)
4. Run: npm install (to install missing packages)
```

### Problem: Form not validating
**Solution:**
```
1. Check Zod schema matches form fields
2. Ensure form.register() is connected to inputs
3. Check error display logic
4. Test in browser console: form.formState.errors
```

---

## ⚡ Performance Tips

```tsx
// ✅ GOOD - Memoize expensive computations
const filteredItems = useMemo(() => {
  return items.filter(item => item.price < maxPrice);
}, [items, maxPrice]);

// ❌ BAD - Re-runs on every render
const filteredItems = items.filter(item => item.price < maxPrice);

// ✅ GOOD - Use key in lists
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// ❌ BAD - Using index as key
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// ✅ GOOD - Split into separate components
function PropertyCard({ property }) { ... }
function PropertyGrid({ properties }) {
  return properties.map(p => <PropertyCard key={p.id} property={p} />);
}

// ❌ BAD - Inline JSX in loops
{properties.map(p => (
  <div key={p.id}>
    <div>...</div>
    <div>...</div>
  </div>
))}
```

---

## 📚 File Locations Reference

| What? | Where? | Example |
|-------|--------|---------|
| Pages/Routes | `src/routes/` | `src/routes/about.tsx` |
| Components | `src/components/` | `src/components/PropertyCard.tsx` |
| UI Components | `src/components/ui/` | `src/components/ui/button.tsx` |
| Utilities | `src/lib/` | `src/lib/utils.ts` |
| Server functions | `src/lib/api/` | `src/lib/api/contact.ts` |
| Images/Assets | `src/assets/` | `src/assets/hero.jpg` |
| Styles | `src/styles.css` | Global Tailwind CSS |
| Config | Root folder | `vite.config.ts`, `tsconfig.json` |

---

## 🎨 Tailwind CSS Quick Reference

```css
/* Spacing */
p-4           /* padding 1rem */
px-4          /* padding left & right */
py-4          /* padding top & bottom */
m-4           /* margin 1rem */
gap-4         /* grid/flex gap */

/* Colors */
bg-blue-500   /* background color */
text-white    /* text color */
border-gray-300  /* border color */
hover:bg-blue-600  /* on hover */

/* Layout */
flex          /* flexbox */
grid          /* grid layout */
items-center  /* vertical align */
justify-between  /* horizontal align */

/* Sizing */
w-full        /* width 100% */
h-64          /* height 16rem */
max-w-2xl     /* max-width 42rem */
rounded-lg    /* border radius */

/* Responsive */
sm:           /* 640px+ */
md:           /* 768px+ */
lg:           /* 1024px+ */
xl:           /* 1280px+ */

/* Effects */
shadow-lg     /* box shadow */
opacity-50    /* transparency */
transition-all  /* animation */
hover:scale-105 /* zoom on hover */
```

---

## 🧑‍💻 Common Commands

```bash
npm run dev              # Start development server
npm run build            # Create production build
npm run preview          # Test production build locally
npm run lint             # Check code quality
npm run format           # Auto-fix code formatting
npm install              # Install dependencies
npm list                 # See installed packages
```

---

## 📖 Documentation Links

| Topic | Learn About |
|-------|------------|
| React | https://react.dev |
| TypeScript | https://www.typescriptlang.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| Shadcn/UI | https://ui.shadcn.com |
| React Hook Form | https://react-hook-form.com |
| Zod | https://zod.dev |
| React Query | https://tanstack.com/query |
| TanStack Router | https://tanstack.com/router |
| Vite | https://vitejs.dev |

---

## 🎓 Learning Path (4 Weeks)

### Week 1: Basics
- [ ] Understand file-based routing
- [ ] Read existing pages (index, properties, about)
- [ ] Learn Tailwind CSS classes
- [ ] Try modifying existing components

### Week 2: Components
- [ ] Create a simple new page
- [ ] Create a reusable component
- [ ] Use shadcn/ui components
- [ ] Practice responsive design

### Week 3: Interactivity
- [ ] Create a form with validation (React Hook Form + Zod)
- [ ] Fetch data from API (React Query)
- [ ] Add filter/search functionality
- [ ] Handle errors gracefully

### Week 4: Advanced
- [ ] Create complex page layout
- [ ] Add animations/transitions
- [ ] Optimize performance
- [ ] Deploy to production

---

## ✅ Code Quality Checklist

Before pushing code:

- [ ] No `console.log()` statements left
- [ ] All imports are used
- [ ] No TypeScript `any` types
- [ ] Component names start with capital letter
- [ ] Props are properly typed
- [ ] Responsive design works (test on mobile)
- [ ] No hardcoded strings (use constants)
- [ ] Error handling in place
- [ ] Run `npm run lint` passes
- [ ] Run `npm run format` to fix style

---

**Created:** June 9, 2026  
**Version:** 1.0  
**Audience:** Junior Developer  
**Difficulty:** Beginner-Friendly
