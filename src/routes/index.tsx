import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Calendar, Search, ArrowRight, MessageCircle,
  Bed, Maximize, Building2, ShieldCheck, Sparkles, HandCoins, Headset,
  TrendingUp, ChevronLeft, ChevronRight, Quote, Facebook, Instagram, Youtube,
  Award, Clock, Heart,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoTestimonialsSection } from "@/components/VideoTestimonialsSection";
import heroProperty from "@/assets/hero-property.jpg";
import heroVideo from "@/assets/up1.mp4";
import founder from "@/assets/founder.jpeg";
import expertConsultation from "@/assets/expert-consultation.jpg";
import { getFeaturedProperties, getLocations } from "@/api/properties";
import { mapToHomepageProject } from "@/mappers/propertyMapper";
import { getAvailableLocations } from "@/lib/locationUtils";
import { apiFetch } from "@/api/client";
import { toast } from "sonner";
import { submitLead } from "@/api/leads";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const [featured, locations] = await Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: ["featured-properties"],
        queryFn: () => getFeaturedProperties(),
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["locations"],
        queryFn: () => getLocations(),
      }),
    ]);
    const homepageProjects = featured.map(mapToHomepageProject);
    return { projects: homepageProjects, locations };
  },
  head: () => {
    const title = "Real Estate & Plots for Sale in Dehradun | Vineyard Infra";
    const desc = "Looking for premium property in Sahastradhara Road or Dehradun? Explore luxury apartments, residential plots, and villas for sale with Vineyard Infra today.";
    
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Vineyard Infra",
      "legalName": "Vineyard Infra Realcon LLP",
      "url": "https://vineyardinfra.com",
      "logo": "https://vineyardinfra.com/logo-horizontal.svg",
      "sameAs": [
        "https://www.facebook.com/vineyardinfra",
        "https://www.instagram.com/vineyardinfra/",
        "https://www.youtube.com/@vineyardinfra1900"
      ]
    };

    const agentSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Vineyard Infra",
      "image": "https://vineyardinfra.com/logo-horizontal.svg",
      "telephone": "+916397688989",
      "email": "vineyardinfra005@gmail.com",
      "url": "https://vineyardinfra.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Aman Vihar, Sahastradhara Road",
        "addressLocality": "Dehradun",
        "addressRegion": "Uttarakhand",
        "postalCode": "248001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 30.350669,
        "longitude": 78.0773398
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
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
        { rel: "canonical", href: "https://vineyardinfra.com" }
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(orgSchema),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(agentSchema),
        }
      ]
    };
  },
  component: Home,
});

const navLinks: { label: string; to: "/" | "/properties" | "/about" | "/contact" }[] = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/properties" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Happy Families" },
  { value: "₹750 Cr+", label: "Worth Properties Sold" },
  { value: "20+", label: "Projects Delivered" },
];



const typeOptions = ["Any Type", "Flat / Apartment", "Villa", "Independent House", "Plot", "Commercial Space", "Office Space", "Retail Shop"];
const budgetOptions = ["Any Budget", "Under 50 Lakhs", "50L - 1Cr", "1Cr - 2Cr", "2Cr+"];
const statusOptions = ["Any Status", "Ongoing", "Ready to Move", "Under Construction", "Upcoming"];

