import { BlogPost } from "@/data/blogData";
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-gold/15 pt-16 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-[10px] font-bold text-gold tracking-widest uppercase block mb-2">
            RECOMMENDED FOR YOU
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-navy-deep">
            Related Articles
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
