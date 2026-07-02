import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Calendar, Search, Play, ArrowRight, MessageCircle,
  Bed, Maximize, Building2, ShieldCheck, Sparkles, HandCoins, Headset,
  TrendingUp, ChevronLeft, ChevronRight, Quote, Facebook, Instagram, Youtube,
  Award, Clock, Heart,
} from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopNav } from "@/components/DesktopNav";
import { VideoTestimonialsSection } from "@/components/VideoTestimonialsSection";
import heroProperty from "@/assets/hero-property.jpg";
import heroVideo from "@/assets/up1.mp4";
import founder from "@/assets/founder.jpg";
import projectVilla from "@/assets/project-villa.jpg";
import projectApartments from "@/assets/project-apartments.jpg";
import projectPlots from "@/assets/project-plots.jpg";
import interiorLiving from "@/assets/interior-living.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vineyard Infra — Premium Real Estate in Dehradun" },
      { name: "description", content: "Curated luxury homes, plots and investment properties in Dehradun. Trusted guidance, transparent deals and end-to-end support from Vineyard Infra." },
      { property: "og:title", content: "Vineyard Infra — Premium Real Estate in Dehradun" },
      { property: "og:description", content: "Find, invest and grow with confidence. Premium properties backed by market expertise." },
    ],
  }),
  component: Home,
});

const navLinks: { label: string; to: "/" | "/properties" | "/about" | "/contact" }[] = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/properties" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

// navLinks is still used by the footer; header now uses DesktopNav

const projects = [
  { slug: "vineyard-signature-villas", tag: "NEW LAUNCH", type: "Villas", name: "Vineyard Signature Villas", location: "Mussoorie Road, Dehradun", price: "₹1.45 Cr*", bhk: "3, 4 BHK", bath: "2-4 BHK", area: "2200 - 3000 Sq.Ft.", img: projectVilla },
  { slug: "vineyard-high-grove", tag: "PREMIUM", type: "Apartments", name: "Vineyard High Grove", location: "Sahastradhara Road, Dehradun", price: "₹78 L*", bhk: "2, 3 BHK", bath: "2, 3 BHK", area: "1200 - 1950 Sq.Ft.", img: projectApartments },
  { slug: "vineyard-green-county", tag: "ONGOING", type: "Plots", name: "Vineyard Green County", location: "Harrawala, Dehradun", price: "₹22.5 L*", bhk: "Residential Plots", bath: "—", area: "100 - 300 Sq.Yd.", img: projectPlots },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Happy Families" },
  { value: "₹750 Cr+", label: "Worth Properties Sold" },
  { value: "20+", label: "Projects Delivered" },
];



