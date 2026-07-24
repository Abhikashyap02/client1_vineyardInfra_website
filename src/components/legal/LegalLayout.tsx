import { ReactNode, useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "../Footer";
import { Link } from "@tanstack/react-router";
import { Phone, Mail, Facebook, Instagram, Youtube, Clock, ArrowLeft } from "lucide-react";

interface Section {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  sections: Section[];
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, sections, children }: LegalLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        setActiveSection(visibleEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-100px 0px -65% 0px",
      threshold: 0.1,
    });

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 120; // Offset for header navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-warm-bg text-navy-deep flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-warm-bg pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden border-b border-gold/10">
        {/* Glow backdrop */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -left-40 size-96 rounded-full bg-gold/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-soft hover:text-gold transition-colors duration-300 mb-6 cursor-pointer"
          >
            <ArrowLeft className="size-3.5 text-gold" /> BACK TO HOME
          </Link>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-navy-deep">
            {title}
          </h1>
          <div className="flex items-center gap-2 mt-4 text-xs text-slate-soft">
            <Clock className="size-3.5 text-gold" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Sticky Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-xl border border-gold/15 bg-white p-6 shadow-sm">
              <h4 className="font-display text-xs font-bold text-navy-deep uppercase tracking-wider mb-4 pb-2 border-b border-gold/10">
                Navigation
              </h4>
              <nav className="space-y-2.5">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => handleScroll(e, sec.id)}
                    className={`block text-xs leading-relaxed transition-all duration-300 ${
                      activeSection === sec.id
                        ? "text-gold font-bold pl-2 border-l-2 border-gold"
                        : "text-slate-soft hover:text-navy-deep"
                    }`}
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Content Column */}
        <div className="lg:col-span-8 bg-white border border-gold/10 rounded-2xl p-6 md:p-10 shadow-sm prose max-w-none text-navy-deep font-body text-slate-soft leading-relaxed text-sm md:text-base space-y-8">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
