"use client";

import { useGuide } from "@/contexts/guide-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/contexts/language-context";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function GuideTour() {
  const { isTourActive, currentStep, steps, endTour, nextStep, prevStep } = useGuide();
  const { t } = useTranslation();
  if (!isTourActive) return null;

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const title = t(step.title);
  const rawDesc = t(step.description);
  const description = rawDesc.replace(/\*\*(.*?)\*\*/g, "$1");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      aria-describedby="guide-desc"
    >
      <Card className="w-full max-w-lg shadow-2xl border-2">
        <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
          <div className="space-y-1.5">
            <CardTitle id="guide-title" className="text-xl">
              {title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {currentStep + 1} / {steps.length}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-full"
            onClick={() => endTour(true)}
            aria-label={t("Skip tour")}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <p id="guide-desc" className="text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              {!isFirst && (
                <Button variant="outline" onClick={prevStep} className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  {t("Back")}
                </Button>
              )}
              <Button variant="ghost" onClick={() => endTour(true)} className="text-muted-foreground">
                {t("Skip tour")}
              </Button>
            </div>
            <Button onClick={nextStep} className="gap-1 bg-[#ADFF2F] hover:bg-[#9AFF1F] text-black font-semibold">
              {isLast ? t("Finish") : t("Next")}
              {!isLast && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
