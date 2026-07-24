import { Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/data/blogData";
import { motion } from "framer-motion";

interface FeaturedBlogCardProps {
  post: BlogPost;
}

export function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-elevated border border-gold/10 hover:border-gold/30 transition-all duration-500"
    >
      <div className="grid md:grid-cols-12 gap-0">
        {/* Featured Image */}
        <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto md:min-h-[420px] overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
          {/* Category Badge overlay */}
          <span className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm text-navy-deep text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-sm shadow-md border border-gold/15">
            FEATURED ARTICLE • {post.category}
          </span>
        </div>

        {/* Card Body */}
        <div className="md:col-span-5 flex flex-col justify-center p-8 md:p-10 lg:p-12">
          {/* Meta details */}
          <div className="flex items-center gap-4 text-xs text-slate-soft mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-gold shrink-0" />
              {post.publishDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-gold shrink-0" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-navy-deep leading-tight group-hover:text-gold transition-colors duration-300 mb-4">
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
              {post.title}
            </Link>
          </h2>

          {/* Description */}
          <p className="text-slate-soft text-sm md:text-base leading-relaxed mb-6">
            {post.shortDescription}
          </p>

          {/* Author info */}
          <div className="flex items-center gap-3.5 mb-8 border-t border-slate-soft/10 pt-6">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="size-10 rounded-full object-cover border border-gold/20"
            />
            <div>
              <p className="text-xs font-bold text-navy-deep">{post.author.name}</p>
              <p className="text-[10px] text-slate-soft uppercase tracking-wider">
                {post.author.role}
              </p>
            </div>
          </div>

          {/* Read More button */}
          <div>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="inline-flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase text-navy-deep group-hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              READ FULL ARTICLE{" "}
              <ArrowRight className="size-4 group-hover:translate-x-1.5 transition-transform duration-300 text-gold" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
