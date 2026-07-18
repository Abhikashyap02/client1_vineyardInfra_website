import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import {
  Search, MapPin, Building2, ShieldCheck, Sparkles, Headset,
  TrendingUp, HandCoins, MessageCircle, Phone, Calendar, ArrowRight,
  Maximize, Tag, CheckCircle2, Filter, Facebook, Instagram, Youtube,
} from "lucide-react";
import { Header } from "@/components/Header";
import heroProperty from "@/assets/hero-property.jpg";
import projectVilla from "@/assets/project-villa.jpg";
import projectApartments from "@/assets/project-apartments.jpg";
import projectPlots from "@/assets/project-plots.jpg";
import interiorLiving from "@/assets/interior-living.jpg";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Premium Properties in Dehradun — Vineyard Infra" },
      { name: "description", content: "Browse villas, apartments, plots and commercial properties across Dehradun. Filter by location, budget and status. Verified listings with expert guidance." },
      { property: "og:title", content: "Premium Properties in Dehradun — Vineyard Infra" },
      { property: "og:description", content: "Discover residential, commercial and investment properties curated by experienced advisors." },
    ],
  }),
  component: PropertiesPage,
});

type Property = {
  id: string;
  slug: string;
  name: string;
  location: string;
  type: "Villa" | "Apartment" | "Plot" | "Commercial";
  category: "Residential" | "Commercial" | "Luxury" | "Investment";
  status: "Ongoing" | "Ready to Move" | "Under Construction" | "Upcoming";
  priceMin: number; // in lakhs
  priceLabel: string;
  area: string;
  bhk: string;
  amenities: string[];
  desc: string;
  tags: string[];
  img: string;
  featured?: boolean;
};

const properties: Property[] = [
  { id: "p1", slug: "vineyard-signature-villas", name: "Vineyard Signature Villas", location: "Mussoorie Road, Dehradun", type: "Villa", category: "Luxury", status: "Ongoing", priceMin: 145, priceLabel: "₹1.45 Cr*", area: "2200 – 3000 Sq.Ft.", bhk: "3, 4 BHK", amenities: ["Clubhouse", "Pool", "Landscaped Gardens"], desc: "Hill-view luxury villas with private decks and curated interiors.", tags: ["Featured", "Hot Property"], img: projectVilla, featured: true },
  { id: "p2", slug: "vineyard-high-grove", name: "Vineyard High Grove", location: "Sahastradhara Road, Dehradun", type: "Apartment", category: "Residential", status: "Under Construction", priceMin: 78, priceLabel: "₹78 L*", area: "1200 – 1950 Sq.Ft.", bhk: "2, 3 BHK", amenities: ["Gym", "Rooftop Lounge", "Kids' Play"], desc: "Premium 2 & 3 BHK residences in Dehradun's fastest growing corridor.", tags: ["New Launch"], img: projectApartments, featured: true },
  { id: "p3", slug: "vineyard-green-county", name: "Vineyard Green County", location: "Harrawala, Dehradun", type: "Plot", category: "Investment", status: "Ready to Move", priceMin: 22, priceLabel: "₹22.5 L*", area: "100 – 300 Sq.Yd.", bhk: "Residential Plots", amenities: ["Gated", "Wide Roads", "Underground Utilities"], desc: "Gated residential plots with strong appreciation potential.", tags: ["Investment Opportunity"], img: projectPlots },
  { id: "p4", slug: "vineyard-crown-residences", name: "Vineyard Crown Residences", location: "Rajpur Road, Dehradun", type: "Apartment", category: "Luxury", status: "Ready to Move", priceMin: 195, priceLabel: "₹1.95 Cr*", area: "1800 – 2600 Sq.Ft.", bhk: "3, 4 BHK", amenities: ["Concierge", "Spa", "Sky Lounge"], desc: "Boutique luxury apartments on Dehradun's most coveted address.", tags: ["Featured", "Hot Property"], img: interiorLiving, featured: true },
  { id: "p5", slug: "vineyard-pine-estate", name: "Vineyard Pine Estate", location: "Mussoorie Road, Dehradun", type: "Villa", category: "Luxury", status: "Upcoming", priceMin: 320, priceLabel: "₹3.2 Cr*", area: "3500 – 4800 Sq.Ft.", bhk: "4, 5 BHK", amenities: ["Private Pool", "Home Theatre", "Smart Home"], desc: "Limited edition forest-facing estate villas for discerning families.", tags: ["New Launch"], img: heroProperty },
  { id: "p6", slug: "vineyard-trade-centre", name: "Vineyard Trade Centre", location: "Haridwar Road, Dehradun", type: "Commercial", category: "Commercial", status: "Under Construction", priceMin: 55, priceLabel: "₹55 L*", area: "450 – 1800 Sq.Ft.", bhk: "Retail / Office", amenities: ["High Footfall", "Ample Parking", "Power Backup"], desc: "Grade-A retail and office spaces on a high-visibility commercial stretch.", tags: ["Investment Opportunity"], img: projectApartments },
];

