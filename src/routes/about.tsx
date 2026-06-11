import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Compass,
  FileCheck,
  Handshake,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopNav } from "@/components/DesktopNav";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import founderImg from "@/assets/founder.jpg";
import heroImg from "@/assets/hero-property.jpg";
import interiorImg from "@/assets/interior-living.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vineyard Infra — Trusted Real Estate Advisors in Dehradun" },
      {
        name: "description",
        content:
          "Meet the team behind Vineyard Infra. 12+ years of real estate expertise in Dehradun, helping families and investors make better property decisions.",
      },
      { property: "og:title", content: "About Vineyard Infra — Trusted Real Estate Advisors" },
      {
        property: "og:description",
        content:
          "More than property. We help people make better real estate decisions through transparency, expertise, and long-term relationships.",
      },
    ],
  }),
  component: AboutPage,
});

/* ---------- Counter hook ---------- */
function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.25 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/* ---------- Nav ---------- */
function TopNav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-gold flex items-center justify-center">
            <span className="font-display font-bold text-navy-deep">V</span>
          </div>
          <div className="text-white font-display font-semibold tracking-tight">
            Vineyard <span className="text-gold">Infra</span>
          </div>
        </Link>
        <DesktopNav variant="light" activeLabel="About Us" />
        <div className="flex items-center gap-2">
          <Button className="bg-gold text-navy-deep hover:bg-gold-soft hidden md:inline-flex">
            <Phone className="h-4 w-4" /> +91 98765 43210
          </Button>
          <MobileNav trigger="light" hideAt="lg" />
        </div>
      </div>
    </header>
  );
}

/* ---------- 1. Hero ---------- */
function HeroStory() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy-deep">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-transparent" />
      </div>
      <TopNav />
      <div className="relative max-w-7xl mx-auto px-5 md:px-10 py-32 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 text-white animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-white/5 backdrop-blur text-xs uppercase tracking-[0.18em] text-gold mb-6">
            <Sparkles className="h-3.5 w-3.5" /> About Vineyard Infra
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] font-semibold">
            More Than Property.
            <br />
            <span className="font-italic-serif text-gold">We help people make</span>
            <br />
            better real estate decisions.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/75 max-w-2xl">
            Building trust through market expertise, transparency, and long-term
            relationships — across Dehradun's most promising neighborhoods.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#founder">
              <Button size="lg" className="bg-gold text-navy-deep hover:bg-gold-soft h-12 px-7">
                Meet Our Founder <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <Link to="/properties">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 border-white/40 bg-white/5 text-white hover:bg-white hover:text-navy-deep"
              >
                Explore Projects
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-sm text-white/70">
            <Stat icon={<Award className="h-4 w-4 text-gold" />} label="RERA Registered" />
            <Stat icon={<ShieldCheck className="h-4 w-4 text-gold" />} label="Verified Listings" />
            <Stat icon={<Star className="h-4 w-4 text-gold" />} label="4.9 / 5 Client Rating" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </div>
  );
}

/* ---------- 2. Founder Spotlight ---------- */
const TIMELINE = [
  { year: "2012", title: "The Beginning", body: "Started journey in real estate as an advisor in Dehradun." },
  { year: "2015", title: "Investor Network", body: "Built a trusted network of HNI investors across North India." },
  { year: "2018", title: "Premium Projects", body: "Expanded into luxury villas and gated community partnerships." },
  { year: "2021", title: "Vineyard Infra", body: "Formally launched as a full-service real estate advisory." },
  { year: "2024", title: "Family Of 500+", body: "Helping families and investors discover the right opportunities." },
];

