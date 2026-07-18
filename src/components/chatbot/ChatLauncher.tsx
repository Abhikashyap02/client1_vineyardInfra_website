import { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { useChatbot } from "./ChatbotProvider";
import vinBotImg from "@/assets/vin-bot.jpg";

export function ChatLauncher() {
  const { isOpen, toggle } = useChatbot();
  const [hasStickyNav, setHasStickyNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkStickyNav = () => {
      const el = document.getElementById("mobile-sticky-nav");
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (el && window.innerWidth < 768) {
        setHasStickyNav(true);
      } else {
        setHasStickyNav(false);
      }
    };
    checkStickyNav();
    window.addEventListener("resize", checkStickyNav);
    const timer1 = setTimeout(checkStickyNav, 100);
    const timer2 = setTimeout(checkStickyNav, 300);
    const timer3 = setTimeout(checkStickyNav, 600);
    return () => {
      window.removeEventListener("resize", checkStickyNav);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobile) {
      setShowTooltip(true);
      return;
    }

    // Show tooltip for 4 seconds initially
    setShowTooltip(true);
    const initialTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 4000);

    // Re-prompt every 30 seconds for 4 seconds
    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 4000);
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isMobile]);

  return (
    <div
      className="fixed right-4 z-50 sm:right-6 transition-all duration-300"
      style={{
        bottom: hasStickyNav ? "84px" : "24px",
      }}
    >
      {/* Premium tooltip — only visible when chat is closed */}
      <AnimatePresence>
        {!isOpen && (showTooltip || isHovered || !isMobile) && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute -top-20 right-0 w-56 pointer-events-none"
          >
            <div
              className="relative overflow-hidden rounded-xl border border-gold/30 px-4 py-3"
              style={{
                background:
                  "linear-gradient(135deg, var(--navy-deep) 0%, oklch(0.22 0.05 260) 100%)",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              {/* Decorative shimmer */}
              <motion.div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, oklch(0.78 0.11 80) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />

              <div className="relative flex items-center gap-2.5">
                <img
                  src={vinBotImg}
                  alt="Vin Bot"
                  className="size-8 shrink-0 rounded-lg object-cover border border-gold/30"
                />
                <div>
                  <p className="font-display text-[11px] font-bold text-gold">
                    Hi, I'm Vin Bot
                  </p>
                  <p className="text-[11px] leading-tight text-white/70">
                    Find your dream home today
                  </p>
                </div>
              </div>

              {/* Arrow pointing down-right toward the button */}
              <span
                className="absolute -bottom-1.5 right-5 size-3 rotate-45 border-b border-r border-gold/30"
                style={{
                  background: "oklch(0.22 0.05 260)",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button with premium soft pulsing ring */}
      <motion.button
        onClick={toggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={isOpen ? {} : {
          scale: [1, 1.04, 1],
          boxShadow: [
            "0_0_0_0_rgba(212,175,55,0.4)",
            "0_0_0_12px_rgba(212,175,55,0)",
            "0_0_0_0_rgba(212,175,55,0)"
          ]
        }}
        transition={isOpen ? {} : {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut"
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="relative grid size-14 place-items-center rounded-full text-navy-deep shadow-gold transition-shadow hover:shadow-lg"
        style={{
          background: "var(--gradient-gold)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="size-5" />
            </motion.span>
          ) : (
            <motion.img
              key="open"
              initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              src={vinBotImg}
              alt="Vin Bot"
              className="size-full rounded-full object-cover border border-gold/30 shadow-inner"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
