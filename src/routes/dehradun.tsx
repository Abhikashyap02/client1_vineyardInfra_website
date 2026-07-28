import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  MapPin, Phone, MessageCircle, Calendar, ArrowRight, CheckCircle2,
  Building2, Maximize, Tag, Sparkles
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import heroProperty from "@/assets/hero-property.jpg";
import interiorLiving from "@/assets/expert-consultation.jpg";
import { searchProperties } from "@/api/properties";
import { mapToListingProperty } from "@/mappers/propertyMapper";
import type { ListingProperty } from "@/mappers/propertyMapper";
import { submitLead } from "@/api/leads";
import { toast } from "sonner";

const WHATSAPP = "https://wa.me/916397688989?text=Hi%20Vineyard%20Infra%2C%20I'm%20interested%20in%20exploring%20properties%20in%20Dehradun.";

export const Route = createFileRoute("/dehradun")({
  loader: async ({ context }) => {
    const dbProperties = await context.queryClient.ensureQueryData({
      queryKey: ["property-list"],
      queryFn: () => searchProperties(),
    });
    const listingProperties = dbProperties.map(mapToListingProperty);
    return { properties: listingProperties };
  },
  head: () => {
    const title = "Real Estate & Land for Sale in Dehradun | Vineyard Infra";
    const desc = "Looking for properties or plots for sale in Dehradun Uttarakhand? Explore luxury apartments, residential layouts, and gated communities by Vineyard Infra.";
    const canonicalUrl = "https://vineyardinfra.com/dehradun";

    const localPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Dehradun Uttarakhand Real Estate Portal",
      "description": desc,
      "url": canonicalUrl,
      "about": {
        "@type": "Place",
        "name": "Dehradun",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dehradun",
          "addressRegion": "Uttarakhand",
          "addressCountry": "IN"
        }
      }
    };

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl }
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(localPageSchema),
        }
      ]
    };
  },
  component: DehradunPage,
});

