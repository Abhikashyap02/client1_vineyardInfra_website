import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MapPin, Phone, MessageCircle, Calendar, ArrowRight, ArrowLeft, X,
  Bed, Bath, Maximize, Car, Compass, CalendarClock, Sofa, Building2,
  ShieldCheck, Sparkles, TrendingUp, Trees, Dumbbell, Waves, Users,
  PlayCircle, Download, Star, ChevronDown, Check, FileText, Home,
  GraduationCap, HeartPulse, ShoppingBag, Plane, Briefcase, Camera,
  Image as ImageIcon, BadgeCheck, Quote, Award, IndianRupee, Layers, KeyRound, Clock,
  Facebook, Instagram, Youtube, Mail, Menu, ChevronRight, Eye,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { getPropertyBySlug } from "@/api/properties";
import type { PropertyDetail, PropertyMedia } from "@/api/properties";
import { apiFetch } from "@/api/client";
import { toast } from "sonner";
import { submitLead } from "@/api/leads";
import {
  mapToProjectDetail,
  formatPriceToLabel,
  extractRera,
  getDetailAmenities,
  getNearbyPlaces,
  getConfigurations,
  getInvestmentFeatures,
  getHighlightsFromProperty,
  getHeroImage,
  getGallery,
  mapFaqs,
} from "@/mappers/propertyMapper";
import type { DetailProject } from "@/mappers/propertyMapper";

/* ─────────── ICON MAP ─────────── */
const lucideIconMap: Record<string, React.ComponentType<any>> = {
  MapPin, Phone, MessageCircle, Calendar, ArrowRight, ArrowLeft, X,
  Bed, Bath, Maximize, Car, Compass, CalendarClock, Sofa, Building2,
  ShieldCheck, Sparkles, TrendingUp, Trees, Dumbbell, Waves, Users,
  PlayCircle, Download, Star, ChevronDown, Check, FileText, Home,
  GraduationCap, HeartPulse, ShoppingBag, Plane, Briefcase, Camera,
  Image: ImageIcon, BadgeCheck, Quote, Award, IndianRupee, Layers, KeyRound, Clock,
  Facebook, Instagram, Youtube, Mail, Eye,
};

/* ─────────── CONSTANTS ─────────── */
const PHONE = "+916397688989";
const WHATSAPP = (name: string) =>
  `https://wa.me/916397688989?text=${encodeURIComponent(`Hi Vineyard Infra, I'd like to enquire about ${name}.`)}`;

