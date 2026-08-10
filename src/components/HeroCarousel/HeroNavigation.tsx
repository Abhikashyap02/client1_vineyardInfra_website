import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroNavigationProps } from "./types";

/**
 * Modern frosted-glass left/right arrow navigation for the hero carousel.
 * Compact, semi-transparent design with gold hover interaction.
 */
export function HeroNavigation({ onPrev, onNext }: HeroNavigationProps) {
  const baseClass =
    "absolute top-1/2 z-30 -translate-y-1/2 hidden md:grid size-9 lg:size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto hover:bg-gold hover:text-navy-deep hover:border-gold hover:scale-105 hover:shadow-[0_0_15px_rgba(201,164,92,0.4)] active:scale-95 cursor-pointer shadow-md";

  return (
    <>
      <button
        onClick={onPrev}
        className={`${baseClass} left-5 lg:left-7`}
        aria-label="Previous banner"
        type="button"
      >
        <ChevronLeft className="size-3.5 lg:size-4" />
      </button>
      <button
        onClick={onNext}
        className={`${baseClass} right-5 lg:right-7`}
        aria-label="Next banner"
        type="button"
      >
        <ChevronRight className="size-3.5 lg:size-4" />
      </button>
    </>
  );
}
