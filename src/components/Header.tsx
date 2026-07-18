import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { motion } from "framer-motion";

interface HeaderProps {
  activeLabel?: string;
}

export function Header({ activeLabel }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed z-40 transition-all duration-500 ease-in-out left-0 right-0 flex justify-center ${
        scrolled ? "top-0 px-0" : "top-4 px-4 md:px-8"
      }`}
    >
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={`w-full transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-navy-deep/95 backdrop-blur-md shadow-2xl py-2 px-6 md:px-12 border-b border-white/10 rounded-none"
            : "max-w-7xl bg-navy-deep/35 backdrop-blur-lg border border-gold/20 rounded-full shadow-lg py-2.5 px-6 md:px-8"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:scale-[1.02] transition-transform duration-300 origin-left"
          >
            <Logo variant="horizontal" />
          </Link>

          {/* Desktop Navigation links */}
          <DesktopNav variant="light" activeLabel={activeLabel} />

          {/* Call to Action & Mobile menu trigger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+916397688989"
              className="relative hidden items-center gap-2 rounded-full bg-gold px-5 py-2 text-xs font-semibold tracking-[0.08em] text-navy-deep shadow-gold/15 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(212,175,55,0.25)] active:translate-y-0 md:inline-flex uppercase whitespace-nowrap"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Phone className="size-3" /> CALL: +91 63976 88989
            </a>
            <MobileNav trigger="light" hideAt="lg" />
          </div>
        </div>
      </motion.header>
    </div>
  );
}
