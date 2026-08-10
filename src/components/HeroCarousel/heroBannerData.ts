import type { BannerSlide } from "./types";

import sangamValleyDesktop from "@/assets/banners/sangam_valley_desktop.webp";
import sangamValleyMobile from "@/assets/banners/sangam_valley_mobile.webp";
import platinumTownshipDesktop from "@/assets/banners/platinum_township_desktop.webp";
import platinumTownshipMobile from "@/assets/banners/platinum_township_mobile.webp";

/**
 * Static banner configuration for the hero carousel.
 * Each marketing banner contains project branding, pricing, highlights, and CTA button.
 */
export const heroBanners: BannerSlide[] = [
  {
    id: 1,
    title: "Sangam Valley",
    image: sangamValleyDesktop,
    mobileImage: sangamValleyMobile,
    link: "/projects/sangam-valley",
    displayOrder: 1,
    isActive: true,
    alt: "Sangam Valley – Premium Apartments, Luxury 2 & 3 BHK Apartments on Sahastradhara Road, Dehradun. Starting from ₹1.16 Cr*.",
  },
  {
    id: 2,
    title: "Platinum Township",
    image: platinumTownshipDesktop,
    mobileImage: platinumTownshipMobile,
    link: "/projects/platinum-township",
    displayOrder: 2,
    isActive: true,
    alt: "Platinum Township – Premium Plots on Chandpur-Sahaspur Road, Dehradun. Starting from ₹40K per Sq. Yard.",
  },
];

