import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { heroBanners } from "./heroBannerData";
import { HeroNavigation } from "./HeroNavigation";
import { HeroPagination } from "./HeroPagination";
import { HeroSkeleton } from "./HeroSkeleton";
import { getBanners } from "@/api/banners";
import type { HeroCarouselProps, BannerSlide } from "./types";
import sangamValleyDesktop from "@/assets/banners/sangam_valley_desktop.webp";
import sangamValleyMobile from "@/assets/banners/sangam_valley_mobile.webp";
import platinumTownshipDesktop from "@/assets/banners/platinum_township_desktop.webp";
import platinumTownshipMobile from "@/assets/banners/platinum_township_mobile.webp";
import shikharHeightsDesktop from "@/assets/banners/shikhar_desktop.webp";
import shikharHeightsMobile from "@/assets/banners/shikhar_mobile.webp";
import { optimizeImageKitUrl } from "@/mappers/propertyMapper";

/**
 * Full-width cinematic hero banner carousel with TanStack Query integration.
 *
 * Features:
 * - Dynamic data fetching via GET /banners with TanStack Query
 * - Caching (staleTime: 15min, gcTime: 1hr)
 * - Skeleton loader on initial fetch
 * - Automatic fallback to local static heroBanners on API failure or empty response
 * - Auto-play every 6s (configurable)
 * - Gentle Ken Burns slow zoom + smooth fade transition
 * - Dark navy gradient overlay (darker left, smooth fade right)
 * - Height: 65vh (mobile), 78vh (tablet), 88vh (desktop)
 * - Compact frosted glass arrow navigation & gold pill indicators
 * - Pause on hover & mobile touch/swipe support
 * - Full ARIA accessibility attributes (live region, roledescription, focus styles)
 */
export function HeroCarousel({
  autoPlayInterval = 5500,
  pauseOnHover = true,
}: HeroCarouselProps) {
  // Query backend for active banners
  const { data: apiBanners, isLoading, isError } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });

  // Resolve slides: mapping API response if available and valid, otherwise falling back to static banners
  const slides: BannerSlide[] = useMemo(() => {
    if (apiBanners && Array.isArray(apiBanners) && apiBanners.length > 0) {
      return apiBanners.map((b) => {
        const isSangam = b.link?.includes("sangam-valley") || b.title?.toLowerCase().includes("sangam");
        const isPlatinum = b.link?.includes("platinum-township") || b.title?.toLowerCase().includes("platinum");
        const isShikhar = b.link?.includes("shikhar-heights") || b.title?.toLowerCase().includes("shikhar");
        
        let image = b.image;
        let mobileImage = undefined;
        
        if (isSangam) {
          image = sangamValleyDesktop;
          mobileImage = sangamValleyMobile;
        } else if (isPlatinum) {
          image = platinumTownshipDesktop;
          mobileImage = platinumTownshipMobile;
        } else if (isShikhar) {
          image = shikharHeightsDesktop;
          mobileImage = shikharHeightsMobile;
        } else {
          // Optimize custom API banners on the fly if they are ImageKit URLs
          if (b.image && b.image.includes("ik.imagekit.io")) {
            image = optimizeImageKitUrl(b.image, 1920, 80);
            mobileImage = optimizeImageKitUrl(b.image, 768, 80);
          }
        }

        return {
          id: b.id,
          title: b.title,
          image,
          mobileImage,
          link: b.link,
          displayOrder: b.display_order,
          isActive: b.is_active,
          alt: `${b.title} – Vineyard Infra Featured Project`,
        };
      });
    }
    return heroBanners;
  }, [apiBanners]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;

  // Reset active index if slides length changes
  useEffect(() => {
    if (activeIndex >= totalSlides) {
      setActiveIndex(0);
    }
  }, [totalSlides, activeIndex]);

  // Navigate to next slide (infinite loop)
  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Navigate to previous slide (infinite loop)
  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Navigate to specific slide
  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(goNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, goNext, autoPlayInterval, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    const container = containerRef.current;
    container?.addEventListener("keydown", handleKeyDown);
    return () => container?.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Touch handlers for swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(delta) > minSwipeDistance) {
      if (delta > 0) {
        goNext(); // Swiped left -> next
      } else {
        goPrev(); // Swiped right -> prev
      }
    }
  };

  // Hover pause handlers
  const handleMouseEnter = pauseOnHover ? () => setIsPaused(true) : undefined;
  const handleMouseLeave = pauseOnHover ? () => setIsPaused(false) : undefined;

  // Render skeleton during initial load if no static fallback active
  if (isLoading && !apiBanners && !isError && slides.length === 0) {
    return <HeroSkeleton />;
  }

  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <div
      ref={containerRef}
      className="hero-carousel group relative w-full aspect-[9/16] md:aspect-[1920/700] max-h-[85vh] md:max-h-none overflow-hidden bg-navy-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured project banners"
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Screen-reader live region announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${activeIndex + 1} of ${totalSlides}: ${currentSlide.alt}`}
      </div>



      {/* Slides with Fade transition + subtle hover zoom */}
      <AnimatePresence>
        {slides.map(
          (banner, index) =>
            index === activeIndex && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 overflow-hidden"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${totalSlides}: ${banner.title || "Banner"}`}
              >
                <Link
                  to={banner.link as any}
                  className="block size-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
                  aria-label={banner.alt}
                >
                  <picture className="block size-full">
                    {banner.mobileImage && (
                      <source media="(max-width: 767px)" srcSet={banner.mobileImage} />
                    )}
                    <img
                      src={banner.image}
                      alt={banner.alt}
                      width={1920}
                      height={700}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding={index === 0 ? "sync" : "async"}
                      className="size-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      draggable={false}
                    />
                  </picture>
                </Link>
              </motion.div>
            )
        )}
      </AnimatePresence>



      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <HeroNavigation onPrev={goPrev} onNext={goNext} />
      )}

      {/* Pagination Dots */}
      {totalSlides > 1 && (
        <HeroPagination
          total={totalSlides}
          activeIndex={activeIndex}
          onDotClick={goTo}
        />
      )}
    </div>
  );
}
