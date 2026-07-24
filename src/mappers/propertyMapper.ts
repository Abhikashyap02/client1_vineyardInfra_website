import type { Property, PropertyVariant, PropertyMedia, PropertyFeature, FAQ, PropertyDetail } from "@/api/properties";

// ==========================================
// Reusable Helper Functions
// ==========================================

/**
 * Formats a raw starting price in Rupees to a user-friendly Indian currency format (Lakhs/Crores).
 * E.g., 14500000 -> "₹1.45 Cr*", 7800000 -> "₹78 L*"
 */
export function formatPriceToLabel(priceRaw: number | null): string {
  if (priceRaw === null || priceRaw === undefined || priceRaw <= 0) {
    return "Price on Request";
  }

  // Convert to Crores
  if (priceRaw >= 10_000_000) {
    const crores = priceRaw / 10_000_000;
    // Format to 2 decimal places, but strip trailing zeros
    const formatted = Number(crores.toFixed(2));
    return `₹${formatted} Cr*`;
  }

  // Convert to Lakhs
  if (priceRaw >= 100_000) {
    const lakhs = priceRaw / 100_000;
    const formatted = Number(lakhs.toFixed(2));
    return `₹${formatted} L*`;
  }

  // Fallback for smaller values
  return `₹${priceRaw.toLocaleString("en-IN")}*`;
}

/**
 * Selects the hero image URL from media array.
 * Prioritizes is_hero === true. Fallbacks to first image.
 */
export function getHeroImage(media: PropertyMedia[]): string {
  if (!media || media.length === 0) return "";
  const heroItem = media.find((m) => m.is_hero);
  if (heroItem) return heroItem.media_url;
  
  // Fallback to first image item
  const imageItem = media.find((m) => m.media_type === "image" || !m.media_type);
  return imageItem ? imageItem.media_url : media[0].media_url;
}

/**
 * Extracts gallery items from media array.
 */
export function getGallery(media: PropertyMedia[]): { src: string; label: string }[] {
  if (!media) return [];
  return media.map((m) => ({
    src: m.media_url,
    label: m.title || "",
  }));
}

/**
 * Aggregates bedroom configurations from variants to create a BHK label (e.g. "2, 3 BHK").
 */
export function getBhkLabel(variants: PropertyVariant[], subType: string | null): string {
  if (!variants || variants.length === 0) {
    return subType === "Plot" ? "Residential Plots" : "";
  }
  
  const bhks = variants
    .map((v) => v.bedrooms)
    .filter((b): b is number => b !== null && b !== undefined && b > 0);
  
  if (bhks.length === 0) {
    // If it's a plot variant, use variant name
    if (subType === "Plot") {
      return variants[0].variant_name || "Residential Plots";
    }
    return "";
  }

  const uniqueBhks = Array.from(new Set(bhks)).sort((a, b) => a - b);
  return `${uniqueBhks.join(", ")} BHK`;
}

/**
 * Aggregates bathrooms configurations from variants (e.g. "2, 3" or "2-3").
 */
export function getBathroomsLabel(variants: PropertyVariant[]): string {
  if (!variants || variants.length === 0) return "—";
  const baths = variants
    .map((v) => v.bathrooms)
    .filter((b): b is number => b !== null && b !== undefined && b > 0);

  if (baths.length === 0) return "—";
  const uniqueBaths = Array.from(new Set(baths)).sort((a, b) => a - b);
  
  if (uniqueBaths.length === 1) return `${uniqueBaths[0]}`;
  return `${uniqueBaths[0]}-${uniqueBaths[uniqueBaths.length - 1]}`;
}

/**
 * Aggregates area range from variants (e.g., "1200 - 1950 Sq.Ft.").
 */
