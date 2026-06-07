import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone, Mail, MapPin, Calendar, Search, Play, ArrowRight, MessageCircle,
  Bed, Maximize, Building2, ShieldCheck, Sparkles, HandCoins, Headset,
  TrendingUp, ChevronLeft, ChevronRight, Quote, Menu,
} from "lucide-react";
import heroProperty from "@/assets/hero-property.jpg";
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

const projects = [
  { slug: "vineyard-signature-villas", tag: "NEW LAUNCH", type: "Villas", name: "Vineyard Signature Villas", location: "Mussoorie Road, Dehradun", price: "₹1.45 Cr*", bhk: "3, 4 BHK", bath: "2-4 BHK", area: "2200 - 3000 Sq.Ft.", img: projectVilla },
  { slug: "vineyard-high-grove", tag: "PREMIUM", type: "Apartments", name: "Vineyard High Grove", location: "Sahastradhara Road, Dehradun", price: "₹78 L*", bhk: "2, 3 BHK", bath: "2, 3 BHK", area: "1200 - 1950 Sq.Ft.", img: projectApartments },
  { slug: "vineyard-green-county", tag: "ONGOING", type: "Plots", name: "Vineyard Green County", location: "Harrawala, Dehradun", price: "₹22.5 L*", bhk: "Residential Plots", bath: "—", area: "100 - 300 Sq.Yd.", img: projectPlots },
];

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "500+", label: "Happy Families" },
  { value: "₹750 Cr+", label: "Worth Properties Sold" },
  { value: "20+", label: "Projects Delivered" },
];

const features = [
  { icon: TrendingUp, title: "Market Expertise", desc: "In-depth knowledge of Dehradun real estate market trends." },
  { icon: Building2, title: "Premium Projects", desc: "Carefully selected projects with high appreciation potential." },
  { icon: ShieldCheck, title: "Transparent Process", desc: "Clear information, honest guidance and no hidden surprises." },
  { icon: HandCoins, title: "Best Value", desc: "We help you get the best value for your investment and future." },
  { icon: Headset, title: "End-to-End Support", desc: "From shortlisting to possession, we are with you at every step." },
];