/* ─────────── ROUTE ─────────── */
export const Route = createFileRoute("/projects/$slug")({
  validateSearch: (search: Record<string, unknown>) => ({
    landing: search.landing === "true" || search.landing === true,
  }),
  loader: async ({ params }) => {
    try {
      const dbProperty = await getPropertyBySlug(params.slug);
      if (!dbProperty) throw notFound();
      const project = mapToProjectDetail(dbProperty);
      return { project, raw: dbProperty };
    } catch (error: any) {
      if (
        error?.status === 404 ||
        error?.message?.includes("404") ||
        error?.message?.toLowerCase().includes("not found")
      ) {
        throw notFound();
      }
      throw error;
    }
  },
  head: ({ loaderData }) => {
    const raw = loaderData?.raw;
    const project = loaderData?.project;
    const title = project
      ? `${project.name} | ${project.type || "Property"} for Sale in ${project.location}, ${raw?.city || "Dehradun"}`
      : "Property | Vineyard Infra";
    const desc = raw?.short_description
      ? (raw.short_description.length > 155 ? raw.short_description.slice(0, 155) + "..." : raw.short_description)
      : (project?.summary ? (project.summary.length > 155 ? project.summary.slice(0, 155) + "..." : project.summary) : "Premium real estate in Dehradun.");

    const canonicalUrl = project ? `https://vineyardinfra.com/projects/${project.slug}` : "https://vineyardinfra.com/properties";

    const listingSchema = project ? {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": project.name,
      "description": project.summary || raw?.short_description,
      "url": canonicalUrl,
      "image": project.hero,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": project.location,
        "addressLocality": raw?.city || "Dehradun",
        "addressRegion": raw?.state || "Uttarakhand",
        "addressCountry": "IN"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": raw?.starting_price ? Number(raw.starting_price) : undefined,
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": raw?.starting_price ? Number(raw.starting_price) : undefined,
          "priceCurrency": "INR",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitCode": "UNIT"
          }
        }
      }
    } : null;

    const faqSchema = project?.faqs && project.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": project.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    } : null;

    const scripts = [];
    if (listingSchema) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(listingSchema)
      });
    }
    if (faqSchema) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(faqSchema)
      });
    }

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(project?.hero ? [{ property: "og:image", content: project.hero }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl }
      ],
      scripts
    };
  },
  component: ProjectDetail,
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN PAGE COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ProjectDetail() {
  const { project, raw } = Route.useLoaderData();
  const { landing: isLanding } = Route.useSearch();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const wa = useMemo(() => WHATSAPP(project.name), [project.name]);

  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };
    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  // Derived data for conditional rendering
  const hasVideo = raw.media.some((m) => m.media_type === "video");
  const hasFloorPlans = raw.media.some((m) => m.media_type === "floor_plan");
  const floorPlanMedia = raw.media.filter((m) => m.media_type === "floor_plan");
  const videoMedia = raw.media.filter((m) => m.media_type === "video");
  const hasAmenities = project.amenities.length > 0;
  const hasUSPs = project.usps.length > 0 || !!raw.why_choose;
  const hasAbout = !!raw.about;
  const hasConfigurations = project.configurations.length > 0;
  const hasNearby = project.nearby.length > 0;
  const hasMap = !!raw.google_map_url;
  const hasLocation = !!raw.location || hasMap || hasNearby;
  const hasBrochure = !!project.brochureUrl;
  const hasInvestment = project.investment.length > 0;
  const hasFaqs = project.faqs.length > 0;
  const reraNumber = extractRera(raw.features);
  const isPlot = raw.sub_type?.toLowerCase() === "plot";

  // SEO: noindex for landing mode
  useEffect(() => {
    if (!isLanding) return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, [isLanding]);

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* ── S01. NAVIGATION ── */}
      {isLanding ? (
        <LandingNav projectName={project.name} wa={wa} />
      ) : (
        <Header activeLabel="Projects" />
      )}

      {/* ── S02. HERO + GALLERY ── */}
      <HeroGallery
        project={project}
        isLanding={isLanding}
        raw={raw}
      />

      {/* ── S03. TRUST BAR ── */}
      <TrustBar
        reraNumber={reraNumber}
        possessionStatus={raw.possession_status}
        subType={raw.sub_type}
      />

      {/* ── CONTENT + SIDEBAR LAYOUT ── */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* ── LEFT COLUMN: Content Sections ── */}
          <div className="lg:col-span-2 space-y-14">
            {/* S04. Overview */}
            <PropertyOverview project={project} wa={wa} raw={raw} />

            {/* S05. USPs / Why Choose */}
            {hasUSPs && (
              <WhyChooseSection usps={project.usps} whyChoose={raw.why_choose} projectName={project.name} />
            )}

            {/* S06. Configurations */}
            {hasConfigurations && (
              <ConfigurationCards project={project} subType={raw.sub_type} />
            )}

            {/* S07. About Project */}
            {hasAbout && (
              <AboutProject about={raw.about!} gallery={project.gallery} projectName={project.name} hasBrochure={hasBrochure} />
            )}

            {/* S08. Amenities */}
            {hasAmenities && (
              <AmenitiesGrid amenities={project.amenities} />
            )}

            {/* S09. Floor Plans */}
            {!isPlot && hasFloorPlans && (
              <FloorPlans media={floorPlanMedia} configurations={project.configurations} />
            )}

            {/* S10. Location + Connectivity */}
            {hasLocation && (
              <LocationSection
                location={project.location}
                mapUrl={raw.google_map_url}
                nearby={project.nearby}
              />
            )}

            {/* S12. Video Walkthrough */}
            {hasVideo && (
              <VideoWalkthrough media={videoMedia} />
            )}

            {/* S13. Brochure Download */}
            {hasBrochure && (
              <BrochureDownload projectName={project.name} propertyId={raw.id} brochureUrl={project.brochureUrl!} />
            )}

            {/* General Enquiry Form for Mobile/Tablet */}
            <div className="block lg:hidden mt-8">
              <StickyLeadCard projectName={project.name} propertyId={raw.id} wa={wa} />
            </div>
          </div>

          {/* ── RIGHT COLUMN: Sticky Lead Card (Desktop) ── */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <StickyLeadCard projectName={project.name} propertyId={raw.id} wa={wa} />
            </div>
          </aside>
        </div>
      </section>

      {/* ── FULL-WIDTH SECTIONS ── */}

      {/* S14. Investment Potential */}
      {hasInvestment && (
        <InvestmentPotential items={project.investment} location={project.location} wa={wa} />
      )}

      {/* S15. Site Visit Booking */}
      <SiteVisitBooking projectName={project.name} propertyId={raw.id} />

      {/* S16. FAQ */}
      {hasFaqs && (
        <section className="container mx-auto px-4 py-12 md:py-16">
          <FAQAccordion items={project.faqs} open={openFaq} setOpen={setOpenFaq} wa={wa} />
        </section>
      )}

      {/* S17. Final CTA */}
      <FinalCTA project={project} wa={wa} />

      {/* S18. Similar Projects (website mode only) */}
      {!isLanding && project.similar.length > 0 && (
        <SimilarProjects items={project.similar} />
      )}

      {/* ── FOOTER ── */}
      {isLanding ? <LandingMinimalFooter /> : <SiteFooter />}

      {/* ── OVERLAYS ── */}
      {/* S19. Mobile Sticky Bar */}
      <MobileStickyBar wa={wa} />

      {/* S20. Floating WhatsApp (desktop) */}
      <FloatingWhatsApp wa={wa} />

      {/* Landing-specific desktop floating bar */}
      {isLanding && <FloatingEnquiryBar wa={wa} />}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S01. NAVIGATION (Landing mode)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LandingNav({ projectName, wa }: { projectName: string; wa: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-deep/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Logo variant="horizontal" />
        <div className="flex items-center gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-1.5 rounded-md bg-gold px-3 py-1.5 text-xs font-semibold text-navy-deep hover:opacity-90 transition-opacity"
          >
            <Phone className="h-3.5 w-3.5" /> Call Now
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroGallery({
  project,
  isLanding,
  raw,
}: {
  project: DetailProject;
  isLanding: boolean;
  raw: PropertyDetail;
}) {
  /* ── Media classification ── */
  const imageMedia = useMemo(
    () => raw.media.filter((m) => {
      const t = (m.media_type || "").toLowerCase();
      return !t.includes("video") && !t.includes("floor");
    }),
    [raw.media],
  );
  const videoMedia = useMemo(
    () => raw.media.filter((m) => (m.media_type || "").toLowerCase().includes("video")),
    [raw.media],
  );
  const floorPlanMedia = useMemo(
    () => raw.media.filter((m) => (m.media_type || "").toLowerCase().includes("floor")),
    [raw.media],
  );

  // Gallery items (images only — videos & floor plans handled separately)
  const gallery = useMemo(
    () =>
      imageMedia.map((m) => ({
        src: m.media_url,
        label: m.title || "",
      })),
    [imageMedia],
  );
  const hasGallery = gallery.length > 0;
  const totalImages = gallery.length;
  const DESKTOP_THUMBS = 4; // max thumbnails visible in right strip
  const remainingCount = Math.max(0, totalImages - DESKTOP_THUMBS);

  /* ── State ── */
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [fadeKey, setFadeKey] = useState(0); // triggers CSS fade on hero swap

  // Mobile swipe state
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);

  /* ── Handlers ── */
  const swapHero = useCallback(
    (idx: number) => {
      if (idx === activeIndex) return;
      setActiveIndex(idx);
      setFadeKey((k) => k + 1);
    },
    [activeIndex],
  );

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
  }, []);

  /* Mobile touch swipe */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
  }, []);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  }, []);
  const handleTouchEnd = useCallback(() => {
    const THRESHOLD = 50;
    if (Math.abs(touchDelta.current) > THRESHOLD) {
      const dir = touchDelta.current > 0 ? -1 : 1;
      const next = (activeIndex + dir + totalImages) % totalImages;
      swapHero(next);
    }
  }, [activeIndex, totalImages, swapHero]);

  /* ── Thumbnails for right strip (desktop) ── */
  const thumbIndices = useMemo(() => {
    // Show up to DESKTOP_THUMBS thumbnails, excluding the active one
    const indices: number[] = [];
    for (let i = 0; i < totalImages && indices.length < DESKTOP_THUMBS; i++) {
      if (i !== activeIndex) indices.push(i);
    }
    return indices;
  }, [totalImages, activeIndex]);

  /* ── The hero image data ── */
  const heroItem = hasGallery ? gallery[activeIndex] || gallery[0] : null;

  return (
    <>
      <section className="bg-navy-deep pt-20 md:pt-24">
        <div className="container mx-auto px-4 pb-6 pt-4 md:pb-8 md:pt-5">
          {/* Breadcrumb (website mode only) */}
          {!isLanding && (
            <nav className="mb-4 text-xs text-white/60" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight className="mx-1.5 inline h-3 w-3" />
              <Link to="/properties" className="hover:text-gold transition-colors">Properties</Link>
              <ChevronRight className="mx-1.5 inline h-3 w-3" />
              <span className="text-white">{project.name}</span>
            </nav>
          )}

          {hasGallery && heroItem ? (
            <>
              {/* ═══════ DESKTOP (≥1024px) ═══════ */}
              <div className="hidden lg:flex gap-4" style={{ height: "520px" }}>
                {/* ── Hero Image (75%) ── */}
                <button
                  onClick={() => openLightbox(activeIndex)}
                  className="group relative flex-[3] min-w-0 overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={`View ${heroItem.label || project.name} in gallery`}
                >
                  <img
                    key={fadeKey}
                    src={heroItem.src}
                    alt={heroItem.label || project.name}
                    width={1600}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] animate-[galleryFadeIn_250ms_ease-out]"
                    fetchPriority="high"
                  />
                  {/* Subtle gradient overlay at bottom for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                  {/* Badge */}
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-navy-deep shadow-lg" style={{ background: "var(--gradient-gold)" }}>
                    <Sparkles className="h-3 w-3" /> {project.badge}
                  </span>

                  {/* View all photos pill */}
                  <span className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-navy-deep shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:shadow-xl group-hover:scale-[1.02]">
                    <Camera className="h-3.5 w-3.5" />
                    View all {totalImages} photos
                  </span>

                  {/* Price badge */}
                  <div className="absolute bottom-5 left-5 rounded-xl bg-black/50 px-5 py-2.5 backdrop-blur-md border border-white/10">
                    <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/70">Starting at</div>
                    <div className="font-display text-xl font-bold text-white">{project.startingPrice}</div>
                  </div>
                </button>

                {/* ── Thumbnail Strip (25%) ── */}
                <div className="flex flex-[1] flex-col gap-3 min-w-0">
                  {thumbIndices.map((thumbIdx, i) => {
                    const isLast = i === thumbIndices.length - 1;
                    const showOverlay = isLast && remainingCount > 0;
                    const g = gallery[thumbIdx];

                    return (
                      <button
                        key={thumbIdx}
                        onClick={() => {
                          if (showOverlay) {
                            openLightbox(thumbIdx);
                          } else {
                            swapHero(thumbIdx);
                          }
                        }}
                        className="group relative flex-1 min-h-0 overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                        aria-label={showOverlay ? `View all ${totalImages} photos` : (g.label || `View image ${thumbIdx + 1}`)}
                      >
                        <img
                          src={g.src}
                          alt={g.label || `${project.name} image ${thumbIdx + 1}`}
                          width={400}
                          height={225}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                        />
                        {/* Active indicator ring */}
                        {thumbIdx === activeIndex && (
                          <div className="absolute inset-0 rounded-xl ring-2 ring-gold ring-inset pointer-events-none" />
                        )}
                        {/* +N overlay on last thumbnail */}
                        {showOverlay && (
                          <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/60 backdrop-blur-[2px] transition-colors group-hover:bg-navy-deep/50">
                            <div className="text-center">
                              <span className="font-display text-3xl font-bold text-white">+{remainingCount}</span>
                              <span className="block text-xs font-medium text-white/80 mt-0.5">more photos</span>
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}

                  {/* Video thumbnail (if videos exist) */}
                  {videoMedia.length > 0 && thumbIndices.length < 4 && (
                    <button
                      onClick={() => setVideoModalUrl(videoMedia[0].media_url)}
                      className="group relative flex-1 min-h-0 overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                      aria-label="Play video walkthrough"
                    >
                      <img
                        src={gallery[0]?.src || ""}
                        alt="Video walkthrough"
                        loading="lazy"
                        className="h-full w-full object-cover brightness-75 transition-all duration-500 group-hover:scale-[1.05] group-hover:brightness-90"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                          <PlayCircle className="h-7 w-7 text-navy-deep" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-semibold uppercase tracking-wider text-white/90">
                        Video Tour
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* ═══════ TABLET (768px–1023px) ═══════ */}
              <div className="hidden md:block lg:hidden">
                {/* Hero */}
                <button
                  onClick={() => openLightbox(activeIndex)}
                  className="group relative w-full overflow-hidden rounded-2xl focus:outline-none"
                  style={{ maxHeight: "400px" }}
                >
                  <img
                    key={fadeKey}
                    src={heroItem.src}
                    alt={heroItem.label || project.name}
                    width={1600}
                    height={900}
                    className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.03] animate-[galleryFadeIn_250ms_ease-out]"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-deep shadow-lg" style={{ background: "var(--gradient-gold)" }}>
                    <Sparkles className="h-3 w-3" /> {project.badge}
                  </span>
                  <div className="absolute bottom-4 left-4 rounded-lg bg-black/50 px-4 py-2 backdrop-blur-md border border-white/10">
                    <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/70">Starting at</div>
                    <div className="font-display text-lg font-bold text-white">{project.startingPrice}</div>
                  </div>
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy-deep shadow-lg">
                    <Camera className="h-3 w-3" /> {totalImages} photos
                  </span>
                </button>

                {/* 2x2 thumbnail grid below */}
                {totalImages > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-3">
                    {gallery.slice(0, 4).map((g, i) => {
                      if (i === activeIndex && gallery.length > 4) {
                        // skip active, show the 5th instead
                      }
                      const isLast = i === 3;
                      const moreCount = totalImages - 4;
                      return (
                        <button
                          key={i}
                          onClick={() => isLast && moreCount > 0 ? openLightbox(i) : swapHero(i)}
                          className="group relative aspect-[16/9] overflow-hidden rounded-xl focus:outline-none transition-shadow duration-300 hover:shadow-lg"
                          aria-label={g.label || `Image ${i + 1}`}
                        >
                          <img src={g.src} alt={g.label || `Image ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                          {i === activeIndex && <div className="absolute inset-0 rounded-xl ring-2 ring-gold ring-inset pointer-events-none" />}
                          {isLast && moreCount > 0 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/60 backdrop-blur-[2px]">
                              <span className="font-display text-2xl font-bold text-white">+{moreCount}</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ═══════ MOBILE (<768px) ═══════ */}
              <div className="md:hidden">
                {/* Swipeable hero */}
                <button
                  onClick={() => openLightbox(activeIndex)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="group relative w-full overflow-hidden rounded-2xl aspect-[16/9] focus:outline-none"
                  aria-label="View gallery"
                >
                  <img
                    key={fadeKey}
                    src={heroItem.src}
                    alt={heroItem.label || project.name}
                    width={1600}
                    height={900}
                    className="h-full w-full object-cover animate-[galleryFadeIn_250ms_ease-out]"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-deep shadow-lg" style={{ background: "var(--gradient-gold)" }}>
                    <Sparkles className="h-2.5 w-2.5" /> {project.badge}
                  </span>
                  <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-3 py-1.5 backdrop-blur-md border border-white/10">
                    <div className="text-[9px] font-medium uppercase tracking-wider text-white/70">Starting at</div>
                    <div className="font-display text-base font-bold text-white">{project.startingPrice}</div>
                  </div>
                </button>

                {/* Dot indicators */}
                {totalImages > 1 && (
                  <div className="mt-2.5 flex justify-center gap-1.5">
                    {gallery.slice(0, Math.min(totalImages, 7)).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => swapHero(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-5 bg-gold" : "w-1.5 bg-white/40"}`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                    {totalImages > 7 && <span className="text-[9px] text-white/50 self-center ml-1">+{totalImages - 7}</span>}
                  </div>
                )}

                {/* Horizontal scroll thumbnail strip */}
                {totalImages > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                    {gallery.map((g, i) => (
                      <button
                        key={i}
                        onClick={() => swapHero(i)}
                        className={`shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${i === activeIndex ? "ring-2 ring-gold" : "opacity-70 hover:opacity-100"}`}
                        aria-label={g.label || `Image ${i + 1}`}
                      >
                        <img
                          src={g.src}
                          alt={g.label || `${project.name} image ${i + 1}`}
                          loading="lazy"
                          className="h-14 w-20 object-cover"
                        />
                      </button>
                    ))}
                    {/* View all button in strip */}
                    <button
                      onClick={() => openLightbox(0)}
                      className="shrink-0 flex h-14 w-20 items-center justify-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                      aria-label="View all photos"
                    >
                      <div className="text-center">
                        <Eye className="mx-auto h-4 w-4" />
                        <span className="text-[9px] font-medium mt-0.5 block">View all</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Gradient placeholder when no images */
            <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-navy-deep" style={{ height: "400px" }}>
              <div className="text-center">
                <Building2 className="mx-auto h-16 w-16 text-gold/40" />
                <h2 className="mt-4 font-display text-3xl font-bold text-white">{project.name}</h2>
                <p className="mt-2 text-sm text-white/60">{project.location}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ LIGHTBOX ═══════ */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          gallery={gallery}
          videoMedia={videoMedia}
          floorPlanMedia={floorPlanMedia}
          initialIndex={lightboxIndex}
          projectName={project.name}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* ═══════ VIDEO MODAL ═══════ */}
      {videoModalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setVideoModalUrl(null)}>
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoModalUrl(null)}
              className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                src={videoModalUrl}
                className="h-full w-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Video walkthrough"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GALLERY LIGHTBOX (with media tabs, swipe, fullscreen)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
type MediaTab = "all" | "images" | "videos" | "floorplans";

function GalleryLightbox({
  gallery,
  videoMedia,
  floorPlanMedia,
  initialIndex,
  projectName,
  onClose,
}: {
  gallery: { src: string; label: string }[];
  videoMedia: PropertyMedia[];
  floorPlanMedia: PropertyMedia[];
  initialIndex: number;
  projectName: string;
  onClose: () => void;
}) {
  const [currentTab, setCurrentTab] = useState<MediaTab>("all");
  const [index, setIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);

  /* ── Build filtered items based on active tab ── */
  const allItems = useMemo(() => {
    const items: { src: string; label: string; type: "image" | "video" | "floorplan" }[] = [];
    gallery.forEach((g) => items.push({ ...g, type: "image" }));
    videoMedia.forEach((v) => items.push({ src: v.media_url, label: v.title || "Video", type: "video" }));
    floorPlanMedia.forEach((f) => items.push({ src: f.media_url, label: f.title || "Floor Plan", type: "floorplan" }));
    return items;
  }, [gallery, videoMedia, floorPlanMedia]);

  const filteredItems = useMemo(() => {
    if (currentTab === "all") return allItems;
    if (currentTab === "images") return allItems.filter((i) => i.type === "image");
    if (currentTab === "videos") return allItems.filter((i) => i.type === "video");
    return allItems.filter((i) => i.type === "floorplan");
  }, [allItems, currentTab]);

  // Clamp index when tab changes
  useEffect(() => {
    if (index >= filteredItems.length) setIndex(Math.max(0, filteredItems.length - 1));
  }, [filteredItems.length, index]);

  const safeIndex = Math.min(index, filteredItems.length - 1);
  const currentItem = filteredItems[safeIndex];

  /* ── Navigation ── */
  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((prev) => (prev + dir + filteredItems.length) % filteredItems.length);
    },
    [filteredItems.length],
  );

  /* ── Keyboard ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  /* ── Touch swipe ── */
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove = (e: React.TouchEvent) => { touchDelta.current = e.touches[0].clientX - touchStartX.current; };
  const onTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) go(touchDelta.current > 0 ? -1 : 1);
    touchDelta.current = 0;
  };

  /* ── Fullscreen ── */
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  /* ── Available tabs ── */
  const tabs = useMemo(() => {
    const t: { key: MediaTab; label: string; count: number }[] = [];
    t.push({ key: "all", label: "All", count: allItems.length });
    if (gallery.length > 0) t.push({ key: "images", label: "Images", count: gallery.length });
    if (videoMedia.length > 0) t.push({ key: "videos", label: "Videos", count: videoMedia.length });
    if (floorPlanMedia.length > 0) t.push({ key: "floorplans", label: "Floor Plans", count: floorPlanMedia.length });
    return t;
  }, [allItems.length, gallery.length, videoMedia.length, floorPlanMedia.length]);

  const showTabs = tabs.length > 2; // Only show tabs if there are at least 2 categories besides "All"

  /* ── Preload adjacent images ── */
  useEffect(() => {
    const preload = (offset: number) => {
      const i = (safeIndex + offset + filteredItems.length) % filteredItems.length;
      const item = filteredItems[i];
      if (item && item.type === "image") {
        const img = new Image();
        img.src = item.src;
      }
    };
    preload(1);
    preload(-1);
  }, [safeIndex, filteredItems]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-black/97"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} gallery`}
    >
      {/* ── Header bar ── */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-white">
            {safeIndex + 1} <span className="text-white/50">/</span> {filteredItems.length}
          </span>
          {currentItem?.label && (
            <span className="hidden md:inline text-sm text-white/60">— {currentItem.label}</span>
          )}
        </div>

        {/* Tabs */}
        {showTabs && (
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setCurrentTab(tab.key); setIndex(0); }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                  currentTab === tab.key
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab.label}
                <span className="ml-1 text-[10px] opacity-70">{tab.count}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="hidden md:flex rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <Maximize className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ── Mobile tabs ── */}
      {showTabs && (
        <div className="flex md:hidden items-center gap-1 px-4 py-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setCurrentTab(tab.key); setIndex(0); }}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                currentTab === tab.key
                  ? "bg-white/15 text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {tab.label} <span className="text-[10px] opacity-60">{tab.count}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Main image area ── */}
      <div
        className="relative flex flex-1 items-center justify-center px-4 md:px-16 min-h-0"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Previous */}
        <button
          onClick={() => go(-1)}
          className="absolute left-2 md:left-6 z-10 rounded-full bg-white/10 p-2.5 md:p-3 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        {/* Image / Video */}
        {currentItem && (
          currentItem.type === "video" ? (
            <div className="relative aspect-video w-full max-w-4xl rounded-xl overflow-hidden bg-black">
              <iframe
                src={currentItem.src}
                className="h-full w-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                title={currentItem.label}
              />
            </div>
          ) : (
            <img
              key={`${currentTab}-${safeIndex}`}
              src={currentItem.src}
              alt={currentItem.label || `${projectName} image`}
              className="max-h-[calc(100vh-180px)] max-w-full rounded-xl object-contain animate-[galleryFadeIn_200ms_ease-out]"
            />
          )
        )}

        {/* Next */}
        <button
          onClick={() => go(1)}
          className="absolute right-2 md:right-6 z-10 rounded-full bg-white/10 p-2.5 md:p-3 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
          aria-label="Next image"
        >
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide border-t border-white/5">
        {filteredItems.map((item, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`group shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
              i === safeIndex
                ? "ring-2 ring-gold opacity-100"
                : "opacity-50 hover:opacity-80"
            }`}
            aria-label={item.label || `Image ${i + 1}`}
          >
            {item.type === "video" ? (
              <div className="relative h-14 w-20 bg-navy-deep flex items-center justify-center">
                <PlayCircle className="h-6 w-6 text-white/80" />
              </div>
            ) : (
              <img
                src={item.src}
                alt={item.label || ""}
                className="h-14 w-20 object-cover"
                loading="lazy"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S03. TRUST BAR
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function TrustBar({
  reraNumber,
  possessionStatus,
  subType,
}: {
  reraNumber: string;
  possessionStatus: string | null;
  subType: string | null;
}) {
  const badges: { icon: React.ComponentType<any>; label: string; color: string }[] = [];

  if (reraNumber) {
    badges.push({ icon: BadgeCheck, label: `RERA: ${reraNumber}`, color: "bg-emerald-50 text-emerald-700" });
  }
  if (possessionStatus) {
    const isReady = possessionStatus.toLowerCase().includes("ready");
    badges.push({
      icon: CalendarClock,
      label: possessionStatus,
      color: isReady ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700",
    });
  }
  if (subType) {
    badges.push({ icon: Building2, label: subType, color: "bg-navy-deep/5 text-navy-deep" });
  }
  badges.push({ icon: ShieldCheck, label: "Verified Property", color: "bg-blue-50 text-blue-700" });

  return (
    <div className="border-b border-navy-deep/10 bg-white">
      <div className="container mx-auto flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
        {badges.map((b) => (
          <span
            key={b.label}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${b.color}`}
          >
            <b.icon className="h-3.5 w-3.5" />
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S04. PROPERTY OVERVIEW
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PropertyOverview({
  project,
  wa,
  raw,
}: {
  project: DetailProject;
  wa: string;
  raw: PropertyDetail;
}) {
  return (
    <div id="overview">
      {/* Name + Location */}
      <h1 className="font-display text-3xl font-bold text-navy-deep md:text-5xl leading-tight">
        {project.name}
      </h1>
      <p className="mt-2 flex items-center gap-2 text-sm text-slate-soft md:text-base">
        <MapPin className="h-4 w-4 text-gold shrink-0" />
        {project.location}
        {raw.city && raw.city !== project.location && <span className="text-navy-deep/40">·</span>}
        {raw.city && raw.city !== project.location && raw.city}
      </p>
      {project.tagline && (
        <p className="font-italic-serif mt-3 text-lg text-slate-soft md:text-xl">{project.tagline}</p>
      )}

      {/* Price + CTA Row */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-soft">Starting Price</div>
          <div className="font-display text-3xl font-bold text-navy-deep md:text-4xl">
            {project.startingPrice}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="#site-visit"
            className="inline-flex items-center gap-2 rounded-lg bg-navy-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy shadow-lg"
          >
            <Calendar className="h-4 w-4" /> Book Site Visit
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 shadow-lg"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 rounded-lg border border-navy-deep/15 bg-white px-5 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-navy-deep/5"
          >
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </div>
      </div>

      {/* Highlight Pills */}
      {project.highlights.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {project.highlights.map((h) => {
            const Icon = lucideIconMap[h.icon] || Home;
            return (
              <div key={h.label} className="rounded-xl border border-navy-deep/10 bg-white p-4 transition-shadow hover:shadow-card">
                <Icon className="h-5 w-5 text-gold" />
                <div className="mt-3 text-[10px] uppercase tracking-wider text-slate-soft">{h.label}</div>
                <div className="mt-1 font-display text-sm font-semibold text-navy-deep">{h.value}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S05. WHY CHOOSE / USPs
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function WhyChooseSection({
  usps,
  whyChoose,
  projectName,
}: {
  usps: string[];
  whyChoose: string | null;
  projectName: string;
}) {
  return (
    <div id="why-choose">
      <SectionTitle kicker="Why Choose" title={`Why ${projectName} Stands Out`} />
      {whyChoose && (
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-slate-soft md:text-base">{whyChoose}</p>
      )}
      {usps.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {usps.map((u) => (
            <span
              key={u}
              className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-4 py-2 text-xs font-semibold text-navy-deep transition-colors hover:bg-gold/20"
            >
              <Star className="h-3 w-3 text-gold" /> {u}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S06. CONFIGURATIONS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ConfigurationCards({
  project,
  subType,
}: {
  project: DetailProject;
  subType: string | null;
}) {
  return (
    <div id="configurations">
      <SectionTitle
        kicker="Pricing"
        title={`${project.name} Configurations & Price`}
        desc="Transparent pricing across available unit types. Speak to an advisor for the latest inventory and offers."
      />
      <div className="overflow-hidden rounded-xl border border-navy-deep/10 bg-white shadow-sm">
        {/* Table header (desktop) */}
        <div className="hidden grid-cols-5 gap-4 border-b border-navy-deep/10 bg-navy-deep/5 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-navy-deep md:grid">
          <div>Configuration</div><div>Area</div><div>Price</div><div>Status</div><div className="text-right">Action</div>
        </div>
        {project.configurations.map((c, i) => {
          const isSoldOut = c.status?.toLowerCase().includes("sold");
          return (
            <div
              key={`${c.type}-${i}`}
              className={`grid grid-cols-2 gap-3 border-b border-navy-deep/10 px-5 py-4 last:border-0 md:grid-cols-5 md:items-center md:gap-4 transition-colors hover:bg-navy-deep/[0.02] ${isSoldOut ? "opacity-50" : ""}`}
            >
              <div>
                <div className="text-[10px] uppercase text-slate-soft md:hidden">Configuration</div>
                <div className="font-display font-semibold text-navy-deep">{c.type}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-slate-soft md:hidden">Area</div>
                <div className="text-sm text-navy-deep">{c.area || "—"}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-slate-soft md:hidden">Price</div>
                <div className="font-display font-semibold text-navy-deep">{c.price}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-slate-soft md:hidden">Status</div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    isSoldOut
                      ? "bg-rose-50 text-rose-700"
                      : c.status?.toLowerCase().includes("few")
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {c.status || "Available"}
                </span>
              </div>
              <div className="md:text-right">
                {!isSoldOut && (
                  <a
                    href="#enquiry-form"
                    className="inline-flex items-center gap-1.5 rounded-md bg-navy-deep px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy"
                  >
                    Get Quote <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S07. ABOUT PROJECT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AboutProject({
  about,
  gallery,
  projectName,
  hasBrochure,
}: {
  about: string;
  gallery: { src: string; label: string }[];
  projectName: string;
  hasBrochure: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = about.length > 600;
  const displayText = isLong && !expanded ? about.slice(0, 600) + "..." : about;
  const sideImage = gallery.length > 1 ? gallery[1].src : gallery[0]?.src;

  return (
    <div id="about">
      <SectionTitle kicker="About the Project" title={`About ${projectName}`} />
      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <p className="text-sm leading-relaxed text-slate-soft md:text-base whitespace-pre-line">{displayText}</p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-sm font-semibold text-gold hover:underline"
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
          )}
          {hasBrochure && (
            <a
              href="#brochure"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-navy-deep/15 bg-white px-4 py-2.5 text-sm font-semibold text-navy-deep transition-colors hover:bg-navy-deep/5"
            >
              <Download className="h-4 w-4 text-gold" /> Download Brochure for Details
            </a>
          )}
        </div>
        {sideImage && (
          <div className="md:col-span-2">
            <img
              src={sideImage}
              alt={`${projectName} view`}
              loading="lazy"
              className="w-full rounded-xl object-cover aspect-[4/3]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S08. AMENITIES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AmenitiesGrid({ amenities }: { amenities: { icon: string; label: string }[] }) {
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 9;
  const hasMore = amenities.length > VISIBLE_COUNT;
  const displayed = showAll ? amenities : amenities.slice(0, VISIBLE_COUNT);

  return (
    <div id="amenities">
      <SectionTitle kicker="Lifestyle" title="World-Class Amenities" />
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
        {displayed.map((a) => {
          const Icon = lucideIconMap[a.icon] || Sparkles;
          return (
            <div
              key={a.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-navy-deep/10 bg-white p-4 text-center transition-shadow hover:shadow-card"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium text-navy-deep md:text-sm">{a.label}</span>
            </div>
          );
        })}
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-sm font-semibold text-gold hover:underline"
        >
          {showAll ? "Show Less" : `View All ${amenities.length} Amenities`}
        </button>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S09. FLOOR PLANS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FloorPlans({
  media,
  configurations,
}: {
  media: { media_url: string; title: string | null }[];
  configurations: { type: string; area: string }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div id="floor-plans">
      <SectionTitle kicker="Layouts" title="Floor Plans" desc="Tap to expand. Request a detailed PDF for full dimensions." />
      {media.length > 1 && (
        <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                i === active
                  ? "bg-navy-deep text-white"
                  : "border border-navy-deep/10 bg-white text-navy-deep hover:bg-navy-deep/5"
              }`}
            >
              {m.title || configurations[i]?.type || `Plan ${i + 1}`}
            </button>
          ))}
        </div>
      )}
      <div className="overflow-hidden rounded-xl border border-navy-deep/10 bg-white">
        <div className="bg-warm-bg p-6">
          <img
            src={media[active].media_url}
            alt={media[active].title || "Floor Plan"}
            loading="lazy"
            className="mx-auto max-h-96 w-auto object-contain"
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <div className="font-display text-sm font-semibold text-navy-deep">
              {media[active].title || configurations[active]?.type || "Floor Plan"}
            </div>
            {configurations[active]?.area && (
              <div className="text-xs text-slate-soft">{configurations[active].area}</div>
            )}
          </div>
          <a
            href="#enquiry-form"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline"
          >
            <Download className="h-3.5 w-3.5" /> Request Details
          </a>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S10. LOCATION + CONNECTIVITY
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LocationSection({
  location,
  mapUrl,
  nearby,
}: {
  location: string;
  mapUrl: string | null;
  nearby: { icon: string; label: string; place: string; time: string }[];
}) {
  const isEmbedUrl = mapUrl && (mapUrl.includes("/embed") || mapUrl.includes("output=embed"));
  const mapSrc = isEmbedUrl 
    ? mapUrl 
    : `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;

  return (
    <div id="location">
      <SectionTitle kicker="Connectivity" title={`Location & Connectivity — ${location}`} />
      <div className="grid gap-6 md:grid-cols-2">
        {/* Map embed */}
        <div className="overflow-hidden rounded-xl border border-navy-deep/10 bg-white">
          <iframe
            title={`Map of ${location}`}
            src={mapSrc}
            className="h-72 w-full md:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {mapUrl && !isEmbedUrl && (
            <div className="bg-slate-50 border-t border-navy-deep/5 px-4 py-2.5 flex justify-between items-center text-xs">
              <span className="text-slate-soft">Custom map location available</span>
              <a 
                href={mapUrl} 
                target="_blank" 
                rel="noreferrer"
                className="font-semibold text-gold hover:underline flex items-center gap-1"
              >
                Open in Google Maps <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
        {/* Nearby places */}
        {nearby.length > 0 && (
          <div className="space-y-2">
            {nearby.map((n) => {
              const Icon = lucideIconMap[n.icon] || MapPin;
              return (
                <div key={n.place} className="flex items-center justify-between rounded-lg border border-navy-deep/10 bg-white px-4 py-3 transition-shadow hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-display text-sm font-semibold text-navy-deep">{n.place}</div>
                      <div className="text-xs text-slate-soft">{n.label}</div>
                    </div>
                  </div>
                  {n.time && <span className="text-sm font-semibold text-navy-deep">{n.time}</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S11. STICKY LEAD CARD (Desktop Sidebar)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function StickyLeadCard({ projectName, propertyId, wa }: { projectName: string; propertyId: string; wa: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("full_name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      await submitLead({
        full_name: fullName,
        phone: phone,
        email: email || null,
        interested_in: projectName,
        property_id: propertyId,
        source: "Property Enquiry",
        message: message || `Requested pricing & brochure for ${projectName}`,
      });
      setSubmitted(true);
      toast.success("Enquiry submitted successfully!");
    } catch (err: any) {
      console.error("Enquiry failed:", err);
      toast.error(err.message || "Failed to submit enquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="enquiry-form" className="overflow-hidden rounded-2xl border border-navy-deep/10 bg-white shadow-card">
      {/* Quick contact row */}
      <div className="grid grid-cols-2 gap-0 border-b border-navy-deep/10">
        <a
          href={`tel:${PHONE}`}
          className="flex items-center justify-center gap-2 py-3 text-xs font-semibold text-navy-deep transition-colors hover:bg-navy-deep/5 border-r border-navy-deep/10"
        >
          <Phone className="h-3.5 w-3.5 text-gold" /> Call Now
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 py-3 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
      </div>

      {/* Form header */}
      <div className="bg-navy-deep p-5 text-white">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">Get in Touch</div>
        <h3 className="mt-1 font-display text-lg font-bold">Request Pricing & Brochure</h3>
        <p className="mt-1 text-[11px] text-white/70">A senior advisor will call you within 30 minutes.</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 p-5"
      >
        <input required name="full_name" placeholder="Your Name" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
        <input required name="phone" type="tel" placeholder="Phone Number" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
        <input name="email" type="email" placeholder="Email (Optional)" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
        <textarea name="message" rows={2} placeholder={`Message about ${projectName}`} className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors" />

        {submitted && (
          <div className="rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-700 flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5" /> Thank you! Our advisor will reach out shortly.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-navy-deep transition-opacity hover:opacity-90 shadow-gold"
        >
          {loading ? "Submitting..." : "Get Pricing"}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <a href="#site-visit" className="flex items-center justify-center gap-1.5 rounded-md bg-navy-deep px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-navy">
            <Calendar className="h-3.5 w-3.5 text-gold" /> Book Visit
          </a>
          <a href="#brochure" className="flex items-center justify-center gap-1.5 rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-xs font-semibold text-navy-deep transition-colors hover:bg-navy-deep/5">
            <Download className="h-3.5 w-3.5 text-gold" /> Brochure
          </a>
        </div>

        <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-slate-soft">
          <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-gold" /> 100% Confidential</span>
          <span>·</span>
          <span>No spam calls</span>
        </div>
      </form>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S12. VIDEO WALKTHROUGH
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function VideoWalkthrough({ media }: { media: { media_url: string; title: string | null }[] }) {
  const [playing, setPlaying] = useState(false);
  const videoItem = media[0];
  const isYoutube = videoItem.media_url.includes("youtube") || videoItem.media_url.includes("youtu.be");

  // Extract YouTube video ID for thumbnail
  const ytId = useMemo(() => {
    const match = videoItem.media_url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
    return match?.[1] || "";
  }, [videoItem.media_url]);

  const embedUrl = isYoutube
    ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`
    : videoItem.media_url;

  return (
    <div id="walkthrough">
      <SectionTitle kicker="See it Live" title={videoItem.title || "Project Walkthrough"} />
      <div className="relative overflow-hidden rounded-2xl aspect-video bg-navy-deep">
        {playing ? (
          <iframe
            src={embedUrl}
            title={videoItem.title || "Property Walkthrough"}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <button onClick={() => setPlaying(true)} className="absolute inset-0 flex items-center justify-center group">
            {isYoutube && ytId ? (
              <img
                src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-navy to-navy-deep" />
            )}
            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
            <div className="absolute grid h-20 w-20 place-items-center rounded-full bg-white/95 text-navy-deep shadow-elevated transition-transform group-hover:scale-110">
              <PlayCircle className="h-10 w-10" />
            </div>
          </button>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <a
          href="#site-visit"
          className="inline-flex items-center gap-2 rounded-lg bg-navy-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy shadow-lg"
        >
          <Calendar className="h-4 w-4" /> Schedule Physical Visit
        </a>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S13. BROCHURE DOWNLOAD (Lead-Gated)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function BrochureDownload({ projectName, propertyId, brochureUrl }: { projectName: string; propertyId: string; brochureUrl: string }) {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("full_name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;

    try {
      await submitLead({
        full_name: fullName,
        phone: phone,
        email: email || null,
        interested_in: projectName,
        property_id: propertyId,
        source: "Brochure Download",
        message: `Requested to unlock/download brochure for ${projectName}`,
      });
      setUnlocked(true);
      toast.success("Brochure unlocked!");
      if (brochureUrl) {
        window.open(brochureUrl, "_blank");
      }
    } catch (err: any) {
      console.error("Unlock failed:", err);
      toast.error(err.message || "Failed to unlock brochure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="brochure" className="overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-warm-bg to-white shadow-card">
      <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
        {/* Left: Info */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Project Brochure</div>
          <h2 className="mt-1 font-display text-2xl font-bold text-navy-deep md:text-3xl">
            Download Complete Brochure
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-soft">
            Get the official {projectName} brochure with floor plans, pricing, payment schedules, amenity details, and master plan.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-navy-deep">
            {["All unit configurations & sizes", "Transparent pricing & payment plans", "Amenities, specs & master plan", "Approved legal documentation"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Right: Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-navy-deep/10 bg-white p-5"
        >
          <div className="flex items-center gap-2 text-navy-deep">
            <FileText className="h-5 w-5 text-gold" />
            <h3 className="font-display text-base font-semibold">Unlock Brochure</h3>
          </div>
          <div className="mt-4 space-y-3">
            <input required name="full_name" placeholder="Your Name" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
            <input required name="phone" type="tel" placeholder="Phone Number" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
            <input required name="email" type="email" placeholder="Email Address" className="w-full rounded-md border border-navy-deep/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
          </div>
          {unlocked ? (
            <a
              href={brochureUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              <Download className="h-4 w-4" /> Brochure Unlocked — Download Now
            </a>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-navy-deep px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
            >
              <Download className="h-4 w-4" /> {loading ? "Unlocking..." : "Download Brochure"}
            </button>
          )}
          <p className="mt-3 text-center text-[10px] text-slate-soft">
            <ShieldCheck className="mr-1 inline h-3 w-3 text-gold" /> Your details stay confidential. No spam, ever.
          </p>
        </form>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S14. INVESTMENT POTENTIAL
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function InvestmentPotential({
  items,
  location,
  wa,
}: {
  items: { label: string; value: string; desc: string }[];
  location: string;
  wa: string;
}) {
  return (
    <section className="bg-navy-deep py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Why Invest</div>
          <h2 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">
            Investment Potential in {location}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/[0.08]">
              <div className="text-[10px] uppercase tracking-wider text-white/60">{item.label}</div>
              <div className="mt-2 font-display text-2xl font-bold text-gold">{item.value}</div>
              {item.desc && <p className="mt-2 text-xs text-white/70">{item.desc}</p>}
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 shadow-lg"
          >
            <MessageCircle className="h-4 w-4" /> Speak to Investment Advisor
          </a>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S15. SITE VISIT BOOKING
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SiteVisitBooking({ projectName, propertyId }: { projectName: string; propertyId: string }) {
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const times = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM"];
  const [time, setTime] = useState(times[0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("full_name") as string;
    const phone = formData.get("phone") as string;
    const dateVal = formData.get("date") as string;

    try {
      await submitLead({
        full_name: fullName,
        phone: phone,
        interested_in: projectName,
        property_id: propertyId,
        source: "Book Site Visit",
        visit_date: dateVal,
        visit_time: time,
      });
      setBooked(true);
      toast.success("Site visit booking requested!");
    } catch (err: any) {
      console.error("Booking failed:", err);
      toast.error(err.message || "Failed to book site visit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="site-visit" className="bg-navy-deep py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Compelling copy */}
          <div className="text-white">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Site Visit</div>
            <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">
              Experience {projectName} In Person
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Walk the site with a senior advisor. We arrange complimentary pickup, full project walkthrough, sample unit tour, and an honest consultation — no pressure.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              {[
                { icon: Car, title: "Complimentary Pickup & Drop", sub: "Within Dehradun city limits" },
                { icon: KeyRound, title: "Sample Unit Walkthrough", sub: "Experience the finishing first-hand" },
                { icon: Clock, title: "60-Minute Visit", sub: "Includes Q&A with senior advisor" },
              ].map((perk) => (
                <div key={perk.title} className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <perk.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-semibold">{perk.title}</div>
                    <div className="text-xs text-white/70">{perk.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur"
          >
            <h3 className="font-display text-lg font-semibold text-white">Book Your Free Site Visit</h3>
            <p className="mt-1 text-xs text-white/65">Select a preferred date & time. We'll confirm within 30 minutes.</p>
            <div className="mt-4 space-y-3">
              <input required name="full_name" placeholder="Your Name" className="w-full rounded-md border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-gold transition-colors" />
              <input required name="phone" type="tel" placeholder="Phone Number" className="w-full rounded-md border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-gold transition-colors" />
              <input required name="date" type="date" min={new Date().toISOString().split("T")[0]} className="w-full rounded-md border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white outline-none focus:border-gold [color-scheme:dark] transition-colors" />
              <div>
                <div className="mb-2 text-xs text-white/65">Preferred Time</div>
                <div className="grid grid-cols-3 gap-2">
                  {times.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTime(t)}
                      className={`rounded-md border px-2 py-2 text-xs font-medium transition-all ${
                        time === t
                          ? "border-gold bg-gold text-navy-deep"
                          : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {booked && (
              <div className="mt-3 rounded-md bg-emerald-500/15 px-3 py-2 text-xs text-emerald-300 flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> Site visit requested for {time}. An advisor will confirm shortly.
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-navy-deep transition-opacity hover:opacity-90 shadow-gold"
            >
              <Calendar className="h-4 w-4" /> {loading ? "Booking..." : "Book Free Site Visit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S16. FAQ ACCORDION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FAQAccordion({
  items,
  open,
  setOpen,
  wa,
}: {
  items: { q: string; a: string }[];
  open: number | null;
  setOpen: (i: number | null) => void;
  wa: string;
}) {
  return (
    <div id="faqs">
      <SectionTitle kicker="Answers" title="Frequently Asked Questions" />
      <div className="divide-y divide-navy-deep/10 overflow-hidden rounded-xl border border-navy-deep/10 bg-white shadow-sm">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-navy-deep/[0.02]"
              >
                <span className="font-display text-sm font-semibold text-navy-deep md:text-base pr-4">{f.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-5 pb-5 text-sm leading-relaxed text-slate-soft whitespace-pre-line">{f.a}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center gap-3 rounded-lg border border-navy-deep/10 bg-white p-4">
        <MessageCircle className="h-5 w-5 text-emerald-600 shrink-0" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-navy-deep">Still have questions?</div>
          <div className="text-xs text-slate-soft">Chat with us instantly on WhatsApp</div>
        </div>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Us
        </a>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S17. FINAL CTA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FinalCTA({ project, wa }: { project: DetailProject; wa: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-20">
      {/* Background image overlay */}
      {project.hero && (
        <div className="absolute inset-0 opacity-15">
          <img src={project.hero} alt="" className="h-full w-full object-cover" aria-hidden="true" />
        </div>
      )}
      <div className="container relative mx-auto px-4 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Take the Next Step</div>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-5xl">
          Ready to Own Your Dream Home at {project.name}?
        </h2>
        <p className="font-italic-serif mt-3 text-lg text-white/80 md:text-xl">
          Speak with a senior advisor — no obligation, complete transparency.
        </p>
        <p className="mx-auto mt-2 max-w-md text-xs text-white/50">
          No spam. No obligations. Free consultation.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#site-visit" className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-navy-deep transition-opacity hover:opacity-90 shadow-gold">
            <Calendar className="h-4 w-4" /> Book Free Site Visit
          </a>
          <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/15 backdrop-blur">
            <Phone className="h-4 w-4" /> Talk to Advisor
          </a>
          <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 shadow-lg">
            <MessageCircle className="h-4 w-4" /> WhatsApp Now
          </a>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S18. SIMILAR PROJECTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SimilarProjects({ items }: { items: DetailProject["similar"] }) {
  if (items.length === 0) return null;
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <SectionTitle kicker="Explore More" title="Similar Properties You'll Love" />
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((s) => (
            <Link
              key={s.slug}
              to="/projects/$slug"
              params={{ slug: s.slug }}
              search={{ landing: false }}
              className="group overflow-hidden rounded-xl border border-navy-deep/10 bg-white shadow-sm transition-shadow hover:shadow-card"
            >
              <div className="overflow-hidden">
                <img src={s.img} alt={s.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold text-navy-deep">{s.name}</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-soft">
                  <MapPin className="h-3 w-3 text-gold" /> {s.location}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-navy-deep">{s.price}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold group-hover:underline">
                    View <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FOOTER COMPONENTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SiteFooter() {
  return (
    <footer className="border-t border-navy-deep/10 bg-white py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 text-xs text-slate-soft md:flex-row">
        <div>© {new Date().getFullYear()} Vineyard Infra Realcon LLP. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="https://www.facebook.com/vineyardinfra" target="_blank" rel="noopener noreferrer" className="hover:text-navy-deep transition-colors" aria-label="Facebook"><Facebook className="size-4" /></a>
          <a href="https://www.instagram.com/vineyardinfra/" target="_blank" rel="noopener noreferrer" className="hover:text-navy-deep transition-colors" aria-label="Instagram"><Instagram className="size-4" /></a>
          <a href="https://www.youtube.com/@vineyardinfra1900" target="_blank" rel="noopener noreferrer" className="hover:text-navy-deep transition-colors" aria-label="YouTube"><Youtube className="size-4" /></a>
        </div>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-navy-deep transition-colors">Home</Link>
          <Link to="/properties" className="hover:text-navy-deep transition-colors">Properties</Link>
          <Link to="/contact" className="hover:text-navy-deep transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

function LandingMinimalFooter() {
  return (
    <footer className="border-t border-navy-deep/10 bg-white py-6">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center text-xs text-slate-soft md:flex-row md:justify-between md:text-left">
        <div>© {new Date().getFullYear()} Vineyard Infra Realcon LLP. All rights reserved.</div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <a href={`tel:${PHONE}`} className="inline-flex items-center gap-1 hover:text-navy-deep transition-colors">
            <Phone className="h-3 w-3" /> +91 63976 88989
          </a>
          <span className="hidden md:inline text-navy-deep/20">|</span>
          <a href="mailto:vineyardinfra005@gmail.com" className="inline-flex items-center gap-1 hover:text-navy-deep transition-colors">
            <Mail className="h-3 w-3" /> vineyardinfra005@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S19. MOBILE STICKY BAR (Overlay)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MobileStickyBar({ wa }: { wa: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~10% of viewport
      setVisible(window.scrollY > window.innerHeight * 0.1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 gap-1 border-t border-navy-deep/10 bg-white p-2 shadow-elevated md:hidden animate-fade-up">
      <a href={`tel:${PHONE}`} className="flex flex-col items-center justify-center gap-0.5 rounded-md py-2 text-[10px] font-semibold text-navy-deep transition-colors active:bg-navy-deep/5">
        <Phone className="h-4 w-4 text-gold" /> Call
      </a>
      <a href={wa} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-0.5 rounded-md bg-emerald-600 py-2 text-[10px] font-semibold text-white">
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
      <a href="#site-visit" className="flex flex-col items-center justify-center gap-0.5 rounded-md bg-navy-deep py-2 text-[10px] font-semibold text-white">
        <Calendar className="h-4 w-4 text-gold" /> Visit
      </a>
      <a href="#enquiry-form" className="flex flex-col items-center justify-center gap-0.5 rounded-md border border-navy-deep/15 py-2 text-[10px] font-semibold text-navy-deep transition-colors active:bg-navy-deep/5">
        <FileText className="h-4 w-4 text-gold" /> Enquire
      </a>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   S20. FLOATING WHATSAPP (Desktop)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FloatingWhatsApp({ wa }: { wa: string }) {
  return (
    <a
      href={wa}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-30 hidden md:grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-elevated transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LANDING: FLOATING ENQUIRY BAR (Desktop)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FloatingEnquiryBar({ wa }: { wa: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 hidden md:block">
      <div className="border-t border-white/10 bg-navy-deep/95 backdrop-blur-md shadow-elevated">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <div className="text-sm font-semibold text-white">Interested in this property?</div>
              <div className="text-[11px] text-white/60">Speak with a senior advisor — no obligation</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="#enquiry-form" className="inline-flex items-center gap-1.5 rounded-md bg-gold px-4 py-2 text-xs font-semibold text-navy-deep transition-opacity hover:opacity-90">
              <Calendar className="h-3.5 w-3.5" /> Book Free Site Visit
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/15">
              <Phone className="h-3.5 w-3.5" /> Call Expert
            </a>
            <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700">
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SHARED UI COMPONENTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SectionTitle({ kicker, title, desc }: { kicker?: string; title: string; desc?: string }) {
  return (
    <div className="mb-6">
      {kicker && <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{kicker}</div>}
      <h2 className="mt-1 font-display text-2xl font-bold text-navy-deep md:text-3xl">{title}</h2>
      {desc && <p className="mt-2 max-w-2xl text-sm text-slate-soft">{desc}</p>}
    </div>
  );
}
