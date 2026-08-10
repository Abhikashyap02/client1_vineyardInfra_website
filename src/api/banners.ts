import { apiFetch } from "./client";

/**
 * Backend Banner API Model
 */
export interface ApiBanner {
  id: string;
  title: string;
  image: string;
  link: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

/**
 * Fetches active hero carousel banners from the backend API.
 * Calls: GET /banners
 */
export async function getBanners(): Promise<ApiBanner[]> {
  try {
    return await apiFetch<ApiBanner[]>("/banners", {
      method: "GET",
    });
  } catch (error) {
    console.warn("API error fetching banners, falling back to static banners:", error);
    throw error;
  }
}
