"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "mlops_academy_guide_completed";

export type GuideStep = {
  id: string;
  /** Translation key or raw title */
  title: string;
  /** Translation key or raw description */
  description: string;
};

export const guideSteps: GuideStep[] = [
  {
    id: "welcome",
    title: "Welcome to MLOps Academy",
    description:
      "This short guide walks through each section of the sidebar so you know where to start. You can skip anytime or run this again later from the sidebar.",
  },
  {
    id: "pipeline",
    title: "Pipeline",
    description:
      "Start here. **Environments** takes you through the full path: Local → Development → Staging → Production. Use it as your map for learning and doing MLOps.",
  },
  {
    id: "learn",
    title: "Learn",
    description:
      "Principles, Learning Paths, Playbooks, Readiness checklists, Blog, MLOps Roadmap, and Abbreviations. Build foundations and then go deeper with structured learning.",
  },
  {
    id: "community",
    title: "Community & Jobs",
    description:
      "Podcasts, Tweets, Practitioners on LinkedIn, Recruiters, MLOps Community, and Reddit. Connect with others and find roles.",
  },
  {
    id: "reference",
    title: "Reference",
    description:
      "**Roles** — curated MLOps jobs by location. **MCP** — Model Context Protocol in the Development environment. You're all set; use the sidebar to explore.",
  },
];

type GuideContextValue = {
  isTourActive: boolean;
  currentStep: number;
  steps: GuideStep[];
  startTour: () => void;
  endTour: (skipped?: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  hasCompletedGuide: boolean;
};

const GuideContext = createContext<GuideContextValue | null>(null);

export function GuideProvider({ children }: { children: React.ReactNode }) {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompletedGuide, setHasCompletedGuide] = useState(false);

  useEffect(() => {
    try {
      setHasCompletedGuide(localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      setHasCompletedGuide(false);
    }
  }, []);

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setIsTourActive(true);
  }, []);

  const endTour = useCallback((skipped = false) => {
    setIsTourActive(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
      setHasCompletedGuide(true);
    } catch {
      // ignore
    }
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= guideSteps.length - 1) {
        endTour(false);
        return prev;
      }
      return prev + 1;
    });
  }, [endTour]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  // Auto-show tour for new users (no completed flag in localStorage) once they're in the app
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "true") {
        // Small delay so the page paints first
        const t = setTimeout(() => startTour(), 600);
        return () => clearTimeout(t);
      }
    } catch {
      // ignore
    }
  }, [startTour]);

  const value: GuideContextValue = {
    isTourActive,
    currentStep,
    steps: guideSteps,
    startTour,
    endTour,
    nextStep,
    prevStep,
    hasCompletedGuide,
  };

  return <GuideContext.Provider value={value}>{children}</GuideContext.Provider>;
}

export function useGuide() {
  const ctx = useContext(GuideContext);
  if (!ctx) {
    throw new Error("useGuide must be used within GuideProvider");
  }
  return ctx;
}
