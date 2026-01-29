"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { defaultLocale, translate } from "@/lib/i18n";

const LOCALE_COOKIE = "NEXT_LOCALE";
const LOCALE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  return value === "zh" ? "zh" : "en";
}

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${LOCALE_MAX_AGE};SameSite=Lax`;
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getLocaleFromCookie());
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setLocaleCookie(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    }
  }, [mounted, locale]);

  const t = useCallback(
    (key: string) => translate(locale, key),
    [locale]
  );

  const value: LanguageContextValue = mounted
    ? { locale, setLocale, t }
    : { locale: defaultLocale, setLocale: () => {}, t: (k: string) => k };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      locale: defaultLocale as Locale,
      setLocale: () => {},
      t: (key: string) => key,
    };
  }
  return ctx;
}

export function useTranslation() {
  const { t, locale } = useLanguage();
  return { t, locale };
}
