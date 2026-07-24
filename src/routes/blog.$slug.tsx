import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  User,
  Plus,
  Minus,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { ConsultationCTA } from "@/components/blog/BlogCTA";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { getBlogPostBySlug, getRelatedBlogPosts, getBlogPosts } from "@/data/blogData";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug(params.slug);
    if (!post) {
      throw notFound();
    }

    const posts = await getBlogPosts();
    const currentIndex = posts.findIndex((p) => p.slug === params.slug);
    const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : undefined;
    const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined;

    const relatedPosts = await getRelatedBlogPosts(params.slug, post.category, 3);

    return { post, relatedPosts, prevPost, nextPost };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} | Vineyard Journal` : "Blog Details | Vineyard Journal";
    const desc = post?.shortDescription || "Read our latest real estate article by Vineyard Infra.";
    const canonicalUrl = post ? `https://vineyardinfra.com/blog/${post.slug}` : "https://vineyardinfra.com/blog";

    let datePublished = new Date().toISOString();
    try {
      if (post?.publishDate) {
        const parsedDate = new Date(post.publishDate);
        if (!isNaN(parsedDate.getTime())) {
          datePublished = parsedDate.toISOString();
        }
      }
    } catch (e) {}

    const blogSchema = post ? {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.shortDescription,
      "image": post.featuredImage,
      "datePublished": datePublished,
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "jobTitle": post.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "Vineyard Infra",
        "logo": {
          "@type": "ImageObject",
          "url": "https://vineyardinfra.com/logo-horizontal.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    } : null;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(post?.featuredImage ? [{ property: "og:image", content: post.featuredImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl }
      ],
      scripts: blogSchema ? [
        {
          type: "application/ld+json",
          children: JSON.stringify(blogSchema),
        }
      ] : []
    };
  },
  component: BlogDetailsPage,
});

function BlogDetailsPage() {
  const { post, relatedPosts, prevPost, nextPost } = Route.useLoaderData();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-warm-bg text-navy-deep flex flex-col">
      <Header activeLabel="Journal" />

      {/* Top Breadcrumb & Back navigation */}
      <div className="pt-28 md:pt-36 pb-6 max-w-7xl mx-auto px-6 w-full">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-soft hover:text-gold transition-colors duration-300 cursor-pointer"
        >
          <ArrowLeft className="size-3.5 text-gold" /> BACK TO JOURNAL
        </Link>
      </div>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 w-full mb-12">
        <div className="max-w-4xl">
          {/* Category Badge */}
          <span className="inline-block bg-white text-gold text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm shadow-sm border border-gold/10 mb-4">
            {post.category}
          </span>
          {/* Large Title */}
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-navy-deep">
            {post.title}
          </h1>

          {/* Author & Meta details */}
          <div className="flex flex-wrap items-center gap-6 mt-6 pb-8 border-b border-gold/10">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="size-11 rounded-full object-cover border border-gold/20 shadow-sm"
              />
              <div>
                <p className="text-xs font-bold text-navy-deep">{post.author.name}</p>
                <p className="text-[9px] text-slate-soft uppercase tracking-wider">
                  {post.author.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-soft border-l border-gold/10 pl-6 h-8">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-gold shrink-0" />
                {post.publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-gold shrink-0" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Large Featured Image */}
      <section className="max-w-7xl mx-auto px-6 w-full mb-12">
        <div className="rounded-2xl overflow-hidden aspect-[21/9] max-h-[500px] shadow-card border border-gold/10">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Main Grid: Body & Sticky Sidebar */}
      <main className="flex-grow max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-8 lg:gap-12 pb-16">
        {/* Left Column - Article Content */}
        <article className="lg:col-span-8 space-y-12">
          {/* Table of Contents - Mobile/Tablet Only */}
          <div className="lg:hidden">
            <TableOfContents content={post.content} />
          </div>

          {/* Rich Content Renderer */}
          <ArticleLayout content={post.content} />

          {/* FAQ Section */}
          {post.faq && post.faq.length > 0 && (
            <section className="bg-white rounded-xl border border-gold/10 p-6 md:p-8 mt-12 shadow-sm">
              <h3 className="font-display text-xl md:text-2xl font-bold mb-6 text-navy-deep border-b border-gold/10 pb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {post.faq.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border-b border-slate-soft/10 pb-4 last:border-0 last:pb-0"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between text-left font-display text-sm md:text-base font-bold text-navy-deep hover:text-gold transition-colors duration-300 py-2 cursor-pointer"
                      >
                        <span>{item.question}</span>
                        <span className="text-gold shrink-0 ml-4">
                          {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                        </span>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-xs md:text-sm leading-relaxed text-slate-soft">
                          {item.answer}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Previous / Next Navigation */}
          {(prevPost || nextPost) && (
            <nav className="grid sm:grid-cols-2 gap-4 border-t border-b border-gold/15 py-8 mt-12">
              {prevPost ? (
                <Link
                  to="/blog/$slug"
                  params={{ slug: prevPost.slug }}
                  className="group p-5 bg-white rounded-xl border border-gold/10 hover:border-gold/30 hover:shadow-card transition-all duration-300 text-left flex flex-col cursor-pointer"
                >
                  <span className="text-[10px] font-bold text-gold tracking-widest uppercase flex items-center gap-1 mb-2">
                    <ChevronLeft className="size-3.5 group-hover:-translate-x-1 transition-transform" /> PREVIOUS POST
                  </span>
                  <span className="font-display text-xs md:text-sm font-bold text-navy-deep group-hover:text-gold transition-colors line-clamp-2">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {nextPost ? (
                <Link
                  to="/blog/$slug"
                  params={{ slug: nextPost.slug }}
                  className="group p-5 bg-white rounded-xl border border-gold/10 hover:border-gold/30 hover:shadow-card transition-all duration-300 text-right flex flex-col items-end cursor-pointer"
                >
                  <span className="text-[10px] font-bold text-gold tracking-widest uppercase flex items-center gap-1 mb-2">
                    NEXT POST <ChevronRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="font-display text-xs md:text-sm font-bold text-navy-deep group-hover:text-gold transition-colors line-clamp-2">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
            </nav>
          )}
        </article>

        {/* Right Column - Desktop Sticky Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Table of Contents */}
            <div className="hidden lg:block">
              <TableOfContents content={post.content} />
            </div>

            {/* Share Buttons */}
            <ShareButtons title={post.title} />

            {/* Consultation Widget */}
            <ConsultationCTA />
          </div>
        </aside>
      </main>

      {/* Related Posts */}
      <div className="max-w-7xl mx-auto px-6 w-full pb-16">
        <RelatedPosts posts={relatedPosts} />
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
