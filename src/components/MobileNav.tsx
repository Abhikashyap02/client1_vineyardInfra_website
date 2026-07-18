import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Calendar,
  ChevronDown,
  Home,
  Building2,
  TrendingUp,
  ShieldCheck,
  Eye,
  MapPin,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const services = [
  { icon: Home, title: "Residential Properties", desc: "Premium villas, apartments and homes." },
  { icon: Building2, title: "Commercial Properties", desc: "Offices, retail spaces and investments." },
  { icon: TrendingUp, title: "Investment Consulting", desc: "Data-driven advice to maximise ROI." },
  { icon: ShieldCheck, title: "Property Advisory", desc: "Legal, financial and market guidance." },
  { icon: Eye, title: "Site Visit Assistance", desc: "Guided tours with comparison reports." },
];

const locations = [
  { name: "Rajpur Road", desc: "Premium residential corridor." },
  { name: "Mussoorie Road", desc: "Luxury villas with hill views." },
  { name: "Sahastradhara Road", desc: "Modern apartments corridor." },
  { name: "Haridwar Road", desc: "Commercial hub with connectivity." },
  { name: "Clement Town", desc: "Peaceful residential area." },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface Props {
  trigger?: "light" | "dark";
  /** breakpoint at which the button hides; default md */
  hideAt?: "md" | "lg";
}

export function MobileNav({ trigger = "light", hideAt = "md" }: Props) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const hideClass = hideAt === "lg" ? "lg:hidden" : "md:hidden";

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className={`${hideClass} grid size-11 place-items-center rounded-sm border ${trigger === "light"
            ? "border-white/25 text-white"
            : "border-border text-foreground"
          }`}
      >
        <Menu className="size-5" />
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-navy-deep text-white shadow-2xl animate-fade-up flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
                <Logo variant="horizontal" />
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-sm border border-white/15"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex-1 px-6 py-8 flex flex-col gap-1">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-display border-b border-white/5 hover:text-gold transition-colors"
                activeProps={{ className: "py-3 text-lg font-display border-b border-white/5 text-gold" }}
                activeOptions={{ exact: true }}
              >
                Home
              </Link>

              {/* Properties */}
              <Link
                to="/properties"
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-display border-b border-white/5 hover:text-gold transition-colors"
                activeProps={{ className: "py-3 text-lg font-display border-b border-white/5 text-gold" }}
              >
                Properties
              </Link>

              {/* Services Accordion */}
              <div className="border-b border-white/5">
                <button
                  type="button"
                  onClick={() => setServicesOpen((p) => !p)}
                  className="flex w-full items-center justify-between py-3 text-lg font-display hover:text-gold transition-colors"
                >
                  Services
                  <ChevronDown
                    className={`size-4 transition-transform duration-300 ${servicesOpen ? "rotate-180 text-gold" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${servicesOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="pb-3 pl-2 space-y-1">
                    {services.map((s) => (
                      <Link
                        key={s.title}
                        to="/contact"
                        onClick={() => setOpen(false)}
                        className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                      >
                        <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md bg-white/10 text-gold">
                          <s.icon className="size-4" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/90">{s.title}</p>
                          <p className="text-[11px] text-white/50 leading-snug">{s.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Popular Locations Accordion */}
              <div className="border-b border-white/5">
                <button
                  type="button"
                  onClick={() => setLocationsOpen((p) => !p)}
                  className="flex w-full items-center justify-between py-3 text-lg font-display hover:text-gold transition-colors"
                >
                  Popular Locations
                  <ChevronDown
                    className={`size-4 transition-transform duration-300 ${locationsOpen ? "rotate-180 text-gold" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${locationsOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="pb-3 pl-2 space-y-0.5">
                    {locations.map((loc) => (
                      <Link
                        key={loc.name}
                        to={`/properties?location=${encodeURIComponent(loc.name)}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid size-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                            <MapPin className="size-3.5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white/90">{loc.name}</p>
                            <p className="text-[11px] text-white/50 leading-snug">{loc.desc}</p>
                          </div>
                        </div>
                        <ArrowRight className="size-3.5 text-white/30 group-hover:text-gold transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* About */}
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-display border-b border-white/5 hover:text-gold transition-colors"
                activeProps={{ className: "py-3 text-lg font-display border-b border-white/5 text-gold" }}
              >
                About
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-display border-b border-white/5 hover:text-gold transition-colors"
                activeProps={{ className: "py-3 text-lg font-display border-b border-white/5 text-gold" }}
              >
                Contact
              </Link>
            </nav>

            <div className="px-6 py-6 border-t border-white/10 space-y-3">
              <a
                href="tel:+916397688989"
                className="flex items-center justify-center gap-2 rounded-sm border border-white/20 py-3 text-sm font-semibold"
              >
                <Phone className="size-4" /> Call Advisor
              </a>
              <a
                href="https://wa.me/916397688989?text=Hi%20Vineyard%20Infra%2C%20I'm%20interested%20in%20exploring%20properties%20in%20Dehradun."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-sm bg-emerald-500 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-sm py-3 text-sm font-semibold text-navy-deep"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Calendar className="size-4" /> Book Site Visit
              </Link>
              <div className="flex justify-center gap-6 pt-4 border-t border-white/5">
                <a href="https://www.facebook.com/vineyardinfra" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold transition-colors" aria-label="Facebook">
                  <Facebook className="size-5" />
                </a>
                <a href="https://www.instagram.com/vineyardinfra/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold transition-colors" aria-label="Instagram">
                  <Instagram className="size-5" />
                </a>
                <a href="https://www.youtube.com/@vineyardinfra1900" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold transition-colors" aria-label="YouTube">
                  <Youtube className="size-5" />
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