function DehradunPage() {
  const { properties } = Route.useLoaderData();

  const drivers = [
    { title: "Delhi-Dehradun Expressway", desc: "Slashing travel time between Dehradun and Delhi to under 2.5 hours, making foothill secondary homes highly viable for NCR buyers." },
    { title: "Airport Expansion", desc: "Jolly Grant Airport is undergoing major expansion to support direct international flights and increase daily flight volume to tier-1 metros." },
    { title: "School Capital of India", desc: "Home to the country's most prestigious institutions, creating steady residential demand from families relocating for children's education." },
    { title: "Appreciating Asset Classes", desc: "Average residential prices have shown a stable 8-10% year-on-year appreciation, outperforming many commercial equity indexes." }
  ];

  const microMarkets = [
    { name: "Sahastradhara Road", type: "Plots, Apartments & Villas", trend: "High growth & tech corridor near IT Park." },
    { name: "Rajpur Road", type: "Luxury Villas & Apartments", trend: "Ultra-premium corridor, scenic hills & high-end shopping." },
    { name: "Mussoorie Road", type: "Foothill Luxury Villas", trend: "Serene hill surroundings with luxury residential complexes." },
    { name: "Thano Road (Dhaniyari)", type: "Affordable Plots & Gated Land", trend: "Rapidly expanding corridor near the Raipur International Stadium." }
  ];

  return (
    <div className="bg-warm-bg text-foreground">
      <Header activeLabel="Projects" />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={heroProperty} alt="Real Estate in Dehradun Uttarakhand" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.6)_0%,rgba(15,23,42,0.9)_100%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 pt-36 pb-32 md:pt-48 md:pb-40 text-primary-foreground">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold-soft mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Premium Capital Investment
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight max-w-4xl animate-fade-up">
            Real Estate & <span className="font-italic-serif text-gold">Land for Sale</span> in Dehradun
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-white/80">
            Explore verified luxury apartments, residential gated plots, and custom villas in North India's most preferred foothill lifestyle hub.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#listings" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-navy-deep font-medium hover:opacity-95">
              View All Listings ({properties.length}) <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/contact" hash="site-visit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10">
              <Calendar className="w-4 h-4" /> Book Site Visit
            </Link>
          </div>
        </div>
      </section>

      {/* REGIONAL GROWTH DRIVERS */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.2em] uppercase text-gold">Growth Drivers</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Why Dehradun is the Ultimate <span className="font-italic-serif text-gold">Real Estate Hub</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm md:text-base">
            Benefiting from state-backed infrastructure upgrades, Dehradun provides Delhi/NCR and NRI buyers with a high-growth investment asset class.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {drivers.map((d) => (
            <div key={d.title} className="bg-background rounded-2xl p-6 border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gold/15 grid place-content-center text-gold mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-lg leading-tight">{d.title}</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR MICRO-MARKETS */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs tracking-[0.2em] uppercase text-gold">Micro Markets</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
              Where to Invest in <span className="font-italic-serif text-gold">Dehradun Real Estate</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {microMarkets.map((m) => (
              <div key={m.name} className="bg-background rounded-xl p-5 border border-border">
                <h4 className="font-display font-semibold text-base">{m.name}</h4>
                <p className="text-xs text-gold font-medium mt-1">{m.type}</p>
                <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-2">{m.trend}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES LISTINGS */}
      <section id="listings" className="max-w-7xl mx-auto px-5 py-20">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-gold">Live Catalog</span>
            <h2 className="font-display text-3xl font-semibold mt-2">
              Verified Properties <span className="font-italic-serif text-gold">in Dehradun</span>
            </h2>
          </div>
          <Link to="/properties" className="text-sm font-semibold text-gold hover:underline flex items-center gap-1.5">
            Advanced Filters <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="rounded-2xl border border-border bg-background p-10 text-center">
            <p className="text-muted-foreground">No properties match currently. Try checking back later or contact us directly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* REQUEST CONSULTATION */}
      <section className="max-w-7xl mx-auto px-5 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center bg-background rounded-3xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
          <div className="relative h-full min-h-[320px]">
            <img src={interiorLiving} alt="Dehradun investment advisory" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.35),transparent)]" />
          </div>
          <div className="p-8 md:p-12">
            <span className="text-xs tracking-[0.2em] uppercase text-gold">Personal Advisory</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
              Consult a Dehradun <span className="font-italic-serif text-gold">Property Expert</span>
            </h2>
            <p className="text-muted-foreground mt-3">Schedule a free 15-minute consultation with our Managing Director Abhishek Kashyap. We will assess your investment goals, explain RERA updates, and list top gated-community plots for you.</p>
            <RequirementForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PropertyCard({ p }: { p: ListingProperty }) {
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
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link to="/contact" search={{ property: p.name }} hash="site-visit" className="inline-flex items-center justify-center gap-1.5 text-sm font-medium px-3 py-2.5 rounded-lg bg-navy-deep text-primary-foreground hover:opacity-90">
            <Calendar className="w-4 h-4" /> Site Visit
          </Link>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 text-sm font-medium px-3 py-2.5 rounded-lg border border-border hover:border-gold text-navy-deep">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
        <div className="mt-4 flex justify-end">
          <Link to="/projects/$slug" params={{ slug: p.slug }} search={{ landing: false }} className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg text-gold hover:underline">
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function RequirementForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("full_name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const type = formData.get("type") as string;
    const message = formData.get("message") as string;

    try {
      await submitLead({
        full_name: fullName,
        phone: phone,
        email: email || null,
        budget: "Any",
        preferred_location: "Dehradun City",
        interested_in: type || "Any",
        source: "Dehradun Landing Page",
        message: message || "",
        priority: "normal",
      });
      setSent(true);
      toast.success("Enquiry submitted successfully!");
    } catch (err: any) {
      console.error("Dehradun lead submission failed:", err);
      toast.error(err.message || "Failed to submit enquiry.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="py-8 text-center bg-gold/5 rounded-2xl border border-gold/15">
        <p className="text-gold font-semibold">Thank you! An expert will connect with you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input required type="text" name="full_name" placeholder="Full Name" className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-gold" />
        <input required type="tel" name="phone" placeholder="Phone Number" className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-gold" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input type="email" name="email" placeholder="Email Address (Optional)" className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-gold" />
        <select name="type" className="w-full h-11 px-3 rounded-xl border border-border bg-background text-sm text-muted-foreground focus:outline-none focus:border-gold">
          <option value="">Interested In...</option>
          <option value="Plot">Plots / Land</option>
          <option value="Apartment">Apartments</option>
          <option value="Villa">Villas / Houses</option>
        </select>
      </div>
      <textarea name="message" placeholder="Your requirements..." className="w-full h-24 p-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-gold resize-none" />
      <button type="submit" disabled={loading} className="w-full h-12 bg-navy-deep hover:bg-navy text-primary-foreground font-semibold rounded-xl transition shadow-md flex items-center justify-center">
        {loading ? "Submitting..." : "Submit Requirements"}
      </button>
    </form>
  );
}
