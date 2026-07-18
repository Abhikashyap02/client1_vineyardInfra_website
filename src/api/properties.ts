import { apiFetch } from "./client";

// ==========================================
// Backend API Model Interfaces
// ==========================================

export interface PropertyVariant {
  id: string;
  property_id: string;
  variant_name: string | null;
  area: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  price: number | null; // represented as Decimal on backend, number in JSON
  facing: string | null;
  front_road: string | null;
  availability: string | null;
  created_at: string;
  updated_at: string;
}

export interface PropertyMedia {
  id: string;
  property_id: string;
  media_type: string | null;
  media_url: string;
  title: string | null;
  is_hero: boolean;
  display_order: number | null;
  created_at: string;
}

export interface PropertyFeature {
  id: string;
  property_id: string;
  feature_type: string | null;
  feature_name: string;
  display_order: number | null;
  created_at: string;
}

export interface FAQ {
  id: string;
  property_id: string;
  question: string;
  answer: string;
  display_order: number | null;
  created_at: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  sub_type: string | null;
  location: string;
  city: string | null;
  state: string | null;
  starting_price: number | null; // Decimal on backend, number in JSON
  possession_status: string | null;
  short_description: string | null;
  about: string | null;
  why_choose: string | null;
  brochure_url: string | null;
  google_map_url: string | null;
  featured: boolean;
  status: string | null;
  created_at: string;
  updated_at: string;
  variants: PropertyVariant[];
  media: PropertyMedia[];
  features: PropertyFeature[];
}

export interface PropertyDetail extends Property {
  faqs: FAQ[];
}

// ==========================================
// Filters Interface
// ==========================================

export interface SearchFilters {
  category?: string;
  sub_type?: string;
  city?: string;
  location?: string;
  max_budget?: number;
  bedrooms?: number;
  [key: string]: string | number | boolean | undefined; // index signature for client query builder compatibility
}

// ==========================================
// API Operations
// ==========================================

/**
 * Searches properties on the backend based on criteria filters
 * Calls: GET /search-properties
 */
export async function searchProperties(filters?: SearchFilters): Promise<Property[]> {
  try {
    return await apiFetch<Property[]>("/search-properties", {
      method: "GET",
      params: filters,
    });
  } catch (error) {
    console.error("API Error in searchProperties:", error);
    throw error;
  }
}

/**
 * Retrieves details for a single property by its slug
 * Calls: GET /properties/{slug}
 */
export async function getPropertyBySlug(slug: string): Promise<PropertyDetail> {
  if (!slug) {
    throw new Error("Slug parameter is required.");
  }
  try {
    return await apiFetch<PropertyDetail>(`/properties/${encodeURIComponent(slug)}`, {
      method: "GET",
    });
  } catch (error) {
    console.error(`API Error in getPropertyBySlug for slug '${slug}':`, error);
    throw error;
  }
}
