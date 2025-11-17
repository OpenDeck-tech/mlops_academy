import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Headphones, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {podcasts.map((podcast) => (
            <Card key={podcast.id} className="h-full transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl mb-2">{podcast.title}</CardTitle>
                <CardDescription>{podcast.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Featured Episode:</p>
                  <p className="text-sm text-muted-foreground">{podcast.episode}</p>
                </div>
                <Button asChild className="w-full" variant="outline">
                  <a href={podcast.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Listen Now
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