const trustChips = ["Verified Listings", "Expert Guidance", "Transparent Process", "End-to-End Support"];

const quickFilters = [
  "All Properties", "Residential", "Commercial", "Villas", "Apartments",
  "Plots", "Luxury Homes", "Ready to Move", "Investment Opportunities",
] as const;
type QuickFilter = typeof quickFilters[number];

const typeOptions = ["Any Type", "Flat / Apartment", "Villa", "Independent House", "Plot", "Commercial Space", "Office Space", "Retail Shop"];
const locationOptions = ["Any Location", "Rajpur Road", "Sahastradhara Road", "Mussoorie Road", "Haridwar Road", "Harrawala", "Clement Town"];
const budgetOptions = ["Any Budget", "Under 50 Lakhs", "50L - 1Cr", "1Cr - 2Cr", "2Cr+"];
const statusOptions = ["Any Status", "Ongoing", "Ready to Move", "Under Construction", "Upcoming"];

const whyUs = [
  { icon: ShieldCheck, title: "Verified Listings", desc: "Every property is vetted for legal clarity and accurate details." },
  { icon: TrendingUp, title: "Local Market Expertise", desc: "Decade-deep insight into Dehradun micro-markets and pricing." },
  { icon: Sparkles, title: "Personalized Recommendations", desc: "Curated shortlists matched to your budget and lifestyle." },
  { icon: HandCoins, title: "Transparent Transactions", desc: "Honest pricing, clear paperwork, no hidden surprises." },
  { icon: Building2, title: "Site Visit Assistance", desc: "Door-to-door site visits with an advisor at your convenience." },
  { icon: Headset, title: "Post-Sale Support", desc: "Registration, handover and resale — we stay with you." },
];

const WHATSAPP = "https://wa.me/916397688989?text=Hi%20Vineyard%20Infra%2C%20I%27d%20like%20to%20enquire%20about%20a%20property.";

function matchesQuickFilter(p: Property, f: QuickFilter) {
  switch (f) {
    case "All Properties": return true;
    case "Residential": return p.category === "Residential" || p.type === "Apartment" || p.type === "Villa";
    case "Commercial": return p.category === "Commercial";
    case "Villas": return p.type === "Villa";
    case "Apartments": return p.type === "Apartment";
    case "Plots": return p.type === "Plot";
    case "Luxury Homes": return p.category === "Luxury";
    case "Ready to Move": return p.status === "Ready to Move";
    case "Investment Opportunities": return p.category === "Investment" || p.tags.includes("Investment Opportunity");
  }
}

