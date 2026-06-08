import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone, Mail, MapPin, Calendar, ArrowRight, MessageCircle,
  CheckCircle2, Clock, Car, Landmark, ChevronDown, Send,
  User, Home, Wallet, Briefcase, FileText, Navigation,
  Sparkles, ShieldCheck, Star, Headset,
} from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import contactHero from "@/assets/contact-hero.jpg";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Vineyard Infra — Book a Consultation or Site Visit" },
      { name: "description", content: "Get in touch with Vineyard Infra for personalized real estate guidance in Dehradun. Book a consultation, site visit or WhatsApp chat with our advisors." },
      { property: "og:title", content: "Contact Vineyard Infra — Book a Consultation or Site Visit" },
      { property: "og:description", content: "Speak with trusted property advisors. Book site visits, consultations, and explore curated real estate opportunities in Dehradun." },
    ],
  }),
  component: ContactPage,
});

const WHATSAPP = "https://wa.me/919876543210?text=Hi%20Vineyard%20Infra%2C%20I%27m%20interested%20in%20exploring%20properties%20in%20Dehradun.";
const PHONE = "tel:+919876543210";
const EMAIL = "mailto:hello@vineyardinfra.com";

const trustIndicators = [
  { icon: ShieldCheck, label: "Verified Property Listings" },
  { icon: Landmark, label: "Local Market Expertise" },
  { icon: Headset, label: "Personalized Guidance" },
  { icon: Star, label: "End-to-End Support" },
];

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+91 98765 43210",
    cta: "Call Now",
    href: PHONE,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "Quick conversation",
    cta: "Chat on WhatsApp",
    href: WHATSAPP,
  },
  {
    icon: Mail,
    title: "Email",
    detail: "hello@vineyardinfra.com",
    cta: "Send Email",
    href: EMAIL,
  },
  {
    icon: MapPin,
    title: "Office Visit",
    detail: "18/2 Rajpur Road, Dehradun",
    cta: "Get Directions",
    href: "https://www.google.com/maps/search/?api=1&query=18%2F2+Rajpur+Road+Dehradun",
  },
];

const faqs = [
  { q: "Do I need an appointment to visit your office?", a: "Walk-ins are welcome during business hours. However, we recommend booking a short 15-minute consultation so we can assign the right advisor and have property options ready for you." },
  { q: "Do you charge consultation fees?", a: "No. Our initial consultation and property shortlisting services are completely free. We earn from the builders and developers we represent, not from you." },
  { q: "Can you arrange site visits for properties I'm interested in?", a: "Absolutely. We organize guided site visits with an advisor who explains the project details, neighborhood, and investment potential. Most visits can be arranged within 24–48 hours." },
  { q: "Do you help property investors from outside Dehradun?", a: "Yes. A large part of our clientele includes NRI and outstation investors. We provide virtual tours, video consultations, and end-to-end remote transaction support." },
  { q: "Do you assist with documentation and legal verification?", a: "Yes. We facilitate title verification, RERA compliance checks, home loan processing, and registration paperwork through our trusted legal and banking partners." },
];

function TopNav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-gold">
            <span className="font-display font-bold text-navy-deep">V</span>
          </div>
          <div className="font-display font-semibold tracking-tight text-white">
            Vineyard <span className="text-gold">Infra</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          <Link to="/" className="transition-colors hover:text-gold">Home</Link>
          <Link to="/properties" className="transition-colors hover:text-gold">Properties</Link>
          <Link to="/about" className="transition-colors hover:text-gold">About</Link>
          <span className="text-gold">Contact</span>
        </nav>
        <div className="flex items-center gap-2">
          <Button className="hidden bg-gold text-navy-deep hover:bg-gold-soft md:inline-flex" asChild>
            <a href={PHONE}><Phone className="h-4 w-4" /> +91 98765 43210</a>
          </Button>
          <MobileNav trigger="light" />
        </div>
      </div>
    </header>
  );
}

