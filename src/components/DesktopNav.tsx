import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Home,
  Building2,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Eye,
  ChevronDown,
  ArrowRight,
  Briefcase,
  LandPlot,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    icon: Home,
    title: "Residential Properties",
    desc: "Premium villas, apartments and homes in Dehradun's finest localities.",
  },
  {
    icon: Building2,
    title: "Commercial Properties",
    desc: "Grade-A offices, retail spaces and commercial investments.",
  },
  {
    icon: TrendingUp,
    title: "Property Investment Consulting",
    desc: "Data-driven advice to maximise ROI on your real estate portfolio.",
  },
  {
    icon: ShieldCheck,
    title: "Property Advisory",
    desc: "End-to-end guidance — legal, financial and market due diligence.",
  },
  {
    icon: Eye,
    title: "Site Visit Assistance",
    desc: "Guided property tours with pickup and detailed comparison reports.",
  },
];

const locations = [
  { name: "Rajpur Road", desc: "Premium residential corridor & high appreciation zone." },
  { name: "Mussoorie Road", desc: "Luxury villas with scenic hill views and serenity." },
  { name: "Sahastradhara Road", desc: "Fastest-growing corridor for modern apartments." },
  { name: "Haridwar Road", desc: "Commercial hub with excellent connectivity." },
  { name: "Clement Town", desc: "Peaceful residential area near defence establishments." },
];

/* ------------------------------------------------------------------ */
/*  Types & helpers                                                    */
/* ------------------------------------------------------------------ */

export type NavVariant = "light" | "dark";

interface NavLinkItem {
  label: string;
  to: "/" | "/properties" | "/about" | "/contact";
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/properties" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

interface DesktopNavProps {
  /** "light" = white text (hero overlays), "dark" = navy text (sticky bars) */
  variant?: NavVariant;
  /** Which link should be highlighted as active (label text) */
  activeLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DesktopNav({ variant = "light", activeLabel }: DesktopNavProps) {
  const [openMenu, setOpenMenu] = useState<"services" | "locations" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const isLight = variant === "light";
  const textBase = isLight ? "text-white/85" : "text-muted-foreground";
  const textActive = isLight ? "text-gold" : "text-foreground font-medium";
  const textHover = isLight ? "hover:text-gold" : "hover:text-foreground";

  function toggle(menu: "services" | "locations") {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  }

  return (
    <nav ref={containerRef} className="hidden items-center gap-6 lg:flex relative">
      {/* Standard nav links — insert Services after "Projects" and Locations after "Services" */}
      {NAV_LINKS.map((l, i) => (
        <span key={l.label} className="contents">
          <Link
            to={l.to}
            className={`relative py-1 font-serif text-xs tracking-[0.16em] uppercase transition-all duration-300 ${textHover} ${
              activeLabel === l.label ? textActive : textBase
            } after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-gold after:transition-transform after:duration-300 ${
              activeLabel === l.label
                ? "after:scale-x-100 after:origin-left"
                : "after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left"
            }`}
            activeProps={{ className: `transition-all ${textActive} after:scale-x-100 after:origin-left` }}
            activeOptions={{ exact: l.to === "/" }}
            onClick={() => setOpenMenu(null)}
          >
            {l.label}
          </Link>

          {/* After "Projects" → insert Services dropdown */}
          {i === 1 && (
            <DropdownTrigger
              label="SERVICES"
              isOpen={openMenu === "services"}
              onClick={() => toggle("services")}
              textBase={textBase}
              textHover={textHover}
            />
          )}

          {/* After Services (which is after Projects, i===1) → insert Locations dropdown */}
          {i === 1 && (
            <DropdownTrigger
              label="POPULAR LOCATIONS"
              isOpen={openMenu === "locations"}
              onClick={() => toggle("locations")}
              textBase={textBase}
              textHover={textHover}
            />
          )}
        </span>
      ))}

      {/* ---- SERVICES MEGA MENU ---- */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 transition-all duration-300 ${
          openMenu === "services"
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-[740px] rounded-xl border border-border bg-white p-6 shadow-[var(--shadow-elevated)]">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Our Services</p>
            <Link
              to="/contact"
              onClick={() => setOpenMenu(null)}
              className="text-xs font-medium text-navy-deep hover:text-gold transition-colors flex items-center gap-1"
            >
              Get In Touch <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {services.map((s) => (
              <Link
                key={s.title}
                to="/contact"
                onClick={() => setOpenMenu(null)}
                className="group/item flex items-start gap-4 rounded-lg border border-transparent p-4 transition-all duration-200 hover:border-gold/30 hover:bg-warm-bg"
              >
                <div className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg bg-navy-deep/5 text-navy-deep transition-colors group-hover/item:bg-gold group-hover/item:text-navy-deep">
                  <s.icon className="size-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-navy-deep group-hover/item:text-gold transition-colors">
                    {s.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-soft">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-4 flex items-center justify-between rounded-lg bg-navy-deep/[0.03] px-4 py-3 border border-border">
            <div className="flex items-center gap-2 text-sm text-slate-soft">
              <Briefcase className="size-4 text-gold" />
              <span>Not sure what you need? Talk to our advisor.</span>
            </div>
            <Link
              to="/contact"
              onClick={() => setOpenMenu(null)}
              className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-semibold text-navy-deep transition hover:brightness-105"
              style={{ background: "var(--gradient-gold)" }}
            >
              Book Consultation <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ---- POPULAR LOCATIONS DROPDOWN ---- */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 transition-all duration-300 ${
          openMenu === "locations"
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-[420px] rounded-xl border border-border bg-white p-5 shadow-[var(--shadow-elevated)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Popular Locations</p>
            <Link
              to="/properties"
              onClick={() => setOpenMenu(null)}
              className="text-xs font-medium text-navy-deep hover:text-gold transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="space-y-1">
            {locations.map((loc) => (
              <Link
                key={loc.name}
                to={`/properties?location=${encodeURIComponent(loc.name)}`}
                onClick={() => setOpenMenu(null)}
                className="group/loc flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 hover:bg-warm-bg"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gold/10 text-gold transition-colors group-hover/loc:bg-gold group-hover/loc:text-navy-deep">
                    <MapPin className="size-4" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-navy-deep group-hover/loc:text-gold transition-colors">
                      {loc.name}
                    </p>
                    <p className="text-[11px] leading-snug text-slate-soft">{loc.desc}</p>
                  </div>
                </div>
                <ArrowRight className="size-4 text-slate-soft opacity-0 -translate-x-1 transition-all group-hover/loc:opacity-100 group-hover/loc:translate-x-0 group-hover/loc:text-gold" />
              </Link>
            ))}
          </div>

          {/* Bottom explore strip */}
          <div className="mt-3 border-t border-border pt-3">
            <Link
              to="/properties"
              onClick={() => setOpenMenu(null)}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-navy-deep transition hover:text-gold"
            >
              <LandPlot className="size-4 text-gold" />
              Explore All Locations
              <ArrowRight className="size-3 ml-auto" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Dropdown trigger button                                            */
/* ------------------------------------------------------------------ */

function DropdownTrigger({
  label,
  isOpen,
  onClick,
  textBase,
  textHover,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  textBase: string;
  textHover: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 font-serif text-xs tracking-[0.16em] uppercase transition-colors ${textHover} ${isOpen ? "text-gold" : textBase}`}
    >
      {label}
      <ChevronDown
        className={`size-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
}
