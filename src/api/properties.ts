import { apiFetch } from "./client";
import liveLuxuryDesktop from "@/assets/banners/live_luxury_desktop.webp";
import liveLuxuryMobile from "@/assets/banners/live_luxury_mobile.webp";


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
  variants?: PropertyVariant[];
  media?: PropertyMedia[];
  features?: PropertyFeature[];
  primary_image_url?: string;
  bedrooms_summary?: string;
  bathrooms_summary?: string;
  area_summary?: string;
  amenities?: string[];
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
  min_budget?: number;
  max_budget?: number;
  bedrooms?: number;
  possession_status?: string;
  featured?: boolean;
  search_query?: string;
  [key: string]: string | number | boolean | undefined; // index signature for client query builder compatibility
}

// ==========================================
// API Operations
// ==========================================

/**
 * Searches properties on the backend based on criteria filters
 * Calls: GET /search-properties
 */
export const mockLiveLuxuryProperty: Property = {
  id: "77721eb8-a828-4437-9e09-8d06a3751580",
  slug: "live-luxury",
  name: "Live-Luxury",
  category: "Luxury",
  sub_type: "Apartment",
  location: "Kalagoan, Near DPS School",
  city: "Dehradun",
  state: "Uttarakhand",
  starting_price: 4000000,
  possession_status: "Under Construction",
  short_description: "🌟 Live-Luxury – 4-Storey Premium Living 🌟 Experience elevated everyday living with MDDA approved luxury 1 & 2 BHK floors in Kalagoan, Dehradun. Starting from ₹40 Lacs*.",
  about: "Live-Luxury is an exclusive 4-storey premium residential development located in the peaceful and highly connected neighborhood of Kalagoan, near DPS School, Dehradun. Offering meticulously planned 1 BHK and 2 BHK independent floors, the project combines modern amenities with serene surroundings. Designed for those who value privacy, comfort, and premium craftsmanship, each unit features wide balconies, ventilation on three sides, and high-quality structural elements.",
  why_choose: "MDDA Approved Project: Completely legal and approved for easy home loans and registration security.\nPremium Location: Situated near DPS School in Kalagoan, providing rapid access to major educational institutions, hospitals, and transit points.\n4-Storey Low Density Living: Highly exclusive layout ensuring peace, security, and low maintenance.",
  brochure_url: null,
  google_map_url: null,
  featured: true,
  status: "Active",
  created_at: "2026-08-22T00:00:00.000Z",
  updated_at: "2026-08-22T00:00:00.000Z",
  primary_image_url: liveLuxuryDesktop,
  bedrooms_summary: "1, 2 BHK",
  bathrooms_summary: "1-2",
  area_summary: "650 – 1250 Sq.Ft.",
  amenities: ["24/7 Gated Security", "Power Backup", "Dedicated Covered Parking"],
  variants: [
    {
      id: "v1",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      variant_name: "1 BHK Floors",
      area: "650 - 750 Sq.Ft.",
      bedrooms: 1,
      bathrooms: 1,
      price: 4000000,
      facing: "East",
      front_road: "30 Ft",
      availability: "Available",
      created_at: "2026-08-22T00:00:00.000Z",
      updated_at: "2026-08-22T00:00:00.000Z"
    },
    {
      id: "v2",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      variant_name: "2 BHK Floors",
      area: "1150 - 1250 Sq.Ft.",
      bedrooms: 2,
      bathrooms: 2,
      price: 6900000,
      facing: "East",
      front_road: "30 Ft",
      availability: "Available",
      created_at: "2026-08-22T00:00:00.000Z",
      updated_at: "2026-08-22T00:00:00.000Z"
    }
  ],
  media: [
    {
      id: "m1",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      media_type: "image",
      media_url: liveLuxuryDesktop,
      title: "Live-Luxury Desktop Facade",
      is_hero: true,
      display_order: 1,
      created_at: "2026-08-22T00:00:00.000Z"
    },
    {
      id: "m2",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      media_type: "image",
      media_url: liveLuxuryMobile,
      title: "Live-Luxury Mobile Facade",
      is_hero: false,
      display_order: 2,
      created_at: "2026-08-22T00:00:00.000Z"
    }
  ],
  features: [
    {
      id: "f1",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      feature_type: "RERA",
      feature_name: "MDDA Approved",
      display_order: 1,
      created_at: "2026-08-22T00:00:00.000Z"
    },
    {
      id: "f2",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      feature_type: "USP",
      feature_name: "4-Storey Low Density Design",
      display_order: 2,
      created_at: "2026-08-22T00:00:00.000Z"
    },
    {
      id: "f3",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      feature_type: "USP",
      feature_name: "Excellent Road Access",
      display_order: 3,
      created_at: "2026-08-22T00:00:00.000Z"
    },
    {
      id: "f4",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      feature_type: "AMENITY",
      feature_name: "24/7 Gated Security",
      display_order: 4,
      created_at: "2026-08-22T00:00:00.000Z"
    },
    {
      id: "f5",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      feature_type: "AMENITY",
      feature_name: "Power Backup",
      display_order: 5,
      created_at: "2026-08-22T00:00:00.000Z"
    },
    {
      id: "f6",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      feature_type: "AMENITY",
      feature_name: "Dedicated Covered Parking",
      display_order: 6,
      created_at: "2026-08-22T00:00:00.000Z"
    },
    {
      id: "f7",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      feature_type: "NEARBY",
      feature_name: "DPS School - 2 Mins",
      display_order: 7,
      created_at: "2026-08-22T00:00:00.000Z"
    },
    {
      id: "f8",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      feature_type: "NEARBY",
      feature_name: "Main Market - 5 Mins",
      display_order: 8,
      created_at: "2026-08-22T00:00:00.000Z"
    }
  ]
};

