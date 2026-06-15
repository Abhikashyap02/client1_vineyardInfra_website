import { motion } from "framer-motion";
import { Home, Calendar, TrendingUp, Headset, ArrowRight } from "lucide-react";
import { useChatbot } from "./ChatbotProvider";

const actions = [
  {
    key: "find-property",
    icon: Home,
    label: "Find Property",
    gradient: "linear-gradient(135deg, oklch(0.74 0.12 78 / 0.12), oklch(0.86 0.07 80 / 0.18))",
    iconBg: "linear-gradient(135deg, oklch(0.78 0.11 80), oklch(0.68 0.13 75))",
  },
  {
    key: "schedule-visit",
    icon: Calendar,
    label: "Schedule Site Visit",
    gradient: "linear-gradient(135deg, oklch(0.55 0.15 250 / 0.08), oklch(0.45 0.12 260 / 0.12))",
    iconBg: "linear-gradient(135deg, oklch(0.35 0.08 260), oklch(0.23 0.05 260))",
  },
  {
    key: "investment-consultation",
    icon: TrendingUp,
    label: "Investment Consultation",
    gradient: "linear-gradient(135deg, oklch(0.65 0.16 155 / 0.08), oklch(0.55 0.12 155 / 0.12))",
    iconBg: "linear-gradient(135deg, oklch(0.62 0.17 155), oklch(0.48 0.14 155))",
  },
  {
    key: "talk-to-expert",
    icon: Headset,
    label: "Talk to Expert",
    gradient: "linear-gradient(135deg, oklch(0.74 0.12 78 / 0.12), oklch(0.86 0.07 80 / 0.18))",
    iconBg: "var(--gradient-gold)",
  },
] as const;

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.07, duration: 0.35, ease: "easeOut" as const },
  }),
};

export function QuickActions() {
  const { sendMessage } = useChatbot();

  return (
    <div className="px-4 pb-2">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-center"
      >
        <p className="font-display text-[15px] font-bold text-navy-deep">
          Welcome to <span className="text-gold">Vineyard Infra</span>
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          Find premium properties, book site visits, and get
          expert consultation instantly.
        </p>
      </motion.div>

      {/* Compact label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-soft"
      >
        Quick actions
      </motion.p>

      {/* Horizontal action pills */}
      <div className="flex flex-col gap-1.5">
        {actions.map((action, i) => (
          <motion.button
            key={action.key}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => sendMessage(action.label)}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 hover:shadow-sm"
            style={{ background: action.gradient }}
          >
            {/* Icon circle */}
            <div
              className="grid size-8 shrink-0 place-items-center rounded-lg shadow-sm"
              style={{ background: action.iconBg }}
            >
              <action.icon
                className="size-3.5"
                style={{
                  color: action.key === "schedule-visit" ? "white" : "var(--navy-deep)",
                }}
                strokeWidth={2}
              />
            </div>

            {/* Label */}
            <span className="flex-1 font-display text-[12px] font-semibold text-navy-deep">
              {action.label}
            </span>

            {/* Arrow */}
            <ArrowRight className="size-3.5 text-slate-soft opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gold group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
