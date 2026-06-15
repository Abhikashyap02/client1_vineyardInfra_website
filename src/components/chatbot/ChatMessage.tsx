import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { MapPin, Calendar, Info, Star, Phone, Download } from "lucide-react";
import { useChatbot, type ChatMessage as ChatMessageType, type PropertyItem } from "./ChatbotProvider";

interface ChatMessageProps {
  message: ChatMessageType;
  index: number;
}

const loggedWarnings = new Set<string>();

function PropertyCardView({ prop }: { prop: PropertyItem }) {
  const {
    viewPropertyDetails,
    bookVisitForProperty,
    downloadBrochureForProperty,
    talkToExpertForProperty,
  } = useChatbot();
  const formattedPrice = (parseFloat(prop.price) / 10000000).toFixed(2);
  const amenitiesList = prop.amenities ? prop.amenities.split(",").map(a => a.trim()) : [];
  
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/50 shadow-sm transition hover:shadow-md mt-2">
      {prop.image_url && (
        <div className="relative">
          <img
            src={prop.image_url}
            alt={prop.name}
            className="h-32 w-full object-cover"
          />
          {prop.matchScore && (
            <div className="absolute top-2 right-2 rounded-full bg-navy-deep/80 px-2 py-0.5 text-[9px] font-bold text-gold backdrop-blur-sm shadow border border-gold/30">
              {prop.matchScore}% Match
            </div>
          )}
        </div>
      )}
      <div className="p-3">
        {/* Card Header is prop.name only, no duplicate titles */}
        <div className="flex items-center justify-between">
          <h4 className="font-display text-[13.5px] font-bold text-navy-deep">
            {prop.name}
          </h4>
          <div className="flex items-center gap-0.5 rounded bg-gold/15 px-1.5 py-0.5 text-[9px] font-bold text-gold">
            <Star className="size-2 fill-current" />
            <span>{prop.property_type}</span>
          </div>
        </div>
        
        <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
          <MapPin className="size-3 text-gold" />
          {prop.location}
        </p>

        {/* Dynamic Plot terminology */}
        <div className="mt-1.5 flex flex-wrap gap-1">
          <span className="rounded bg-navy/10 px-1.5 py-0.5 text-[9px] font-semibold text-navy-deep">
            {prop.property_type === "Plot" ? "Registry Ready" : (prop.ready_to_move ? "Ready to Move" : "Under Construction")}
          </span>
          {prop.property_type === "Plot" && (
            <>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-800">
                Development Completed
              </span>
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-800">
                Gated Plot
              </span>
            </>
          )}
          {prop.property_type !== "Plot" && (
            <span className="rounded bg-warm-bg px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">
              {prop.area}
            </span>
          )}
        </div>

        {/* Match Reason reasons bullets explanation */}
        {prop.matchReason && (
          <div className="mt-2 text-[10px] text-gold font-medium bg-gold/5 p-2 rounded-lg border border-gold/10">
            <div className="font-bold uppercase tracking-wider text-[8px] text-slate-soft mb-1">Recommendation Intelligence</div>
            <p className="whitespace-pre-line leading-relaxed">{prop.matchReason}</p>
          </div>
        )}

        {/* Amenities */}
        {amenitiesList.length > 0 && (
          <div className="mt-2.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-soft">Amenities</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {amenitiesList.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-border bg-white px-2 py-0.5 text-[9px] text-muted-foreground"
                >
                  {amenity}
                </span>
              ))}
              {amenitiesList.length > 3 && (
                <span className="rounded-full border border-border bg-white px-2 py-0.5 text-[9px] text-muted-foreground font-semibold">
                  +{amenitiesList.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2">
          <span className="font-display text-xs font-bold text-gold">
            ₹{formattedPrice} Cr
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex gap-2">
            <button
              onClick={() => bookVisitForProperty(prop)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-navy-deep py-1.5 text-center font-display text-[11px] font-bold text-white transition hover:bg-navy-deep/90 shadow-sm"
            >
              <Calendar className="size-3" />
              Book Visit
            </button>
            <button
              onClick={() => talkToExpertForProperty(prop)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy-deep/20 bg-transparent py-1.5 text-center font-display text-[11px] font-bold text-navy-deep transition hover:bg-navy-deep/5"
            >
              <Phone className="size-3" />
              Talk to Expert
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => viewPropertyDetails(prop)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-warm-bg py-1.5 text-center font-display text-[11px] font-bold text-muted-foreground transition hover:bg-navy-deep/5 hover:text-navy-deep"
            >
              <Info className="size-3" />
              View Details
            </button>
            <button
              onClick={() => downloadBrochureForProperty(prop)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gold/30 bg-gold/5 py-1.5 text-center font-display text-[11px] font-bold text-gold transition hover:bg-gold/15"
            >
              <Download className="size-3" />
              Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const { sendMessage } = useChatbot();
  const isUser = message.role === "user";
  const msgType = message.type || "text";

  const rendererMap: Record<string, (msg: ChatMessageType) => React.ReactNode> = {
    text: (msg) => (
      <div className="whitespace-pre-wrap">{msg.content}</div>
    ),
    property_card: (msg) => (
      <div>
        <div className="whitespace-pre-wrap mb-2">{msg.content}</div>
        {msg.properties && msg.properties.length > 0 && (
          <PropertyCardView prop={msg.properties[0]} />
        )}
      </div>
    ),
    property_list: (msg) => (
      <div>
        <div className="whitespace-pre-wrap mb-2">{msg.content}</div>
        {msg.properties && msg.properties.length > 0 && (
          <div className="mt-3 flex flex-col gap-3">
            {msg.properties.map((p) => (
              <PropertyCardView key={p.id} prop={p} />
            ))}
          </div>
        )}
      </div>
    ),
    quick_action: (msg) => (
      <div className="whitespace-pre-wrap font-semibold text-gold">{msg.content}</div>
    ),
    lead_form: (msg) => (
      <div>
        <div className="whitespace-pre-wrap">{msg.content}</div>
        <div className="mt-2 text-xs italic text-gold/80">Premium Assistant Input Request</div>
      </div>
    ),
    site_visit: (msg) => (
      <div>
        <div className="whitespace-pre-wrap">{msg.content}</div>
        <div className="mt-2 text-xs italic text-gold/80">Site Booking Details Requested</div>
      </div>
    ),
    investment_card: (msg) => (
      <div>
        <div className="whitespace-pre-wrap font-serif-italic text-gold">{msg.content}</div>
      </div>
    ),
  };

  let renderContent;
  if (rendererMap[msgType]) {
    renderContent = rendererMap[msgType](message);
  } else {
    if (!loggedWarnings.has(msgType)) {
      loggedWarnings.add(msgType);
      console.warn(`Unhandled message type: ${msgType}, falling back to default rendering.`);
    }
    renderContent = rendererMap["text"](message);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      className={`flex items-end gap-3 px-5 py-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div
          className="grid size-8 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-navy-deep shadow-sm"
          style={{ background: "var(--gradient-gold)" }}
        >
          V
        </div>
      )}

      {/* Bubble & Rendered Content */}
      <div className="flex max-w-[85%] flex-col gap-2">
        <div
          className={`rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed shadow-sm ${
            isUser
              ? "rounded-br-sm bg-navy-deep text-white"
              : "rounded-bl-sm border border-border bg-card text-foreground"
          }`}
        >
          {renderContent}
        </div>

        {/* Suggestion / CTA Buttons */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {message.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                className="rounded-full border border-gold/45 bg-gold/5 px-3 py-1 font-display text-[11px] font-semibold text-navy-deep shadow-sm transition hover:bg-gold/15 active:scale-95"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span
          className={`text-[9px] text-muted-foreground/85 ${isUser ? "text-right" : "ml-1"}`}
        >
          {format(message.timestamp, "h:mm a")}
        </span>
      </div>
    </motion.div>
  );
}