const typeOptions = ["Any Type", "Flat / Apartment", "Villa", "Independent House", "Plot", "Commercial Space", "Office Space", "Retail Shop"];
const locationOptions = ["Any Location", "Rajpur Road", "Sahastradhara Road", "Mussoorie Road", "Haridwar Road", "Harrawala", "Clement Town"];
const budgetOptions = ["Any Budget", "Under 50 Lakhs", "50L - 1Cr", "1Cr - 2Cr", "2Cr+"];
const statusOptions = ["Any Status", "Ongoing", "Ready to Move", "Under Construction", "Upcoming"];

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    type: typeOptions[0],
    location: locationOptions[0],
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO with header */}
      <section className="relative min-h-[860px] overflow-hidden">
        {/* Fallback poster — renders instantly, avoids layout shift */}
        <img src={heroProperty} alt="" width={1920} height={1280} className="absolute inset-0 size-full object-cover" aria-hidden="true" />
        {/* Background video — auto plays silently over the poster */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroProperty}
          className="absolute inset-0 size-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Dark overlays for text readability — optimized to showcase the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/20 to-navy-deep/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/60 via-navy-deep/10 to-transparent" />

        {/* Header */}
        <header className="relative z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <Link to="/" className="flex items-center gap-3 text-white">
              <div className="grid size-11 place-items-center rounded-sm border border-gold/40 font-display text-gold text-lg">V</div>
              <div className="leading-tight">
                <div className="font-display text-lg font-bold tracking-wide">VINEYARD</div>
                <div className="text-[10px] tracking-[0.4em] text-gold">INFRA</div>
              </div>
            </Link>
            <DesktopNav variant="light" />
            <div className="flex items-center gap-3">
              <a href="tel:+916397688989" className="relative hidden items-center gap-2 rounded-sm bg-gradient-gold px-5 py-3 text-sm font-semibold text-navy-deep shadow-gold transition hover:brightness-105 md:inline-flex animate-cta-pulse" style={{ background: "var(--gradient-gold)" }}>
                <Phone className="size-4 animate-text-blink" /> CALL: +91 63976 88989
              </a>
              <MobileNav trigger="light" hideAt="lg" />
            </div>
          </div>
        </header>

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-36 md:pt-40 md:pb-44">
          <div className="max-w-2xl animate-fade-up">
            <p className="mb-4 text-xs tracking-[0.3em] text-gold">PREMIUM PROPERTIES. TRUSTED GUIDANCE.</p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
              Find. Invest. Grow.<br />
              With <span className="font-italic-serif text-gold">Confidence.</span>
            </h1>
            <p className="mt-4 max-w-md text-sm text-white/70 md:text-base">
              Curated real estate opportunities in Dehradun backed by market expertise and honest advice.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/properties" className="inline-flex items-center gap-2 rounded-sm px-5 py-3 text-xs md:text-sm font-semibold text-navy-deep shadow-gold transition hover:brightness-105" style={{ background: "var(--gradient-gold)" }}>
                EXPLORE PROJECTS <ArrowRight className="size-4" />
              </Link>
              <a href="https://wa.me/916397688989?text=Hi%20Vineyard%20Infra%2C%20I'm%20interested%20in%20exploring%20properties%20in%20Dehradun." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm border border-gold/60 bg-gold/10 px-5 py-3 text-xs md:text-sm font-semibold text-gold backdrop-blur transition hover:bg-gold/20 animate-border-glow">
                <MessageCircle className="size-4 text-gold animate-text-blink" /> CHAT ON WHATSAPP
              </a>
            </div>

            <div className="mt-14 flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-display text-gold">01</span>
                <span className="text-white/40">02</span>
                <span className="text-white/40">03</span>
              </div>
              <div className="h-px flex-1 max-w-32 bg-white/20" />
              <button className="flex items-center gap-3 text-white">
                <span className="grid size-14 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition hover:bg-white/20">
                  <Play className="size-5 fill-white" />
                </span>
                <span className="text-sm font-medium">Watch Walkthrough</span>
              </button>
              <div className="hidden lg:flex items-center gap-3 border-l border-white/20 pl-6 text-xs text-white/50 tracking-wider uppercase">
                <span>Follow us</span>
                <div className="flex gap-2.5">
                  <a href="https://www.facebook.com/vineyardinfra" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-gold transition-colors" aria-label="Facebook"><Facebook className="size-4" /></a>
                  <a href="https://www.instagram.com/vineyardinfra/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-gold transition-colors" aria-label="Instagram"><Instagram className="size-4" /></a>
                  <a href="https://www.youtube.com/@vineyardinfra1900" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-gold transition-colors" aria-label="YouTube"><Youtube className="size-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating sidebar */}
        <aside className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex">
          <a
            href="tel:+916397688989"
            title="Call Us"
            className="grid size-14 place-items-center rounded-sm bg-navy-deep/80 text-gold backdrop-blur transition hover:bg-gold hover:text-navy-deep"
          >
            <Phone className="size-5" />
          </a>
          <a
            href="https://wa.me/916397688989?text=Hi%20Vineyard%20Infra%2C%20I'm%20interested%20in%20exploring%20properties%20in%20Dehradun."
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Us"
            className="grid size-14 place-items-center rounded-sm bg-navy-deep/80 text-gold backdrop-blur transition hover:bg-gold hover:text-navy-deep"
          >
            <MessageCircle className="size-5" />
          </a>
          <a
            href="mailto:vineyardinfra005@gmail.com"
            title="Email Us"
            className="grid size-14 place-items-center rounded-sm bg-navy-deep/80 text-gold backdrop-blur transition hover:bg-gold hover:text-navy-deep"
          >
            <Mail className="size-5" />
          </a>
        </aside>
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
                  <Link to="/projects/$slug" params={{ slug: p.slug }} className="flex items-center gap-1 text-navy-deep transition hover:text-gold">
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
      <section className="bg-warm-bg overflow-hidden relative">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-[1fr_1.4fr_auto] md:items-center">
          <img src={interiorLiving} alt="Luxury interior" width={1024} height={800} loading="lazy" className="aspect-[5/4] w-full rounded-sm object-cover shadow-card" style={{ boxShadow: "var(--shadow-card)" }} />
          <div>
            <p className="mb-2 text-sm tracking-[0.3em] text-gold">DIRECT ACCESS TO ADVISORS</p>
            <h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">Talk to Our Experts</h2>
            <p className="mt-4 max-w-md text-slate-soft">
              Get curated property suggestions, honest guidance, and direct answers. Contact us directly to fast-track your investment journey.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <a href="tel:+916397688989" className="inline-flex items-center gap-2 rounded-sm px-7 py-4 text-sm font-semibold text-navy-deep shadow-gold transition hover:brightness-105 animate-cta-pulse" style={{ background: "var(--gradient-gold)" }}>
                <Phone className="size-4 animate-text-blink" /> Call +91 63976 88989
              </a>
              <a href="https://wa.me/916397688989?text=Hi%20Vineyard%20Infra%2C%20I'm%20interested%20in%20exploring%20properties%20in%20Dehradun." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm border border-emerald-600/30 bg-emerald-500/10 px-7 py-4 text-sm font-semibold text-emerald-700 hover:bg-emerald-500/20 transition-all">
                <MessageCircle className="size-4 text-emerald-600" /> WhatsApp Now
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <Phone className="size-28 text-gold/20 animate-text-blink" strokeWidth={1} />
          </div>
        </div>
      </section>

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


      {/* CONTACT & FOOTER */}
      <footer id="contact" className="bg-navy-deep text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-bold leading-tight">
              Let's Find the Right<br />Property for You
            </h3>
            <p className="mt-4 text-sm text-white/60">
              Connect with us today and take the first step towards your dream investment.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/80">
              <p className="flex items-center gap-3"><a href="tel:+916397688989" className="hover:text-gold flex items-center gap-3"><Phone className="size-4 text-gold" /> +91 63976 88989</a></p>
              <p className="flex items-center gap-3"><a href="mailto:vineyardinfra005@gmail.com" className="hover:text-gold flex items-center gap-3"><Mail className="size-4 text-gold" /> vineyardinfra005@gmail.com</a></p>
              <p className="flex items-start gap-3">
                <a href="https://www.google.com/maps/place/Vineyard+Infra+%7C+Construction+Company+in+Dehradun/@30.350669,78.0747649,17z/data=!4m14!1m7!3m6!1s0x3908d713b0382577:0xb00ba938afbc2032!2sVineyard+Infra+%7C+Construction+Company+in+Dehradun!8m2!3d30.350669!4d78.0773398!16s%2Fg%2F11h_wp3tsq!3m5!1s0x3908d713b0382577:0xb00ba938afbc2032!8m2!3d30.350669!4d78.0773398!16s%2Fg%2F11h_wp3tsq?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="hover:text-gold flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 text-gold shrink-0" />
                  <span>AMAN VIHAR SAHASTRADHARA ROAD,<br />Dehradun 248001</span>
                </a>
              </p>
            </div>
            <div className="mt-8">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-gold uppercase mb-3">FOLLOW OUR JOURNEY</p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/vineyardinfra" target="_blank" rel="noopener noreferrer" className="grid size-9 place-items-center rounded-sm bg-white/5 text-gold border border-white/10 hover:bg-gold hover:text-navy-deep hover:border-gold transition-all duration-300" aria-label="Facebook"><Facebook className="size-4" /></a>
                <a href="https://www.instagram.com/vineyardinfra/" target="_blank" rel="noopener noreferrer" className="grid size-9 place-items-center rounded-sm bg-white/5 text-gold border border-white/10 hover:bg-gold hover:text-navy-deep hover:border-gold transition-all duration-300" aria-label="Instagram"><Instagram className="size-4" /></a>
                <a href="https://www.youtube.com/@vineyardinfra1900" target="_blank" rel="noopener noreferrer" className="grid size-9 place-items-center rounded-sm bg-white/5 text-gold border border-white/10 hover:bg-gold hover:text-navy-deep hover:border-gold transition-all duration-300" aria-label="YouTube"><Youtube className="size-4" /></a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-[0.2em] text-gold">QUICK LINKS</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {navLinks.map((l) => <li key={l.label}><Link to={l.to} className="hover:text-gold">{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-[0.2em] text-gold">POPULAR LOCATIONS</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {["Rajpur Road", "Mussoorie Road", "Sahastradhara Road", "Haridwar Road", "Clement Town"].map((l) => (
                <li key={l}>
                  <Link to={`/properties?location=${encodeURIComponent(l)}`} className="hover:text-gold">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <h4 className="mb-5 text-sm font-semibold tracking-[0.2em] text-gold">ENQUIRE NOW</h4>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Your Name" className="h-11 rounded-sm border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none" />
              <input placeholder="Phone Number" className="h-11 rounded-sm border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none" />
              <input placeholder="Email Address" className="h-11 rounded-sm border border-white/15 bg-white/5 px-3 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none" />
              <select className="h-11 rounded-sm border border-white/15 bg-white/5 px-3 text-sm text-white/60 focus:border-gold focus:outline-none">
                <option>I am interested in</option>
                <option>Villas</option><option>Apartments</option><option>Plots</option>
              </select>
            </div>
            <textarea placeholder="Your Message" rows={3} className="w-full rounded-sm border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none" />
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold text-navy-deep" style={{ background: "var(--gradient-gold)" }}>
              SUBMIT ENQUIRY <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-white/50">
            <div className="flex items-center gap-4 flex-wrap">
              <p>© 2024 Vineyard Infra. All Rights Reserved.</p>
              <div className="flex gap-3 border-l border-white/10 pl-4">
                <a href="https://www.facebook.com/vineyardinfra" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Facebook"><Facebook className="size-3.5" /></a>
                <a href="https://www.instagram.com/vineyardinfra/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Instagram"><Instagram className="size-3.5" /></a>
                <a href="https://www.youtube.com/@vineyardinfra1900" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="YouTube"><Youtube className="size-3.5" /></a>
              </div>
            </div>
            <div className="flex gap-5">
              <a href="#" className="hover:text-gold">Privacy Policy</a>
              <a href="#" className="hover:text-gold">Terms</a>
            </div>
          </div>
        </div>
      </footer>



    </div>
  );
}