export function getAreaLabel(variants: PropertyVariant[]): string {
  if (!variants || variants.length === 0) return "";
  
  const areas = variants
    .map((v) => v.area)
    .filter((a): a is string => a !== null && a !== undefined && a !== "");

  if (areas.length === 0) return "";
  const cleanAreas = areas.map((a) => {
    // Remove non-numeric characters to parse
    const num = parseInt(a.replace(/[^0-9]/g, ""), 10);
    return { original: a, num: isNaN(num) ? 0 : num };
  }).filter(item => item.num > 0);

  if (cleanAreas.length === 0) {
    return areas[0];
  }

  cleanAreas.sort((a, b) => a.num - b.num);
  const minArea = cleanAreas[0];
  const maxArea = cleanAreas[cleanAreas.length - 1];

  // Detect suffix type (Sq.Ft. or Sq.Yd.)
  const sampleArea = minArea.original.toLowerCase();
  const suffix = sampleArea.includes("yd") || sampleArea.includes("yard") ? "Sq.Yd." : "Sq.Ft.";

  if (minArea.num === maxArea.num) {
    return `${minArea.num} ${suffix}`;
  }
  return `${minArea.num} – ${maxArea.num} ${suffix}`;
}

/**
 * Extracts RERA registration number from features or returns empty string.
 */
export function extractRera(features: PropertyFeature[]): string {
  if (!features) return "";
  const reraFeature = features.find(
    (f) => f.feature_type?.toUpperCase() === "RERA"
  );
  return reraFeature ? reraFeature.feature_name : "";
}

/**
 * Maps amenities features to UI object array.
 */
export function getDetailAmenities(features: PropertyFeature[]): { icon: string; label: string }[] {
  if (!features) return [];
  return features
    .filter((f) => f.feature_type?.toUpperCase() === "AMENITY")
    .map((f) => ({
      icon: mapAmenityIcon(f.feature_name),
      label: f.feature_name,
    }));
}

/**
 * Generates Lucide icon name matching amenity names.
 */
function mapAmenityIcon(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("pool") || n.includes("swimming")) return "Waves";
  if (n.includes("gym") || n.includes("fitness")) return "Dumbbell";
  if (n.includes("security") || n.includes("cctv")) return "ShieldCheck";
  if (n.includes("garden") || n.includes("park") || n.includes("lawn") || n.includes("landscaped")) return "Trees";
  if (n.includes("clubhouse") || n.includes("lounge")) return "Building2";
  if (n.includes("road") || n.includes("infrastructure")) return "Layers";
  if (n.includes("electricity") || n.includes("power") || n.includes("backup")) return "Award";
  if (n.includes("play") || n.includes("kids")) return "Users";
  return "Sparkles";
}

/**
 * Maps nearby place features. Matches formats like "Name - Distance/Time"
 */
export function getNearbyPlaces(features: PropertyFeature[]): { icon: string; label: string; place: string; time: string }[] {
  if (!features) return [];
  return features
    .filter((f) => f.feature_type?.toUpperCase() === "NEARBY")
    .map((f) => {
      const parts = f.feature_name.split("-").map(p => p.trim());
      const place = parts[0] || "";
      const time = parts[1] || "";
      return {
        icon: mapNearbyIcon(place),
        label: place,
        place,
        time,
      };
    });
}

function mapNearbyIcon(place: string): string {
  const p = place.toLowerCase();
  if (p.includes("hospital") || p.includes("clinic") || p.includes("max")) return "HeartPulse";
  if (p.includes("school") || p.includes("college") || p.includes("university") || p.includes("academy")) return "GraduationCap";
  if (p.includes("mall") || p.includes("market") || p.includes("plaza") || p.includes("shop")) return "ShoppingBag";
  if (p.includes("airport") || p.includes("jolly")) return "Plane";
  if (p.includes("station") || p.includes("railway") || p.includes("bus")) return "Compass";
  return "MapPin";
}

/**
 * Maps variant specifications to highlights.
 */