export const mockLiveLuxuryDetail: PropertyDetail = {
  ...mockLiveLuxuryProperty,
  faqs: [
    {
      id: "faq1",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      question: "Where is Live-Luxury located?",
      answer: "Live-Luxury is located in Kalagoan, near DPS School, Dehradun, which is a highly premium residential zone.",
      display_order: 1,
      created_at: "2026-08-22T00:00:00.000Z"
    },
    {
      id: "faq2",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      question: "Is the project MDDA approved?",
      answer: "Yes, Live-Luxury is an MDDA approved project.",
      display_order: 2,
      created_at: "2026-08-22T00:00:00.000Z"
    },
    {
      id: "faq3",
      property_id: "77721eb8-a828-4437-9e09-8d06a3751580",
      question: "What are the starting prices?",
      answer: "1 BHK floors start at ₹40 Lacs onwards, and 2 BHK floors start at ₹69 Lacs onwards.",
      display_order: 3,
      created_at: "2026-08-22T00:00:00.000Z"
    }
  ]
};

export async function searchProperties(filters?: SearchFilters): Promise<Property[]> {
  try {
    const results = await apiFetch<Property[]>("/search-properties", {
      method: "GET",
      params: filters,
    });
    if (!results.some(p => p.slug?.toLowerCase() === "live-luxury")) {
      let match = true;
      if (filters?.category && filters.category !== "Luxury" && filters.category !== "Residential") {
        match = false;
      }
      if (filters?.sub_type && filters.sub_type !== "Apartment") {
        match = false;
      }
      if (match) {
        results.push(mockLiveLuxuryProperty);
      }
    }
    return results;
  } catch (error) {
    console.error("API Error in searchProperties:", error);
    return [mockLiveLuxuryProperty];
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
  if (slug.toLowerCase() === "live-luxury") {
    return mockLiveLuxuryDetail;
  }
  try {
    return await apiFetch<PropertyDetail>(`/properties/${encodeURIComponent(slug)}`, {
      method: "GET",
    });
  } catch (error) {
    console.error(`API Error in getPropertyBySlug for slug '${slug}':`, error);
    if (slug.toLowerCase() === "live-luxury") {
      return mockLiveLuxuryDetail;
    }
    throw error;
  }
}

export interface PropertyOption {
  id: string;
  name: string;
  slug: string;
}

/**
 * Fetches lightweight property name options for dropdowns
 * Calls: GET /property-options
 */
export async function getPropertyOptions(): Promise<PropertyOption[]> {
  try {
    return await apiFetch<PropertyOption[]>("/property-options", {
      method: "GET",
    });
  } catch (error) {
    console.error("API Error in getPropertyOptions:", error);
    throw error;
  }
}

/**
 * Fetches unique list of location names for nav/footer
 * Calls: GET /locations
 */
export async function getLocations(): Promise<string[]> {
  try {
    return await apiFetch<string[]>("/locations", {
      method: "GET",
    });
  } catch (error) {
    console.error("API Error in getLocations:", error);
    throw error;
  }
}

/**
 * Fetches properties and filters them on the client for featured items
 */
export async function getFeaturedProperties(): Promise<Property[]> {
  try {
    return await searchProperties({ featured: true });
  } catch (error) {
    console.error("API Error in getFeaturedProperties:", error);
    return [];
  }
}
