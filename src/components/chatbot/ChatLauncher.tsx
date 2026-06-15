import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { useChatbot } from "./ChatbotProvider";

export function ChatLauncher() {
  const { isOpen, toggle } = useChatbot();

  return (
    <div className="fixed bottom-6 right-4 z-50 sm:right-6">
      {/* Premium tooltip — only visible when chat is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
            className="absolute -top-20 right-0 w-56"
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
                <div
                  className="grid size-8 shrink-0 place-items-center rounded-lg"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <Sparkles className="size-3.5 text-navy-deep" />
                </div>
                <div>
                  <p className="font-display text-[11px] font-bold text-gold">
                    Property Expert
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

      {/* Pulsing ring */}
      {!isOpen && (
        <>
          <span
            className="absolute inset-0 animate-ping rounded-full opacity-20"
            style={{ background: "var(--gradient-gold)" }}
          />
          <span
            className="absolute -inset-1.5 animate-pulse rounded-full opacity-10"
            style={{ background: "var(--gradient-gold)" }}
          />
        </>
      )}

      {/* Button */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="relative grid size-14 place-items-center rounded-full text-navy-deep shadow-gold transition-shadow hover:shadow-lg"
        style={{
          background: "var(--gradient-gold)",
          boxShadow: "var(--shadow-gold)",
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
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="size-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
