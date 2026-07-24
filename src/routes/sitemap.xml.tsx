import { createFileRoute } from "@tanstack/react-router";
import { searchProperties } from "@/api/properties";
import { getBlogPosts } from "@/data/blogData";
import { getAvailableLocations } from "@/lib/locationUtils";

export const Route = createFileRoute("/sitemap/xml")({
  loader: async ({ request }) => {
    const origin = new URL(request.url).origin;

    // Fetch properties dynamically (with fallback for compilation/SSR runtime errors)
    let properties: any[] = [];
    try {
      properties = await searchProperties();
    } catch (error) {
      console.error("Failed to fetch properties for sitemap dynamically:", error);
    }

    // Fetch blog posts dynamically (with fallback for compilation/SSR runtime errors)
    let blogPosts: any[] = [];
    try {
      blogPosts = await getBlogPosts();
    } catch (error) {
      console.error("Failed to fetch blog posts for sitemap dynamically:", error);
    }

    const availableLocations = getAvailableLocations(properties);
    const hasSahastradhara = availableLocations.includes("Sahastradhara Road");
    const hasDehradun = properties.length > 0;

    const staticPages = [
      { path: "", changefreq: "daily", priority: "1.0" },
      { path: "/properties", changefreq: "daily", priority: "0.9" },
      { path: "/blog", changefreq: "daily", priority: "0.9" },
      { path: "/about", changefreq: "monthly", priority: "0.8" },
      { path: "/contact", changefreq: "monthly", priority: "0.8" },
      { path: "/privacy-policy", changefreq: "monthly", priority: "0.3" },
      { path: "/terms-and-conditions", changefreq: "monthly", priority: "0.3" },
    ];

    if (hasSahastradhara) {
      staticPages.push({ path: "/sahastradhara-road", changefreq: "daily", priority: "0.8" });
    }
    if (hasDehradun) {
      staticPages.push({ path: "/dehradun", changefreq: "daily", priority: "0.8" });
    }

    const xmlItems: string[] = [];

    // Add static pages
    for (const page of staticPages) {
      xmlItems.push(`  <url>
    <loc>${origin}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
    }

    // Add dynamic property detail pages
    for (const prop of properties) {
      if (prop.slug) {
        xmlItems.push(`  <url>
    <loc>${origin}/projects/${prop.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
      }
    }

    // Add dynamic blog post pages
    for (const post of blogPosts) {
      if (post.slug) {
        xmlItems.push(`  <url>
    <loc>${origin}/blog/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
      }
    }

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems.join("\n")}
</urlset>`;

    return new Response(sitemapXml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=18000",
      },
    });
  },
  component: () => null, // This is never rendered as the loader returns a raw XML Response
});