function Home() {
  const { projects, locations } = Route.useLoaderData();
  const locationOptions = useMemo(() => {
    return ["Any Location", ...locations];
  }, [locations]);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [search, setSearch] = useState({
    type: typeOptions[0],
    location: "Any Location",
    budget: budgetOptions[0],
    status: statusOptions[0]
  });

  const handleSearch = () => {
    const params = new URLSearchParams({
      type: search.type,
      location: search.location,
      budget: search.budget,
      status: search.status
    });
    navigate({ to: `/properties?${params.toString()}` as any });
  };

  const [footerSent, setFooterSent] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);

  const handleFooterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFooterLoading(true);
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("full_name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const interestedIn = formData.get("interested_in") as string;
    const message = formData.get("message") as string;

    try {
      await submitLead({
        full_name: fullName,
        phone: phone,
        email: email || null,
        interested_in: interestedIn !== "I am interested in" ? interestedIn : "Any",
        source: "Contact Page",
        message: message || "",
      });
      setFooterSent(true);
      toast.success("Enquiry submitted successfully!");
    } catch (err: any) {
      console.error("Footer enquiry failed:", err);
      toast.error(err.message || "Failed to submit enquiry.");
    } finally {
      setFooterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO with header */}
      <section className="relative h-screen min-h-[650px] md:min-h-[800px] overflow-hidden flex flex-col justify-between">
        {/* Fallback poster — renders instantly, avoids layout shift */}
        <img
          src={heroProperty}
          alt=""
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover z-0"
          aria-hidden="true"
        />
        {/* Background video — auto plays silently over the poster */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroProperty}
          className="absolute inset-0 size-full object-cover z-0 brightness-[0.92] contrast-[1.03]"
        >
          <source src="/up1.webm" type="video/webm" />
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Subtle black overlay with 10% opacity for text readability without filters */}
        <div className="absolute inset-0 bg-black/10 z-10" />

        {/* Header */}
        <Header activeLabel="Home" />

        {/* Hero content */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 md:px-12 lg:px-16 w-full flex-1 flex flex-col justify-end pb-36 md:pb-44">
          <div className="max-w-4xl text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-white leading-[1.3] drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
            >
              Premium Properties & Plots<br />
              <span className="font-italic-serif text-gold font-normal italic">For Sale in Dehradun</span>
            </motion.h1>
            
            {/* Primary & Secondary CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <Link
                to="/properties"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-r from-[#C9A45C] via-[#E6C587] to-[#B08A3E] px-8 py-3.5 md:py-4 text-xs md:text-sm font-semibold tracking-[0.14em] text-navy-deep shadow-[0_4px_15px_rgba(201,164,92,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,164,92,0.35)] active:translate-y-0 text-center uppercase select-none"
              >
                Explore Projects <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-[14px] border border-gold/45 bg-white/5 backdrop-blur-md px-8 py-3.5 md:py-4 text-xs md:text-sm font-semibold text-white transition-all duration-200 hover:bg-gold hover:text-navy-deep hover:border-gold hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(212,175,55,0.15)] active:translate-y-0 text-center uppercase tracking-[0.14em] select-none"
              >
                <Calendar className="size-4" /> Book Site Visit
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating action sidebar (Desktop only) */}
        <motion.aside
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
          className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 md:flex"
        >
          <a
            href="tel:+916397688989"
            title="Call Us"
            className="grid size-14 place-items-center rounded-full bg-navy-deep/80 text-gold backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-gold hover:text-navy-deep hover:scale-110 shadow-lg"
          >
            <Phone className="size-5" />
          </a>
          <a
            href="https://wa.me/916397688989?text=Hi%20Vineyard%20Infra%2C%20I'm%20interested%20in%20exploring%20properties%20in%20Dehradun."
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Us"
            className="grid size-14 place-items-center rounded-full bg-navy-deep/80 text-gold backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-gold hover:text-navy-deep hover:scale-110 shadow-lg"
          >
            <MessageCircle className="size-5" />
          </a>
          <a
            href="mailto:vineyardinfra005@gmail.com"
            title="Email Us"
            className="grid size-14 place-items-center rounded-full bg-navy-deep/80 text-gold backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-gold hover:text-navy-deep hover:scale-110 shadow-lg"
          >
            <Mail className="size-5" />
          </a>
        </motion.aside>

        {/* Mobile floating WhatsApp button */}
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          href="https://wa.me/916397688989?text=Hi%20Vineyard%20Infra%2C%20I'm%20interested%20in%20exploring%20properties%20in%20Dehradun."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 md:hidden"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-6 w-6 fill-white text-[#25D366]" />
        </motion.a>
      </section>

      {/* PROPERTY SEARCH (overlapping) */}
      <section className="relative -mt-24 z-30 mx-auto max-w-7xl px-6">
        <div className="rounded-sm bg-white p-6 shadow-elevated md:p-8" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h3 className="font-display text-2xl font-semibold text-navy-deep md:text-3xl">
              Find Your <span className="font-italic-serif text-gold">Perfect</span> Property
            </h3>
            <Link to="/properties" className="text-sm font-semibold text-gold hover:underline">View All Projects →</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="md:col-span-1">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-soft">Property Type</label>
              <select
                value={search.type}
                onChange={(e) => setSearch(s => ({ ...s, type: e.target.value }))}
                className="h-12 w-full rounded-sm border border-border bg-white px-3 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {typeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="md:col-span-1">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-soft">Location</label>
              <select
                value={search.location}
                onChange={(e) => setSearch(s => ({ ...s, location: e.target.value }))}
                className="h-12 w-full rounded-sm border border-border bg-white px-3 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {locationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="md:col-span-1">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-soft">Budget</label>
              <select
                value={search.budget}
                onChange={(e) => setSearch(s => ({ ...s, budget: e.target.value }))}
                className="h-12 w-full rounded-sm border border-border bg-white px-3 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {budgetOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="md:col-span-1">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-soft">Project Status</label>
              <select
                value={search.status}
                onChange={(e) => setSearch(s => ({ ...s, status: e.target.value }))}
                className="h-12 w-full rounded-sm border border-border bg-white px-3 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="flex h-12 items-center justify-center gap-2 self-end rounded-sm bg-navy-deep px-5 text-sm font-semibold text-white transition hover:bg-navy cursor-pointer"
            >
              <Search className="size-4" /> SEARCH PROPERTIES
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm tracking-[0.3em] text-gold">FEATURED PROJECTS</p>
            <h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">Handpicked Opportunities for You</h2>
          </div>
          <div className="flex gap-2">
            {[ChevronLeft, ChevronRight].map((Icon, i) => (
              <button key={i} className="grid size-11 place-items-center rounded-full border border-border text-slate-soft transition hover:border-gold hover:text-gold">
                <Icon className="size-5" />
              </button>
            ))}
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-slate-soft col-span-full">
            No featured properties available at the moment.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <article key={p.name} className="group overflow-hidden rounded-sm bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elevated" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="relative overflow-hidden">
                  <img src={p.img} alt={p.name} width={1024} height={768} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-sm px-3 py-1.5 text-[10px] font-bold tracking-wider text-navy-deep" style={{ background: "var(--gradient-gold)" }}>
                    {p.tag}
                  </span>
                  <span className="absolute right-4 top-4 rounded-sm bg-navy-deep px-3 py-1.5 text-[10px] font-semibold tracking-wider text-white">
                    {p.type}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-navy-deep">{p.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-soft">
                    <MapPin className="size-4 text-gold" /> {p.location}
                  </p>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-lg font-bold text-gold">{p.price} <span className="text-xs font-normal text-slate-soft">onwards</span></p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-soft">
                      <span className="flex items-center gap-1"><Bed className="size-3.5 text-gold" /> {p.bhk}</span>
                      <span className="flex items-center gap-1"><Building2 className="size-3.5 text-gold" /> {p.bath}</span>
                      <span className="flex items-center gap-1"><Maximize className="size-3.5 text-gold" /> {p.area}</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold">
                    <Link to="/projects/$slug" params={{ slug: p.slug }} search={{ landing: false }} className="flex items-center gap-1 text-navy-deep transition hover:text-gold">
                      VIEW DETAILS <ArrowRight className="size-3.5" />
                    </Link>
                    <a href={`https://wa.me/916397688989?text=${encodeURIComponent(`Hi Vineyard Infra, I'd like to enquire about ${p.name}.`)}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-navy-deep transition hover:text-gold">
                      GET IN TOUCH
                      <span className="grid size-6 place-items-center rounded-full bg-[#25D366] text-white">
                        <MessageCircle className="size-3" />
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* FOUNDER & TRUST */}
      <section className="bg-navy-deep py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3 md:items-center">
          <div>
            <p className="mb-3 text-sm tracking-[0.3em] text-gold">ABOUT VINEYARD INFRA</p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              Guiding You to <span className="font-italic-serif text-gold">Better</span><br />
              Real Estate Decisions
            </h2>
            <p className="mt-5 text-white/70">
              With deep market knowledge and a client-first approach, we help you find the right property that fits your goals and grows your future.
            </p>
            <div className="mt-6 flex flex-wrap gap-5 text-sm">
              {[
                { icon: ShieldCheck, label: "Trusted Advice" },
                { icon: Sparkles, label: "Transparent Deals" },
                { icon: Headset, label: "End-to-End Support" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-white/80">
                  <b.icon className="size-4 text-gold" /> {b.label}
                </div>
              ))}
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold text-navy-deep" style={{ background: "var(--gradient-gold)" }}>
              KNOW MORE ABOUT US <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-sm border border-gold/30" />
              <img src={founder} alt="Founder portrait" width={900} height={1100} loading="lazy" className="relative aspect-[3/4] w-72 object-cover rounded-sm md:w-80" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-1">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-gold pl-5">
                <p className="font-display text-4xl font-bold text-gold md:text-5xl">{s.value}</p>
                <p className="mt-1 text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#FDFBF8] overflow-hidden relative border-t border-b border-[#D4AF37]/10"
      >
        {/* Soft radial background glow behind the card */}
        <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-[#FAF8F3] blur-2xl pointer-events-none" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[42%_58%] lg:grid-cols-[45%_55%] items-center gap-12 lg:gap-20 px-6 py-24 relative z-10">
          {/* Left Column: Premium Card holding the illustration */}
          <div className="flex justify-center w-full">
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-[380px] md:max-w-none bg-white rounded-[20px] border border-[#D4AF37]/8 p-4 md:p-5 shadow-[0_12px_40px_rgba(212,175,55,0.04)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.09)] transition-all duration-300 hover:scale-[1.02] relative"
            >
              {/* Card Inner Glow */}
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-tr from-gold/[0.01] to-transparent pointer-events-none" />
              <img
                src={expertConsultation}
                alt="Expert property consultation"
                width={1200}
                height={800}
                loading="lazy"
                className="w-full h-auto object-contain rounded-lg relative z-10"
              />
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-center text-left md:pl-4 md:pt-[24px]">
            <p className="text-[11px] md:text-xs font-bold tracking-[0.25em] text-gold uppercase">PREMIUM PROPERTY CONSULTATION</p>
            {/* Elegant thin luxury divider */}
            <div className="w-10 h-[1.5px] bg-gold/30 mt-2.5" />

            <h2 className="font-display text-2xl md:text-3xl lg:text-[32px] font-bold text-navy-deep leading-tight mt-[16px]">
              Talk to Our Experts
            </h2>
            <p className="mt-[28px] max-w-xl text-[14.5px] leading-relaxed text-slate-soft">
              Get curated property suggestions, honest guidance, and direct answers. Contact us directly to fast-track your investment journey.
            </p>
            
            {/* Call to Actions */}
            <div className="mt-[36px] flex flex-col sm:flex-row gap-4 items-center">
              <a 
                href="tel:+916397688989" 
                className="w-full sm:w-auto h-[60px] inline-flex items-center justify-center gap-3 rounded-[16px] px-8 text-sm font-medium text-navy-deep shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-[2px]"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Phone className="size-4 shrink-0" /> 
                <span>Call +91 63976 88989</span>
              </a>
              <a 
                href="https://wa.me/916397688989?text=Hi%20Vineyard%20Infra%2C%20I'm%20interested%20in%20exploring%20properties%20in%20Dehradun." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto h-[60px] inline-flex items-center justify-center gap-3 rounded-[16px] border border-emerald-600/30 bg-emerald-500/5 hover:bg-emerald-500/10 px-8 text-sm font-medium text-emerald-700 transition-all duration-300 hover:-translate-y-[2px]"
              >
                <MessageCircle className="size-4 text-emerald-600 shrink-0" /> 
                <span>WhatsApp Now</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gold/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-soft">
              <div className="flex items-center gap-2">
                <span className="text-gold font-bold text-sm shrink-0">✓</span>
                <span>Free Property Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold font-bold text-sm shrink-0">✓</span>
                <span>Personalized Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold font-bold text-sm shrink-0">✓</span>
                <span>Schedule a Site Visit</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* VIDEO TESTIMONIALS */}
      <VideoTestimonialsSection />

      {/* WHY VINEYARD INFRA: STORIES & CREDIBILITY */}
      <motion.section
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2, // Coordinated delays between major stages
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="bg-background py-24 border-t border-border overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-6">

          {/* Stage 1: Heading & Subtitle */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">WHY VINEYARD INFRA</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-deep md:text-4xl">
              Why Homebuyers & Investors Choose Vineyard Infra
            </h2>
            <p className="mt-4 text-slate-soft text-sm md:text-base leading-relaxed">
              When you invest in Dehradun, you deserve more than a broker—you deserve a dedicated partner. We combine deep local roots with professional execution to make your buying journey transparent, secure, and stress-free.
            </p>
          </motion.div>

          {/* Stage 2 & Stage 3: Main Featured Cards (Asymmetric Grid Row 1) */}
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
            className="grid gap-6 md:grid-cols-3 mb-6"
          >
            {/* Stage 2: Large Hero Trust Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
              className="md:col-span-2 bg-navy-deep text-white border border-gold/40 shadow-[0_4px_25px_rgba(212,175,55,0.06)] rounded-2xl p-8 md:p-10 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)]"
            >
              <div>
                <div className="grid size-14 place-items-center rounded-xl bg-gold/15 text-gold mb-6 transition-transform duration-300 group-hover:scale-105">
                  <Award className="size-7" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-white mb-4">
                  15+ Years of Trust in Dehradun
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl">
                  We've guided over 500 happy families and smart investors to make secure, high-appreciating real estate choices since 2011.
                </p>
              </div>
            </motion.div>

            {/* Stage 3: Secondary Highlight Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
              className="bg-gradient-to-br from-warm-bg to-white border border-gold/30 shadow-sm rounded-2xl p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="grid size-14 place-items-center rounded-xl bg-gold/10 text-gold mb-6 transition-transform duration-300 group-hover:scale-105">
                  <Building2 className="size-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy-deep mb-4">
                  Your Complete Journey, Handled
                </h3>
                <p className="text-slate-soft text-xs md:text-sm leading-relaxed">
                  From legal approvals and architectural layout to construction, premium interiors, and post-possession management, we take care of everything under one roof.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Stage 4: Supporting Trust Cards Grid (Asymmetric Grid Row 2 & 3) */}
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 mb-16"
          >
            {[
              {
                title: "100% Clear & Verified Deals",
                desc: "We ensure all properties have clear titles, transparent pricing, and zero hidden costs—meaning your capital is always safe.",
                icon: ShieldCheck,
                layoutClass: "lg:col-span-2",
              },
              {
                title: "Built with Rigorous Standards",
                desc: "We enforce strict on-site testing and select premium materials to build structures that retain their quality and value for decades.",
                icon: Sparkles,
                layoutClass: "lg:col-span-2",
              },
              {
                title: "Guaranteed On-Time Delivery",
                desc: "Using structured milestones and professional project management, we guarantee key handover on the day we promise.",
                icon: Clock,
                layoutClass: "lg:col-span-2",
              },
              {
                title: "Advice Centered Around You",
                desc: "We listen to your budget and family or investment goals first, ensuring you only buy what fits your future.",
                icon: Headset,
                layoutClass: "lg:col-span-3",
              },
              {
                title: "Dedicated After-Sales Care",
                desc: "Our partnership doesn't end with a sale. We remain available for maintenance, tenant finding, and property management.",
                icon: Heart,
                layoutClass: "lg:col-span-3",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
                className={`group rounded-xl border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gold/30 ${card.layoutClass}`}
              >
                <div>
                  <div className="grid size-11 place-items-center rounded-lg bg-gold/10 text-gold mb-5 transition-transform duration-300 group-hover:scale-105">
                    <card.icon className="size-5" />
                  </div>
                  <h4 className="font-display text-base font-bold text-navy-deep mb-3">
                    {card.title}
                  </h4>
                  <p className="text-slate-soft text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stage 5: Expertise Badges */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  staggerChildren: 0.05,
                },
              },
            }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-soft mb-6">Our Areas of Professional Expertise</h4>
            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                "Real Estate",
                "Construction",
                "Interiors",
                "Project Development",
                "Project Management",
                "Sales & Marketing",
              ].map((chip) => (
                <motion.span
                  key={chip}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                  className="inline-flex items-center rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-semibold text-navy-deep transition-all duration-300 hover:border-gold/60 hover:bg-warm-bg cursor-default"
                >
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
                  {chip}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Stage 6: Final Call-To-Action Trust Banner */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
            className="rounded-2xl bg-navy-deep text-white p-8 md:p-12 text-center relative overflow-hidden shadow-[var(--shadow-elevated)]"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent pointer-events-none" />
            <p className="font-italic-serif text-lg md:text-2xl text-gold-soft leading-relaxed max-w-2xl mx-auto">
              "More than properties, we build trust, relationships, and long-term value for every client."
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 rounded-sm px-7 py-3.5 text-xs md:text-sm font-semibold text-navy-deep shadow-gold transition hover:brightness-105"
                style={{ background: "var(--gradient-gold)" }}
              >
                Explore Our Projects <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>


      {/* FOOTER */}
      <Footer />



    </div>
  );
}