function PropertiesPage() {
  const [quick, setQuick] = useState<QuickFilter>("All Properties");
  const [search, setSearch] = useState({ type: typeOptions[0], location: locationOptions[0], budget: budgetOptions[0], status: statusOptions[0] });
  const routerLocation = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(routerLocation.searchStr);
      const type = params.get("type");
      const location = params.get("location");
      const budget = params.get("budget");
      const status = params.get("status");

      let matchedLocation = locationOptions[0];
      if (location) {
        const normalizedParam = location.toLowerCase().replace(/[^a-z0-9]/g, "");
        const found = locationOptions.find(opt =>
          opt.toLowerCase().replace(/[^a-z0-9]/g, "") === normalizedParam
        );
        if (found) {
          matchedLocation = found;
        }
      }

      setSearch({
        type: type || typeOptions[0],
        location: matchedLocation,
        budget: budget || budgetOptions[0],
        status: status || statusOptions[0]
      });
    }
  }, [routerLocation.searchStr]);

  const filtered = useMemo(() => properties.filter((p) => {
    if (!matchesQuickFilter(p, quick)) return false;
    if (search.location !== "Any Location" && !p.location.includes(search.location)) return false;
    if (search.status !== "Any Status" && p.status !== search.status) return false;
    if (search.type !== "Any Type") {
      const t = search.type.toLowerCase();
      if (!t.includes(p.type.toLowerCase()) && !p.type.toLowerCase().includes(t.split(" ")[0])) return false;
    }
    if (search.budget !== "Any Budget") {
      const v = p.priceMin;
      if (search.budget === "Under 50 Lakhs" && v >= 50) return false;
      if (search.budget === "50L - 1Cr" && (v < 50 || v >= 100)) return false;
      if (search.budget === "1Cr - 2Cr" && (v < 100 || v >= 200)) return false;
      if (search.budget === "2Cr+" && v < 200) return false;
    }
    return true;
  }), [quick, search]);

  const featured = properties.filter((p) => p.featured);

  return (
    <div className="bg-warm-bg text-foreground">
      {/* Top bar */}
      <Header activeLabel="Projects" />

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={heroProperty} alt="Premium Dehradun property" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.55)_0%,rgba(15,23,42,0.85)_100%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 pt-32 pb-32 md:pt-40 md:pb-40 text-primary-foreground">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold-soft mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Property Discovery
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight max-w-3xl animate-fade-up">
            Explore Premium <span className="font-italic-serif text-gold">Properties</span> Across Dehradun
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-white/80">
            Discover residential, commercial, plots, villas, and investment opportunities — curated by experienced real estate advisors.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#listings" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-navy-deep font-medium hover:opacity-95">
              Browse Properties <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/contact" hash="site-visit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10">
              <Calendar className="w-4 h-4" /> Book Site Visit
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {trustChips.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-white/85">
                <CheckCircle2 className="w-4 h-4 text-gold" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Search bar overlap */}
        <div className="relative max-w-6xl mx-auto px-5 -mt-20 md:-mt-24">
          <div className="bg-background rounded-2xl shadow-[var(--shadow-elevated)] border border-border p-5 md:p-7">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <SelectField label="Property Type" value={search.type} options={typeOptions} onChange={(v) => setSearch((s) => ({ ...s, type: v }))} />
              <SelectField label="Location" value={search.location} options={locationOptions} onChange={(v) => setSearch((s) => ({ ...s, location: v }))} />
              <SelectField label="Budget" value={search.budget} options={budgetOptions} onChange={(v) => setSearch((s) => ({ ...s, budget: v }))} />
              <SelectField label="Status" value={search.status} options={statusOptions} onChange={(v) => setSearch((s) => ({ ...s, status: v }))} />
              <a href="#listings" className="inline-flex items-center justify-center gap-2 px-6 rounded-xl bg-navy-deep text-primary-foreground font-medium hover:opacity-95 h-[58px] mt-auto">
                <Search className="w-4 h-4" /> Search
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FILTERS */}
      <section className="max-w-7xl mx-auto px-5 mt-12">
        <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" /> Quick filters
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {quickFilters.map((f) => {
            const active = quick === f;
            return (
              <button
                key={f}
                onClick={() => setQuick(f)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm border transition ${active
                    ? "bg-navy-deep text-primary-foreground border-navy-deep"
                    : "bg-background text-foreground border-border hover:border-gold hover:text-navy-deep"
                  }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </section>

      {/* LISTINGS */}
      <section id="listings" className="max-w-7xl mx-auto px-5 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              {filtered.length} {filtered.length === 1 ? "Property" : "Properties"} <span className="font-italic-serif text-gold">Available</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Hand-picked listings updated weekly.</p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-background p-10 text-center">
            <p className="text-muted-foreground">No properties match these filters. Try adjusting your search — or share your requirements below and we'll find one for you.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        )}
      </section>

      {/* FEATURED */}
      <section className="bg-navy-deep text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-gold-soft">Featured</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">
                Top <span className="font-italic-serif text-gold">Recommended</span> Properties
              </h2>
            </div>
            <p className="text-white/70 max-w-md text-sm">Premium projects shortlisted by our advisors for value, location and long-term appreciation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => <FeaturedCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* PROPERTY NOT FOUND */}
      <section id="sitevisit" className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center bg-background rounded-3xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
          <div className="relative h-full min-h-[320px]">
            <img src={interiorLiving} alt="Advisor consultation" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.35),transparent)]" />
          </div>
          <div className="p-8 md:p-12">
            <span className="text-xs tracking-[0.2em] uppercase text-gold">Personal Consultation</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
              Didn't Find the <span className="font-italic-serif text-gold">Right Property?</span>
            </h2>
            <p className="text-muted-foreground mt-3">Tell us your requirements and our advisors will hand-pick suitable options — often before they hit the market.</p>
            <RequirementForm />
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs tracking-[0.2em] uppercase text-gold">Why Vineyard Infra</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
              A trusted partner in your <span className="font-italic-serif text-gold">property journey</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((f) => (
              <div key={f.title} className="bg-background rounded-2xl p-6 border border-border hover:shadow-[var(--shadow-card)] transition">
                <div className="w-11 h-11 rounded-xl bg-navy-deep/5 grid place-content-center text-navy-deep mb-4">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRONG CTA */}
      <section id="contact" className="relative py-20">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] bg-navy-deep" />
        <div className="relative max-w-5xl mx-auto px-5 text-center text-primary-foreground">
          <h2 className="font-display text-3xl md:text-5xl font-semibold">
            Ready to Explore Your <span className="font-italic-serif text-gold">Next Investment?</span>
          </h2>
          <p className="text-white/75 mt-4 max-w-2xl mx-auto">Speak to a Vineyard advisor today — get curated options, honest market insight and zero pressure.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" hash="site-visit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-navy-deep font-medium">
              <Calendar className="w-4 h-4" /> Book Site Visit
            </Link>
            <a href="tel:+916397688989" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-navy-deep font-medium">
              <Phone className="w-4 h-4" /> Talk to an Advisor
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10">
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-navy-deep text-white/70 text-sm py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Vineyard Infra Realcon LLP. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/vineyardinfra" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-white/50" aria-label="Facebook"><Facebook className="size-4" /></a>
            <a href="https://www.instagram.com/vineyardinfra/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-white/50" aria-label="Instagram"><Instagram className="size-4" /></a>
            <a href="https://www.youtube.com/@vineyardinfra1900" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-white/50" aria-label="YouTube"><Youtube className="size-4" /></a>
          </div>
          <p className="text-white/50">Verified Listings</p>
        </div>
      </footer>

      {/* Mobile sticky bar */}
      <div id="mobile-sticky-nav" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background border-t border-border grid grid-cols-3 text-xs font-medium">
        <a href="tel:+916397688989" className="flex flex-col items-center gap-1 py-3 text-navy-deep">
          <Phone className="w-4 h-4" /> Call
        </a>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-3 text-navy-deep border-x border-border">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <Link to="/contact" hash="site-visit" className="flex flex-col items-center gap-1 py-3 bg-gold text-navy-deep">
          <Calendar className="w-4 h-4" /> Site Visit
        </Link>
      </div>
      <div className="md:hidden h-16" />
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-wider uppercase text-muted-foreground mb-1.5">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[46px] rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground focus:outline-none focus:border-gold cursor-pointer"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="group bg-background rounded-2xl overflow-hidden border border-border hover:shadow-[var(--shadow-elevated)] transition-all duration-500 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-gold text-navy-deep font-semibold">{t}</span>
          ))}
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-navy-deep/85 text-primary-foreground backdrop-blur">
            {p.status}
          </span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display font-semibold text-lg leading-snug">{p.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {p.location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Starting</p>
            <p className="font-display font-semibold text-navy-deep">{p.priceLabel}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground border-y border-border py-3">
          <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-gold" />{p.type}</span>
          <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-gold" />{p.bhk}</span>
          <span className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5 text-gold" />{p.area}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{p.desc}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.amenities.slice(0, 3).map((a) => (
            <span key={a} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-foreground/70">{a}</span>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link to={`/contact?property=${encodeURIComponent(p.name)}`} hash="site-visit" className="inline-flex items-center justify-center gap-1.5 text-sm font-medium px-3 py-2.5 rounded-lg bg-navy-deep text-primary-foreground hover:opacity-90">
            <Calendar className="w-4 h-4" /> Site Visit
          </Link>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-sm font-medium px-3 py-2.5 rounded-lg border border-border hover:border-gold text-navy-deep">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Link to={`/contact?property=${encodeURIComponent(p.name)}`} hash="site-visit" className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg text-muted-foreground hover:text-navy-deep">
            Quick Inquiry
          </Link>
          <Link to="/projects/$slug" params={{ slug: p.slug }} search={{ landing: false }} className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg text-gold hover:underline">
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function FeaturedCard({ p }: { p: Property }) {
  return (
    <article className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-gold/50 transition">
      <div className="relative aspect-[5/4] overflow-hidden">
        <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(15,23,42,0.95)_100%)]" />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-gold text-navy-deep font-semibold">Top Pick</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-xs text-gold-soft tracking-wider uppercase">{p.type} · {p.status}</p>
          <h3 className="font-display text-xl font-semibold mt-1">{p.name}</h3>
          <p className="text-sm text-white/70 mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> {p.location}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-display font-semibold text-gold">{p.priceLabel}</span>
            <Link to="/projects/$slug" params={{ slug: p.slug }} search={{ landing: false }} className="text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-navy-deep font-medium">
              View <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function RequirementForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
    >
      <input required placeholder="Full Name" className="h-11 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
      <input required type="tel" placeholder="Phone Number" className="h-11 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold" />
      <input type="email" placeholder="Email Address" className="h-11 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold sm:col-span-2" />
      <select className="h-11 px-3 rounded-lg border border-border bg-background text-sm cursor-pointer">
        {typeOptions.map((o) => <option key={o}>{o}</option>)}
      </select>
      <select className="h-11 px-3 rounded-lg border border-border bg-background text-sm cursor-pointer">
        {locationOptions.map((o) => <option key={o}>{o}</option>)}
      </select>
      <select className="h-11 px-3 rounded-lg border border-border bg-background text-sm cursor-pointer sm:col-span-2">
        {budgetOptions.map((o) => <option key={o}>{o}</option>)}
      </select>
      <textarea placeholder="Special Requirements (optional)" rows={3} className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-gold sm:col-span-2" />
      <label className="flex items-center gap-2 text-sm text-muted-foreground sm:col-span-2">
        <input type="checkbox" defaultChecked className="accent-[var(--gold)]" />
        Request a Call Back
      </label>
      <button type="submit" className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-navy-deep text-primary-foreground font-medium hover:opacity-95">
        {sent ? "Thank you — we'll be in touch shortly" : (<>Find My Property <ArrowRight className="w-4 h-4" /></>)}
      </button>
    </form>
  );
}
