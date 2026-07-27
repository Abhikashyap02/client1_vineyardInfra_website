import { Star, Check } from "lucide-react";

interface TestimonialItem {
  id: string | number;
  quote: string;
  name: string;
  verified: boolean;
  detail: string;
}

const topRowTestimonials: TestimonialItem[] = [
  {
    id: 1,
    quote:
      "great services giveny by vineet ji..He help me to find the best location property within my budget in Dehradun. Thank You Vineet ji",
    name: "Abhishek",
    verified: true,
    detail: "Property Buyer • Sangam Valley",
  },
  {
    id: 2,
    quote:
      "I am thrilled to express my sincere gratitude to Vine Yard Infra for their exceptional construction services. From inception to completion, their team demonstrated unmatched professionalism, keen attention to detail, and a commitment to quality that surpassed my expectations.",
    name: "Naman",
    verified: true,
    detail: "Homeowner • Platinum Township",
  },
  {
    id: 3,
    quote:
      "Excellent service from Vineet ji — helped me find the perfect property in Dehradun within my budget. Highly recommended!",
    name: "Hemant",
    verified: true,
    detail: "Property Owner • Aviraj Apartments",
  },
  {
    id: 4,
    quote:
      "Vine Yard Infra delivered top-quality construction work on time. Professional team and great results.",
    name: "Sudhir",
    verified: true,
    detail: "Homeowner • Mandakini Vihar",
  },
];

const bottomRowTestimonials: TestimonialItem[] = [
  {
    id: 5,
    quote:
      "Impressed with Vine Yard Infra’s workmanship and attention to detail. My new property looks fantastic.",
    name: "Yash",
    verified: true,
    detail: "Plot Owner • Vivanta Greens Plot",
  },
  {
    id: 6,
    quote:
      "I appreciate Vineet ji’s patience and market knowledge — he helped me secure a great property in a prime location without stretching my budget. Highly trustworthy service.",
    name: "Vandana",
    verified: true,
    detail: "Property Owner • Sangam Valley",
  },
  {
    id: 7,
    quote:
      "The team at Vine Yard Infra showed great attention to detail and delivered a solid, beautiful building within the promised timeframe. Very satisfied with their work.",
    name: "Rahul kumar",
    verified: true,
    detail: "Homeowner • Platinum Township",
  },
  {
    id: 8,
    quote:
      "Vine Yard Infra handled our construction project professionally from start to finish. They finished on schedule and the quality of work exceeded our expectations. Would use them again.",
    name: "Bharat",
    verified: true,
    detail: "Client • Sahastradhara plot",
  },
];

function LuxuryTestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="w-[290px] sm:w-[350px] lg:w-[390px] shrink-0 rounded-[24px] border border-[#C9A227]/15 bg-white p-5 md:p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-350 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(201,162,39,0.18)] hover:border-[#C9A227] select-none">
      <div>
        {/* Top Header: 5 Gold Stars & Gold Quote Icon */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="size-4 fill-[#C9A227] text-[#C9A227]"
              />
            ))}
          </div>
          {/* Gold SVG Quote Icon */}
          <svg
            className="size-6 text-[#C9A227] fill-[#C9A227] opacity-80"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* Review Quote Text */}
        <p className="font-sans text-[#1F2937] text-sm md:text-[15px] font-normal leading-relaxed text-left mb-4">
          "{item.quote}"
        </p>
      </div>

      {/* Customer Info Section */}
      <div className="border-t border-[#C9A227]/15 pt-3 mt-1">
        <h4 className="font-semibold text-[#1F2937] text-sm md:text-base leading-snug">
          {item.name}
        </h4>

        {/* Verified Badge */}
        {item.verified && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-0.5">
            <span className="grid size-3.5 place-items-center rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold">
              <Check className="size-2.5 stroke-[3]" />
            </span>
            <span>Verified Buyer</span>
          </div>
        )}

        {/* Property & Location Detail */}
        <p className="text-[14px] text-[#6B7280] font-normal leading-tight mt-1">
          {item.detail}
        </p>
      </div>
    </div>
  );
}

export function VideoTestimonialsSection() {
  return (
    <section className="bg-[#FAF8F5] py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-14 text-center">
        <p className="mb-3 text-xs md:text-sm font-semibold tracking-[0.25em] text-[#C9A227] uppercase">
          CLIENT REVIEWS & TESTIMONIALS
        </p>
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] leading-tight md:leading-[1.2]">
          Words of Praise From Our Valued Clients
        </h2>
        <p className="mt-4 text-[#6B7280] text-sm md:text-base max-w-2xl mx-auto font-sans">
          Real experiences from homeowners and investors who built their legacy with Vineyard Infra.
        </p>
      </div>

      {/* Infinite Horizontal Scrolling Rows */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Soft Gold/Cream Edge Fade Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent" />

        {/* Top Row: Left to Right (animate-marquee-reverse) */}
        <div className="flex animate-marquee-reverse gap-5 sm:gap-6 md:gap-8 pb-7">
          {[...topRowTestimonials, ...topRowTestimonials].map((item, idx) => (
            <LuxuryTestimonialCard key={`top-${idx}`} item={item} />
          ))}
        </div>

        {/* Bottom Row: Right to Left (animate-marquee) */}
        <div className="flex animate-marquee gap-5 sm:gap-6 md:gap-8">
          {[...bottomRowTestimonials, ...bottomRowTestimonials].map((item, idx) => (
            <LuxuryTestimonialCard key={`bot-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const TestimonialsSection = VideoTestimonialsSection;
