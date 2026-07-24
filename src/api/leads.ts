import { apiFetch } from "./client";

export interface LeadSubmission {
  full_name: string;
  phone: string;
  email?: string | null;
  interested_in?: string | null;
  property_id?: string | null;
  budget?: string | null;
  preferred_location?: string | null;
  source: string; // "Property Enquiry", "Book Site Visit", "Brochure Download", "Contact Page", "Chatbot", "Callback Form", etc.
  message?: string | null;
  purpose?: string | null;
  priority?: "low" | "normal" | "high" | null;
  lead_score?: string | null;
  investment_horizon?: string | null;
  investment_goal?: string | null;
  agent_summary?: string | null;
  visit_date?: string | null; // For Site Visit bookings
  visit_time?: string | null; // For Site Visit bookings
}

export async function submitLead(lead: LeadSubmission): Promise<any> {
  return await apiFetch<any>("/create-lead", {
    method: "POST",
    body: JSON.stringify({
      full_name: lead.full_name,
      phone: lead.phone,
      email: lead.email || null,
      interested_in: lead.interested_in || null,
      property_id: lead.property_id || null,
      budget: lead.budget || null,
      preferred_location: lead.preferred_location || null,
      source: lead.source,
      message: lead.message || null,
      purpose: lead.purpose || null,
      priority: lead.priority || "normal",
      lead_score: lead.lead_score || null,
      investment_horizon: lead.investment_horizon || null,
      investment_goal: lead.investment_goal || null,
      agent_summary: lead.agent_summary || null,
      visit_date: lead.visit_date || null,
      visit_time: lead.visit_time || null,
      lead_status: "new",
    }),
  });
}
