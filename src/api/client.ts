// Centralized API client configured with environment variables
const getBackendUrl = () => {
  if (typeof window !== "undefined") {
    // If running in browser, determine host dynamically for LAN/local testing
    const hostname = window.location.hostname;
    return `${window.location.protocol}//${hostname}:8000`;
  }
  // Server-side default
  return (import.meta.env.VITE_API_URL as string) || "http://localhost:8000";
};

export const BACKEND_URL = getBackendUrl();

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options;

  // Construct URL with query parameters if present
  let url = `${BACKEND_URL}${path}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Set default headers
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Set default cache bypass in development mode to avoid caching fetch results
  const isDev = import.meta.env.DEV;
  const defaultCache: RequestCache = isDev ? "no-store" : "default";

  const response = await fetch(url, {
    cache: defaultCache,
    ...restOptions,
    headers: defaultHeaders,
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData?.detail) {
        errorMessage = typeof errorData.detail === "string" 
          ? errorData.detail 
          : JSON.stringify(errorData.detail);
      }
    } catch {
      // Fallback if parsing JSON error fails
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}
