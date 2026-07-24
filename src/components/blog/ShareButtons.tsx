import { useState } from "react";
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getShareUrl())}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`,
  };

  return (
    <div className="rounded-xl border border-gold/15 bg-white p-6 shadow-sm">
      <h4 className="font-display text-xs font-bold text-navy-deep uppercase tracking-wider mb-4 pb-2 border-b border-gold/10">
        Share Article
      </h4>
      <div className="flex gap-2">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="grid size-9 place-items-center rounded-lg border border-slate-soft/20 text-slate-soft hover:border-gold hover:text-navy-deep hover:bg-gold/5 transition-all duration-300"
          aria-label="Share on Facebook"
        >
          <Facebook className="size-4" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="grid size-9 place-items-center rounded-lg border border-slate-soft/20 text-slate-soft hover:border-gold hover:text-navy-deep hover:bg-gold/5 transition-all duration-300"
          aria-label="Share on X"
        >
          <Twitter className="size-4" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="grid size-9 place-items-center rounded-lg border border-slate-soft/20 text-slate-soft hover:border-gold hover:text-navy-deep hover:bg-gold/5 transition-all duration-300"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="size-4" />
        </a>
        <button
          onClick={handleCopyLink}
          className="grid size-9 place-items-center rounded-lg border border-slate-soft/20 text-slate-soft hover:border-gold hover:text-navy-deep hover:bg-gold/5 transition-all duration-300 cursor-pointer"
          aria-label="Copy Page Link"
        >
          {copied ? <Check className="size-4 text-emerald-600 animate-fade-up" /> : <LinkIcon className="size-4" />}
        </button>
      </div>
    </div>
  );
}
