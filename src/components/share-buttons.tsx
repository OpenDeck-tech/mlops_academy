"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const TWITTER_HANDLE = "MLOps_engineer";
const DEFAULT_SHARE_TEXT =
  "From laptop to production — one pipeline. Learning MLOps with @MLOps_engineer 🚀";

type ShareButtonsProps = {
  /** Optional title above the buttons */
  title?: string;
  /** Optional share message for Twitter (url is always appended) */
  shareText?: string;
  /** Optional URL to share (defaults to current page on client) */
  url?: string;
  /** Compact layout (icons only or single row) */
  variant?: "default" | "compact";
  className?: string;
};

export function ShareButtons({
  title = "Share",
  shareText = DEFAULT_SHARE_TEXT,
  url: urlProp,
  variant = "default",
  className = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = useCallback(() => {
    if (urlProp) return urlProp;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }, [urlProp]);

  const handleCopy = useCallback(async () => {
    const u = getUrl();
    if (!u) return;
    try {
      await navigator.clipboard.writeText(u);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: leave copied false
    }
  }, [getUrl]);

  const shareUrl = getUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&via=${TWITTER_HANDLE}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 flex-wrap ${className}`}>
        {title && (
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Share2 className="h-4 w-4" />
            {title}
          </span>
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-1.5"
            title="Copy link"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy link"}
          </Button>
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <a href={twitterHref} target="_blank" rel="noopener noreferrer" title="Share on X (Twitter)">
              X
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <a href={linkedInHref} target="_blank" rel="noopener noreferrer" title="Share on LinkedIn">
              in
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {title && (
        <p className="text-sm font-medium text-foreground flex items-center gap-2">
          <Share2 className="h-4 w-4 text-muted-foreground" />
          {title}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
          title="Copy link"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy link"}
        </Button>
        <Button variant="outline" size="sm" asChild className="gap-2">
          <a href={twitterHref} target="_blank" rel="noopener noreferrer">
            Share on X
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild className="gap-2">
          <a href={linkedInHref} target="_blank" rel="noopener noreferrer">
            Share on LinkedIn
          </a>
        </Button>
      </div>
    </div>
  );
}
