import { motion } from "framer-motion";
import { format } from "date-fns";
import type { ChatMessage as ChatMessageType } from "./ChatbotProvider";

interface ChatMessageProps {
  message: ChatMessageType;
  index: number;
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      className={`flex items-end gap-3 px-5 py-1.5 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div
          className="grid size-8 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-navy-deep"
          style={{ background: "var(--gradient-gold)" }}
        >
          V
        </div>
      )}

      {/* Bubble */}
      <div className="flex max-w-[78%] flex-col gap-1">
        <div
          className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed shadow-sm ${
            isUser
              ? "rounded-br-sm bg-navy-deep text-white"
              : "rounded-bl-sm border border-border bg-card text-foreground"
          }`}
        >
          {message.content}
        </div>

        {/* Timestamp */}
        <span
          className={`text-[10px] text-muted-foreground ${isUser ? "text-right" : "ml-1"}`}
        >
          {format(message.timestamp, "h:mm a")}
        </span>
      </div>
    </motion.div>
  );
}
