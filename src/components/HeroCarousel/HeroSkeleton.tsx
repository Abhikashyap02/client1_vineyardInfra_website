/**
 * Skeleton loader component displayed while hero banners are fetching.
 * Preserves exact container bounds (65vh mobile / 78vh tablet / 88vh desktop) to prevent layout shifts.
 */
export function HeroSkeleton() {
  return (
    <div
      className="hero-skeleton relative w-full aspect-[9/16] md:aspect-[1920/700] max-h-[85vh] md:max-h-none bg-navy-deep/90 overflow-hidden animate-pulse"
      aria-busy="true"
      aria-label="Loading banners"
    >
      {/* Background shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

      {/* Placeholder navigation arrows */}
      <div className="absolute top-1/2 left-5 lg:left-7 z-10 hidden md:block size-9 lg:size-10 rounded-full bg-white/10" />
      <div className="absolute top-1/2 right-5 lg:right-7 z-10 hidden md:block size-9 lg:size-10 rounded-full bg-white/10" />

      {/* Placeholder pagination dots */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2">
        <div className="h-2 w-7 rounded-full bg-gold/50" />
        <div className="size-2 rounded-full bg-white/20" />
        <div className="size-2 rounded-full bg-white/20" />
      </div>
    </div>
  );
}
