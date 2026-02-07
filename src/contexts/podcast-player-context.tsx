"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

type PodcastPlayerState = {
  embedUrl: string | null;
  title: string | null;
};

type PodcastPlayerContextValue = {
  embedUrl: string | null;
  title: string | null;
  setPlayer: (embedUrl: string, title: string) => void;
  clearPlayer: () => void;
  isPlaying: boolean;
};

const PodcastPlayerContext = createContext<PodcastPlayerContextValue | null>(null);

export function PodcastPlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PodcastPlayerState>({ embedUrl: null, title: null });

  const setPlayer = useCallback((embedUrl: string, title: string) => {
    setState({ embedUrl, title });
  }, []);

  const clearPlayer = useCallback(() => {
    setState({ embedUrl: null, title: null });
  }, []);

  const value: PodcastPlayerContextValue = {
    embedUrl: state.embedUrl,
    title: state.title,
    setPlayer,
    clearPlayer,
    isPlaying: Boolean(state.embedUrl),
  };

  return (
    <PodcastPlayerContext.Provider value={value}>
      <div className={state.embedUrl ? "pb-44" : ""}>
        {children}
      </div>
      <PersistentPodcastBar />
    </PodcastPlayerContext.Provider>
  );
}

function PersistentPodcastBar() {
  const { embedUrl, title, clearPlayer, isPlaying } = usePodcastPlayer();

  if (!isPlaying || !embedUrl) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 dark:bg-background/90 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
      role="region"
      aria-label="Podcast player"
    >
      <div className="container mx-auto max-w-7xl px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex items-center justify-between gap-3 min-w-0 flex-1">
          <p className="text-sm font-medium truncate text-foreground" title={title ?? undefined}>
            {title ?? "Podcast"}
          </p>
          <ButtonStop onStop={clearPlayer} />
        </div>
        <div className="w-full sm:max-w-md h-[152px] sm:h-[80px] flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={title ?? "Podcast player"}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

function ButtonStop({ onStop }: { onStop: () => void }) {
  return (
    <button
      type="button"
      onClick={onStop}
      className="flex-shrink-0 rounded-md px-3 py-1.5 text-sm font-medium bg-destructive/15 text-destructive hover:bg-destructive/25 transition-colors"
      aria-label="Stop podcast and close player"
    >
      Stop & close
    </button>
  );
}

export function usePodcastPlayer() {
  const ctx = useContext(PodcastPlayerContext);
  if (!ctx) {
    throw new Error("usePodcastPlayer must be used within PodcastPlayerProvider");
  }
  return ctx;
}
