import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, MessageCircle, Calendar } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

interface Props {
  trigger?: "light" | "dark";
}

export function MobileNav({ trigger = "light" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className={`lg:hidden md:hidden grid size-11 place-items-center rounded-sm border ${
          trigger === "light"
            ? "border-white/25 text-white"
            : "border-border text-foreground"
        }`}
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-navy-deep text-white shadow-2xl animate-fade-up flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-md bg-gold flex items-center justify-center font-display font-bold text-navy-deep">
                  V
                </div>
                <div className="font-display font-semibold">
                  Vineyard <span className="text-gold">Infra</span>
                </div>
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
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-lg font-display border-b border-white/5 hover:text-gold transition-colors"
                  activeProps={{ className: "py-3 text-lg font-display border-b border-white/5 text-gold" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="px-6 py-6 border-t border-white/10 space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 rounded-sm border border-white/20 py-3 text-sm font-semibold"
              >
                <Phone className="size-4" /> Call Advisor
              </a>
              <a
                href="https://wa.me/919876543210"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
