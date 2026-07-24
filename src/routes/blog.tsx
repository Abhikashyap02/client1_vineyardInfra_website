import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogHero } from "@/components/blog/BlogHero";
import { SearchBar } from "@/components/blog/SearchBar";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { FeaturedBlogCard } from "@/components/blog/FeaturedBlogCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { NewsletterCTA, ConsultationCTA } from "@/components/blog/BlogCTA";
import { getBlogPosts, getCategories } from "@/data/blogData";
import { Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

export const Route = createFileRoute("/blog")({
  loader: async () => {
    const posts = await getBlogPosts();
    const categories = await getCategories();
    const featured = posts.find((p) => p.isFeatured) || posts[0];
    return { posts, categories, featured };
  },
  head: () => {
    const title = "Dehradun Real Estate Investment Blog | Vineyard Journal";
    const desc = "Expert insights on Dehradun real estate market trends, property prices, RERA guidelines, and top investment hubs like Sahastradhara Road for NCR/NRI buyers.";
    
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://vineyardinfra.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://vineyardinfra.com/blog"
        }
      ]
    };

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: "https://vineyardinfra.com/blog" }
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema),
        }
      ]
    };
  },
  component: BlogListPage,
});

function BlogListPage() {
  const { posts, categories, featured } = Route.useLoaderData();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, search]);

  const latestPosts = useMemo(() => {
    // Exclude the featured post from the latest grid if active category is "All"
    // so we don't repeat the featured post.
    if (activeCategory === "All" && featured) {
      return filteredPosts.filter((post) => post.slug !== featured.slug);
    }
    return filteredPosts;
  }, [filteredPosts, activeCategory, featured]);

  return (
    <div className="min-h-screen bg-warm-bg text-navy-deep flex flex-col">
      <Header activeLabel="Journal" />

      {/* Hero Section */}
      <BlogHero />

      {/* Main Listing Section */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full space-y-16">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-gold/10">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        {/* Featured Post (only shown when not searching and category is "All") */}
        {activeCategory === "All" && !search && featured && (
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-gold tracking-widest uppercase block">
              FEATURED STORY
            </span>
            <FeaturedBlogCard post={featured} />
          </div>
        )}

        {/* Latest Articles Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl md:text-2xl font-bold">
              {search || activeCategory !== "All" ? "Search Results" : "Latest Stories"}
            </h2>
            <span className="text-xs text-slate-soft font-semibold">
              Showing {filteredPosts.length} articles
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gold/10">
              <p className="text-slate-soft text-base">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-xs font-bold text-gold uppercase tracking-wider hover:underline cursor-pointer bg-transparent border-none"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <AnimatePresence mode="popLayout">
                {latestPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <NewsletterCTA />

        {/* Contact CTA */}
        <section className="bg-white rounded-2xl border border-gold/15 p-8 md:p-12 shadow-card grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[10px] font-bold text-gold tracking-widest uppercase block mb-2">
              ACQUISITION & CONSULTING
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight">
              Looking to Buy or Build in Dehradun?
            </h3>
            <p className="mt-4 text-slate-soft text-sm md:text-base leading-relaxed">
              Our professional advisory team at Vineyard Infra handles end-to-end guidance from legal title checks and stamp duty calculations to turnkey architecture and construction visits.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3.5 text-sm">
                <div className="flex items-center justify-center size-8 rounded-full bg-gold/10 text-gold shrink-0">
                  <Phone className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-soft uppercase font-semibold">DIRECT HOTLINE</p>
                  <a href="tel:+916397688989" className="font-bold text-navy-deep hover:text-gold transition-colors">
                    +91 63976 88989
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3.5 text-sm">
                <div className="flex items-center justify-center size-8 rounded-full bg-gold/10 text-gold shrink-0">
                  <Mail className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-soft uppercase font-semibold">EMAIL ASSISTANCE</p>
                  <a href="mailto:vineyardinfra005@gmail.com" className="font-bold text-navy-deep hover:text-gold transition-colors">
                    vineyardinfra005@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <ConsultationCTA />
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
