import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  MapPin, Phone, MessageCircle, Calendar, ArrowRight, ArrowLeft, X,
  Bed, Bath, Maximize, Car, Compass, CalendarClock, Sofa, Building2,
  ShieldCheck, Sparkles, TrendingUp, Trees, Dumbbell, Waves, Users,
  PlayCircle, Download, Star, ChevronDown, Check, FileText, Home,
  GraduationCap, HeartPulse, ShoppingBag, Plane, Briefcase, Camera,
  Image as ImageIcon, BadgeCheck, Quote, Award, IndianRupee, Layers, KeyRound, Clock,
} from "lucide-react";
import propertyHero from "@/assets/property-hero.jpg";
import propertyBedroom from "@/assets/property-bedroom.jpg";
import propertyAmenity from "@/assets/property-amenity.jpg";
import interiorLiving from "@/assets/interior-living.jpg";
import projectVilla from "@/assets/project-villa.jpg";
import projectApartments from "@/assets/project-apartments.jpg";
import projectPlots from "@/assets/project-plots.jpg";

type Project = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  developer: string;
  type: string;
  startingPrice: string;
  possession: string;
  rera: string;
  badge: "New Launch" | "Ready to Move" | "Under Construction" | "Hot Property" | "Featured";
  summary: string;
  hero: string;
  gallery: { src: string; label: string }[];
  videoThumb: string;
  highlights: { icon: typeof Bed; label: string; value: string }[];
  usps: string[];
  configurations: { type: string; area: string; price: string; status: string }[];
  description: {
    vision: string;
    lifestyle: string;
    location: string;
    quality: string;
    investment: string;
  };
  amenities: { icon: typeof Waves; label: string }[];
  nearby: { icon: typeof GraduationCap; label: string; place: string; time: string }[];
  investment: { label: string; value: string; desc: string }[];
  faqs: { q: string; a: string }[];
  similar: { slug: string; name: string; location: string; price: string; img: string }[];
};