export function getHighlightsFromProperty(property: Property): { icon: string; label: string; value: string }[] {
  const highlights: { icon: string; label: string; value: string }[] = [];
  const variants = property.variants || [];

  // BHK Highlight
  const bhk = getBhkLabel(variants, property.sub_type);
  if (bhk) {
    highlights.push({ icon: "Bed", label: "Bedrooms", value: bhk });
  }

  // Bathroom Highlight
  const bath = getBathroomsLabel(variants);
  if (bath !== "—") {
    highlights.push({ icon: "Bath", label: "Bathrooms", value: bath });
  }

  // Area Highlight
  const area = getAreaLabel(variants);
  if (area) {
    highlights.push({ icon: "Maximize", label: "Area", value: area });
  }

  // Facing Highlight
  const facings = variants
    .map((v) => v.facing)
    .filter((f): f is string => f !== null && f !== undefined && f !== "");
  if (facings.length > 0) {
    const uniqueFacings = Array.from(new Set(facings));
    highlights.push({ icon: "Compass", label: "Facing", value: uniqueFacings.join(" / ") });
  }

  // Possession Highlight
  if (property.possession_status) {
    highlights.push({ icon: "CalendarClock", label: "Possession", value: property.possession_status });
  }

  // RERA Highlight
  const rera = extractRera(property.features);
  if (rera) {
    highlights.push({ icon: "BadgeCheck", label: "RERA", value: rera });
  }

  return highlights;
}

/**
 * Maps variants to configurations.
 */
export function getConfigurations(variants: PropertyVariant[]): { type: string; area: string; price: string; status: string }[] {
  if (!variants) return [];
  return variants.map((v) => ({
    type: v.variant_name || "Standard Configuration",
    area: v.area || "",
    price: formatPriceToLabel(v.price ? Number(v.price) : null),
    status: v.availability || "",
  }));
}

/**
 * Maps investment features.
 */
export function getInvestmentFeatures(features: PropertyFeature[]): { label: string; value: string; desc: string }[] {
  if (!features) return [];
  return features
    .filter((f) => f.feature_type?.toUpperCase() === "INVESTMENT")
    .map((f) => {
      const parts = f.feature_name.split("-").map(p => p.trim());
      return {
        label: parts[0] || "",
        value: parts[1] || "",
        desc: parts[2] || "",
      };
    });
}

/**
 * Maps FAQ records.
 */
export function mapFaqs(faqs: FAQ[]): { q: string; a: string }[] {
  if (!faqs) return [];
  return faqs.map((f) => ({
    q: f.question,
    a: f.answer,
  }));
}

// ==========================================
// Page-Level Mapping Mappers
// ==========================================

export interface HomepageProject {
  slug: string;
  tag: string;
  type: string;
  name: string;
  location: string;
  price: string;
  bhk: string;
  bath: string;
  area: string;
  img: string;
}

export interface ListingProperty {
  id: string;
  slug: string;
  name: string;
  location: string;
  type: "Villa" | "Apartment" | "Plot" | "Commercial";
  category: "Residential" | "Commercial" | "Luxury" | "Investment";
  status: "Ongoing" | "Ready to Move" | "Under Construction" | "Upcoming";
  priceMin: number;
  priceLabel: string;
  area: string;
  bhk: string;
  amenities: string[];
  desc: string;
  tags: string[];
  img: string;
  featured?: boolean;
}

export interface DetailProject {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  developer: string;
  type: string;
  startingPrice: string;
  possession: string;
  rera: string;
  badge: "New Launch" | "Ready to Move" | "Under Construction" | "Hot Property" | "Featured";
  summary: string;
  hero: string;
  gallery: { src: string; label: string }[];
  videoThumb: string;
  highlights: { icon: string; label: string; value: string }[];
  usps: string[];
  configurations: { type: string; area: string; price: string; status: string }[];
  description: {
    vision: string;
    lifestyle: string;
    location: string;
    quality: string;
    investment: string;
  };
  amenities: { icon: string; label: string }[];
  nearby: { icon: string; label: string; place: string; time: string }[];
  investment: { label: string; value: string; desc: string }[];
  faqs: { q: string; a: string }[];
  similar: { slug: string; name: string; location: string; price: string; img: string }[];
  brochureUrl: string | null;
}

/**
 * Maps a single Property API entity to the Homepage projects card model
 */
