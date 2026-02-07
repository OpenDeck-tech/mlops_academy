"use client";

import { Button } from "@/components/ui/button";
import { usePodcastPlayer } from "@/contexts/podcast-player-context";
import { Headphones } from "lucide-react";

type Props = {
  embedUrl: string;
  title: string;
  className?: string;
};

export function ListenWhileBrowsingButton({ embedUrl, title, className }: Props) {
  const { setPlayer } = usePodcastPlayer();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      onClick={() => setPlayer(embedUrl, title)}
    >
      <Headphones className="h-4 w-4 mr-2" />
      Listen while browsing
    </Button>
  );
}