const projects: Record<string, Project> = {
  "vineyard-signature-villas": {
    slug: "vineyard-signature-villas",
    name: "Vineyard Signature Villas",
    tagline: "Hill-view luxury villas with private decks",
    location: "Mussoorie Road, Dehradun",
    developer: "Vineyard Infra Developers",
    type: "Luxury Villas",
    startingPrice: "₹1.45 Cr*",
    possession: "Dec 2026",
    rera: "UKRERA-D-2024-0421",
    badge: "Hot Property",
    summary:
      "Limited edition 3 & 4 BHK luxury villas perched on Mussoorie Road, offering panoramic valley views, curated interiors, and a private clubhouse — a rare investment in Dehradun's most aspirational corridor.",
    hero: propertyHero,
    gallery: [
      { src: propertyHero, label: "Exterior at Sunset" },
      { src: interiorLiving, label: "Living Room" },
      { src: propertyBedroom, label: "Master Bedroom" },
      { src: propertyAmenity, label: "Clubhouse Pool" },
      { src: projectVilla, label: "Villa Facade" },
      { src: projectApartments, label: "Interior Suite" },
    ],
    videoThumb: propertyAmenity,
    highlights: [
      { icon: Bed, label: "Bedrooms", value: "3 & 4 BHK" },
      { icon: Bath, label: "Bathrooms", value: "4 – 5" },
      { icon: Maximize, label: "Area", value: "2200 – 3000 Sq.Ft." },
      { icon: Car, label: "Parking", value: "2 Covered" },
      { icon: Compass, label: "Facing", value: "Valley / East" },
      { icon: CalendarClock, label: "Possession", value: "Dec 2026" },
      { icon: Sofa, label: "Furnishing", value: "Semi-Furnished" },
      { icon: Building2, label: "Property Age", value: "New Launch" },
    ],
    usps: [
      "Near Mussoorie Main Road",
      "Premium Clubhouse",
      "Gated Community",
      "High Appreciation Zone",
      "Valley Facing Plots",
      "Private Decks",
    ],
    configurations: [
      { type: "3 BHK", area: "2200 Sq.Ft.", price: "₹1.45 Cr*", status: "Available" },
      { type: "3 BHK + Study", area: "2480 Sq.Ft.", price: "₹1.68 Cr*", status: "Few Left" },
      { type: "4 BHK", area: "2800 Sq.Ft.", price: "₹2.15 Cr*", status: "Available" },
      { type: "4 BHK Penthouse", area: "3000 Sq.Ft.", price: "₹2.65 Cr*", status: "Limited" },
    ],
    description: {
      vision:
        "Vineyard Signature Villas is conceived as a sanctuary in the hills — a tightly curated collection of just 24 villas designed for families who value privacy, craftsmanship, and a deep connection to the landscape.",
      lifestyle:
        "Wake up to valley views, host evenings at the clubhouse, and let children grow up around landscaped gardens and a heated pool. Every detail — from imported sanitaryware to smart-home wiring — has been chosen for everyday luxury.",
      location:
        "Located 12 minutes from Rajpur Road and 25 minutes from Jolly Grant Airport, the project sits on Dehradun's most aspirational stretch, with quick access to top schools, hospitals, and Mussoorie hill station.",
      quality:
        "Engineered with seismic-resilient RCC framing, double-glazed windows, and a 10-year structural warranty. Construction is led by a Grade-A contractor with a track record across the Doon valley.",
      investment:
        "Mussoorie Road has clocked 14% YoY price appreciation over the last 5 years. With limited new launches and strong rental demand, Signature Villas offers both lifestyle and long-term wealth creation.",
    },
    amenities: [
      { icon: Waves, label: "Swimming Pool" },
      { icon: Dumbbell, label: "Fitness Centre" },
      { icon: Users, label: "Clubhouse" },
      { icon: Trees, label: "Landscape Garden" },
      { icon: Sparkles, label: "Children's Play Area" },
      { icon: TrendingUp, label: "Jogging Track" },
      { icon: ShieldCheck, label: "24x7 Security" },
      { icon: Building2, label: "Power Backup" },
      { icon: BadgeCheck, label: "Smart Access" },
    ],
    nearby: [
      { icon: GraduationCap, label: "School", place: "The Doon School", time: "5 mins" },
      { icon: HeartPulse, label: "Hospital", place: "Max Super Speciality", time: "8 mins" },
      { icon: ShoppingBag, label: "Market", place: "Pacific Mall", time: "10 mins" },
      { icon: Plane, label: "Airport", place: "Jolly Grant Airport", time: "25 mins" },
      { icon: Briefcase, label: "Business", place: "IT Park Sahastradhara", time: "15 mins" },
      { icon: Camera, label: "Attraction", place: "Mussoorie Mall Road", time: "35 mins" },
    ],
    investment: [
      { label: "Expected Appreciation", value: "12–15% YoY", desc: "Backed by 5-year Mussoorie Road trend." },
      { label: "Rental Yield", value: "₹55K – ₹85K/mo", desc: "Strong demand from expats and HNI tenants." },
      { label: "Growth Corridor", value: "Tier-1 Zone", desc: "Doon Master Plan priority development belt." },
      { label: "Infrastructure", value: "₹2,400 Cr+", desc: "Sanctioned road, metro feeder & utility upgrades." },
    ],
    faqs: [
      { q: "Is the project RERA approved?", a: "Yes, Vineyard Signature Villas is registered under UKRERA with registration number UKRERA-D-2024-0421. All construction milestones are publicly tracked." },
      { q: "What payment plans are available?", a: "We offer flexible construction-linked, subvention, and 10:80:10 plans. A dedicated advisor will share the plan that best fits your finances." },
      { q: "What is the possession date?", a: "Possession is scheduled for December 2026. Early-bird buyers also receive a complimentary interior consultation." },
      { q: "Are home loans available?", a: "Yes, the project is pre-approved by HDFC, SBI, ICICI, and Axis Bank. We assist with documentation and faster sanctions." },
      { q: "What are the maintenance charges?", a: "Indicative maintenance is ₹3.5/Sq.Ft. per month, inclusive of clubhouse, security, landscaping, and common utilities." },
    ],
    similar: [
      { slug: "vineyard-high-grove", name: "Vineyard High Grove", location: "Sahastradhara Road", price: "₹78 L*", img: projectApartments },
      { slug: "vineyard-crown-residences", name: "Vineyard Crown Residences", location: "Rajpur Road", price: "₹1.95 Cr*", img: interiorLiving },
      { slug: "vineyard-pine-estate", name: "Vineyard Pine Estate", location: "Mussoorie Road", price: "₹3.2 Cr*", img: projectVilla },
      { slug: "vineyard-green-county", name: "Vineyard Green County", location: "Harrawala", price: "₹22.5 L*", img: projectPlots },
    ],
  },
};

const projectOverrides: Record<string, Partial<Project>> = {
  "vineyard-high-grove": {
    name: "Vineyard High Grove",
    tagline: "Premium 2 & 3 BHK residences in a fast-growing corridor",
    location: "Sahastradhara Road, Dehradun",
    type: "Premium Apartments",
    startingPrice: "₹78 L*",
    possession: "Jun 2026",
    badge: "New Launch",
    hero: projectApartments,
  },
  "vineyard-crown-residences": {
    name: "Vineyard Crown Residences",
    tagline: "Boutique luxury apartments on Dehradun's most coveted address",
    location: "Rajpur Road, Dehradun",
    type: "Luxury Apartments",
    startingPrice: "₹1.95 Cr*",
    possession: "Ready to Move",
    badge: "Ready to Move",
    hero: interiorLiving,
  },
  "vineyard-pine-estate": {
    name: "Vineyard Pine Estate",
    tagline: "Limited edition forest-facing estate villas",
    location: "Mussoorie Road, Dehradun",
    type: "Estate Villas",
    startingPrice: "₹3.2 Cr*",
    possession: "Mar 2027",
    badge: "New Launch",
    hero: projectVilla,
  },
  "vineyard-green-county": {
    name: "Vineyard Green County",
    tagline: "RERA-approved residential plots with strong appreciation",
    location: "Harrawala, Dehradun",
    type: "Residential Plots",
    startingPrice: "₹22.5 L*",
    possession: "Ready to Register",
    badge: "Ready to Move",
    hero: projectPlots,
  },
  "vineyard-trade-centre": {
    name: "Vineyard Trade Centre",
    tagline: "Grade-A retail and office on a high-visibility stretch",
    location: "Haridwar Road, Dehradun",
    type: "Commercial",
    startingPrice: "₹55 L*",
    possession: "Dec 2026",
    badge: "Under Construction",
    hero: projectApartments,
  },
};

