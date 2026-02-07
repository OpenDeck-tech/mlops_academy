"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import { GuideProvider } from "@/contexts/guide-context";
import { GuideTour } from "@/components/guide-tour";
import { PodcastPlayerProvider } from "@/contexts/podcast-player-context";
import { StreakRecorder } from "@/components/streak-recorder";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={["light", "dark", "blue"]}
    >
      <LanguageProvider>
        <GuideProvider>
          <PodcastPlayerProvider>
            <StreakRecorder />
            {children}
            <GuideTour />
          </PodcastPlayerProvider>
        </GuideProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