/* ---------- Section 1: Hero ---------- */
function HeroSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden md:min-h-[780px]">
      <img src={contactHero} alt="Premium real estate consultation" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/60 to-navy-deep/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/50 to-transparent" />
      <TopNav />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-5 pt-32 pb-20 md:px-10 md:pt-40">
        <div className="max-w-2xl animate-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-gold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Get in Touch
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
            Let's Find The Right<br />
            Property <span className="font-italic-serif text-gold">For You</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white/75">
            Whether you're buying your first home, investing for the future, or exploring commercial opportunities, our team is ready to help.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="h-12 gap-2 bg-gold px-7 text-sm font-semibold text-navy-deep hover:bg-gold-soft" asChild>
              <a href="#book-consultation"><Calendar className="h-4 w-4" /> Book Consultation</a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 gap-2 border-white/40 bg-white/5 px-7 text-sm font-semibold text-white hover:bg-white hover:text-navy-deep" asChild>
              <a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp Now</a>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-6">
            {trustIndicators.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-sm text-white/80">
                <t.icon className="h-4 w-4 text-gold" />
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 2: Contact Cards ---------- */
function ContactCards() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-24">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Choose Your Channel</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-navy-deep md:text-4xl">Multiple Ways To Connect</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {contactCards.map((c) => (
          <div key={c.title} className="group rounded-xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-card)]">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-gold/30 bg-navy-deep/5 text-gold transition group-hover:bg-gold group-hover:text-navy-deep">
              <c.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-semibold text-navy-deep">{c.title}</h3>
            <p className="mt-1 text-sm text-slate-soft">{c.detail}</p>
            <Button className="mt-5 w-full bg-navy-deep text-white hover:bg-navy" size="sm" asChild>
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noreferrer" : undefined}>
                {c.cta}
              </a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Section 3: Requirement Form ---------- */
function RequirementForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    location: "",
    budget: "",
    purpose: "",
    message: "",
    callback: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book-consultation" className="bg-warm-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Property Requirement</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-deep md:text-4xl">
              Tell Us What You're <span className="font-italic-serif text-gold">Looking For</span>
            </h2>
            <p className="mt-4 text-slate-soft">
              Share your requirements and our advisors will recommend suitable options tailored to your goals.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: ShieldCheck, text: "No spam. Your details are confidential." },
                { icon: Clock, text: "Response within 2 hours on business days." },
                { icon: Headset, text: "Dedicated advisor assigned to your enquiry." },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-5 w-5 text-gold" />
                  <span className="text-sm text-slate-soft">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-xl border border-gold/40 bg-white p-10 text-center">
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-navy-deep">Request Received</h3>
                <p className="mt-2 text-slate-soft">Our advisor will reach out to you shortly with curated property recommendations.</p>
                <Button className="mt-6 bg-navy-deep text-white hover:bg-navy" asChild>
                  <a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp</a>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-white p-6 shadow-[var(--shadow-card)] md:p-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-soft" />
                      <Input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className="h-12 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-soft" />
                      <Input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" className="h-12 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-soft" />
                      <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className="h-12 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Property Type</Label>
                    <Select value={form.propertyType} onValueChange={(v) => update("propertyType", v)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Apartment", "Villa", "Independent House", "Plot", "Commercial", "Office Space", "Retail Space"].map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Preferred Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-soft" />
                      <Input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Rajpur Road, Dehradun" className="h-12 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Budget Range</Label>
                    <Select value={form.budget} onValueChange={(v) => update("budget", v)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select Budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Under 50 Lakhs", "50L - 1 Crore", "1Cr - 2 Crore", "2Cr - 5 Crore", "Above 5 Crore"].map((b) => (
                          <SelectItem key={b} value={b}>{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Purpose</Label>
                    <Select value={form.purpose} onValueChange={(v) => update("purpose", v)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select Purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Self Use", "Investment", "Rental Income", "Commercial Use"].map((p) => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Message</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-soft" />
                      <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any specific requirements or questions..." className="min-h-[100px] pl-10" />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <Checkbox id="callback" checked={form.callback} onCheckedChange={(c) => update("callback", c === true)} />
                  <Label htmlFor="callback" className="text-sm text-slate-soft">Request a callback from our advisor</Label>
                </div>
                <Button type="submit" size="lg" className="mt-6 h-12 gap-2 bg-navy-deep px-8 text-sm font-semibold text-white hover:bg-navy">
                  <Send className="h-4 w-4" /> Find Suitable Properties
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 4: Book Site Visit ---------- */
function SiteVisitSection() {
  const [form, setForm] = useState({ name: "", phone: "", property: "", date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const properties = [
    "Vineyard Signature Villas",
    "Vineyard High Grove",
    "Vineyard Green County",
    "Vineyard Crown Residences",
    "Vineyard Pine Estate",
    "Vineyard Trade Centre",
    "Other / Not Sure",
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="overflow-hidden rounded-2xl bg-navy-deep text-white md:grid md:grid-cols-2">
        <div className="p-8 md:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">On-Ground Experience</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
            Want To Experience The <span className="font-italic-serif text-gold">Property</span> In Person?
          </h2>
          <p className="mt-4 text-white/70">
            Schedule a guided property visit with our advisors. We'll walk you through the project, answer your questions, and help you evaluate the opportunity.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: Calendar, text: "Choose your preferred date and time" },
              { icon: Car, text: "Complimentary pickup from central Dehradun" },
              { icon: ShieldCheck, text: "No obligation. Free guided tours." },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-gold" />
                <span className="text-sm text-white/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center bg-white p-8 text-foreground md:p-14">
          {submitted ? (
            <div className="w-full text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-navy-deep">Site Visit Booked</h3>
              <p className="mt-2 text-sm text-slate-soft">Our team will confirm your visit via WhatsApp or call within the next few hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Name</Label>
                <Input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className="mt-1.5 h-12" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Phone Number</Label>
                <Input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" className="mt-1.5 h-12" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Preferred Property</Label>
                <Select value={form.property} onValueChange={(v) => update("property", v)}>
                  <SelectTrigger className="mt-1.5 h-12">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Preferred Date</Label>
                  <Input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="mt-1.5 h-12" />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-soft">Preferred Time</Label>
                  <Select value={form.time} onValueChange={(v) => update("time", v)}>
                    <SelectTrigger className="mt-1.5 h-12">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" size="lg" className="mt-2 h-12 w-full gap-2 bg-gold text-sm font-semibold text-navy-deep hover:bg-gold-soft">
                <Calendar className="h-4 w-4" /> Schedule Site Visit
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 5: Meet Your Advisor ---------- */
function AdvisorSection() {
  return (
    <section className="bg-warm-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto max-w-sm lg:mx-0">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-gold/30 to-transparent blur-xl" />
            <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)]">
              <img src={founderImg} alt="Founder and Principal Advisor" width={900} height={1100} loading="lazy" className="aspect-[3/4] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep to-transparent p-6 text-white">
                <p className="font-display text-2xl font-semibold">Rohan Vineyard</p>
                <p className="text-sm text-gold">Founder & Principal Advisor</p>
                <p className="mt-1 text-xs text-white/70">12+ years • Dehradun Market Expert</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Meet Your Advisor</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-navy-deep md:text-4xl">
              Honest Guidance From Someone Who <span className="font-italic-serif text-gold">Understands</span> The Market
            </h2>
            <blockquote className="mt-6 border-l-2 border-gold pl-5 text-lg leading-relaxed text-slate-soft italic">
              "We believe every property decision deserves honest guidance and market expertise. Our goal is to help you make confident real estate decisions that serve your family for generations."
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="h-12 gap-2 bg-navy-deep px-7 text-sm font-semibold text-white hover:bg-navy" asChild>
                <a href="#book-consultation"><Calendar className="h-4 w-4" /> Book Consultation With Advisor</a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 gap-2 border-navy-deep/30 px-7 text-sm font-semibold text-navy-deep hover:bg-navy-deep hover:text-white" asChild>
                <a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp Advisor</a>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                { value: "12+", label: "Years Experience" },
                { value: "500+", label: "Families Guided" },
                { value: "₹750Cr+", label: "Transactions" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-navy-deep">{s.value}</p>
                  <p className="mt-1 text-xs text-slate-soft">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 6: Office Location ---------- */
function OfficeLocation() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Visit Us</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-navy-deep md:text-4xl">Our Office Location</h2>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-deep">
              <MapPin className="h-5 w-5 text-gold" /> Vineyard Infra Office
            </h3>
            <p className="mt-3 text-sm text-slate-soft">
              18/2 Rajpur Road, Near Clock Tower<br />
              Dehradun, Uttarakhand — 248001
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-deep">
              <Clock className="h-5 w-5 text-gold" /> Business Hours
            </h3>
            <div className="mt-3 space-y-1 text-sm text-slate-soft">
              <p>Monday — Saturday: 10:00 AM — 7:00 PM</p>
              <p>Sunday: By appointment only</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-deep">
              <Car className="h-5 w-5 text-gold" /> Getting Here
            </h3>
            <div className="mt-3 space-y-1 text-sm text-slate-soft">
              <p>Ample parking available behind the building</p>
              <p>Near landmarks: Clock Tower, Paltan Bazaar</p>
              <p>5 minutes from Dehradun Railway Station</p>
            </div>
          </div>
          <Button className="w-full gap-2 bg-navy-deep text-white hover:bg-navy" size="lg" asChild>
            <a href="https://www.google.com/maps/search/?api=1&query=18%2F2+Rajpur+Road+Dehradun" target="_blank" rel="noreferrer">
              <Navigation className="h-4 w-4" /> Get Directions
            </a>
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border border-border lg:col-span-2">
          <iframe
            title="Vineyard Infra Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.775566070929!2d78.0411!3d30.3165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE5JzAwLjAiTiA3OMKwMDInMjguMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 420 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 7: FAQ ---------- */
function FAQSection() {
  return (
    <section className="bg-warm-bg py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Common Questions</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-deep md:text-4xl">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="rounded-lg border border-border bg-white px-5 data-[state=open]:border-gold/50">
              <AccordionTrigger className="text-left text-sm font-medium text-navy-deep hover:no-underline md:text-base">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-soft leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------- Section 8: Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 text-white md:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-gold blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
        <h2 className="font-display text-3xl font-semibold md:text-5xl">
          Ready To Take The <span className="font-italic-serif text-gold">Next Step?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
          Let's discuss your requirements and help you discover the right property opportunity in Dehradun.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="h-12 gap-2 bg-gold px-7 text-sm font-semibold text-navy-deep hover:bg-gold-soft" asChild>
            <a href="#book-consultation"><Calendar className="h-4 w-4" /> Book Consultation</a>
          </Button>
          <Button size="lg" variant="outline" className="h-12 gap-2 border-white/30 bg-white/5 px-7 text-sm font-semibold text-white hover:bg-white hover:text-navy-deep" asChild>
            <a href="#site-visit"><MapPin className="h-4 w-4" /> Schedule Site Visit</a>
          </Button>
          <Button size="lg" variant="outline" className="h-12 gap-2 border-white/30 bg-white/5 px-7 text-sm font-semibold text-white hover:bg-white hover:text-navy-deep" asChild>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp Now</a>
          </Button>
          <Button size="lg" variant="outline" className="h-12 gap-2 border-white/30 bg-white/5 px-7 text-sm font-semibold text-white hover:bg-white hover:text-navy-deep" asChild>
            <a href={PHONE}><Phone className="h-4 w-4" /> Call Advisor</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-navy-deep py-12 text-white/70">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-gold">
                <span className="font-display font-bold text-navy-deep">V</span>
              </div>
              <div className="font-display font-semibold tracking-tight text-white">
                Vineyard <span className="text-gold">Infra</span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Premium real estate advisory in Dehradun. Helping families and investors discover properties worth owning.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-white">Quick Links</h4>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <Link to="/" className="transition-colors hover:text-gold">Home</Link>
              <Link to="/properties" className="transition-colors hover:text-gold">Properties</Link>
              <Link to="/about" className="transition-colors hover:text-gold">About Us</Link>
              <span className="text-gold">Contact</span>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-white">Contact</h4>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href={PHONE} className="transition-colors hover:text-gold">+91 98765 43210</a>
              <a href={EMAIL} className="transition-colors hover:text-gold">hello@vineyardinfra.com</a>
              <p>18/2 Rajpur Road, Dehradun</p>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Vineyard Infra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ---------- Mobile Sticky Bar ---------- */
function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-white px-2 py-2 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] md:hidden">
      <a href={PHONE} className="flex flex-1 flex-col items-center gap-0.5 py-1 text-navy-deep">
        <Phone className="h-5 w-5" />
        <span className="text-[10px] font-medium">Call</span>
      </a>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex flex-1 flex-col items-center gap-0.5 py-1 text-navy-deep">
        <MessageCircle className="h-5 w-5" />
        <span className="text-[10px] font-medium">WhatsApp</span>
      </a>
      <a href="#site-visit" className="flex flex-1 flex-col items-center gap-0.5 py-1 text-navy-deep">
        <Calendar className="h-5 w-5" />
        <span className="text-[10px] font-medium">Site Visit</span>
      </a>
      <a href="#book-consultation" className="flex flex-1 flex-col items-center gap-0.5 py-1 text-navy-deep">
        <MessageCircle className="h-5 w-5" />
        <span className="text-[10px] font-medium">Inquiry</span>
      </a>
    </div>
  );
}

/* ---------- Page ---------- */
function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-16 text-foreground md:pb-0">
      <HeroSection />
      <ContactCards />
      <RequirementForm />
      <div id="site-visit">
        <SiteVisitSection />
      </div>
      <AdvisorSection />
      <OfficeLocation />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
