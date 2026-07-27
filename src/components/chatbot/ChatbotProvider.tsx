import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import { BACKEND_URL, apiFetch } from "@/api/client";
import { submitLead as apiSubmitLead } from "@/api/leads";
import { searchProperties } from "@/api/properties";

const COMPANY_PHONE = "6397688989";

function generateUUID() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for insecure contexts (like HTTP over local network IP)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface PropertyItem {
  id: string;
  name: string;
  location: string;
  property_type: string;
  price: string;
  bhk: number | null;
  ready_to_move: boolean;
  under_construction: boolean;
  area: string;
  description: string;
  image_url: string;
  amenities: string | null;
  brochure_url: string | null;
  matchScore?: number;
  matchReason?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "property_card" | "property_list" | "quick_action" | "lead_form" | "site_visit" | "investment_card" | string;
  properties?: PropertyItem[];
  suggestions?: string[];
}

export type ChatState =
  | "HOME"
  | "PROPERTY_SEARCH"
  | "LEAD_CAPTURE"
  | "SITE_VISIT"
  | "INVESTMENT_FLOW"
  | "TALK_TO_EXPERT";

export type LeadScore = "Cold" | "Warm" | "Hot";

export interface Booking {
  id: number;
  property_name: string;
  preferred_date: string;
  preferred_time: string;
  contact_details: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED" | "EXPIRED";
  booking_ref: string;
  created_at: string;
}

interface SessionMemory {
  name?: string;
  phone?: string;
  email?: string;
  budget?: string;
  budgetText?: string;
  location?: string;
  propertyType?: string; // Villa, Apartment, Plot
  bhk?: string;
  plotSize?: string;
  plotFeature?: string; // Registry Ready, Gated Community, Corner Plot, East Facing, North Facing, Any
  selectedProperty?: string;
  visitDate?: string;
  visitTime?: string;
  purpose?: string; // Investment, Self Use
  investmentHorizon?: string;
  investmentGoal?: string; // Rental Yield, Capital Appreciation, Land Banking, Luxury Living
  leadScore?: LeadScore;
  agentSummary?: string;
  brochurePending?: boolean;
  activeBookings?: Booking[];
  lastBookingSuccess?: Booking;
  editingBookingId?: number;
  tempBudgetClarification?: string;
}

const getActiveBookingForProperty = (propertyName: string, bookings: Booking[] | undefined) => {
  if (!bookings) return undefined;
  return bookings.find(b => {
    if (b.property_name !== propertyName) return false;
    if (b.status !== "ACTIVE") return false;
    
    // Check if date is in past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const preferred = new Date(b.preferred_date);
    preferred.setHours(0, 0, 0, 0);
    if (preferred < today) {
      b.status = "EXPIRED";
      return false;
    }
    return true;
  });
};

const getAvailablePropertiesToBook = (bookings: Booking[] | undefined) => {
  const allProps = [
    { num: "1", name: "Sangam Valley", desc: "1️⃣ *Sangam Valley* (Sahastradhara Road)" },
    { num: "2", name: "Platinum Township", desc: "2️⃣ *Platinum Township* (Sahaspur Road)" },
    { num: "3", name: "Vivanta Greens", desc: "3️⃣ *Vivanta Greens* (Mandakini Vihar)" },
    { num: "4", name: "Aviraj Apartments", desc: "4️⃣ *Aviraj Apartments* (Sahastradhara Road)" }
  ];
  return allProps.filter(p => !getActiveBookingForProperty(p.name, bookings));
};

interface ChatbotContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  isTyping: boolean;
  state: ChatState;
  memory: SessionMemory;
  resetChat: () => void;
  activeProperty: PropertyItem | null;
  setActiveProperty: (prop: PropertyItem | null) => void;
  viewPropertyDetails: (prop: PropertyItem) => void;
  bookVisitForProperty: (prop: PropertyItem) => void;
  downloadBrochureForProperty: (prop: PropertyItem) => void;
  talkToExpertForProperty: (prop: PropertyItem) => void;
}

const ChatbotContext = createContext<ChatbotContextValue | null>(null);

