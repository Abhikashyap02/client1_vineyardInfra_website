import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function BlogHero() {
  return (
    <section className="relative bg-warm-bg pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-gold/10">
      {/* Premium ambient glow */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-40 size-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-gold/5 blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-white/60 backdrop-blur text-xs uppercase tracking-[0.18em] text-gold mb-6 font-medium shadow-sm"
        >
          <Sparkles className="size-3.5" /> THE VINEYARD JOURNAL
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-navy-deep leading-[1.1] max-w-4xl mx-auto"
        >
          Dehradun Real Estate Insights & <br />
          <span className="font-italic-serif text-gold font-normal">Luxury Living Guide</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base md:text-lg text-slate-soft max-w-2xl mx-auto leading-relaxed"
        >
          Discover curated real estate advice, market trends in Dehradun, 
          and design inspiration for your dream hillside property.
        </motion.p>
      </div>
    </section>
  );
}
