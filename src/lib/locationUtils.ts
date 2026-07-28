import type { Property } from "@/api/properties";
import type { ListingProperty } from "@/mappers/propertyMapper";

/**
 * Normalizes a full location string to its primary location/road name.
 * E.g., "Mandakini Vihar, Sahastradhara Road" -> "Sahastradhara Road"
 * E.g., "ChandpurSahaspur Road" -> "Sahaspur Road"
 */
export function getPrimaryLocation(fullLocation: string): string {
  if (!fullLocation) return "";
  
  // 1. Remove Dehradun / Uttarakhand suffixes
  let cleaned = fullLocation.replace(/,?\s*Dehradun.*/i, "").trim();
  
  // 2. Replace common encoding artifacts or garbled characters
  cleaned = cleaned.replace(/[\uFFFD\uFFFD\uFFFD\uFFFD\?]/g, " - ");
  cleaned = cleaned.replace(/[^a-zA-Z0-9\s,\-\/]/g, " "); // keep alphanumeric, spaces, commas, hyphens, slashes
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  
  // 3. Split by standard separators
  const parts = cleaned.split(/,|\/|-/).map(p => p.trim()).filter(Boolean);
  
  // 4. Look for parts ending with or containing "Road", "Valley", "Town", "Highway"
  // since these represent main popular areas/corridors
  const keywords = ["road", "highway", "valley", "town", "bypass"];
  for (const keyword of keywords) {
    const matchedPart = parts.find(p => p.toLowerCase().includes(keyword));
    if (matchedPart) {
      // Clean prefixes like "On Main", "Main", "Near"
      return matchedPart.replace(/^(on\s+)?(main\s+)?(near\s+)?/i, "").trim();
    }
  }
  
  // If no parts match keywords, return the last non-empty part
  if (parts.length > 0) {
    return parts[parts.length - 1].replace(/^(on\s+)?(main\s+)?(near\s+)?/i, "").trim();
  }
  
  return cleaned;
}

/**
 * Extracts a sorted list of unique primary locations from a list of properties.
 */
export function getAvailableLocations(properties: { location: string }[]): string[] {
  const locationSet = new Set<string>();
  
  for (const property of properties) {
    const primary = getPrimaryLocation(property.location);
    if (primary) {
      locationSet.add(primary);
    }
  }
  
  // Sort locations alphabetically
  return Array.from(locationSet).sort((a, b) => a.localeCompare(b));
}

export interface PopularLocationItem {
  name: string;
  desc: string;
  to?: string;
}

export const LOCATION_METADATA: Record<string, { desc: string; to?: string }> = {
  "Sahastradhara Road": {
    desc: "Premium plots, apartments & villas near IT Park.",
    to: "/sahastradhara-road",
  },
  "Dehradun": {
    desc: "Foothill residential investment hubs, expressway growth.",
    to: "/dehradun",
  },
  "Dehradun (Overall)": {
    desc: "Foothill residential investment hubs, expressway growth.",
    to: "/dehradun",
  },
  "Rajpur Road": {
    desc: "Premium residential corridor & high appreciation zone.",
  },
  "Mussoorie Road": {
    desc: "Luxury villas with scenic hill views and serenity.",
  },
  "Haridwar Road": {
    desc: "Commercial hub with excellent connectivity.",
  },
};

/**
 * Generates dynamic Popular Locations list matching properties currently in database.
 * If a location has active inventory, it will be included.
 * If dedicated route exists (e.g. for Sahastradhara Road or Dehradun), links to it.
 * Otherwise links to fallback properties search query.
 */
export function getDynamicPopularLocations(locations: string[]): PopularLocationItem[] {
  const availableSet = new Set(locations.map(loc => getPrimaryLocation(loc)).filter(Boolean));
  
  const results: PopularLocationItem[] = [];
  
  if (locations.length > 0) {
    results.push({
      name: "Dehradun (Overall)",
      desc: LOCATION_METADATA["Dehradun"].desc,
      to: LOCATION_METADATA["Dehradun"].to,
    });
  }
  
  for (const loc of availableSet) {
    if (loc.toLowerCase() === "dehradun") continue;
    
    const meta = LOCATION_METADATA[loc] || {
      desc: "Premium property listings and investment plots.",
    };
    
    results.push({
      name: loc,
      desc: meta.desc,
      to: meta.to,
    });
  }
  
  return results.sort((a, b) => {
    if (a.to && !b.to) return -1;
    if (!a.to && b.to) return 1;
    return a.name.localeCompare(b.name);
  });
}
