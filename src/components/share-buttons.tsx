"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/language-context";

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
  const { t } = useTranslation();
  const titleDisplay = title ? t(title) : "";

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

  const redirectConfirmKeyX = "You're about to be redirected to X (Twitter). Continue?";
  const redirectConfirmKeyLinkedIn = "You're about to be redirected to LinkedIn. Continue?";

  const handleExternalShare = useCallback(
    (href: string, confirmKey: string) => {
      if (window.confirm(t(confirmKey))) {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    },
    [t]
  );

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 flex-wrap ${className}`}>
        {titleDisplay && (
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Share2 className="h-4 w-4" />
            {titleDisplay}
          </span>
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-1.5"
            title={t("Copy link")}
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            {copied ? t("Copied!") : t("Copy link")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            title={t("Share on X")}
            onClick={() => handleExternalShare(twitterHref, redirectConfirmKeyX)}
          >
            X
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            title={t("Share on LinkedIn")}
            onClick={() => handleExternalShare(linkedInHref, redirectConfirmKeyLinkedIn)}
          >
            in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {titleDisplay && (
        <p className="text-sm font-medium text-foreground flex items-center gap-2">
          <Share2 className="h-4 w-4 text-muted-foreground" />
          {titleDisplay}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
          title={t("Copy link")}
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          {copied ? t("Copied!") : t("Copy link")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => handleExternalShare(twitterHref, redirectConfirmKeyX)}
        >
          {t("Share on X")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => handleExternalShare(linkedInHref, redirectConfirmKeyLinkedIn)}
        >
          {t("Share on LinkedIn")}
        </Button>
      </div>
    </div>
  );
}
