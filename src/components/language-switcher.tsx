"use client";

import { useLanguage } from "@/contexts/language-context";
import type { Locale } from "@/lib/i18n";
import { localeLabels } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const locales: Locale[] = ["en", "zh"];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={cn("flex items-center gap-1 rounded-lg border border-border/60 bg-muted/30 p-0.5", className)}>
      {locales.map((l) => (
        <Button
          key={l}
          variant={locale === l ? "secondary" : "ghost"}
          size="sm"
          className="h-8 min-w-[2.25rem] px-2 text-xs font-medium"
          onClick={() => setLocale(l)}
          aria-label={`Switch to ${localeLabels[l]}`}
        >
          {l === "en" ? "EN" : "中文"}
        </Button>
      ))}
    </div>
  );
}
