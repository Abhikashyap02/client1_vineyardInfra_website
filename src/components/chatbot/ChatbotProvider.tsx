import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatbotContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  isTyping: boolean;
}

const ChatbotContext = createContext<ChatbotContextValue | null>(null);

export function useChatbot() {
  const ctx = useContext(ChatbotContext);
  if (!ctx) throw new Error("useChatbot must be used inside <ChatbotProvider>");
  return ctx;
}

/* ---------- simulated AI replies ---------- */
const quickReplies: Record<string, string> = {
  "find-property":
    "I'd love to help you find the perfect property! 🏡\n\nWe have premium villas starting at ₹1.45 Cr, luxury apartments from ₹78 L, and residential plots from ₹22.5 L — all in prime Dehradun locations.\n\nCould you tell me your preferred property type, budget range, and location preference?",
  "schedule-visit":
    "Great choice! A site visit is the best way to experience our properties first-hand. 📅\n\nOur upcoming visit slots are available on weekends and weekdays. I'll connect you with our team to schedule a convenient time.\n\nWhich project interests you most — Vineyard Signature Villas, High Grove Apartments, or Green County Plots?",
  "investment-consultation":
    "Smart thinking! Dehradun's real estate market is showing excellent growth. 💰\n\nOur investment experts can guide you on:\n• Properties with highest appreciation potential\n• Rental yield analysis\n• Tax benefits and legal compliance\n\nWould you prefer a call or an in-person consultation?",
  "talk-to-expert":
    "I'll connect you with one of our property experts right away! 📞\n\nYou can also reach us directly at:\n📱 +91 999 000 1234\n📧 info@vineyardinfra.com\n\nOr I can have someone call you back within 15 minutes. What works best for you?",
};

const fallbackReplies = [
  "Thank you for your interest! Our team specialises in premium properties across Dehradun — villas, apartments, and plots in the most sought-after locations.\n\nHow can I assist you today?",
  "That's a great question! Let me help you with that. Our experts have deep knowledge of the Dehradun real estate market.\n\nWould you like to explore our featured projects or schedule a site visit?",
  "I appreciate your enquiry! At Vineyard Infra, we pride ourselves on transparent dealings and end-to-end support.\n\nCould you share more details so I can give you the most relevant information?",
];

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const sendMessage = useCallback(
    (content: string) => {
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      // Check for quick-action keyword in the content
      const key = Object.keys(quickReplies).find((k) =>
        content.toLowerCase().includes(k.replace("-", " ")),
      );

      const reply =
        key && quickReplies[key]
          ? quickReplies[key]
          : fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];

      // Simulate typing delay (1.2–2.4 s)
      const delay = 1200 + Math.random() * 1200;
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
      }, delay);
    },
    [],
  );

  return (
    <ChatbotContext.Provider
      value={{ isOpen, open, close, toggle, messages, sendMessage, isTyping }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}
