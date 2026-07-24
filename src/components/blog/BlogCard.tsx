import { Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/data/blogData";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-card border border-gold/5 hover:shadow-elevated hover:border-gold/25 transition-all duration-500"
    >
      {/* Featured Image with hover Zoom */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Category Badge overlay */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-navy-deep text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm shadow-sm border border-gold/10">
          {post.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6 md:p-7">
        {/* Meta details */}
        <div className="flex items-center gap-4 text-xs text-slate-soft mb-3">
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
        <h3 className="font-display text-lg md:text-xl font-bold text-navy-deep leading-snug group-hover:text-gold transition-colors duration-300 mb-3">
          <Link to="/blog/$slug" params={{ slug: post.slug }}>
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-slate-soft text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {post.shortDescription}
        </p>

        {/* Read More button */}
        <div className="mt-auto">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-navy-deep group-hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            READ ARTICLE{" "}
            <ArrowRight className="size-3.5 group-hover:translate-x-1.5 transition-transform duration-300 text-gold" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
