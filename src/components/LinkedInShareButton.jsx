import React from "react";
import { Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LinkedInShareButton({ label = "Share to LinkedIn", url, title, className = "" }) {
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url || (typeof window !== "undefined" ? window.location.origin + "/portfolio" : "")
  )}`;
  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={title || label}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-white text-xs font-medium hover:opacity-90 transition-opacity",
        className
      )}
      style={{ backgroundColor: "#0A66C2" }}
    >
      <Linkedin className="w-3.5 h-3.5" /> {label}
    </a>
  );
}