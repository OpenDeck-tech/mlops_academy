import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Headphones } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ListenWhileBrowsingButton } from "@/components/listen-while-browsing-button";

export default function PodcastsPage() {
  // Podcast data - you can add more podcasts here
  const podcasts = [
    {
      id: 1,
      title: "MLOps London On Air",
      description: "A podcast spin-off from the MLOps London quarterly meetups, diving into the evolving strategy and market landscape of ML and AI. Each episode explores how emerging technologies and industry shifts are shaping real-world applications across sectors.",
      url: "https://open.spotify.com/show/7tdDbryfI1kzRloVvCyuqR?si=6337ddc640714759",
      episode: "Latest: The Invisible Work Behind Responsible AI with Raluca Crisan",
    },
    {
      id: 2,
      title: "MLOps.community",
      description: "Relaxed Conversations around getting AI into production, whatever shape that may come in (agentic, traditional ML, LLMs, Vibes, etc)",
      url: "https://open.spotify.com/show/7wZygk3mUUqBaRbBGB1lgh?si=c8c932c14c4c4ae1",
      episode: "Latest: The Future of AI Operations: Insights from PwC AI Managed Services",
    },
    {
      id: 3,
      title: "MLOps Weekly Podcast",
      description: "Join each week as we talk to MLOps operators, practitioners, and professionals about the current state of MLOps",
      url: "https://open.spotify.com/show/0RZiV4zf2GKu1rp1rtNPRZ?si=a100b86c93684e77",
      episode: "Latest: MLOps and Feature Stores in 2025 with Ben Epstein",
    },
    // Add more podcasts here as needed
  ];

  const embedUrls: Record<number, string> = {
    1: "https://open.spotify.com/embed/show/7tdDbryfI1kzRloVvCyuqR?utm_source=generator",
    2: "https://open.spotify.com/embed/show/7wZygk3mUUqBaRbBGB1lgh?utm_source=generator",
    3: "https://open.spotify.com/embed/show/0RZiV4zf2GKu1rp1rtNPRZ?utm_source=generator",
  };

  return (
    <AppShell title="Podcasts">
      <Link href="/blank" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-[#f5f5dc]">
            <Headphones className="h-6 w-6 text-gray-900" />
          </div>
          <h1 className="text-4xl font-semibold">MLOps Podcasts</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Curated collection of podcasts about machine learning operations, best practices, and industry insights
        </p>
      </div>

      {podcasts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No podcasts added yet. Check back soon!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Embedded Podcast Players */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* MLOps London On Air with embedded player */}
            {podcasts.find(p => p.id === 1) && (
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl mb-2">MLOps London On Air</CardTitle>
                  <CardDescription>
                    A podcast spin-off from the MLOps London quarterly meetups, diving into the evolving strategy and market landscape of ML and AI
                  </CardDescription>
                  <ListenWhileBrowsingButton embedUrl={embedUrls[1]} title="MLOps London On Air" className="mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="mt-4">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: '12px' }}
                      src="https://open.spotify.com/embed/show/7tdDbryfI1kzRloVvCyuqR?utm_source=generator"
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* MLOps.community with embedded player */}
            {podcasts.find(p => p.id === 2) && (
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl mb-2">MLOps.community</CardTitle>
                  <CardDescription>
                    Relaxed Conversations around getting AI into production, whatever shape that may come in (agentic, traditional ML, LLMs, Vibes, etc)
                  </CardDescription>
                  <ListenWhileBrowsingButton embedUrl={embedUrls[2]} title="MLOps.community" className="mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="mt-4">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: '12px' }}
                      src="https://open.spotify.com/embed/show/7wZygk3mUUqBaRbBGB1lgh/video?utm_source=generator"
                      width="100%"
                      height="351"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* MLOps Weekly Podcast with embedded player */}
            {podcasts.find(p => p.id === 3) && (
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl mb-2">MLOps Weekly Podcast</CardTitle>
                  <CardDescription>
                    Join each week as we talk to MLOps operators, practitioners, and professionals about the current state of MLOps
                  </CardDescription>
                  <ListenWhileBrowsingButton embedUrl={embedUrls[3]} title="MLOps Weekly Podcast" className="mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="mt-4">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: '12px' }}
                      src="https://open.spotify.com/embed/show/0RZiV4zf2GKu1rp1rtNPRZ?utm_source=generator"
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}

