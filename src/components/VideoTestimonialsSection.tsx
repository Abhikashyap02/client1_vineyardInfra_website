import * as React from "react";
import { Play, X, Users, Briefcase, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import videoThumb1 from "@/assets/video-testimonial-1.jpg";
import videoThumb2 from "@/assets/video-testimonial-2.jpg";
import videoThumb3 from "@/assets/video-testimonial-3.jpg";

const trustStats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Briefcase, value: "750 Cr+", label: "Successful Transactions" },
  { icon: Award, value: "10+", label: "Years of Experience" },
];

const videoTestimonials = [
  {
    id: 1,
    name: "Rohan & Priya Mehta",
    project: "Vineyard Signature Villas",
    title: "A Dream Home Come True",
    thumbnail: videoThumb1,
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 2,
    name: "Amit Sharma",
    project: "Vineyard High Grove",
    title: "Smart Investment, Bright Future",
    thumbnail: videoThumb2,
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 3,
    name: "Neha Rawat",
    project: "Vineyard Green County",
    title: "Trust & Transparency at Every Step",
    thumbnail: videoThumb3,
    videoSrc:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
];

export function VideoTestimonialsSection() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<(typeof videoTestimonials)[0] | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

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
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm tracking-[0.3em] text-gold">VIDEO TESTIMONIALS</p>
          <h2 className="font-display text-3xl font-bold text-navy-deep md:text-4xl">
            Hear From Our <span className="font-italic-serif text-gold">Happy</span> Clients
          </h2>
        </div>

        {/* Trust Stats */}
        <div className="mb-14 grid gap-8 border-y border-border py-10 md:grid-cols-3">
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

        {/* Desktop / Tablet Grid */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {videoTestimonials.map((item) => (
            <button
              key={item.id}
              onClick={() => handleOpen(item)}
              className="group cursor-pointer overflow-hidden rounded-sm border border-border bg-card text-left shadow-card transition hover:-translate-y-1 hover:shadow-elevated focus:outline-none focus:ring-2 focus:ring-gold"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={`${item.name} video testimonial`}
                  width={1024}
                  height={576}
                  loading="lazy"
                  className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/20 transition group-hover:bg-navy-deep/30">
                  <span className="grid size-16 place-items-center rounded-full bg-white/90 text-navy-deep shadow-lg transition group-hover:scale-110 group-hover:bg-gold group-hover:text-navy-deep">
                    <Play className="size-6 fill-current" />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-base font-semibold text-navy-deep">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-soft">{item.project}</p>
                <p className="mt-3 text-sm font-medium text-navy-deep">— {item.name}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videoTestimonials.map((item) => (
            <button
              key={item.id}
              onClick={() => handleOpen(item)}
              className="group min-w-[280px] max-w-[320px] flex-1 cursor-pointer snap-start overflow-hidden rounded-sm border border-border bg-card text-left shadow-card transition focus:outline-none focus:ring-2 focus:ring-gold"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={`${item.name} video testimonial`}
                  width={1024}
                  height={576}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/20">
                  <span className="grid size-14 place-items-center rounded-full bg-white/90 text-navy-deep shadow-lg">
                    <Play className="size-5 fill-current" />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-sm font-semibold text-navy-deep">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs text-slate-soft">{item.project}</p>
                <p className="mt-2 text-xs font-medium text-navy-deep">— {item.name}</p>
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
