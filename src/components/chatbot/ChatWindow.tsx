import { useRef, useEffect, useState, type FormEvent } from "react";
import { useLocation } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import vinBotImg from "@/assets/vin-bot.jpg";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Send,
  Mic,
  Paperclip,
  Sparkles,
} from "lucide-react";
import { useChatbot } from "./ChatbotProvider";
import { ChatMessage } from "./ChatMessage";
import { QuickActions } from "./QuickActions";
import { TypingIndicator } from "./TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatWindow() {
  const { isOpen, close, messages, sendMessage, isTyping } = useChatbot();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasStickyNav, setHasStickyNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkStickyNav = () => {
      const el = document.getElementById("mobile-sticky-nav");
      const mobile = window.innerWidth < 640;
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

  /* Auto-scroll to bottom when new messages arrive */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [messages, isTyping]);

  /* Focus input when chat opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="chatbot-window"
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed right-4 z-40 flex w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border/60 shadow-elevated sm:right-6 max-sm:right-3 max-sm:left-3 max-sm:w-auto transition-all duration-300"
          style={{
            bottom: isMobile
              ? (hasStickyNav ? "148px" : "88px")
              : "96px",
            height: "min(520px, calc(100dvh - 220px))",
            boxShadow: "var(--shadow-elevated)",
            backdropFilter: "blur(20px)",
            background:
              "linear-gradient(180deg, oklch(1 0 0 / 0.92) 0%, oklch(1 0 0 / 0.97) 100%)",
          }}
        >
          {/* ── HEADER ── */}
          <div
            className="relative flex shrink-0 items-center gap-3 px-5 py-4"
            style={{
              background:
                "linear-gradient(135deg, var(--navy-deep) 0%, oklch(0.22 0.05 260) 100%)",
            }}
          >
            {/* Logo */}
            <img
              src={vinBotImg}
              alt="Vin Bot"
              className="size-10 rounded-full object-cover border border-gold/30"
            />

            <div className="flex-1">
              <p className="font-display text-sm font-bold tracking-wide text-white">
                Vin Bot
              </p>
              <div className="flex items-center gap-1.5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] text-white/60">Online now</span>
              </div>
            </div>

            {/* Sparkle badge */}
            <div className="flex items-center gap-1 rounded-full border border-gold/25 bg-gold/10 px-2.5 py-1">
              <Sparkles className="size-3 text-gold" />
              <span className="text-[10px] font-semibold text-gold">AI</span>
            </div>

            {/* Minimise */}
            <button
              onClick={close}
              className="grid size-8 place-items-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Minimise chat"
            >
              <Minus className="size-4" />
            </button>
          </div>

          {/* ── BODY ── */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
            {/* Quick actions shown when no conversation yet */}
            {messages.length === 0 && (
              <div className="py-5">
                <QuickActions />
              </div>
            )}

            {/* Messages */}
            {messages.length > 0 && (
              <div className="py-4">
                {messages.map((msg, i) => (
                  <ChatMessage key={msg.id} message={msg} index={i} />
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isTyping && <TypingIndicator />}
          </div>

          {/* ── INPUT ── */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 border-t border-border/60 bg-white/80 px-4 py-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 shadow-sm transition-shadow focus-within:border-gold/50 focus-within:ring-2 focus-within:ring-gold/15">
              {/* Attachment */}
              <button
                type="button"
                className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-warm-bg hover:text-navy-deep"
                aria-label="Attach file"
              >
                <Paperclip className="size-4" />
              </button>

              {/* Input */}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about properties..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />

              {/* Microphone */}
              <button
                type="button"
                className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-warm-bg hover:text-navy-deep"
                aria-label="Voice input"
              >
                <Mic className="size-4" />
              </button>

              {/* Send */}
              <button
                type="submit"
                disabled={!input.trim()}
                className="grid size-8 shrink-0 place-items-center rounded-lg text-white transition disabled:opacity-40"
                style={{ background: input.trim() ? "var(--gradient-gold)" : "var(--navy-deep)" }}
                aria-label="Send message"
              >
                <Send className="size-3.5 text-navy-deep" />
              </button>
            </div>

            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              Powered by{" "}
              <span className="font-semibold text-gold">Vineyard Infra</span>{" "}
              • AI Assistant
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