export function useChatbot() {
  const ctx = useContext(ChatbotContext);
  if (!ctx) throw new Error("useChatbot must be used inside <ChatbotProvider>");
  return ctx;
}

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [session_id] = useState(() => generateUUID());

  // State Machine and Session Memory
  const [chatState, setChatState] = useState<ChatState>("HOME");
  const [memory, setMemory] = useState<SessionMemory>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vineyard_chat_memory_v6");
      return saved ? JSON.parse(saved) : { leadScore: "Cold" };
    }
    return { leadScore: "Cold" };
  });

  const [activeProperty, setActiveProperty] = useState<PropertyItem | null>(null);
  const [subStep, setSubStep] = useState<string>("");
  const [tempEmail, setTempEmail] = useState<string>("");

  const navigate = useNavigate();

  // Refs to prevent duplicate triggers
  const lastProcessedInputRef = useRef<string>("");
  const processingRef = useRef<boolean>(false);

  // Sync memory to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vineyard_chat_memory_v6", JSON.stringify(memory));
    }
  }, [memory]);

  // Load existing bookings on mount or when contact details change
  useEffect(() => {
    const contact = memory.phone || memory.email;
    if (contact) {
      apiFetch<Booking[]>("/appointments", { params: { contact } })
        .then((data) => {
          setMemory(prev => ({
            ...prev,
            activeBookings: data
          }));
        })
        .catch(err => console.error("Error fetching bookings:", err));
    }
  }, [memory.phone, memory.email]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const resetChat = useCallback(() => {
    setMessages([]);
    setChatState("HOME");
    setSubStep("");
    setMemory({ leadScore: "Cold" });
    setActiveProperty(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("vineyard_chat_memory_v6");
    }
  }, []);

  const appendMessage = useCallback((role: "user" | "assistant", content: string, extra?: Partial<ChatMessage>) => {
    const id = generateUUID();
    const newMsg: ChatMessage = {
      id,
      role,
      content,
      timestamp: new Date(),
      type: "text",
      ...extra,
    };

    setMessages((prev) => {
      const isDuplicate = prev.some(
        (m) =>
          m.role === role &&
          m.content === content &&
          Math.abs(m.timestamp.getTime() - newMsg.timestamp.getTime()) < 500
      );
      if (isDuplicate) return prev;
      return [...prev, newMsg];
    });

    // Send history to backend
    apiFetch("/chat-history", {
      method: "POST",
      body: JSON.stringify({
        session_id,
        role,
        content,
      }),
    }).catch((err) => console.error("Error logging chat history:", err));

    return id;
  }, [session_id]);

  // Validation functions
  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.trim());
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isUnusualEmailDomain = (email: string) => {
    const domain = email.split("@")[1]?.toLowerCase() || "";
    const commonDomains = [
      "gmail.com", "yahoo.com", "outlook.com", "hotmail.com",
      "icloud.com", "zoho.com", "protonmail.com", "aol.com",
      "yahoo.co.in", "gmail.in"
    ];
    if (commonDomains.includes(domain)) return false;
    const tld = domain.split(".").pop();
    const commonTlds = ["com", "in", "net", "org", "co.in", "co", "io", "edu", "gov"];
    if (tld && commonTlds.includes(tld)) return false;
    return true;
  };

  const validateFutureDate = (dateStr: string) => {
    const parsed = Date.parse(dateStr);
    if (isNaN(parsed)) return false;
    const date = new Date(parsed);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const PROPERTY_OPTIONS = [
    "Sangam Valley",
    "Platinum Township",
    "Vivanta Greens",
    "Aviraj Apartments",
  ];
  const TIME_SLOTS = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
  const CLOSING_SUGGESTIONS = ["Call Now", "Chat on WhatsApp", "Explore More Properties"];

  // Smart Budget Parser
  const parseBudget = (text: string): { budgetVal: number; textVal: string; ambiguous: boolean } => {
    const clean = text.toLowerCase().replace(/[^a-z0-9.]/g, "");

    if (/^\d+(\.\d+)?$/.test(clean)) {
      const val = parseFloat(clean);
      if (val < 15) {
        return { budgetVal: val * 10000000, textVal: `₹${val} Cr`, ambiguous: false };
      }
      if (val >= 15 && val <= 500) {
        return { budgetVal: val * 100000, textVal: `₹${val} Lakhs`, ambiguous: false };
      }
      return { budgetVal: val, textVal: `₹${val}`, ambiguous: false };
    }

    const croreMatch = clean.match(/(\d+(\.\d+)?)\s*(crore|cr)/);
    if (croreMatch) {
      const val = parseFloat(croreMatch[1]);
      return { budgetVal: val * 10000000, textVal: `₹${val} Cr`, ambiguous: false };
    }

    const lakhMatch = clean.match(/(\d+(\.\d+)?)\s*(lakh|l)/);
    if (lakhMatch) {
      const val = parseFloat(lakhMatch[1]);
      return { budgetVal: val * 100000, textVal: `₹${val} Lakhs`, ambiguous: false };
    }

    return { budgetVal: 0, textVal: "", ambiguous: false };
  };

  const extractQueryDetails = (text: string) => {
    const lower = text.toLowerCase();
    const result: Partial<SessionMemory> = {};

    const parsed = parseBudget(text);
    if (parsed.budgetVal > 0 && !parsed.ambiguous) {
      result.budget = parsed.budgetVal.toString();
      result.budgetText = parsed.textVal;
    }

    if (lower.includes("villa") || lower.includes("house")) {
      result.propertyType = "Villa";
    } else if (lower.includes("apartment") || lower.includes("flat")) {
      result.propertyType = "Apartment";
    } else if (lower.includes("plot") || lower.includes("land")) {
      result.propertyType = "Plot";
    }

    if (lower.includes("mussoorie")) {
      result.location = "Mussoorie Road";
    } else if (lower.includes("sahastradhara") || lower.includes("mandakini")) {
      result.location = "Sahastradhara Road";
    } else if (lower.includes("harrawala")) {
      result.location = "Harrawala";
    } else if (lower.includes("sahaspur") || lower.includes("chandpur")) {
      result.location = "Sahaspur Road";
    }

    return result;
  };

  const calculateLeadScore = (currentMemory: SessionMemory, state: ChatState): LeadScore => {
    if ((state === "SITE_VISIT" || state === "TALK_TO_EXPERT") && currentMemory.phone) {
      return "Hot";
    }
    if (state === "PROPERTY_SEARCH" || state === "INVESTMENT_FLOW") {
      return "Warm";
    }
    return currentMemory.leadScore || "Cold";
  };

  const generateHandoffSummary = (currentMemory: SessionMemory) => {
    const priceStr = currentMemory.budget ? `(₹${(parseFloat(currentMemory.budget) / 10000000).toFixed(2)} Cr)` : "";
    return `CRM Lead Summary:\nName: ${currentMemory.name || "N/A"}\nPhone: ${currentMemory.phone || "N/A"}\nEmail: ${currentMemory.email || "N/A"}\nBudget: ${currentMemory.budgetText || "N/A"} ${priceStr}\nLocation: ${currentMemory.location || "N/A"}\nProperty Type: ${currentMemory.propertyType || "N/A"}\nProject Preference: ${currentMemory.selectedProperty || "N/A"}\nVisit Date: ${currentMemory.visitDate || "N/A"}\nLead Score: ${currentMemory.leadScore || "Cold"}`;
  };

  const getPersonalizedIntro = (currentMemory: SessionMemory) => {
    const budgetDisplay = currentMemory.budgetText || "premium budget";
    const locDisplay = currentMemory.location ? `in the highly coveted ${currentMemory.location} corridor` : "across prime Dehradun";
    const typeDisplay = currentMemory.propertyType ? `${currentMemory.propertyType} options` : "luxury residences";

    return `For your ${budgetDisplay} ${typeDisplay} ${locDisplay}, here are the most matching options:`;
  };

  // Property Card Action Mappings
  const viewPropertyDetails = useCallback((prop: PropertyItem) => {
    setActiveProperty(prop);
    const slug = prop.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    navigate({ to: `/projects/${slug}` });
    appendMessage("assistant", `Navigating you to the detailed showcase page for *${prop.name}* at ${prop.location}.\n\nHow else can I assist you with this development?`, {
      suggestions: ["Book Site Visit", "Download Brochure", "Talk to Expert"],
    });
  }, [navigate, appendMessage]);  const bookVisitForProperty = useCallback((prop: PropertyItem) => {
    setActiveProperty(prop);
    setChatState("SITE_VISIT");

    const activeBooking = getActiveBookingForProperty(prop.name, memory.activeBookings);
    setMemory(prev => ({ ...prev, selectedProperty: prop.name }));

    if (activeBooking) {
      setSubStep("visit_modify_options");
      appendMessage("assistant", `You already have an active viewing appointment scheduled for *${prop.name}* on ${activeBooking.preferred_date} at ${activeBooking.preferred_time}.\n\nHow would you like to proceed?`, {
        suggestions: ["Modify Visit", "Cancel Visit", "Book Another Property"],
      });
    } else {
      setSubStep("visit_date");
      appendMessage("assistant", `Let's schedule your private viewing for *${prop.name}*. Please enter your preferred Date (YYYY-MM-DD):`);
    }
  }, [appendMessage, memory.activeBookings]);
  const downloadBrochureForProperty = useCallback((prop: PropertyItem) => {
    setActiveProperty(prop);
    if (memory.name && memory.phone && memory.email) {
      const brochureLink = prop.brochure_url
        ? `[Download Brochure PDF](${prop.brochure_url})`
        : `[Download Brochure PDF](https://ik.imagekit.io/vineyard/Vineyard%20Infra/General%20Brochure.pdf)`;
      appendMessage("assistant", `Thank you for your interest! Here is the brochure link for *${prop.name}*: ${brochureLink}.\n\nFor immediate assistance, call ${COMPANY_PHONE}.`, {
        suggestions: CLOSING_SUGGESTIONS,
      });
      const updated = { ...memory, purpose: `Brochure: ${prop.name}` };
      submitLead(updated);
    } else {
      setMemory(prev => ({ ...prev, brochurePending: true }));
      setChatState("LEAD_CAPTURE");
      setSubStep("lead_name");
      appendMessage("assistant", `I would be delighted to share the digital brochures and master plans for *${prop.name}*. What is your Full Name?`);
    }
  }, [appendMessage, memory]);

  const talkToExpertForProperty = useCallback((prop: PropertyItem) => {
    setActiveProperty(prop);
    const score = calculateLeadScore(memory, "TALK_TO_EXPERT");
    const updatedMemory = { ...memory, leadScore: score, selectedProperty: prop.name };
    setMemory(updatedMemory);
    setChatState("TALK_TO_EXPERT");

    if (updatedMemory.name && updatedMemory.phone && updatedMemory.email) {
      setSubStep("expert_reuse_confirm");
      appendMessage("assistant", `I found your details on file:\n👤 Name: ${updatedMemory.name}\n📞 Phone: ${updatedMemory.phone}\n📧 Email: ${updatedMemory.email}\n\nWould you like to proceed using these details or update them for this callback?`, {
        suggestions: ["Use Existing Details", "Update Details"],
      });
    } else {
      if (!updatedMemory.name) {
        setSubStep("expert_name");
        appendMessage("assistant", `I am arranging a callback request with our project specialist for *${prop.name}*. What is your Full Name?`);
      } else if (!updatedMemory.phone) {
        setSubStep("expert_phone");
        appendMessage("assistant", `I am arranging a callback request for *${prop.name}*. Pleasure connecting, ${updatedMemory.name}. May I have your 10-digit Indian Contact Number?`);
      } else {
        setSubStep("expert_email");
        appendMessage("assistant", `I am arranging a callback request for *${prop.name}*. Thank you. What is your Email Address?`);
      }
    }
  }, [appendMessage, memory]);

  const handleStateTransition = async (userInput: string) => {
    if (processingRef.current) return;
    processingRef.current = true;
    setIsTyping(true);

    const input = userInput.trim();
    const lowerInput = input.toLowerCase();

    // Call Now CTA Integration handler
    if (lowerInput === "call now") {
      window.open(`tel:${COMPANY_PHONE}`);
      appendMessage("assistant", `Initiating phone call to Vineyard Infra Relationship Manager at ${COMPANY_PHONE}...`, {
        suggestions: CLOSING_SUGGESTIONS,
      });
      setIsTyping(false);
      processingRef.current = false;
      return;
    }

    // WhatsApp Integration redirection handler
    if (lowerInput === "chat on whatsapp") {
      const prefilledName = memory.name ? ` My name is ${memory.name}.` : "";
      const text = encodeURIComponent(`Hello Vineyard Infra, I have registered my details on your website.${prefilledName} Please connect me with a senior advisor.`);
      window.open(`https://wa.me/91${COMPANY_PHONE}?text=${text}`, "_blank");
      appendMessage("assistant", `Connecting you to WhatsApp chat at +91 ${COMPANY_PHONE}...`, {
        suggestions: CLOSING_SUGGESTIONS,
      });
      setIsTyping(false);
      processingRef.current = false;
      return;
    }

    // Explore More Properties CTA Integration handler
    if (lowerInput === "explore more properties") {
      setChatState("PROPERTY_SEARCH");
      setSubStep("search_type");
      appendMessage("assistant", "I would be delighted to show you other options. What class of luxury asset would you like to explore next?", {
        suggestions: ["Villa", "Apartment", "Plot", "Any"],
      });
      setIsTyping(false);
      processingRef.current = false;
      return;
    }

    // View Property Details CTA Integration handler
    if (lowerInput === "view property details") {
      const targetPropName = memory.lastBookingSuccess?.property_name || memory.selectedProperty || "";
      if (targetPropName) {
        const slug = targetPropName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        navigate({ to: `/projects/${slug}` });
        appendMessage("assistant", `Navigating you to the detailed showcase page for *${targetPropName}*.\n\nHow else can I assist you?`, {
          suggestions: CLOSING_SUGGESTIONS
        });
      } else {
        appendMessage("assistant", "Which property's details would you like to view?", {
          suggestions: PROPERTY_OPTIONS
        });
      }
      setIsTyping(false);
      processingRef.current = false;
      return;
    }

    // Global Command: Talk to Expert
    if (lowerInput === "talk to expert") {
      const score = calculateLeadScore(memory, "TALK_TO_EXPERT");
      const updatedMemory = { ...memory, leadScore: score };
      setMemory(updatedMemory);
      setChatState("TALK_TO_EXPERT");
      if (updatedMemory.name && updatedMemory.phone && updatedMemory.email) {
        setSubStep("expert_reuse_confirm");
        appendMessage("assistant", `I found your details on file:\n👤 Name: ${updatedMemory.name}\n📞 Phone: ${updatedMemory.phone}\n📧 Email: ${updatedMemory.email}\n\nWould you like to proceed using these details or update them for this callback?`, {
          suggestions: ["Use Existing Details", "Update Details"],
        });
      } else {
        if (!updatedMemory.name) {
          setSubStep("expert_name");
          appendMessage("assistant", "I am connecting you with a senior property advisor for our developments. What is your Full Name?");
        } else if (!updatedMemory.phone) {
          setSubStep("expert_phone");
          appendMessage("assistant", `I am connecting you with a senior property advisor. Pleasure connecting, ${updatedMemory.name}. May I have your 10-digit Indian Contact Number?`);
        } else {
          setSubStep("expert_email");
          appendMessage("assistant", "I am connecting you with a senior property advisor. Thank you. What is your Email Address?");
        }
      }
      setIsTyping(false);
      processingRef.current = false;
      return;
    }

    // Global Command: Download Brochure
    if (lowerInput.includes("download brochure") || lowerInput.includes("get brochure")) {
      const targetName = activeProperty?.name || "our properties";
      if (memory.name && memory.phone && memory.email) {
        const brochureLink = activeProperty?.brochure_url
          ? `[Download Brochure PDF](${activeProperty.brochure_url})`
          : `[Download Brochure PDF](https://ik.imagekit.io/vineyard/Vineyard%20Infra/General%20Brochure.pdf)`;
        appendMessage("assistant", `Thank you for your interest! Here is the brochure link for *${targetName}*: ${brochureLink}.\n\nFor immediate assistance, call ${COMPANY_PHONE}.`, {
          suggestions: CLOSING_SUGGESTIONS,
        });
        const updated = { ...memory, purpose: `Brochure: ${targetName}` };
        await submitLead(updated);
      } else {
        setMemory(prev => ({ ...prev, brochurePending: true }));
        setChatState("LEAD_CAPTURE");
        setSubStep("lead_name");
        appendMessage("assistant", `I'd love to share the digital brochures and master plans for *${targetName}*. What is your Full Name?`);
      }
      setIsTyping(false);
      processingRef.current = false;
      return;
    }



    // Global Command: Schedule Site Visit / Continuation Offer
    if (lowerInput === "schedule site visit" || lowerInput === "book visit") {
      const score = calculateLeadScore(memory, "SITE_VISIT");
      setChatState("SITE_VISIT");

      const activeBooking = memory.selectedProperty ? getActiveBookingForProperty(memory.selectedProperty, memory.activeBookings) : undefined;

      if (activeBooking) {
        setSubStep("visit_modify_options");
        appendMessage("assistant", `You already have an active viewing appointment scheduled for *${memory.selectedProperty}* on ${activeBooking.preferred_date} at ${activeBooking.preferred_time}.\n\nHow would you like to proceed?`, {
          suggestions: ["Modify Visit", "Cancel Visit", "Book Another Property"],
        });
      } else if (memory.selectedProperty) {
        setSubStep("visit_continuation");
        appendMessage("assistant", `I noticed you previously selected *${memory.selectedProperty}*. Would you like to proceed with this booking or choose another property?`, {
          suggestions: ["Continue Booking", "Choose Another Property"],
        });
      } else {
        setSubStep("visit_property");
        const available = getAvailablePropertiesToBook(memory.activeBookings);
        if (available.length === 0) {
          appendMessage("assistant", "You currently have active bookings for all our properties! You can modify or cancel your existing bookings, or speak to our property advisor.", {
            suggestions: ["Modify Visit", "Cancel Visit", "Talk to Expert"]
          });
          setSubStep("visit_modify_options");
        } else {
          const optionsText = available.map(p => p.desc).join("\n");
          const suggestions = available.map(p => p.num);
          appendMessage("assistant", `Which of our signature properties would you like to tour?\n\n${optionsText}\n\nPlease respond with the option number or project name:`, {
            suggestions
          });
        }
      }
      setMemory((prev) => ({ ...prev, leadScore: score }));
      setIsTyping(false);
      processingRef.current = false;
      return;
    }

    // Global Command: Property Search
    if (lowerInput === "find property" || lowerInput === "search properties") {
      const score = calculateLeadScore(memory, "PROPERTY_SEARCH");
      setChatState("PROPERTY_SEARCH");
      
      const hasExistingDetails = memory.name && memory.phone;
      if (hasExistingDetails) {
        setSubStep("search_inquiry_choice");
        appendMessage("assistant", `I found your details on file:\n👤 Name: ${memory.name}\n📞 Phone: ${memory.phone}\n\nWould you like to start a new inquiry or proceed using these details?`, {
          suggestions: ["Start New Inquiry", "Use Existing Details"]
        });
      } else {
        setSubStep("search_name");
        appendMessage("assistant", "I'd love to help you find your premium property in Dehradun. First, could you please tell me your Full Name?");
      }
      
      setMemory((prev) => ({ ...prev, leadScore: score }));
      setIsTyping(false);
      processingRef.current = false;
      return;
    }

    // Global Command: Investment Consultation Flow
    if (lowerInput === "investment advice" || lowerInput === "investment consultation") {
      const score = calculateLeadScore(memory, "INVESTMENT_FLOW");
      setChatState("INVESTMENT_FLOW");
      setMemory((prev) => ({ ...prev, leadScore: score }));

      if (memory.budget) {
        setSubStep("invest_horizon");
        appendMessage("assistant", "I will use your saved budget details. What is your expected investment horizon?\n\n• Short Term (< 3 Years)\n• Medium Term (3-5 Years)\n• Long Term (5+ Years)", {
          suggestions: ["Short Term", "Medium Term", "Long Term"],
        });
      } else {
        setSubStep("invest_budget");
        appendMessage("assistant", "Let us optimize your real estate portfolio. What is your target investment capital? (e.g. 75 Lakhs, 1.5 Crore):");
      }
      setIsTyping(false);
      processingRef.current = false;
      return;
    }

    // Check for natural language search queries on HOME state
    if (chatState === "HOME") {
      const extracted = extractQueryDetails(userInput);
      if (Object.keys(extracted).length > 0) {
        setMemory((prev) => ({ ...prev, ...extracted, leadScore: "Warm" }));
        setChatState("PROPERTY_SEARCH");

        if (!extracted.location && !memory.location) {
          setSubStep("search_location");
          appendMessage("assistant", "Excellent. Which Dehradun micro-market do you wish to focus on? (e.g. Mussoorie Road, Sahastradhara Road, or 'Any')");
        } else {
          setSubStep("search_type");
          appendMessage("assistant", "What property type are you looking for? (Villa, Apartment, Plot, or 'Any')", {
            suggestions: ["Villa", "Apartment", "Plot", "Any"],
          });
        }
        setIsTyping(false);
        processingRef.current = false;
        return;
      }
    }

    // State machine handlers
    switch (chatState) {
      case "HOME": {
        let matchingFaq = null;
        try {
          const faqsData = await apiFetch<any[]>("/faqs");
          matchingFaq = faqsData.find((faq: any) =>
            lowerInput.includes(faq.question.toLowerCase().replace("?", ""))
          );
        } catch (err) {
          console.error("Failed to fetch FAQs:", err);
        }

        if (matchingFaq) {
          appendMessage("assistant", matchingFaq.answer, {
            suggestions: ["Find Property", "Schedule Site Visit", "Talk to Expert"],
          });
        } else {
          appendMessage(
            "assistant",
            "Welcome to Vineyard Infra. I am Vin Bot, your premium property concierge. How may I assist you with your real estate goals today?",
            {
              suggestions: ["Find Property", "Schedule Site Visit", "Talk to Expert"],
            }
          );
        }
        break;
      }

      case "PROPERTY_SEARCH": {
        if (subStep === "search_inquiry_choice") {
          if (lowerInput.includes("start new") || lowerInput.includes("new inquiry")) {
            setMemory(prev => ({ ...prev, name: undefined, phone: undefined, email: undefined, selectedProperty: undefined }));
            setSubStep("search_name");
            appendMessage("assistant", "I'd love to help you find your premium property in Dehradun. First, could you please tell me your Full Name?");
          } else {
            setSubStep("search_brochure_consent");
            appendMessage("assistant", "Would you like to receive brochures, floor plans, and pricing details by email?", {
              suggestions: ["Yes", "No"]
            });
          }
        } else if (subStep === "search_name") {
          const updated = { ...memory, name: input };
          setMemory(updated);
          setSubStep("search_phone");
          appendMessage("assistant", `Pleasure connecting, ${input}. May I have your 10-digit Indian Contact Number?`);
        } else if (subStep === "search_phone") {
          if (!validatePhone(input)) {
            appendMessage("assistant", "⚠️ That contact number seems incorrect. Please enter a valid 10-digit Indian number:");
          } else {
            const updated = { ...memory, phone: input };
            setMemory(updated);
            
            await submitLead(updated);
            
            setSubStep("search_brochure_consent");
            appendMessage("assistant", "Would you like to receive brochures, floor plans, and pricing details by email?", {
              suggestions: ["Yes", "No"]
            });
          }
        } else if (subStep === "search_brochure_consent") {
          if (lowerInput.includes("yes")) {
            setSubStep("search_email");
            appendMessage("assistant", "Thank you. What is your Email Address?");
          } else {
            setSubStep("search_type");
            appendMessage("assistant", "What type of luxury property matches your vision today?\n\n• Villa\n• Apartment\n• Plot\n• Any", {
              suggestions: ["Villa", "Apartment", "Plot", "Any"],
            });
          }
        } else if (subStep === "search_email") {
          if (!validateEmail(input)) {
            appendMessage("assistant", "⚠️ Please enter a valid email address:");
          } else {
            const updated = { ...memory, email: input };
            setMemory(updated);
            
            await submitLead(updated);
            
            setSubStep("search_type");
            appendMessage("assistant", "What type of luxury property matches your vision today?\n\n• Villa\n• Apartment\n• Plot\n• Any", {
              suggestions: ["Villa", "Apartment", "Plot", "Any"],
            });
          }
        } else if (subStep === "search_type") {
          const val = input.toLowerCase() === "any" ? "Any" : input;
          setMemory((prev) => ({ ...prev, propertyType: val }));
          setSubStep("search_budget");
          appendMessage("assistant", `Understood. What is your target budget for this ${val}? (e.g., '78 Lakhs', '1.5 Crore')`);
        } else if (subStep === "search_budget") {
          const rawNumMatch = input.trim().match(/^(\d+(\.\d+)?)$/);
          if (rawNumMatch) {
            const rawNum = rawNumMatch[1];
            setMemory((prev) => ({ ...prev, tempBudgetClarification: rawNum }));
            setSubStep("search_budget_clarify");
            appendMessage("assistant", `Is that ${rawNum} Lakhs or ${rawNum} Crores?`, {
              suggestions: [`${rawNum} Lakhs`, `${rawNum} Crores`]
            });
          } else {
            const parsed = parseBudget(input);
            if (parsed.ambiguous) {
              appendMessage("assistant", "Is that in Lakhs or Crores? Please confirm (e.g., '2 Lakhs' or '2 Crores'):");
            } else {
              const budgetValStr = parsed.budgetVal > 0 ? parsed.budgetVal.toString() : "Any";
              const budgetTextStr = parsed.textVal || "Any";
              setMemory((prev) => ({ ...prev, budget: budgetValStr, budgetText: budgetTextStr }));
              setSubStep("search_location");
              appendMessage("assistant", "What location in Dehradun do you prefer? (e.g. Mussoorie Road, Sahastradhara Road, Harrawala, or 'Any')", {
                suggestions: ["Mussoorie Road", "Sahastradhara Road", "Harrawala", "Any"]
              });
            }
          }
        } else if (subStep === "search_budget_clarify") {
          const parsed = parseBudget(input);
          const budgetValStr = parsed.budgetVal > 0 ? parsed.budgetVal.toString() : "Any";
          const budgetTextStr = parsed.textVal || "Any";
          setMemory((prev) => ({ ...prev, budget: budgetValStr, budgetText: budgetTextStr, tempBudgetClarification: undefined }));
          setSubStep("search_location");
          appendMessage("assistant", "What location in Dehradun do you prefer? (e.g. Mussoorie Road, Sahastradhara Road, Harrawala, or 'Any')", {
            suggestions: ["Mussoorie Road", "Sahastradhara Road", "Harrawala", "Any"]
          });
        } else if (subStep === "search_location") {
          const val = input.toLowerCase() === "any" ? "Any" : input;
          setMemory((prev) => ({ ...prev, location: val }));

          if (memory.propertyType === "Plot") {
            setSubStep("search_plotsize");
            appendMessage("assistant", "What is your preferred Plot size? (e.g. 100-200 sqyd, or 'Any')");
          } else {
            setSubStep("search_bhk");
            appendMessage("assistant", "How many BHKs do you require? (2, 3, 4, or 'Any')", {
              suggestions: ["2", "3", "4", "Any"],
            });
          }
        } else if (subStep === "search_bhk") {
          const val = input.toLowerCase() === "any" ? "Any" : input;
          setMemory((prev) => ({ ...prev, bhk: val }));
          setSubStep("search_status");
          appendMessage("assistant", "Preferred property status?\n\n• Ready to Move\n• Under Construction\n• Any", {
            suggestions: ["Ready to Move", "Under Construction", "Any"],
          });
        } else if (subStep === "search_plotsize") {
          const val = input.toLowerCase() === "any" ? "Any" : input;
          setMemory((prev) => ({ ...prev, plotSize: val }));
          setSubStep("search_status");
          appendMessage("assistant", "Preferred property status?\n\n• Ready to Move\n• Under Construction\n• Any", {
            suggestions: ["Ready to Move", "Under Construction", "Any"],
          });
        } else if (subStep === "search_status") {
          const val = input.toLowerCase() === "any" ? "Any" : input;
          setMemory((prev) => ({ ...prev, constructionStatus: val }));
          setSubStep("search_purpose");
          appendMessage("assistant", "What is the primary purpose of this property purchase?\n\n• Self Use\n• Investment", {
            suggestions: ["Self Use", "Investment"]
          });
        } else if (subStep === "search_purpose") {
          const val = input.toLowerCase() === "any" ? "Any" : input;
          const finalMemory = { ...memory, purpose: val };
          setMemory(finalMemory);
          
          await submitLead(finalMemory);
          await fetchAndShowProperties(finalMemory);
        }
        break;
      }

      case "LEAD_CAPTURE": {
        if (subStep === "lead_reuse_confirm") {
          if (lowerInput.includes("use existing")) {
            await fetchAndShowProperties(memory);
          } else {
            setMemory(prev => ({ ...prev, name: undefined, phone: undefined, email: undefined }));
            setSubStep("lead_name");
            appendMessage("assistant", "No problem. Let's update your file details. What is your Full Name?");
          }
        } else if (subStep === "lead_name") {
          setMemory((prev) => ({ ...prev, name: input }));
          if (!memory.phone) {
            setSubStep("lead_phone");
            appendMessage("assistant", `Pleasure connecting, ${input}. May I have your 10-digit Indian Contact Number?`);
          } else if (!memory.email) {
            setSubStep("lead_email");
            appendMessage("assistant", "Thank you. What is your Email Address?");
          } else {
            setSubStep("lead_purpose");
            appendMessage("assistant", "What is the primary objective for this acquisition?\n\n• Self Use\n• Investment", {
              suggestions: ["Self Use", "Investment"],
            });
          }
        } else if (subStep === "lead_phone") {
          if (!validatePhone(input)) {
            appendMessage("assistant", "⚠️ That contact number seems incorrect. Please enter a valid 10-digit number:");
          } else {
            setMemory((prev) => ({ ...prev, phone: input }));
            if (!memory.email) {
              setSubStep("lead_email");
              appendMessage("assistant", "Perfect. What is your Email Address?");
            } else {
              setSubStep("lead_purpose");
              appendMessage("assistant", "What is the primary objective of this purchase?\n\n• Self Use\n• Investment", {
                suggestions: ["Self Use", "Investment"],
              });
            }
          }
        } else if (subStep === "lead_email") {
          if (!validateEmail(input)) {
            appendMessage("assistant", "⚠️ Please share a valid email format:");
          } else {
            if (isUnusualEmailDomain(input)) {
              setTempEmail(input);
              setSubStep("lead_email_confirm");
              appendMessage("assistant", `⚠️ The email domain *${input.split("@")[1]}* appears to be unusual. Can you confirm if this email address is correct?`, {
                suggestions: ["Yes, it is correct", "No, let me correct it"],
              });
            } else {
              const updated = { ...memory, email: input };
              setMemory(updated);

              if (updated.brochurePending) {
                setMemory(prev => ({ ...prev, brochurePending: false }));
                await submitLead(updated);
                const targetName = activeProperty?.name || "our properties";
                const brochureLink = activeProperty?.brochure_url
                  ? `[Download Brochure PDF](${activeProperty.brochure_url})`
                  : `[Download Brochure PDF](https://ik.imagekit.io/vineyard/Vineyard%20Infra/General%20Brochure.pdf)`;
                appendMessage("assistant", `Thank you for registering! Here is your download link for *${targetName}*: ${brochureLink}.\n\nFor immediate assistance, call ${COMPANY_PHONE}.`, {
                  suggestions: CLOSING_SUGGESTIONS,
                });
                setChatState("HOME");
              } else {
                if (memory.purpose) {
                  await submitLead(updated);
                  await fetchAndShowProperties(updated);
                } else {
                  setSubStep("lead_purpose");
                  appendMessage("assistant", "Perfect. What is the primary purpose of this property purchase?\n\n• Self Use\n• Investment", {
                    suggestions: ["Self Use", "Investment"],
                  });
                }
              }
            }
          }
        } else if (subStep === "lead_email_confirm") {
          if (lowerInput.includes("yes") || lowerInput.includes("correct")) {
            const updated = { ...memory, email: tempEmail };
            setMemory(updated);

            if (updated.brochurePending) {
              setMemory(prev => ({ ...prev, brochurePending: false }));
              await submitLead(updated);
              const targetName = activeProperty?.name || "our properties";
              const brochureLink = activeProperty?.brochure_url
                ? `[Download Brochure PDF](${activeProperty.brochure_url})`
                : `[Download Brochure PDF](https://ik.imagekit.io/vineyard/Vineyard%20Infra/General%20Brochure.pdf)`;
              appendMessage("assistant", `Thank you for registering! Here is your download link for *${targetName}*: ${brochureLink}.\n\nFor immediate assistance, call ${COMPANY_PHONE}.`, {
                suggestions: CLOSING_SUGGESTIONS,
              });
              setChatState("HOME");
            } else {
              if (memory.purpose) {
                await submitLead(updated);
                await fetchAndShowProperties(updated);
              } else {
                setSubStep("lead_purpose");
                appendMessage("assistant", "Got it. What is the primary purpose of this property purchase?\n\n• Self Use\n• Investment", {
                  suggestions: ["Self Use", "Investment"],
                });
              }
            }
          } else {
            setSubStep("lead_email");
            appendMessage("assistant", "Please enter your correct email address:");
          }
        } else if (subStep === "lead_purpose") {
          const finalMemory = { ...memory, purpose: input };
          setMemory(finalMemory);

          await submitLead(finalMemory);
          await fetchAndShowProperties(finalMemory);
        }
        break;
      }

      case "SITE_VISIT": {
        if (subStep === "visit_continuation") {
          if (lowerInput.includes("continue") || lowerInput.includes("yes")) {
            setSubStep("visit_date");
            appendMessage("assistant", `Wonderful, scheduling your tour for *${memory.selectedProperty}*. Please enter your preferred Date (YYYY-MM-DD):`);
          } else {
            setSubStep("visit_property");
            const available = getAvailablePropertiesToBook(memory.activeBookings);
            if (available.length === 0) {
              appendMessage("assistant", "You currently have active bookings for all our properties! You can modify or cancel your existing bookings, or speak to our property advisor.", {
                suggestions: ["Modify Visit", "Cancel Visit", "Talk to Expert"]
              });
              setSubStep("visit_modify_options");
            } else {
              const optionsText = available.map(p => p.desc).join("\n");
              const suggestions = available.map(p => p.num);
              appendMessage("assistant", `Which Vineyard project would you like to tour?\n\n${optionsText}`, {
                suggestions,
              });
            }
          }
        } else if (subStep === "visit_property") {
          let selection = input;
          if (input === "1") selection = PROPERTY_OPTIONS[0];
          if (input === "2") selection = PROPERTY_OPTIONS[1];
          if (input === "3") selection = PROPERTY_OPTIONS[2];

          const matched = PROPERTY_OPTIONS.find((p) => p.toLowerCase().includes(selection.toLowerCase()));
          if (!matched) {
            appendMessage("assistant", "⚠️ Property not recognized. Please choose one of the available options.");
          } else {
            const activeBooking = getActiveBookingForProperty(matched, memory.activeBookings);
            if (activeBooking) {
              setMemory(prev => ({ ...prev, selectedProperty: matched }));
              setSubStep("visit_modify_options");
              appendMessage("assistant", `You already have an active viewing appointment scheduled for *${matched}* on ${activeBooking.preferred_date} at ${activeBooking.preferred_time}.\n\nHow would you like to proceed?`, {
                suggestions: ["Modify Visit", "Cancel Visit", "Book Another Property"],
              });
            } else {
              setMemory((prev) => ({ ...prev, selectedProperty: matched }));
              setSubStep("visit_date");
              appendMessage("assistant", `Selected property: *${matched}*.\n\nPlease type a Preferred Date (YYYY-MM-DD):`);
            }
          }
        } else if (subStep === "visit_modify_options") {
          if (lowerInput.includes("modify")) {
            const activeBooking = getActiveBookingForProperty(memory.selectedProperty || "", memory.activeBookings);
            if (activeBooking) {
              setMemory(prev => ({ ...prev, editingBookingId: activeBooking.id }));
              setSubStep("visit_date");
              appendMessage("assistant", `Modifying appointment for *${activeBooking.property_name}*. Please choose a new Preferred Date (YYYY-MM-DD):`);
            } else {
              appendMessage("assistant", "No active booking found to modify. Which property would you like to tour?", {
                suggestions: ["1", "2", "3"]
              });
              setSubStep("visit_property");
            }
          } else if (lowerInput.includes("cancel")) {
            const activeBooking = getActiveBookingForProperty(memory.selectedProperty || "", memory.activeBookings);
            if (activeBooking) {
              try {
                await apiFetch(`/appointments/${activeBooking.id}/status`, {
                  method: "PATCH",
                  params: { status: "CANCELLED" }
                });
                const updatedBookings = (memory.activeBookings || []).map(b => 
                  b.id === activeBooking.id ? { ...b, status: "CANCELLED" as const } : b
                );
                setMemory(prev => ({
                  ...prev,
                  activeBookings: updatedBookings
                }));
                appendMessage("assistant", `Your viewing appointment for *${activeBooking.property_name}* has been successfully cancelled.\n\nFor immediate assistance, call ${COMPANY_PHONE}.`, {
                  suggestions: CLOSING_SUGGESTIONS,
                });
              } catch (e) {
                console.error(e);
                appendMessage("assistant", "We encountered an issue cancelling your booking. Please try again or call support.");
              }
            } else {
              appendMessage("assistant", "No active booking found to cancel.");
            }
            setChatState("HOME");
          } else if (lowerInput.includes("another") || lowerInput.includes("book another")) {
            setSubStep("visit_property");
            const available = getAvailablePropertiesToBook(memory.activeBookings);
            if (available.length === 0) {
              appendMessage("assistant", "You currently have active bookings for all our properties! You can modify or cancel your existing bookings, or speak to our property advisor.", {
                suggestions: ["Modify Visit", "Cancel Visit", "Talk to Expert"]
              });
              setSubStep("visit_modify_options");
            } else {
              const optionsText = available.map(p => p.desc).join("\n");
              const suggestions = available.map(p => p.num);
              appendMessage("assistant", `Which property would you like to tour?\n\n${optionsText}`, {
                suggestions,
              });
            }
          } else {
            appendMessage("assistant", "Please choose a valid option:", {
              suggestions: ["Modify Visit", "Cancel Visit", "Book Another Property"]
            });
          }
        } else if (subStep === "visit_date") {
          if (!validateFutureDate(input)) {
            appendMessage("assistant", "⚠️ Please select a valid future date (YYYY-MM-DD):");
          } else {
            setMemory((prev) => ({ ...prev, visitDate: input }));
            setSubStep("visit_time");
            appendMessage("assistant", "Please choose a Preferred Time Slot:", {
              suggestions: TIME_SLOTS,
            });
          }
        } else if (subStep === "visit_time") {
          setMemory((prev) => ({ ...prev, visitTime: input }));

          if (!memory.phone || !memory.email) {
            setSubStep("visit_contact_phone");
            appendMessage("assistant", "To secure your booking, we require contact details. What is your Phone Number?");
          } else {
            await submitBooking({ ...memory, visitTime: input });
          }
        } else if (subStep === "visit_contact_phone") {
          if (!validatePhone(input)) {
            appendMessage("assistant", "⚠️ Please enter a valid 10-digit Indian phone number:");
          } else {
            setMemory((prev) => ({ ...prev, phone: input }));
            setSubStep("visit_contact_email");
            appendMessage("assistant", "Thank you. And your Email Address?");
          }
        } else if (subStep === "visit_contact_email") {
          if (!validateEmail(input)) {
            appendMessage("assistant", "⚠️ Please enter a valid email address:");
          } else {
            const updated = { ...memory, email: input };
            setMemory(updated);
            await submitBooking(updated);
          }
        }
        break;
      }

      case "INVESTMENT_FLOW": {
        if (subStep === "invest_budget") {
          const parsed = parseBudget(input);
          const budgetValStr = parsed.budgetVal > 0 ? parsed.budgetVal.toString() : "Any";
          const budgetTextStr = parsed.textVal || "Any";
          setMemory((prev) => ({ ...prev, budget: budgetValStr, budgetText: budgetTextStr }));
          setSubStep("invest_horizon");
          appendMessage("assistant", "What is your target investment horizon?\n\n• Short Term (< 3 Years)\n• Medium Term (3-5 Years)\n• Long Term (5+ Years)", {
            suggestions: ["Short Term", "Medium Term", "Long Term"],
          });
        } else if (subStep === "invest_horizon") {
          setMemory((prev) => ({ ...prev, investmentHorizon: input }));
          setSubStep("invest_goal");
          appendMessage("assistant", "What is your primary investment goal?\n\n• Rental Yield\n• Capital Appreciation\n• Land Banking\n• Luxury Living", {
            suggestions: ["Rental Yield", "Capital Appreciation", "Land Banking", "Luxury Living"],
          });
        } else if (subStep === "invest_goal") {
          const updatedMemory = { ...memory, investmentGoal: input, purpose: "Investment" };
          setMemory(updatedMemory);

          await fetchAndShowProperties(updatedMemory);
        }
        break;
      }

      case "TALK_TO_EXPERT": {
        if (subStep === "expert_reuse_confirm") {
          if (lowerInput.includes("use existing")) {
            await submitExpertCall(memory);
          } else {
            setMemory(prev => ({ ...prev, name: undefined, phone: undefined, email: undefined }));
            setSubStep("expert_name");
            appendMessage("assistant", "No problem. Let's update your callback details. What is your Full Name?");
          }
        } else if (subStep === "expert_name") {
          const updated = { ...memory, name: input };
          setMemory(updated);
          if (!updated.phone) {
            setSubStep("expert_phone");
            appendMessage("assistant", `Pleasure, ${input}. May I have your 10-digit Indian Contact Number?`);
          } else if (!updated.email) {
            setSubStep("expert_email");
            appendMessage("assistant", "Thank you. And your Email Address?");
          } else {
            await submitExpertCall(updated);
          }
        } else if (subStep === "expert_phone") {
          if (!validatePhone(input)) {
            appendMessage("assistant", "⚠️ Please enter a valid 10-digit Indian phone number:");
          } else {
            const updated = { ...memory, phone: input };
            setMemory(updated);
            if (!updated.email) {
              setSubStep("expert_email");
              appendMessage("assistant", "Thank you. And your Email Address?");
            } else {
              await submitExpertCall(updated);
            }
          }
        } else if (subStep === "expert_email") {
          if (!validateEmail(input)) {
            appendMessage("assistant", "⚠️ Please enter a valid email address:");
          } else {
            const finalExpert = { ...memory, email: input };
            setMemory(finalExpert);
            await submitExpertCall(finalExpert);
          }
        }
        break;
      }

      default:
        appendMessage("assistant", "Welcome to Vineyard Infra. I am your property consultant. How can I assist you today?", {
          suggestions: ["Find Property", "Schedule Site Visit", "Talk to Expert"],
        });
        break;
    }

    setIsTyping(false);
    processingRef.current = false;
  };

  const fetchAndShowProperties = async (currentMemory: SessionMemory) => {
    try {
      const filters: any = {};
      if (currentMemory.location && currentMemory.location !== "Any") {
        filters.location = currentMemory.location;
      }
      if (currentMemory.propertyType && currentMemory.propertyType !== "Any") {
        filters.sub_type = currentMemory.propertyType;
      }
      if (currentMemory.bhk && currentMemory.bhk !== "Any") {
        const bhkNum = parseInt(currentMemory.bhk, 10);
        if (!isNaN(bhkNum)) {
          filters.bedrooms = bhkNum;
        }
      }

      const rawProperties = await searchProperties(filters);

      const properties: PropertyItem[] = rawProperties.map((p) => {
        const bhk = p.variants && p.variants.length > 0
          ? Math.max(...p.variants.map((v: any) => v.bedrooms || 0))
          : null;
        
        const areas = p.variants && p.variants.length > 0
          ? p.variants.map((v: any) => v.area).filter(Boolean)
          : [];
        const areaStr = areas.length > 0 ? areas[0] : "";

        const heroMedia = p.media && p.media.length > 0
          ? p.media.find((m: any) => m.is_hero)?.media_url || p.media[0].media_url
          : "";

        const amenitiesStr = p.features && p.features.length > 0
          ? p.features.filter((f: any) => f.feature_type?.toUpperCase() === "AMENITY").map((f: any) => f.feature_name).join(", ")
          : null;

        return {
          id: p.id,
          name: p.name,
          location: p.location,
          property_type: p.sub_type || "Property",
          price: String(p.starting_price || "0"),
          bhk: bhk || null,
          ready_to_move: p.possession_status?.toLowerCase().includes("ready") || false,
          under_construction: p.possession_status?.toLowerCase().includes("construction") || false,
          area: areaStr,
          description: p.short_description || "",
          image_url: heroMedia,
          amenities: amenitiesStr,
          brochure_url: p.brochure_url || null,
        };
      });

      const scoredProperties = properties.map((prop) => {
        let score = 0;
        let reasons: string[] = [];

        if (currentMemory.location && currentMemory.location !== "Any" && prop.location.toLowerCase().includes(currentMemory.location.toLowerCase())) {
          score += 40;
          reasons.push("✓ Location preference match");
        }
        const propPrice = parseFloat(prop.price);
        const userBudget = currentMemory.budget ? parseFloat(currentMemory.budget) : 0;

        if (userBudget > 0) {
          const ratio = propPrice / userBudget;
          if (ratio >= 0.7 && ratio <= 1.2) {
            score += 30;
            reasons.push("✓ Premium budget match");
          } else if (ratio < 0.7) {
            score += 15;
            reasons.push("✓ Value option below target budget");
          } else {
            score += 10;
          }
        } else {
          score += 30;
        }

        if (currentMemory.propertyType && currentMemory.propertyType !== "Any" && prop.property_type.toLowerCase() === currentMemory.propertyType.toLowerCase()) {
          score += 20;
          reasons.push("✓ Desired asset class");
        }

        score += 10;
        reasons.push("✓ Suitable plot/property scale");

        let label = "Alternative Match";
        if (score >= 90) {
          label = "Best Match";
        } else if (score >= 75) {
          label = "Good Match";
        }

        let urgency = "🔥 High Demand Area";
        if (prop.location.includes("Mussoorie Road")) {
          urgency = "⏳ Limited Inventory - Popular Investment Corridor";
        }

        const reasonExplanation = `${label} (${score}%):\n${reasons.map(r => `  ${r}`).join("\n")}\n${urgency}`;

        return {
          ...prop,
          matchScore: score,
          matchReason: reasonExplanation
        };
      });

      scoredProperties.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

      let adviceIntro = getPersonalizedIntro(currentMemory);
      if (chatState === "INVESTMENT_FLOW" && currentMemory.investmentGoal) {
        adviceIntro = `📈 *Portfolio Strategy Evaluation*\n───────────────\n💡 *Strategic Reasoning:* Recommended for high-potential appreciation based on Dehradun's major road expansion corridors.\n📊 *Appreciation Potential:* 12% - 15% YoY.\n🔒 *Risk Level:* Low (Fully Approved Gated Community).\n👥 *Suitable Buyer Profile:* Wealth preservation/High Net Worth Investors.\n\nHere are the recommended assets for your portfolio:`;
      }

      appendMessage("assistant", adviceIntro, {
        type: scoredProperties.length === 1 ? "property_card" : "property_list",
        properties: scoredProperties,
        suggestions: CLOSING_SUGGESTIONS,
      });
      setChatState("HOME");
    } catch (e) {
      console.error(e);
      appendMessage("assistant", `We have premium properties lining Dehradun's growth corridors. Let me connect you with our advisor to review options.\n\nFor immediate assistance, call ${COMPANY_PHONE}.`, {
        suggestions: CLOSING_SUGGESTIONS,
      });
      setChatState("HOME");
    }
  };

  const submitLead = async (currentMemory: SessionMemory) => {
    try {
      const score = calculateLeadScore(currentMemory, chatState);
      const updated = { ...currentMemory, leadScore: score };
      const summary = generateHandoffSummary(updated);
      updated.agentSummary = summary;
      setMemory(updated);

      await apiSubmitLead({
        full_name: updated.name || "Visitor",
        phone: updated.phone || "0000000000",
        email: updated.email || null,
        budget: updated.budget || "Any",
        preferred_location: updated.location || "Any",
        interested_in: activeProperty?.name || updated.selectedProperty || null,
        property_id: activeProperty?.id || null,
        source: "Chatbot",
        purpose: updated.purpose || "Self Use",
        priority: updated.leadScore === "Hot" ? "high" : "normal",
        lead_score: updated.leadScore,
        investment_horizon: updated.investmentHorizon,
        investment_goal: updated.investmentGoal,
        agent_summary: updated.agentSummary,
      });
    } catch (e) {
      console.error("Failed to register lead", e);
    }
  };

  const submitBooking = async (currentMemory: SessionMemory) => {
    try {
      let bookingData: Booking;
      if (currentMemory.editingBookingId) {
        bookingData = await apiFetch<Booking>(`/appointments/${currentMemory.editingBookingId}`, {
          method: "PATCH",
          params: {
            preferred_date: currentMemory.visitDate || "",
            preferred_time: currentMemory.visitTime || "",
          },
        });
      } else {
        const leadResponse = await apiSubmitLead({
          full_name: currentMemory.name || "Visitor",
          phone: currentMemory.phone || currentMemory.email || "0000000000",
          email: currentMemory.email || null,
          interested_in: currentMemory.selectedProperty || PROPERTY_OPTIONS[0],
          property_id: activeProperty?.id || null,
          source: "Chatbot",
          visit_date: currentMemory.visitDate,
          visit_time: currentMemory.visitTime,
          purpose: currentMemory.purpose || "Self Use",
          lead_score: currentMemory.leadScore,
          agent_summary: currentMemory.agentSummary,
        });

        if (leadResponse?.site_visits && leadResponse.site_visits.length > 0) {
          bookingData = leadResponse.site_visits[leadResponse.site_visits.length - 1];
        } else {
          bookingData = {
            id: generateUUID(),
            property_name: currentMemory.selectedProperty || PROPERTY_OPTIONS[0],
            preferred_date: currentMemory.visitDate || "",
            preferred_time: currentMemory.visitTime || "",
            contact_details: currentMemory.phone || "Details on file",
            status: "ACTIVE",
            booking_ref: leadResponse?.booking_ref || `VIN-TEMP-${Math.floor(Math.random() * 10000)}`,
            created_at: new Date().toISOString(),
          } as any;
        }
      }

      let updatedBookings = currentMemory.activeBookings ? [...currentMemory.activeBookings] : [];
      if (currentMemory.editingBookingId) {
        updatedBookings = updatedBookings.map(b => b.id === currentMemory.editingBookingId ? bookingData : b);
      } else {
        updatedBookings.push(bookingData);
      }

      const score = calculateLeadScore(currentMemory, "SITE_VISIT");
      const updated = { 
        ...currentMemory, 
        leadScore: score,
        activeBookings: updatedBookings,
        lastBookingSuccess: bookingData,
        editingBookingId: undefined
      };
      const summary = generateHandoffSummary(updated);
      updated.agentSummary = summary;
      setMemory(updated);

      await submitLead(updated);

      appendMessage(
        "assistant",
        `🎉 Thank you! Your site tour has been successfully booked.\n\n` +
        `🏠 **Property Name:** *${bookingData.property_name}*\n` +
        `📅 **Date:** ${bookingData.preferred_date}\n` +
        `🕒 **Time:** ${bookingData.preferred_time}\n` +
        `🔢 **Booking Reference Number:** \`${bookingData.booking_ref}\`\n\n` +
        `Thank You Message:\n` +
        `We look forward to welcoming you. A property specialist will connect with you shortly.\n\n` +
        `For immediate assistance:\n` +
        `📞 **${COMPANY_PHONE}**`,
        {
          suggestions: ["View Property Details", "Call Now", "Chat on WhatsApp"],
        }
      );
      setChatState("HOME");
    } catch (e) {
      appendMessage("assistant", "Booking request recorded. Our representative will contact you soon.");
      setChatState("HOME");
    }
  };

  const submitExpertCall = async (currentMemory: SessionMemory) => {
    try {
      const score = calculateLeadScore(currentMemory, "TALK_TO_EXPERT");
      const updated = { ...currentMemory, leadScore: score };
      const summary = generateHandoffSummary(updated);
      updated.agentSummary = summary;
      setMemory(updated);

      await submitLead(updated);

      appendMessage("assistant", `📞 Thank you for contacting us! Your request has been registered successfully. A senior advisor will contact you within 15 minutes.\n\nFor faster assistance, call ${COMPANY_PHONE}.`, {
        suggestions: CLOSING_SUGGESTIONS,
      });
      setChatState("HOME");
    } catch (e) {
      appendMessage("assistant", "Expert call requested. We will reach you shortly.");
      setChatState("HOME");
    }
  };

  const sendMessage = useCallback(
    (content: string) => {
      if (lastProcessedInputRef.current === content) return;
      lastProcessedInputRef.current = content;

      appendMessage("user", content);
      handleStateTransition(content);
    },
    [chatState, subStep, memory, appendMessage]
  );

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
        messages,
        sendMessage,
        isTyping,
        state: chatState,
        memory,
        resetChat,
        activeProperty,
        setActiveProperty,
        viewPropertyDetails,
        bookVisitForProperty,
        downloadBrochureForProperty,
        talkToExpertForProperty,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}