function FounderSpotlight() {
  const [active, setActive] = useState(0);
  return (
    <section id="founder" className="bg-warm-bg py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-5 relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-gold/30 to-transparent rounded-2xl -z-10 blur-xl" />
          <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-elevated)]">
            <img src={founderImg} alt="Founder portrait" className="w-full h-[520px] object-cover" />
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-navy-deep to-transparent text-white">
              <p className="font-display text-2xl font-semibold">Rohan Vineyard</p>
              <p className="text-sm text-gold">Founder & Principal Advisor</p>
              <p className="text-xs text-white/70 mt-1">12+ years • Dehradun Market</p>
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Founder Spotlight</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-navy-deep mt-3 leading-tight">
            A journey built on <span className="font-italic-serif text-gold">trust</span> and
            timing.
          </h2>
          <p className="text-slate-soft mt-5 text-lg leading-relaxed">
            Real estate isn't about transactions — it's about decisions that shape
            generations. Every project we touch starts with the same question:
            <em className="font-italic-serif text-navy"> "Would I recommend this to my own family?"</em>
          </p>
          <div className="mt-10">
            <div className="relative pl-6 border-l-2 border-border">
              {TIMELINE.map((t, i) => (
                <button
                  key={t.year}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="relative block w-full text-left py-3 group"
                >
                  <span
                    className={`absolute -left-[29px] top-5 h-4 w-4 rounded-full border-2 transition-all ${
                      active === i
                        ? "bg-gold border-gold scale-125"
                        : "bg-white border-border group-hover:border-gold"
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span
                      className={`font-display text-xl font-bold transition-colors ${
                        active === i ? "text-gold" : "text-navy-deep/60"
                      }`}
                    >
                      {t.year}
                    </span>
                    <span className="font-medium text-navy-deep">{t.title}</span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all ${
                      active === i ? "max-h-24 mt-1.5 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-slate-soft text-sm">{t.body}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Trust Metrics ---------- */
const METRICS = [
  { value: 320, suffix: "+", label: "Properties Sold", icon: Home },
  { value: 500, suffix: "+", label: "Happy Families", icon: Users },
  { value: 12, suffix: "yrs", label: "Of Experience", icon: Calendar },
  { value: 1200, suffix: "+", label: "Projects Evaluated", icon: Search },
  { value: 2400, suffix: "+", label: "Site Visits Organized", icon: MapPin },
];

function MetricCard({ m, start }: { m: (typeof METRICS)[0]; start: boolean }) {
  const v = useCountUp(m.value, 1800, start);
  const Icon = m.icon;
  return (
    <div className="group relative bg-white rounded-xl p-6 border border-border hover:border-gold transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
      <div className="h-11 w-11 rounded-lg bg-navy-deep/5 group-hover:bg-gold/15 flex items-center justify-center mb-4 transition-colors">
        <Icon className="h-5 w-5 text-navy-deep group-hover:text-gold transition-colors" />
      </div>
      <div className="font-display text-4xl font-bold text-navy-deep">
        {v.toLocaleString()}
        <span className="text-gold">{m.suffix}</span>
      </div>
      <div className="text-sm text-slate-soft mt-1">{m.label}</div>
    </div>
  );
}

function TrustMetrics() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section ref={ref} className="bg-navy-deep py-20 md:py-24 text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Why Clients Trust Us</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3">
            Numbers earned, not <span className="font-italic-serif text-gold">advertised.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 text-navy-deep">
          {METRICS.map((m) => (
            <MetricCard key={m.label} m={m} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Journey Timeline ---------- */
const JOURNEY = [
  { year: "2012", title: "Real Estate Journey", body: "First independent property advisory in Dehradun." },
  { year: "2015", title: "Builder Partnerships", body: "Tied up with 8 leading local developers." },
  { year: "2018", title: "₹100 Cr Milestone", body: "Crossed cumulative ₹100 crore in transactions." },
  { year: "2021", title: "Vineyard Infra Launch", body: "Formal brand launch with full-service advisory." },
  { year: "2023", title: "Premium Vertical", body: "Expanded into luxury villas and gated communities." },
  { year: "2024", title: "500+ Families", body: "Recognized as a top trusted advisor in the region." },
];

function JourneySection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Our Journey</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-navy-deep mt-3 max-w-2xl leading-tight">
              From a single advisor to a <span className="font-italic-serif text-gold">trusted</span> Dehradun name.
            </h2>
          </div>
          <p className="text-slate-soft max-w-md text-sm">
            Scroll horizontally to walk through our milestones — every step shaped
            how we serve clients today.
          </p>
        </div>
        <div className="relative">
          <div className="absolute top-[58px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="overflow-x-auto pb-6 -mx-5 px-5 md:mx-0 md:px-0 scroll-smooth">
            <div className="flex gap-5 md:gap-6 min-w-max">
              {JOURNEY.map((j, i) => (
                <div
                  key={j.year}
                  className="w-[260px] md:w-[300px] flex-shrink-0 group"
                >
                  <div className="flex items-center justify-center h-[60px]">
                    <div className="h-4 w-4 rounded-full bg-white border-2 border-gold relative z-10 group-hover:scale-150 transition-transform">
                      <div className="absolute inset-0.5 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="mt-4 bg-warm-bg rounded-xl p-6 border border-border group-hover:border-gold group-hover:shadow-[var(--shadow-card)] transition-all">
                    <div className="font-display text-3xl font-bold text-gold">{j.year}</div>
                    <div className="mt-2 font-display text-lg font-semibold text-navy-deep">{j.title}</div>
                    <p className="text-sm text-slate-soft mt-2">{j.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. How We Work ---------- */
const PROCESS = [
  { n: "01", title: "Understand Requirements", body: "Deep discovery call — budget, lifestyle, goals.", icon: Target },
  { n: "02", title: "Shortlist Opportunities", body: "Curated list of 3–5 verified properties.", icon: Compass },
  { n: "03", title: "Site Visits", body: "Guided tours with full transparency and Q&A.", icon: MapPin },
  { n: "04", title: "Due Diligence", body: "Legal, title, RERA, and bank loan check.", icon: FileCheck },
  { n: "05", title: "Property Acquisition", body: "Negotiation, paperwork, and registration support.", icon: Handshake },
  { n: "06", title: "Post-Sale Support", body: "Possession, interiors, rentals, resale guidance.", icon: ShieldCheck },
];

function HowWeWork() {
  return (
    <section className="bg-warm-bg py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">How We Work</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-navy-deep mt-3 leading-tight">
            A six-step path from <span className="font-italic-serif text-gold">enquiry</span> to keys.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROCESS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.n}
                className="group relative bg-white rounded-xl p-7 border border-border hover:border-gold transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="font-display text-5xl font-bold text-navy-deep/10 group-hover:text-gold/30 transition-colors">
                    {p.n}
                  </div>
                  <div className="h-11 w-11 rounded-lg bg-navy-deep flex items-center justify-center group-hover:bg-gold transition-colors">
                    <Icon className="h-5 w-5 text-gold group-hover:text-navy-deep transition-colors" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-navy-deep">{p.title}</h3>
                <p className="text-sm text-slate-soft mt-2">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Local Market Expertise ---------- */
const ZONES = [
  { name: "Rajpur Road", type: "Premium Residential", growth: "+18% YoY" },
  { name: "Sahastradhara Road", type: "Growth Corridor", growth: "+24% YoY" },
  { name: "Mussoorie Road", type: "Luxury Villas", growth: "+15% YoY" },
  { name: "Jakhan & Dalanwala", type: "Established Residential", growth: "+11% YoY" },
  { name: "IT Park Corridor", type: "Commercial & Investment", growth: "+22% YoY" },
  { name: "Doon Valley Outskirts", type: "Plot Investment", growth: "+30% YoY" },
];

function MarketExpertise() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Local Expertise</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-navy-deep mt-3 leading-tight">
            Deep understanding of the <span className="font-italic-serif text-gold">Dehradun</span> market.
          </h2>
          <p className="text-slate-soft mt-5 text-lg leading-relaxed">
            We've walked these roads, met these developers, and tracked these
            price trends for over a decade. Below are the zones we actively
            advise on.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-warm-bg rounded-lg">
              <div className="font-display text-2xl font-bold text-navy-deep">18</div>
              <div className="text-xs text-slate-soft mt-1">Active Zones</div>
            </div>
            <div className="text-center p-4 bg-warm-bg rounded-lg">
              <div className="font-display text-2xl font-bold text-navy-deep">42</div>
              <div className="text-xs text-slate-soft mt-1">Builder Partners</div>
            </div>
            <div className="text-center p-4 bg-warm-bg rounded-lg">
              <div className="font-display text-2xl font-bold text-navy-deep">12yr</div>
              <div className="text-xs text-slate-soft mt-1">Market Data</div>
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="relative rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-navy-deep to-navy p-1">
            <div className="relative bg-warm-bg rounded-xl p-6 md:p-8">
              <div
                className="absolute inset-0 opacity-[0.06] rounded-xl"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 40%, var(--navy-deep) 1px, transparent 1px), radial-gradient(circle at 70% 60%, var(--gold) 1px, transparent 1px)",
                  backgroundSize: "40px 40px, 60px 60px",
                }}
              />
              <div className="relative space-y-3">
                {ZONES.map((z, i) => (
                  <div
                    key={z.name}
                    className="group flex items-center gap-4 bg-white rounded-lg p-4 border border-border hover:border-gold hover:translate-x-1 transition-all"
                  >
                    <div className="h-10 w-10 rounded-full bg-gold/15 flex items-center justify-center text-gold font-display font-bold text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-navy-deep flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-gold" /> {z.name}
                      </div>
                      <div className="text-xs text-slate-soft">{z.type}</div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-emerald-700">
                      <TrendingUp className="h-3.5 w-3.5" /> {z.growth}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Partner Network ---------- */
const PARTNERS = [
  "Pacific Group", "Doon Realty", "Himalayan Builders", "Greenfield Estates",
  "HDFC Bank", "ICICI HFC", "SBI Home Loans", "Axis Bank",
  "Khaitan Legal", "Doon Advocates", "Verify360", "ClearTitle Co.",
];

function PartnerNetwork() {
  return (
    <section className="bg-warm-bg py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Partner Network</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-navy-deep mt-3 leading-tight">
            Backed by builders, banks & <span className="font-italic-serif text-gold">legal</span> experts.
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {PARTNERS.map((p) => (
            <div
              key={p}
              className="group h-24 flex items-center justify-center bg-white rounded-xl border border-border hover:border-gold hover:shadow-[var(--shadow-card)] transition-all"
            >
              <div className="text-center px-4">
                <div className="font-display text-base font-semibold text-navy-deep/70 group-hover:text-navy-deep transition-colors">
                  {p}
                </div>
                <div className="h-0.5 w-0 group-hover:w-8 bg-gold mx-auto mt-1.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Success Stories ---------- */
const STORIES = [
  {
    tag: "Family Home",
    title: "Finding a Family-Friendly Home",
    challenge: "A young family with two children needed a 3BHK near reputed schools.",
    solution: "Curated 6 verified options across Jakhan and Dalanwala within budget.",
    result: "Closed on a 3BHK villa with school 5 min away, in 28 days.",
    img: interiorImg,
  },
  {
    tag: "NRI Investor",
    title: "Long-Distance Investment, Zero Stress",
    challenge: "An NRI client wanted a hands-off plot investment with strong appreciation.",
    solution: "Identified Sahastradhara corridor plot, handled paperwork and registration end-to-end.",
    result: "₹65 L plot now valued at ₹89 L within 26 months. Fully managed.",
    img: heroImg,
  },
  {
    tag: "First-Time Buyer",
    title: "From Renter to Homeowner",
    challenge: "First-time buyer unsure about loan eligibility and right neighborhood.",
    solution: "Bank tie-up secured 85% loan; shortlisted 4 ready-to-move 2BHKs.",
    result: "Possession in 45 days. EMI lower than previous rent.",
    img: founderImg,
  },
];

function SuccessStories() {
  const [active, setActive] = useState(0);
  const s = STORIES[active];
  return (
    <section className="bg-navy-deep py-20 md:py-28 text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Client Stories</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3 max-w-2xl leading-tight">
              Real challenges. Real <span className="font-italic-serif text-gold">outcomes.</span>
            </h2>
          </div>
          <div className="flex gap-2">
            {STORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  active === i ? "w-10 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Story ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-5 relative rounded-2xl overflow-hidden min-h-[360px]">
            <img src={s.img} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6">
              <span className="inline-block px-3 py-1 rounded-full bg-gold text-navy-deep text-xs font-medium uppercase tracking-wide">
                {s.tag}
              </span>
              <h3 className="font-display text-2xl font-semibold mt-3">{s.title}</h3>
            </div>
          </div>
          <div className="md:col-span-7 bg-white/5 backdrop-blur rounded-2xl p-7 md:p-9 border border-white/10">
            <StoryBlock label="The Challenge" body={s.challenge} />
            <div className="h-px bg-white/10 my-6" />
            <StoryBlock label="Our Solution" body={s.solution} />
            <div className="h-px bg-white/10 my-6" />
            <StoryBlock label="The Result" body={s.result} highlight />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="bg-gold text-navy-deep hover:bg-gold-soft">
                Start Your Story <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-navy-deep">
                Read More Stories
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryBlock({ label, body, highlight }: { label: string; body: string; highlight?: boolean }) {
  return (
    <div>
      <p className={`text-xs uppercase tracking-[0.2em] font-semibold ${highlight ? "text-gold" : "text-white/60"}`}>
        {label}
      </p>
      <p className={`mt-2 leading-relaxed ${highlight ? "text-white text-lg font-medium" : "text-white/80"}`}>
        {body}
      </p>
    </div>
  );
}

/* ---------- 9. Our Promise ---------- */
const PROMISES = [
  { icon: ShieldCheck, title: "Transparent Advice", body: "No hidden agenda. We tell you the trade-offs before the price." },
  { icon: CheckCircle2, title: "Verified Opportunities", body: "Every property is title-checked, RERA-verified, site-inspected." },
  { icon: Sparkles, title: "No Hidden Surprises", body: "All-in pricing, registration costs, and timelines upfront." },
  { icon: Handshake, title: "Long-Term Relationship", body: "We're here for resale, rentals, and the next family member's home." },
  { icon: TrendingUp, title: "Market Insights", body: "Quarterly reports on price trends and emerging zones." },
  { icon: Users, title: "Personalized Support", body: "One dedicated advisor — not a call center, not a chatbot." },
];

function OurPromise() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Our Promise</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-navy-deep mt-3 leading-tight">
            What you can expect <span className="font-italic-serif text-gold">from us.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROMISES.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group p-7 rounded-xl border border-border hover:border-gold hover:bg-warm-bg transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-gold/15 flex items-center justify-center mb-5 group-hover:bg-gold transition-colors">
                  <Icon className="h-5 w-5 text-gold group-hover:text-navy-deep transition-colors" />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-deep">{p.title}</h3>
                <p className="text-sm text-slate-soft mt-2 leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 10. Team ---------- */
const TEAM = [
  { name: "Rohan Vineyard", role: "Founder & Principal Advisor", img: founderImg },
  { name: "Ananya Sharma", role: "Senior Relationship Manager" },
  { name: "Vikram Negi", role: "Property Consultant — Premium" },
  { name: "Priya Bhatt", role: "Operations & Documentation" },
];

function TeamSection() {
  return (
    <section className="bg-warm-bg py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">The Team</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-navy-deep mt-3 leading-tight">
            Real people. <span className="font-italic-serif text-gold">Real relationships.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {TEAM.map((m) => (
            <div key={m.name} className="group">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-navy-deep to-navy relative">
                {m.img ? (
                  <img
                    src={m.img}
                    alt={m.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gold/40 font-display text-6xl">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-navy-deep/90 to-transparent">
                  <p className="font-display text-white font-semibold">{m.name}</p>
                  <p className="text-xs text-gold">{m.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 11. FAQ ---------- */
const FAQS = [
  { q: "Why work with Vineyard Infra?", a: "12+ years of Dehradun-specific expertise, transparent advisory, verified inventory, and a dedicated single point of contact through your entire journey." },
  { q: "Do you charge brokerage?", a: "Our advisory is largely builder-funded for new projects. For resale and custom mandates, fees are disclosed upfront — no surprises." },
  { q: "Do you work with investors?", a: "Yes. We work with HNI and NRI investors on plots, pre-launch projects, and rental yield assets with clear ROI documentation." },
  { q: "Do you assist with site visits?", a: "Absolutely. We organize guided visits — including pickup, multi-property tours in a single day, and post-visit comparison reports." },
  { q: "Do you help with legal verification?", a: "Yes. Every property we recommend has been through title check, RERA verification, and (where needed) reviewed by our legal partners." },
];

function FAQSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5 md:px-10">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">FAQ</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-navy-deep mt-3 leading-tight">
            Common <span className="font-italic-serif text-gold">questions.</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display text-base md:text-lg text-navy-deep py-5 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-soft leading-relaxed text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------- 12. Final CTA ---------- */
function FinalCTA() {
  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden bg-navy-deep text-white">
      <div className="absolute inset-0 opacity-20">
        <img src={interiorImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/60" />
      </div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, var(--gold) 0%, transparent 40%), radial-gradient(circle at 80% 20%, var(--gold) 0%, transparent 35%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-5 md:px-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-white/5 text-xs uppercase tracking-[0.18em] text-gold mb-6">
          <Sparkles className="h-3.5 w-3.5" /> Let's Begin
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.1]">
          Let's find the right <span className="font-italic-serif text-gold">property</span> for you.
        </h2>
        <p className="mt-6 text-lg text-white/75 max-w-2xl mx-auto">
          Whether you're buying your first home, investing for growth, or
          searching for commercial opportunities — we're here to guide you.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="bg-gold text-navy-deep hover:bg-gold-soft h-12 px-6">
            <Calendar className="h-4 w-4" /> Book Consultation
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-6 border-white/30 bg-transparent text-white hover:bg-white hover:text-navy-deep">
            <MapPin className="h-4 w-4" /> Schedule Site Visit
          </Button>
          <Link to="/properties">
            <Button size="lg" variant="outline" className="h-12 px-6 border-white/30 bg-transparent text-white hover:bg-white hover:text-navy-deep">
              <Building2 className="h-4 w-4" /> Explore Projects
            </Button>
          </Link>
          <Button size="lg" className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 text-white">
            <MessageCircle className="h-4 w-4" /> WhatsApp Now
          </Button>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/60">
          <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +91 98765 43210</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Rajpur Road, Dehradun</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> RERA: UK02000XXXXXX</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
function AboutPage() {
  return (
    <main className="bg-white">
      <HeroStory />
      <FounderSpotlight />
      <TrustMetrics />
      <JourneySection />
      <HowWeWork />
      <MarketExpertise />
      <PartnerNetwork />
      <SuccessStories />
      <OurPromise />
      <TeamSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
