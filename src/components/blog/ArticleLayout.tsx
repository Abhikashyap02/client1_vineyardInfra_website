import { ContentBlock } from "@/data/blogData";

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

interface ArticleLayoutProps {
  content: ContentBlock[];
}

export function ArticleLayout({ content }: ArticleLayoutProps) {
  return (
    <div className="prose max-w-none text-navy-deep space-y-6 md:space-y-8 leading-relaxed">
      {content.map((block, idx) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={idx}
                className="font-body text-[15px] md:text-[16px] text-slate-soft/95 leading-relaxed"
              >
                {block.text}
              </p>
            );

          case "heading-2":
            return (
              <h2
                key={idx}
                id={slugify(block.text)}
                className="font-display text-2xl md:text-3xl font-bold text-navy-deep pt-4 md:pt-6 border-l-2 border-gold/40 pl-4"
              >
                {block.text}
              </h2>
            );

          case "heading-3":
            return (
              <h3
                key={idx}
                id={slugify(block.text)}
                className="font-display text-lg md:text-xl font-bold text-navy-deep pt-2 md:pt-4"
              >
                {block.text}
              </h3>
            );

          case "image":
            return (
              <figure key={idx} className="my-6 md:my-8 overflow-hidden rounded-xl border border-gold/10 shadow-sm bg-warm-bg p-1">
                <img
                  src={block.src}
                  alt={block.alt}
                  className="w-full h-auto object-cover max-h-[480px] rounded-lg"
                />
                {block.caption && (
                  <figcaption className="mt-3 text-center text-xs text-slate-soft italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <blockquote
                key={idx}
                className="relative my-8 pl-6 md:pl-8 border-l-2 border-gold py-3 bg-warm-bg rounded-r-lg shadow-sm"
              >
                <p className="font-display text-base md:text-lg italic font-semibold text-navy-deep leading-relaxed">
                  “{block.text}”
                </p>
                {block.author && (
                  <cite className="block mt-2.5 text-[10px] font-bold uppercase tracking-wider text-gold not-italic">
                    — {block.author}
                  </cite>
                )}
              </blockquote>
            );

          case "list":
            return (
              <ul
                key={idx}
                className="list-disc pl-6 space-y-2.5 font-body text-sm md:text-[15px] text-slate-soft/95"
              >
                {block.items.map((item, i) => (
                  <li key={i} className="pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
