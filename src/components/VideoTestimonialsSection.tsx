import { useState, useRef, useEffect } from "react";
import { Play, X, Users, Briefcase, Award, Quote } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import videoThumb1 from "@/assets/video-testimonial-1.jpg";
import videoThumb2 from "@/assets/video-testimonial-2.jpg";
import videoThumb3 from "@/assets/video-testimonial-3.jpg";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const trustStats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Briefcase, value: "₹750 Cr+", label: "Successful Transactions" },
  { icon: Award, value: "10+", label: "Years of Experience" },
];

const videoTestimonials = [
  {
    id: 1,
    name: "Rohan & Priya Mehta",
    project: "Vineyard Signature Villas",
    title: "A Dream Home Come True",
    quote: "Vineyard Infra made our dream of owning a luxury villa a reality. Their guidance was exceptional.",
    thumbnail: videoThumb1,
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 2,
    name: "Amit Sharma",
    project: "Vineyard High Grove",
    title: "Smart Investment, Bright Future",
    quote: "The best investment decision I've made. The team's market knowledge is unparalleled.",
    thumbnail: videoThumb2,
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 3,
    name: "Neha Rawat",
    project: "Vineyard Green County",
    title: "Trust & Transparency at Every Step",
    quote: "From shortlisting to possession, the entire process was smooth and completely transparent.",
    thumbnail: videoThumb3,
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
];

/* ------------------------------------------------------------------ */
/*  Intersection Observer hook for scroll animations                   */
/* ------------------------------------------------------------------ */

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function VideoTestimonialsSection() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof videoTestimonials)[0] | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>(0.1);

  const handleOpen = (item: (typeof videoTestimonials)[0]) => {
    setSelected(item);
    setOpen(true);
  };

  const handleClose = (val: boolean) => {
    setOpen(val);
    if (!val) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setSelected(null);
    }
  };

  return (
    <section className="bg-background py-24">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          className="mb-10 text-center transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <p className="mb-3 text-sm tracking-[0.3em] text-gold">VIDEO TESTIMONIALS</p>
          <h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">
            Hear From Our <span className="font-italic-serif text-gold">Happy</span> Clients
          </h2>
        </div>

        {/* Trust Stats */}
        <div
          className="mb-14 grid gap-8 border-y border-border py-10 md:grid-cols-3 transition-all duration-700 ease-out delay-100"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {trustStats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-3 text-center">
              <div className="grid size-14 place-items-center rounded-full border border-gold/30 bg-secondary text-gold">
                <s.icon className="size-6" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-navy-deep">{s.value}</p>
                <p className="mt-0.5 text-sm text-slate-soft">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ---- VERTICAL CARDS — Desktop/Tablet grid ---- */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {videoTestimonials.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleOpen(item)}
              className="group cursor-pointer overflow-hidden rounded-sm border border-border bg-card text-left transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-elevated focus:outline-none focus:ring-2 focus:ring-gold"
              style={{
                boxShadow: "var(--shadow-card)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${200 + i * 150}ms`,
              }}
            >
              {/* Tall portrait thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={`${item.name} video testimonial`}
                  width={640}
                  height={800}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/10 to-transparent transition-opacity duration-500 group-hover:from-navy-deep/80" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="grid size-18 place-items-center rounded-full border-2 border-white/40 bg-white/15 text-white backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-gold/60 group-hover:bg-gold/90 group-hover:text-navy-deep"
                    style={{ width: "4.5rem", height: "4.5rem" }}
                  >
                    <Play className="size-7 fill-current" />
                  </span>
                </div>
                {/* Bottom text overlay on thumbnail */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <Quote className="size-5 text-gold/80 mb-2 opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" />
                  <p className="text-sm leading-relaxed text-white/90 opacity-0 translate-y-3 transition-all duration-500 delay-75 group-hover:opacity-100 group-hover:translate-y-0">
                    "{item.quote}"
                  </p>
                </div>
              </div>
              {/* Card body */}
              <div className="p-6">
                <h3 className="font-display text-base font-semibold text-navy-deep transition-colors group-hover:text-gold">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-soft">{item.project}</p>
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-soft font-display text-sm font-semibold text-navy-deep">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-deep">— {item.name}</p>
                    <p className="text-xs text-slate-soft">Verified Client</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* ---- MOBILE — Vertical scroll cards ---- */}
        <div className="space-y-5 md:hidden">
          {videoTestimonials.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleOpen(item)}
              className="group w-full cursor-pointer overflow-hidden rounded-sm border border-border bg-card text-left shadow-card transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-gold"
              style={{
                boxShadow: "var(--shadow-card)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${200 + i * 120}ms`,
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={`${item.name} video testimonial`}
                  width={640}
                  height={800}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="grid place-items-center rounded-full border-2 border-white/40 bg-white/15 text-white backdrop-blur-sm"
                    style={{ width: "3.5rem", height: "3.5rem" }}
                  >
                    <Play className="size-5 fill-current" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-sm leading-relaxed text-white/90">"{item.quote}"</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-sm font-semibold text-navy-deep">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs text-slate-soft">{item.project}</p>
                <div className="mt-3 flex items-center gap-2.5 border-t border-border pt-3">
                  <div className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-soft font-display text-xs font-semibold text-navy-deep">
                    {item.name.charAt(0)}
                  </div>
                  <p className="text-xs font-medium text-navy-deep">— {item.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent
          className="max-w-4xl border-none bg-transparent p-0 shadow-none"
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">
            {selected ? `${selected.name} — Video Testimonial` : "Video Testimonial"}
          </DialogTitle>
          <div className="relative overflow-hidden rounded-sm bg-black">
            <button
              onClick={() => handleClose(false)}
              className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
            >
              <X className="size-5" />
            </button>
            {selected && (
              <video
                ref={videoRef}
                controls
                autoPlay
                poster={selected.thumbnail}
                className="w-full"
                src={selected.videoSrc}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
