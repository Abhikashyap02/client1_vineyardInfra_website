import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  MapPin, Phone, MessageCircle, Calendar, ArrowRight, CheckCircle2,
  Building2, Maximize, Tag, Sparkles
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import heroProperty from "@/assets/hero-property.jpg";
import interiorLiving from "@/assets/interior-living.jpg";
import { searchProperties } from "@/api/properties";
import { mapToListingProperty } from "@/mappers/propertyMapper";
import type { ListingProperty } from "@/mappers/propertyMapper";
import { submitLead } from "@/api/leads";
import { toast } from "sonner";

const WHATSAPP = "https://wa.me/916397688989?text=Hi%20Vineyard%20Infra%2C%20I'm%20interested%20in%20exploring%20properties%20on%20Sahastradhara%20Road.";

export const Route = createFileRoute("/sahastradhara-road")({
  loader: async () => {
    try {
      const dbProperties = await searchProperties();
      const listingProperties = dbProperties.map(mapToListingProperty);
      return { properties: listingProperties };
    } catch (error) {
      console.error("Failed to load listing properties for Sahastradhara Road", error);
      return { properties: [] };
    }
  },
  head: () => {
    const title = "Property & Plots in Sahastradhara Road Dehradun | Vineyard";
    const desc = "Looking for a property in Sahastradhara Road Dehradun? Explore premium residential plots, 2/3 BHK flats, and independent houses for sale by Vineyard Infra.";
    const canonicalUrl = "https://vineyardinfra.com/sahastradhara-road";

    const localPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Sahastradhara Road Dehradun Real Estate Hub",
      "description": desc,
      "url": canonicalUrl,
      "about": {
        "@type": "Place",
        "name": "Sahastradhara Road",
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
  component: SahastradharaPage,
});

function SahastradharaPage() {
  const { properties } = Route.useLoaderData();

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const loc = p.location.toLowerCase();
      const name = p.name.toLowerCase();
      return (
        loc.includes("sahastradhara road") ||
        loc.includes("mandakini vihar") ||
        loc.includes("rajeshwar nagar") ||
        loc.includes("drone vatika") ||
        loc.includes("gujrada") ||
        loc.includes("dwarka enclave") ||
        loc.includes("chalang")
      );
    });
  }, [properties]);

  const landmarks = [
    { name: "IT Park Dehradun", time: "5 Mins", desc: "Primary IT/employment corridor in Uttarakhand, home to top tech firms." },
    { name: "Raipur Stadium & Chowk", time: "10 Mins", desc: "Raipur International Cricket Stadium and key city arterial circle." },
    { name: "Max Super Speciality Hospital", time: "15 Mins", desc: "Top-tier regional multi-speciality hospital." },
    { name: "Pacific Mall", time: "15 Mins", desc: "Dehradun's premier shopping and entertainment destination." },
    { name: "Jolly Grant Airport", time: "30 Mins", desc: "Easy access via Raipur-Thano bypass road avoiding city traffic." },
    { name: "Elite Boarding Schools", time: "10-15 Mins", desc: "Kasiga School, Doon School, Welham Girls/Boys are within easy driving distance." }
  ];

  const benefits = [
    { title: "Rapid Capital Appreciation", desc: "Land rates on Sahastradhara Road have appreciated by 8-12% annually, driven by commercial expansion and proximity to IT Park." },
    { title: "Expressway Connectivity", desc: "With the upcoming Delhi-Dehradun Expressway, travel time from Delhi/NCR will drop to just 2.5 hours, making this corridor a perfect weekend home." },
    { title: "Modern Civic Infrastructure", desc: "Properties here feature modern amenities like underground power cabling, Nagar Nigam municipal water connection, and wide approach roads." },
    { title: "Scenic Valley Environment", desc: "Offers panoramic 270-degree Mussoorie mountain views and clean air, situated close to the green reserved forest belt." }
  ];

  return (
    <div className="bg-warm-bg text-foreground">
      <Header activeLabel="Projects" />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={heroProperty} alt="Properties on Sahastradhara Road Dehradun" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.6)_0%,rgba(15,23,42,0.9)_100%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 pt-36 pb-32 md:pt-48 md:pb-40 text-primary-foreground">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold-soft mb-5">
            <Sparkles className="w-3.5 h-3.5" /> High-Growth Investment Corridor
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight max-w-4xl animate-fade-up">
            Properties & <span className="font-italic-serif text-gold">Plots for Sale</span> on Sahastradhara Road
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-white/80">
            Secure premium freehold plots, smart 2/3 BHK flats, and luxury independent villas in Dehradun's fastest-growing residential and investment zone.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#listings" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-navy-deep font-medium hover:opacity-95">
              Explore listings ({filtered.length}) <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/contact" hash="site-visit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10">
              <Calendar className="w-4 h-4" /> Book Site Visit
            </Link>
          </div>
        </div>
      </section>

      {/* INVESTMENT RATIONALE */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.2em] uppercase text-gold">Investment Rationale</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Why Delhi/NCR and NRI Buyers <span className="font-italic-serif text-gold">Choose Sahastradhara Road</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm md:text-base">
            Positioned as Dehradun's premium lifestyle and technology corridor, Sahastradhara Road offers an unmatched combination of scenic living and high commercial utility.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="bg-background rounded-2xl p-6 border border-border hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gold/15 grid place-content-center text-gold mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-lg leading-tight">{b.title}</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONNECTIVITY & LANDMARKS */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs tracking-[0.2em] uppercase text-gold">Unmatched Connectivity</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
                Key Local Landmarks <span className="font-italic-serif text-gold">& Distances</span>
              </h2>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Sahastradhara Road is strategically located with seamless, jam-free bypass access to airports, central city zones, and hill station getaways like Mussoorie and Landour.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <a href="tel:+916397688989" className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-deep text-white px-6 py-3.5 text-sm font-semibold hover:opacity-95 shadow-md">
                  <Phone className="w-4 h-4" /> Speak to Location Expert
                </a>
              </div>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {landmarks.map((l) => (
                <div key={l.name} className="bg-background rounded-xl p-5 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-semibold text-sm">{l.name}</h4>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-gold/10 text-gold">{l.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{l.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTIES LISTINGS */}
      <section id="listings" className="max-w-7xl mx-auto px-5 py-20">
        <div className="mb-10">
          <span className="text-xs tracking-[0.2em] uppercase text-gold">Live Opportunities</span>
          <h2 className="font-display text-3xl font-semibold mt-2">
            Verified Projects <span className="font-italic-serif text-gold">on Sahastradhara Road</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Gated townships, independent floors, and luxury villas with verified titles.</p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-background p-10 text-center">
            <p className="text-muted-foreground">No properties match currently. Share your requirements and we will locate off-market plots for you.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* REQUEST CONSULTATION */}
      <section className="max-w-7xl mx-auto px-5 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center bg-background rounded-3xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
          <div className="relative h-full min-h-[320px]">
            <img src={interiorLiving} alt="Sahastradhara Road investment" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.35),transparent)]" />
          </div>
          <div className="p-8 md:p-12">
            <span className="text-xs tracking-[0.2em] uppercase text-gold">Request Consultation</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
              Invest on <span className="font-italic-serif text-gold">Sahastradhara Road</span>
            </h2>
            <p className="text-muted-foreground mt-3">Submit your details to get a curated portfolio of plots, flats, and villas on Sahastradhara Road complete with possession timelines and RERA verifications.</p>
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
          <Link to={`/contact?property=${encodeURIComponent(p.name)}`} hash="site-visit" className="inline-flex items-center justify-center gap-1.5 text-sm font-medium px-3 py-2.5 rounded-lg bg-navy-deep text-primary-foreground hover:opacity-90">
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
        preferred_location: "Sahastradhara Road",
        interested_in: type || "Any",
        source: "Sahastradhara Landing Page",
        message: message || "",
        priority: "normal",
      });
      setSent(true);
      toast.success("Enquiry submitted successfully!");
    } catch (err: any) {
      console.error("Sahastradhara lead submission failed:", err);
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
