import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 px-5 py-3">
      {/* avatar */}
      <div
        className="grid size-8 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-navy-deep"
        style={{ background: "var(--gradient-gold)" }}
      >
        V
      </div>

      {/* bubble */}
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-card px-5 py-3.5 shadow-sm">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block size-2 rounded-full bg-gold"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