const WHATSAPP = (name: string) =>
  `https://wa.me/919999999999?text=${encodeURIComponent(`Hi Vineyard Infra, I'd like to enquire about ${name}.`)}`;

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const base = projects["vineyard-signature-villas"];
    if (projects[params.slug]) return { project: projects[params.slug] };
    const override = projectOverrides[params.slug];
    if (!override) throw notFound();
    return { project: { ...base, slug: params.slug, ...override } as Project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — ${p.location} | Vineyard Infra` : "Property | Vineyard Infra";
    const desc = p?.summary ?? "Premium properties by Vineyard Infra.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p ? [{ property: "og:image", content: p.hero }] : []),
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const wa = useMemo(() => WHATSAPP(project.name), [project.name]);

  return (
    <div className="min-h-screen bg-warm-bg pb-24 md:pb-0">
      <TopNav projectName={project.name} />

      {/* HERO + GALLERY */}
      <section className="bg-navy-deep">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <Breadcrumb name={project.name} />
          <div className="mt-4 grid gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-3">
            <button
              onClick={() => { setActiveImg(0); setLightbox(true); }}
              className="group relative col-span-4 row-span-2 md:col-span-3 overflow-hidden rounded-xl"
            >
              <img
                src={project.gallery[0].src}
                alt={project.gallery[0].label}
                width={1600}
                height={1024}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy-deep">
                <Sparkles className="h-3 w-3" /> {project.badge}
              </span>
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                <ImageIcon className="h-3.5 w-3.5" /> View all {project.gallery.length} photos
              </span>
            </button>

            {project.gallery.slice(1, 5).map((g: { src: string; label: string }, i: number) => (
              <button
                key={i}
                onClick={() => { setActiveImg(i + 1); setLightbox(true); }}
                className="group relative hidden md:block overflow-hidden rounded-xl"
              >
                <img
                  src={g.src}
                  alt={g.label}
                  width={640}
                  height={400}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {i === 3 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-medium text-white">
                    <PlayCircle className="mr-2 h-5 w-5" /> Walkthrough
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile thumb strip */}
          <div className="mt-3 flex gap-2 overflow-x-auto md:hidden">
            {project.gallery.slice(1).map((g: { src: string; label: string }, i: number) => (
              <button
                key={i}
                onClick={() => { setActiveImg(i + 1); setLightbox(true); }}
                className="shrink-0"
              >
                <img src={g.src} alt={g.label} loading="lazy" className="h-16 w-24 rounded-md object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          images={project.gallery}
          index={activeImg}
          onClose={() => setLightbox(false)}
          onChange={setActiveImg}
        />
      )}

      {/* OVERVIEW + STICKY FORM */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <Overview project={project} wa={wa} />
            <Highlights project={project} />
            <WhyInvest />
            <Configurations project={project} />
            <Description project={project} />
            <Amenities project={project} />
            <FloorPlan project={project} />
            <Location project={project} />
            <Walkthrough project={project} />
            <BrochureSection projectName={project.name} />
            <SiteVisitSection projectName={project.name} />
            <Investment project={project} />
            <Testimonials />
            <FAQ items={project.faqs} open={openFaq} setOpen={setOpenFaq} />
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <LeadForm projectName={project.name} wa={wa} />
            </div>
          </aside>
        </div>
      </section>

      {/* SIMILAR + FINAL CTA */}
      <Similar items={project.similar} />
      <FinalCTA project={project} wa={wa} />
      <Footer />

      {/* MOBILE STICKY ACTIONS */}
      <MobileSticky wa={wa} />
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function TopNav({ projectName }: { projectName: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-deep/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-white">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-gold font-display text-sm font-bold text-navy-deep">V</span>
          <span className="font-display text-base font-semibold tracking-tight">Vineyard Infra</span>
        </Link>
        <nav className="hidden gap-6 text-sm text-white/80 md:flex">
          <Link to="/" className="hover:text-gold">Home</Link>
          <Link to="/properties" className="hover:text-gold">Properties</Link>
          <Link to="/about" className="hover:text-gold">About</Link>
          <Link to="/contact" className="hover:text-gold">Contact</Link>
        </nav>
        <a href="tel:+919999999999" className="inline-flex items-center gap-2 rounded-md bg-gold px-3 py-1.5 text-xs font-semibold text-navy-deep hover:opacity-90">
          <Phone className="h-3.5 w-3.5" /> Call Advisor
        </a>
      </div>
    </header>
  );
}

function Breadcrumb({ name }: { name: string }) {
  return (
    <nav className="text-xs text-white/60">
      <Link to="/" className="hover:text-gold">Home</Link>
      <span className="mx-2">/</span>
      <Link to="/properties" className="hover:text-gold">Properties</Link>
      <span className="mx-2">/</span>
      <span className="text-white">{name}</span>
    </nav>
  );
}

function Lightbox({
  images, index, onClose, onChange,
}: { images: { src: string; label: string }[]; index: number; onClose: () => void; onChange: (i: number) => void }) {
  const prev = () => onChange((index - 1 + images.length) % images.length);
  const next = () => onChange((index + 1) % images.length);
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95">
      <div className="flex items-center justify-between p-4 text-white">
        <span className="text-sm">{index + 1} / {images.length} — {images[index].label}</span>
        <button onClick={onClose} aria-label="Close" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4">
        <button onClick={prev} className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20" aria-label="Previous">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <img src={images[index].src} alt={images[index].label} className="max-h-[80vh] max-w-full rounded-lg object-contain" />
        <button onClick={next} className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20" aria-label="Next">
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto p-4">
        {images.map((g, i) => (
          <button key={i} onClick={() => onChange(i)} className={`shrink-0 rounded-md border-2 ${i === index ? "border-gold" : "border-transparent"}`}>
            <img src={g.src} alt={g.label} className="h-16 w-24 rounded object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Overview({ project, wa }: { project: Project; wa: string }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 font-medium text-navy-deep">
          <BadgeCheck className="h-3.5 w-3.5 text-gold" /> RERA: {project.rera}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-navy-deep/5 px-2.5 py-1 font-medium text-navy-deep">
          {project.type}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
          <Check className="h-3.5 w-3.5" /> {project.possession} Possession
        </span>
      </div>
      <h1 className="mt-3 font-display text-3xl font-bold text-navy-deep md:text-5xl">{project.name}</h1>
      <p className="mt-2 flex items-center gap-2 text-sm text-slate-soft md:text-base">
        <MapPin className="h-4 w-4 text-gold" /> {project.location} · by {project.developer}
      </p>
      <p className="font-italic-serif mt-4 text-lg text-slate-soft md:text-xl">{project.tagline}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-soft md:text-base">{project.summary}</p>

      <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-soft">Starting Price</div>
          <div className="font-display text-3xl font-bold text-navy-deep md:text-4xl">{project.startingPrice}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="#lead" className="inline-flex items-center gap-2 rounded-md bg-navy-deep px-5 py-3 text-sm font-semibold text-white hover:bg-navy">
            <Calendar className="h-4 w-4" /> Book Site Visit
          </a>
          <a href="#lead" className="inline-flex items-center gap-2 rounded-md border border-navy-deep/15 bg-white px-5 py-3 text-sm font-semibold text-navy-deep hover:bg-navy-deep/5">
            Get Price Details
          </a>
          <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ kicker, title, desc }: { kicker?: string; title: string; desc?: string }) {
  return (
    <div className="mb-6">
      {kicker && <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{kicker}</div>}
      <h2 className="mt-1 font-display text-2xl font-bold text-navy-deep md:text-3xl">{title}</h2>
      {desc && <p className="mt-2 max-w-2xl text-sm text-slate-soft">{desc}</p>}
    </div>
  );
}

function Highlights({ project }: { project: Project }) {
  return (
    <div>
      <SectionTitle kicker="At a Glance" title="Key Property Highlights" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {project.highlights.map((h) => (
          <div key={h.label} className="rounded-xl border border-navy-deep/10 bg-white p-4">
            <h.icon className="h-5 w-5 text-gold" />
            <div className="mt-3 text-xs uppercase tracking-wider text-slate-soft">{h.label}</div>
            <div className="mt-1 font-display text-sm font-semibold text-navy-deep">{h.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.usps.map((u) => (
          <span key={u} className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1.5 text-xs font-medium text-navy-deep">
            <Star className="h-3 w-3 text-gold" /> {u}
          </span>
        ))}
      </div>
    </div>
  );
}

function Configurations({ project }: { project: Project }) {
  return (
    <div>
      <SectionTitle kicker="Pricing" title="Configurations & Price" desc="Transparent pricing across available unit types. Speak to an advisor for the latest inventory and offers." />
      <div className="overflow-hidden rounded-xl border border-navy-deep/10 bg-white">
        <div className="hidden grid-cols-5 gap-4 border-b border-navy-deep/10 bg-navy-deep/5 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-deep md:grid">
          <div>Configuration</div><div>Area</div><div>Price</div><div>Status</div><div className="text-right">Action</div>
        </div>
        {project.configurations.map((c) => (
          <div key={c.type} className="grid grid-cols-2 gap-3 border-b border-navy-deep/10 px-5 py-4 last:border-0 md:grid-cols-5 md:items-center md:gap-4">
            <div>
              <div className="text-xs text-slate-soft md:hidden">Configuration</div>
              <div className="font-display font-semibold text-navy-deep">{c.type}</div>
            </div>
            <div>
              <div className="text-xs text-slate-soft md:hidden">Area</div>
              <div className="text-sm text-navy-deep">{c.area}</div>
            </div>
            <div>
              <div className="text-xs text-slate-soft md:hidden">Price</div>
              <div className="font-display font-semibold text-navy-deep">{c.price}</div>
            </div>
            <div>
              <div className="text-xs text-slate-soft md:hidden">Status</div>
              <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                c.status === "Available" ? "bg-emerald-50 text-emerald-700" : c.status === "Few Left" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
              }`}>{c.status}</span>
            </div>
            <div className="md:text-right">
              <a href="#lead" className="inline-flex items-center gap-1.5 rounded-md bg-navy-deep px-3 py-2 text-xs font-semibold text-white hover:bg-navy">
                Enquire Now <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Description({ project }: { project: Project }) {
  const blocks = [
    { title: "Project Vision", body: project.description.vision, icon: Sparkles },
    { title: "Lifestyle Benefits", body: project.description.lifestyle, icon: Home },
    { title: "Location Benefits", body: project.description.location, icon: MapPin },
    { title: "Construction Quality", body: project.description.quality, icon: ShieldCheck },
    { title: "Investment Potential", body: project.description.investment, icon: TrendingUp },
  ];
  return (
    <div>
      <SectionTitle kicker="About the Project" title="A closer look at what makes it special" />
      <div className="grid gap-4 md:grid-cols-2">
        {blocks.map((b) => (
          <div key={b.title} className="rounded-xl border border-navy-deep/10 bg-white p-5">
            <div className="flex items-center gap-2 text-gold">
              <b.icon className="h-4 w-4" />
              <h3 className="font-display text-base font-semibold text-navy-deep">{b.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-soft">{b.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Amenities({ project }: { project: Project }) {
  return (
    <div>
      <SectionTitle kicker="Lifestyle" title="World-Class Amenities" />
      <div className="grid grid-cols-3 gap-3 md:grid-cols-3">
        {project.amenities.map((a) => (
          <div key={a.label} className="flex flex-col items-center gap-2 rounded-xl border border-navy-deep/10 bg-white p-4 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold">
              <a.icon className="h-5 w-5" />
            </span>
            <span className="text-xs font-medium text-navy-deep md:text-sm">{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloorPlan({ project }: { project: Project }) {
  return (
    <div>
      <SectionTitle kicker="Layouts" title="Floor Plans" desc="Tap to expand. Request a detailed PDF for full dimensions and unit options." />
      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-navy-deep/10 bg-white">
            <button onClick={() => alert("Floor plan zoom coming soon")} className="block w-full bg-warm-bg p-6">
              <SchematicFloorPlan variant={i} />
            </button>
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="font-display text-sm font-semibold text-navy-deep">
                  {project.configurations[i]?.type ?? "Plan"}
                </div>
                <div className="text-xs text-slate-soft">{project.configurations[i]?.area}</div>
              </div>
              <a href="#lead" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline">
                <Download className="h-3.5 w-3.5" /> Download
              </a>
            </div>
          </div>
        ))}
      </div>
      <a href="#lead" className="mt-4 inline-flex items-center gap-2 rounded-md border border-navy-deep/15 bg-white px-4 py-2.5 text-sm font-semibold text-navy-deep hover:bg-navy-deep/5">
        <FileText className="h-4 w-4" /> Request Detailed Floor Plan
      </a>
    </div>
  );
}

function SchematicFloorPlan({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 320 200" className="mx-auto h-40 w-full max-w-md text-navy-deep/70">
      <rect x="2" y="2" width="316" height="196" fill="none" stroke="currentColor" strokeWidth="2" />
      {variant === 0 ? (
        <>
          <line x1="160" y1="2" x2="160" y2="120" stroke="currentColor" strokeWidth="1.5" />
          <line x1="2" y1="120" x2="318" y2="120" stroke="currentColor" strokeWidth="1.5" />
          <line x1="240" y1="120" x2="240" y2="198" stroke="currentColor" strokeWidth="1.5" />
          <text x="80" y="65" textAnchor="middle" fontSize="10" fill="currentColor">Living</text>
          <text x="240" y="65" textAnchor="middle" fontSize="10" fill="currentColor">Master BR</text>
          <text x="120" y="165" textAnchor="middle" fontSize="10" fill="currentColor">Kitchen</text>
          <text x="280" y="165" textAnchor="middle" fontSize="10" fill="currentColor">BR 2</text>
        </>
      ) : (
        <>
          <line x1="2" y1="100" x2="318" y2="100" stroke="currentColor" strokeWidth="1.5" />
          <line x1="120" y1="2" x2="120" y2="100" stroke="currentColor" strokeWidth="1.5" />
          <line x1="200" y1="100" x2="200" y2="198" stroke="currentColor" strokeWidth="1.5" />
          <text x="60" y="55" textAnchor="middle" fontSize="10" fill="currentColor">Foyer</text>
          <text x="220" y="55" textAnchor="middle" fontSize="10" fill="currentColor">Living + Dining</text>
          <text x="100" y="155" textAnchor="middle" fontSize="10" fill="currentColor">Master BR</text>
          <text x="260" y="155" textAnchor="middle" fontSize="10" fill="currentColor">Study</text>
        </>
      )}
    </svg>
  );
}

function Location({ project }: { project: Project }) {
  return (
    <div>
      <SectionTitle kicker="Connectivity" title="Location Advantages" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-navy-deep/10 bg-white">
          <iframe
            title="Map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(project.location)}&output=embed`}
            className="h-72 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="space-y-2">
          {project.nearby.map((n) => (
            <div key={n.place} className="flex items-center justify-between rounded-lg border border-navy-deep/10 bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold">
                  <n.icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-display text-sm font-semibold text-navy-deep">{n.place}</div>
                  <div className="text-xs text-slate-soft">{n.label}</div>
                </div>
              </div>
              <span className="text-sm font-semibold text-navy-deep">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Walkthrough({ project }: { project: Project }) {
  return (
    <div>
      <SectionTitle kicker="See it Live" title="Project Walkthrough" />
      <div className="relative overflow-hidden rounded-2xl">
        <img src={project.videoThumb} alt="Walkthrough" loading="lazy" width={1280} height={720} className="aspect-video w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <button className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-navy-deep shadow-elevated transition-transform hover:scale-105">
            <PlayCircle className="h-8 w-8" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <a href="#lead" className="inline-flex items-center gap-2 rounded-md bg-navy-deep px-5 py-3 text-sm font-semibold text-white hover:bg-navy">
          <Calendar className="h-4 w-4" /> Schedule Physical Visit
        </a>
      </div>
    </div>
  );
}

function Investment({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl bg-navy-deep p-6 text-white md:p-10">
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Why Invest</div>
        <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">Investment Potential</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Backed by Dehradun's most aggressive growth corridor and infrastructure boost.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {project.investment.map((i) => (
          <div key={i.label} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs uppercase tracking-wider text-white/60">{i.label}</div>
            <div className="mt-2 font-display text-2xl font-bold text-gold">{i.value}</div>
            <p className="mt-2 text-xs text-white/70">{i.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  const items = [
    { name: "Anita & Rohan Mehta", role: "Buyer · Rajpur Road", body: "Vineyard's advisors guided us through every step — paperwork, loan, and even interior referrals. A genuinely premium experience.", rating: 5 },
    { name: "Vikram Anand", role: "Investor · Mumbai", body: "I bought two plots remotely. Their site visit videos and transparency made it the easiest property purchase I've done.", rating: 5 },
    { name: "Priya Kapoor", role: "Buyer · Sahastradhara", body: "Loved the curated shortlist — they understood our budget and lifestyle perfectly. Possession was on time.", rating: 5 },
  ];
  return (
    <div>
      <SectionTitle kicker="What Buyers Say" title="Trusted by 500+ Families" />
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((t) => (
          <div key={t.name} className="rounded-xl border border-navy-deep/10 bg-white p-5">
            <Quote className="h-5 w-5 text-gold" />
            <p className="mt-3 text-sm leading-relaxed text-slate-soft">"{t.body}"</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="font-display text-sm font-semibold text-navy-deep">{t.name}</div>
                <div className="text-xs text-slate-soft">{t.role}</div>
              </div>
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-soft">
        <Star className="h-4 w-4 fill-gold text-gold" />
        <span><span className="font-semibold text-navy-deep">4.9</span> on Google · 320+ reviews</span>
      </div>
    </div>
  );
}

function FAQ({
  items, open, setOpen,
}: { items: { q: string; a: string }[]; open: number | null; setOpen: (i: number | null) => void }) {
  return (
    <div>
      <SectionTitle kicker="Answers" title="Frequently Asked Questions" />
      <div className="divide-y divide-navy-deep/10 overflow-hidden rounded-xl border border-navy-deep/10 bg-white">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-display text-sm font-semibold text-navy-deep md:text-base">{f.q}</span>
                <ChevronDown className={`h-4 w-4 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <div className="px-5 pb-5 text-sm leading-relaxed text-slate-soft">{f.a}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LeadForm({ projectName, wa }: { projectName: string; wa: string }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div id="lead" className="overflow-hidden rounded-2xl border border-navy-deep/10 bg-white shadow-card">
      <div className="bg-navy-deep p-5 text-white">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Get in Touch</div>
        <h3 className="mt-1 font-display text-xl font-bold">Request Pricing & Brochure</h3>
        <p className="mt-1 text-xs text-white/70">A senior advisor will call you within 30 minutes.</p>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        className="space-y-3 p-5"
      >
        <input required placeholder="Your Name" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold" />
        <input required type="tel" placeholder="Phone Number" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold" />
        <input type="email" placeholder="Email Address" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold" />
        <select className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold">
          <option>Budget Range</option>
          <option>Under ₹1 Cr</option>
          <option>₹1 Cr – ₹2 Cr</option>
          <option>₹2 Cr – ₹3 Cr</option>
          <option>₹3 Cr+</option>
        </select>
        <textarea rows={3} placeholder={`Message about ${projectName}`} className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold" />
        {submitted && (
          <div className="rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            Thank you. Our advisor will reach out shortly.
          </div>
        )}
        <button type="submit" className="w-full rounded-md bg-gold px-4 py-3 text-sm font-semibold text-navy-deep transition-opacity hover:opacity-90">
          Get Pricing
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button type="submit" className="rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-xs font-semibold text-navy-deep hover:bg-navy-deep/5">
            Request Callback
          </button>
          <button type="submit" className="rounded-md bg-navy-deep px-3 py-2.5 text-xs font-semibold text-white hover:bg-navy">
            Book Site Visit
          </button>
        </div>
        <a href={wa} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-3 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700">
          <MessageCircle className="h-3.5 w-3.5" /> Chat on WhatsApp
        </a>
        <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-slate-soft">
          <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-gold" /> 100% Confidential</span>
          <span>·</span>
          <span>No spam calls</span>
        </div>
      </form>
    </div>
  );
}

function Similar({ items }: { items: Project["similar"] }) {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <SectionTitle kicker="Explore More" title="Similar Properties You'll Love" />
        <div className="grid gap-4 md:grid-cols-4">
          {items.map((s) => (
            <div key={s.slug} className="group overflow-hidden rounded-xl border border-navy-deep/10 bg-white shadow-card transition-shadow hover:shadow-elevated">
              <div className="overflow-hidden">
                <img src={s.img} alt={s.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold text-navy-deep">{s.name}</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-soft">
                  <MapPin className="h-3 w-3 text-gold" /> {s.location}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-navy-deep">{s.price}</span>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: s.slug }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline"
                  >
                    View <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ project, wa }: { project: Project; wa: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
      <div className="absolute inset-0 opacity-20">
        <img src={project.hero} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="container relative mx-auto px-4 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Take the Next Step</div>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-5xl">Ready to explore {project.name}?</h2>
        <p className="font-italic-serif mt-3 text-lg text-white/80 md:text-xl">
          Speak with a senior advisor — no obligation, complete transparency.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#lead" className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-navy-deep hover:opacity-90">
            <Calendar className="h-4 w-4" /> Book Site Visit
          </a>
          <a href="tel:+919999999999" className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15">
            <Phone className="h-4 w-4" /> Talk to Advisor
          </a>
          <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
            <MessageCircle className="h-4 w-4" /> WhatsApp Now
          </a>
          <a href="#lead" className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15">
            <Download className="h-4 w-4" /> Get Brochure
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-navy-deep/10 bg-white py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 text-xs text-slate-soft md:flex-row">
        <div>© {new Date().getFullYear()} Vineyard Infra. All rights reserved.</div>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-navy-deep">Home</Link>
          <Link to="/properties" className="hover:text-navy-deep">Properties</Link>
          <a href="#lead" className="hover:text-navy-deep">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function MobileSticky({ wa }: { wa: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 gap-1 border-t border-navy-deep/10 bg-white p-2 shadow-elevated md:hidden">
      <a href="tel:+919999999999" className="flex flex-col items-center justify-center gap-0.5 rounded-md py-2 text-[10px] font-semibold text-navy-deep">
        <Phone className="h-4 w-4 text-gold" /> Call
      </a>
      <a href={wa} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-0.5 rounded-md bg-emerald-600 py-2 text-[10px] font-semibold text-white">
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
      <a href="#lead" className="flex flex-col items-center justify-center gap-0.5 rounded-md bg-navy-deep py-2 text-[10px] font-semibold text-white">
        <Calendar className="h-4 w-4 text-gold" /> Visit
      </a>
      <a href="#lead" className="flex flex-col items-center justify-center gap-0.5 rounded-md border border-navy-deep/15 py-2 text-[10px] font-semibold text-navy-deep">
        <Download className="h-4 w-4 text-gold" /> Brochure
      </a>
    </div>
  );

function WhyInvest() {
  const reasons = [
    { icon: MapPin, title: "Prime Location", body: "Anchored on Dehradun's most aspirational corridor with sustained demand and limited new launches." },
    { icon: TrendingUp, title: "Future Appreciation", body: "12–15% YoY price growth backed by 5-year trend and strong absorption rates." },
    { icon: Layers, title: "Infrastructure Growth", body: "₹2,400 Cr+ sanctioned for roads, metro feeder, and utility upgrades around the project." },
    { icon: IndianRupee, title: "Rental Potential", body: "₹55K–₹85K/month rental demand from HNI families, expats, and corporate tenants." },
    { icon: Sparkles, title: "Premium Lifestyle", body: "Curated interiors, clubhouse, landscaped greens — designed for everyday luxury." },
    { icon: Award, title: "Developer Reputation", body: "12+ years, 500+ happy families, RERA-compliant, and Grade-A construction partners." },
  ];
  return (
    <div>
      <SectionTitle kicker="Investment Edge" title="Why This Project Stands Out" desc="Six reasons buyers and investors choose this project over comparable launches in Dehradun." />
      <div className="grid gap-4 md:grid-cols-3">
        {reasons.map((r) => (
          <div key={r.title} className="group rounded-xl border border-navy-deep/10 bg-white p-5 transition-shadow hover:shadow-card">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold transition-transform group-hover:scale-110">
              <r.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-base font-semibold text-navy-deep">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-soft">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrochureSection({ projectName }: { projectName: string }) {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <div id="brochure" className="overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-warm-bg to-white shadow-card">
      <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Project Brochure</div>
          <h2 className="mt-1 font-display text-2xl font-bold text-navy-deep md:text-3xl">Download Complete Project Brochure</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-soft">
            Get the official {projectName} brochure with floor plans, pricing, payment schedules, amenity details, and master plan. Unlocks instantly after a quick verification.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-navy-deep">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> All unit configurations & sizes</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Transparent pricing & payment plans</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Amenities, specs & master plan</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> RERA & legal documentation</li>
          </ul>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); setUnlocked(true); }}
          className="rounded-xl border border-navy-deep/10 bg-white p-5"
        >
          <div className="flex items-center gap-2 text-navy-deep">
            <FileText className="h-5 w-5 text-gold" />
            <h3 className="font-display text-base font-semibold">Unlock Brochure</h3>
          </div>
          <div className="mt-4 space-y-3">
            <input required placeholder="Your Name" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold" />
            <input required type="tel" placeholder="Phone Number" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold" />
            <input required type="email" placeholder="Email Address" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold" />
          </div>
          {unlocked ? (
            <a href="#" className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
              <Download className="h-4 w-4" /> Brochure Unlocked — Download Now
            </a>
          ) : (
            <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-navy-deep px-4 py-3 text-sm font-semibold text-white hover:bg-navy">
              <Download className="h-4 w-4" /> Download Brochure
            </button>
          )}
          <p className="mt-3 text-[10px] text-slate-soft text-center">
            <ShieldCheck className="mr-1 inline h-3 w-3 text-gold" /> Your details stay confidential. No spam, ever.
          </p>
        </form>
      </div>
    </div>
  );
}

function SiteVisitSection({ projectName }: { projectName: string }) {
  const [booked, setBooked] = useState(false);
  const times = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM"];
  const [time, setTime] = useState(times[0]);
  return (
    <div id="site-visit" className="overflow-hidden rounded-2xl bg-navy-deep p-6 text-white md:p-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Site Visit</div>
          <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">Experience {projectName} In Person</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Walk the site with a senior advisor. We arrange complimentary pickup, full project walkthrough, sample unit tour, and an honest consultation — no pressure.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><Car className="h-4 w-4" /></span>
              <div><div className="font-semibold">Complimentary Pickup & Drop</div><div className="text-white/70 text-xs">Within Dehradun city limits</div></div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><KeyRound className="h-4 w-4" /></span>
              <div><div className="font-semibold">Sample Unit Walkthrough</div><div className="text-white/70 text-xs">Experience the finishing first-hand</div></div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><Clock className="h-4 w-4" /></span>
              <div><div className="font-semibold">60-Minute Visit</div><div className="text-white/70 text-xs">Includes Q&A with senior advisor</div></div>
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); setBooked(true); }}
          className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur"
        >
          <h3 className="font-display text-lg font-semibold">Book Your Site Visit</h3>
          <p className="mt-1 text-xs text-white/65">Select a preferred date & time. We'll confirm within 30 minutes.</p>
          <div className="mt-4 space-y-3">
            <input required placeholder="Your Name" className="w-full rounded-md border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-gold" />
            <input required type="tel" placeholder="Phone Number" className="w-full rounded-md border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-gold" />
            <input required type="date" min={new Date().toISOString().split("T")[0]} className="w-full rounded-md border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white outline-none focus:border-gold [color-scheme:dark]" />
            <div>
              <div className="mb-2 text-xs text-white/65">Preferred Time</div>
              <div className="grid grid-cols-3 gap-2">
                {times.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTime(t)}
                    className={`rounded-md border px-2 py-2 text-xs font-medium transition-colors ${time === t ? "border-gold bg-gold text-navy-deep" : "border-white/15 bg-white/5 text-white hover:bg-white/10"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {booked && (
            <div className="mt-3 rounded-md bg-emerald-500/15 px-3 py-2 text-xs text-emerald-300">
              Site visit requested for {time}. An advisor will confirm shortly.
            </div>
          )}
          <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-navy-deep hover:opacity-90">
            <Calendar className="h-4 w-4" /> Book Site Visit
          </button>
        </form>
      </div>
    </div>
  );
}

