/**
 * Represents a single banner slide in the hero carousel.
 */
export interface BannerSlide {
  /** Unique identifier for the slide */
  id: string | number;
  /** Title or name of the project / banner */
  title?: string;
  /** Image source (URL or static WebP import) */
  image: string;
  /** Mobile image source (optional portrait banner) */
  mobileImage?: string;
  /** Route to navigate to when the banner is clicked */
  link: string;
  /** Display order sorting index */
  displayOrder?: number;
  /** Active flag */
  isActive?: boolean;
  /** Accessible alt text for the banner image */
  alt: string;
}

/**
 * Props for the HeroCarousel component.
 */
export interface HeroCarouselProps {
  /** Auto-play interval in milliseconds (default: 6000) */
  autoPlayInterval?: number;
  /** Whether to pause auto-play on hover (default: true) */
  pauseOnHover?: boolean;
}

/**
 * Props for the HeroNavigation component.
 */
export interface HeroNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Props for the HeroPagination component.
 */
export interface HeroPaginationProps {
  total: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}