const testimonials = [
  { name: "Rohan Mehta", location: "Dehradun", quote: "Vineyard Infra helped us find the perfect property. The team is professional, transparent and truly cares." },
  { name: "Neha Rawat", location: "Dehradun", quote: "Great experience from start to finish. They understood our needs and guided us in the right way." },
  { name: "Amit Sharma", location: "Dehradun", quote: "Highly recommended! Best real estate consultants in Dehradun with deep market knowledge." },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO with header */}
      <section className="relative min-h-[860px] overflow-hidden">
        <img src={heroProperty} alt="Luxury residential property at dusk" width={1920} height={1280} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/55 to-navy-deep/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/20 to-transparent" />

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
            <nav className="hidden items-center gap-9 text-sm font-medium text-white/85 lg:flex">
              {navLinks.map((l, i) => (
                <Link key={l.label} to={l.to} className={`hover:text-gold transition-colors ${i === 0 ? "text-white" : ""}`}>
                  {l.label.toUpperCase()}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Link to="/contact" className="hidden items-center gap-2 rounded-sm bg-gradient-gold px-5 py-3 text-sm font-semibold text-navy-deep shadow-gold transition hover:brightness-105 md:inline-flex" style={{ background: "var(--gradient-gold)" }}>
                <Calendar className="size-4" /> BOOK SITE VISIT
              </Link>
              <button className="grid size-11 place-items-center rounded-sm border border-white/20 text-white lg:hidden">
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-40 md:pt-24">
          <div className="max-w-2xl animate-fade-up">
            <p className="mb-5 text-sm tracking-[0.3em] text-gold">PREMIUM PROPERTIES. TRUSTED GUIDANCE.</p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl">
              Find. Invest. Grow.<br />
              With <span className="font-italic-serif text-gold">Confidence.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-white/75 md:text-lg">
              Curated real estate opportunities in Dehradun backed by market expertise and honest advice.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-sm px-7 py-4 text-sm font-semibold text-navy-deep shadow-gold transition hover:brightness-105" style={{ background: "var(--gradient-gold)" }}>
                EXPLORE PROJECTS <ArrowRight className="size-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
                <Calendar className="size-4" /> BOOK SITE VISIT
              </a>
            </div>

            <div className="mt-14 flex items-center gap-6">
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
            </div>
          </div>
        </div>

        {/* Floating sidebar */}
        <aside className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex">
          {[
            { icon: Phone, label: "Call Us" },
            { icon: MessageCircle, label: "WhatsApp" },
            { icon: Mail, label: "Email" },
          ].map((it) => (
            <button key={it.label} className="grid size-14 place-items-center rounded-sm bg-navy-deep/80 text-gold backdrop-blur transition hover:bg-gold hover:text-navy-deep">
              <it.icon className="size-5" />
            </button>
          ))}
        </aside>
      </section>

      {/* PROPERTY SEARCH (overlapping) */}
      <section className="relative -mt-24 z-30 mx-auto max-w-7xl px-6">
        <div className="rounded-sm bg-white p-6 shadow-elevated md:p-8" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h3 className="font-display text-2xl font-semibold text-navy-deep md:text-3xl">
              Find Your <span className="font-italic-serif text-gold">Perfect</span> Property
            </h3>
            <a href="#projects" className="text-sm font-semibold text-gold hover:underline">View All Projects →</a>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {[
              { label: "Property Type", placeholder: "Select Type" },
              { label: "Location", placeholder: "Select Location" },
              { label: "Budget", placeholder: "Select Budget" },
              { label: "Project Status", placeholder: "All Status" },
            ].map((f) => (
              <div key={f.label} className="md:col-span-1">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-soft">{f.label}</label>
                <select className="h-12 w-full rounded-sm border border-border bg-white px-3 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold">
                  <option>{f.placeholder}</option>
                </select>
              </div>
            ))}
            <button className="flex h-12 items-center justify-center gap-2 self-end rounded-sm bg-navy-deep px-5 text-sm font-semibold text-white transition hover:bg-navy">
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
                  <button className="flex items-center gap-1 text-navy-deep transition hover:text-gold">
                    VIEW DETAILS <ArrowRight className="size-3.5" />
                  </button>
                  <button className="flex items-center gap-1.5 text-navy-deep transition hover:text-gold">
                    GET IN TOUCH
                    <span className="grid size-6 place-items-center rounded-full bg-[#25D366] text-white">
                      <MessageCircle className="size-3" />
                    </span>
                  </button>
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
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold text-navy-deep" style={{ background: "var(--gradient-gold)" }}>
              KNOW MORE ABOUT US <ArrowRight className="size-4" />
            </a>
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

      {/* BOOK SITE VISIT CTA */}
      <section className="bg-warm-bg">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-[1fr_1.4fr_auto] md:items-center">
          <img src={interiorLiving} alt="Luxury interior" width={1024} height={800} loading="lazy" className="aspect-[5/4] w-full rounded-sm object-cover shadow-card" style={{ boxShadow: "var(--shadow-card)" }} />
          <div>
            <p className="mb-2 text-sm tracking-[0.3em] text-gold">VISIT BEFORE YOU INVEST</p>
            <h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">Book a Site Visit</h2>
            <p className="mt-4 max-w-md text-slate-soft">
              Explore our projects in person and experience the quality, location and lifestyle.
            </p>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-sm px-7 py-4 text-sm font-semibold text-navy-deep shadow-gold" style={{ background: "var(--gradient-gold)" }}>
              <Calendar className="size-4" /> BOOK SITE VISIT
            </a>
          </div>
          <div className="hidden md:block">
            <Calendar className="size-28 text-gold/20" strokeWidth={1} />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-3 text-sm tracking-[0.3em] text-gold">WHY INVEST WITH US?</p>
          <h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">Experience. Transparency. Results.</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3 lg:grid-cols-5">
            {features.map((f) => (
              <div key={f.title} className="group">
                <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full border border-gold/30 bg-white text-gold transition group-hover:bg-gold group-hover:text-navy-deep">
                  <f.icon className="size-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-base font-semibold text-navy-deep">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-soft">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm tracking-[0.3em] text-gold">CLIENT TESTIMONIALS</p>
              <h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">What Our Clients Say</h2>
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
            {testimonials.map((t) => (
              <article key={t.name} className="rounded-sm border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-card">
                <Quote className="size-7 text-gold" />
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-soft font-display font-semibold text-navy-deep">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-navy-deep">— {t.name}</p>
                    <p className="text-xs text-slate-soft">{t.location}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
              <p className="flex items-center gap-3"><Phone className="size-4 text-gold" /> +91 999 000 1234</p>
              <p className="flex items-center gap-3"><Mail className="size-4 text-gold" /> info@vineyardinfra.com</p>
              <p className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 text-gold" /> 2nd Floor, Corporate Tower,<br />Rajpur Road, Dehradun</p>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-[0.2em] text-gold">QUICK LINKS</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {navLinks.map((l) => <li key={l}><a href="#" className="hover:text-gold">{l}</a></li>)}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold tracking-[0.2em] text-gold">POPULAR LOCATIONS</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {["Rajpur Road", "Sahastradhara Road", "Mussoorie Road", "Dehradun City", "Harrawala"].map((l) => (
                <li key={l}><a href="#" className="hover:text-gold">{l}</a></li>
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
            <p>© 2024 Vineyard Infra. All Rights Reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-gold">Privacy Policy</a>
              <a href="#" className="hover:text-gold">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href="#" className="fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-gold transition hover:scale-110">
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}