export function mapToHomepageProject(property: Property): HomepageProject {
  return {
    slug: property.slug,
    tag: property.featured ? "FEATURED" : (property.status?.toUpperCase() || "NEW LAUNCH"),
    type: property.sub_type ? `${property.sub_type}s` : "Properties",
    name: property.name,
    location: property.location,
    price: formatPriceToLabel(property.starting_price),
    bhk: getBhkLabel(property.variants, property.sub_type),
    bath: getBathroomsLabel(property.variants),
    area: getAreaLabel(property.variants),
    img: getHeroImage(property.media),
  };
}

/**
 * Maps a single Property API entity to the listing properties card model
 */
export function mapToListingProperty(property: Property): ListingProperty {
  // Normalize type
  let type: ListingProperty["type"] = "Apartment";
  if (property.sub_type === "Villa") type = "Villa";
  else if (property.sub_type === "Plot") type = "Plot";
  else if (property.sub_type === "Commercial") type = "Commercial";

  // Normalize category
  let category: ListingProperty["category"] = "Residential";
  if (property.category === "Commercial") category = "Commercial";
  else if (property.category === "Luxury") category = "Luxury";
  else if (property.category === "Investment") category = "Investment";

  // Normalize status
  let status: ListingProperty["status"] = "Ongoing";
  if (property.possession_status?.toLowerCase().includes("ready")) status = "Ready to Move";
  else if (property.possession_status?.toLowerCase().includes("construction")) status = "Under Construction";
  else if (property.possession_status?.toLowerCase().includes("upcoming")) status = "Upcoming";

  return {
    id: property.id,
    slug: property.slug,
    name: property.name,
    location: property.location,
    type,
    category,
    status,
    priceMin: property.starting_price ? (property.starting_price / 100_000) : 0,
    priceLabel: formatPriceToLabel(property.starting_price),
    area: getAreaLabel(property.variants),
    bhk: getBhkLabel(property.variants, property.sub_type),
    amenities: property.features
      .filter((f) => f.feature_type?.toUpperCase() === "AMENITY")
      .map((f) => f.feature_name),
    desc: property.short_description || "",
    tags: property.featured ? ["Featured"] : [],
    img: getHeroImage(property.media),
    featured: property.featured,
  };
}

/**
 * Maps a detailed Property API entity (including FAQs) to the Project details model
 */
export function mapToProjectDetail(property: PropertyDetail): DetailProject {
  // Normalize badge
  let badge: DetailProject["badge"] = "New Launch";
  if (property.featured) badge = "Featured";
  else if (property.possession_status?.toLowerCase().includes("ready")) badge = "Ready to Move";
  else if (property.possession_status?.toLowerCase().includes("construction")) badge = "Under Construction";

  return {
    slug: property.slug,
    name: property.name,
    tagline: property.short_description || "",
    location: property.location,
    developer: "", // Empty string (safe fallback as requested)
    type: property.sub_type || "",
    startingPrice: formatPriceToLabel(property.starting_price),
    possession: property.possession_status || "",
    rera: extractRera(property.features),
    badge,
    summary: property.about || "",
    hero: getHeroImage(property.media),
    gallery: getGallery(property.media),
    videoThumb: getHeroImage(property.media), // fallback
    highlights: getHighlightsFromProperty(property),
    usps: property.features
      .filter((f) => f.feature_type?.toUpperCase() === "USP")
      .map((f) => f.feature_name),
    configurations: getConfigurations(property.variants),
    description: {
      vision: property.about || "",
      lifestyle: property.why_choose || "",
      location: "", // safe empty value
      quality: "", // safe empty value
      investment: "", // safe empty value
    },
    amenities: getDetailAmenities(property.features),
    nearby: getNearbyPlaces(property.features),
    investment: getInvestmentFeatures(property.features),
    faqs: mapFaqs(property.faqs),
    similar: [], // safely empty (loaded dynamically or left to UI fallback)
    brochureUrl: property.brochure_url || null,
  };
}
