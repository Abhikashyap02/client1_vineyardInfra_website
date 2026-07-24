import { useState, useEffect } from "react";
import { ContentBlock } from "@/data/blogData";

interface TableOfContentsProps {
  content: ContentBlock[];
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const headings = content.filter(
    (block) => block.type === "heading-2" || block.type === "heading-3"
  ) as { type: "heading-2" | "heading-3"; text: string }[];

  const [activeId, setActiveId] = useState<string>("");

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: "-100px 0px -50% 0px", threshold: 0.1 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(slugify(heading.text));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Offset for header navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <div className="rounded-xl border border-gold/15 bg-white p-6 shadow-sm">
      <h4 className="font-display text-xs font-bold text-navy-deep uppercase tracking-wider mb-4 pb-2 border-b border-gold/10">
        Table of Contents
      </h4>
      <nav className="space-y-3">
        {headings.map((heading, i) => {
          const id = slugify(heading.text);
          const isHeading3 = heading.type === "heading-3";
          const isActive = activeId === id;

          return (
            <a
              key={i}
              href={`#${id}`}
              onClick={(e) => handleScroll(e, id)}
              className={`block text-xs leading-relaxed transition-all duration-300 ${
                isHeading3 ? "pl-4" : "pl-0"
              } ${
                isActive
                  ? "text-gold font-bold pl-1.5 border-l-2 border-gold"
                  : "text-slate-soft hover:text-navy-deep"
              }`}
            >
              {heading.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
