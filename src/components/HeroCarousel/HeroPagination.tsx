import type { HeroPaginationProps } from "./types";

/**
 * Premium pagination indicators for the hero carousel.
 * Inactive: subtle semi-transparent white dots.
 * Active: gold rounded pill with subtle glowing aura.
 */
export function HeroPagination({ total, activeIndex, onDotClick }: HeroPaginationProps) {
  return (
    <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          type="button"
          aria-label={`Go to banner ${i + 1}`}
          aria-current={i === activeIndex ? "true" : undefined}
          className={`rounded-full transition-all duration-500 cursor-pointer ${
            i === activeIndex
              ? "h-2 w-7 bg-gold shadow-[0_0_10px_rgba(201,164,92,0.5)]"
              : "size-2 bg-white/25 hover:bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}
