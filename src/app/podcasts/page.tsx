import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Headphones, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PodcastsPage() {
  // Podcast data - you can add more podcasts here
  const podcasts = [
    {
      id: 1,
      title: "MLOps Podcast",
      description: "Discussions about machine learning operations, best practices, and industry insights",
      url: "https://example.com/mlops-podcast",
      episode: "Episode 1: Getting Started with MLOps",
    },
    {
      id: 2,
      title: "The MLOps Community Podcast",
      description: "Conversations with MLOps practitioners and thought leaders",
      url: "https://example.com/mlops-community",
      episode: "Episode 5: Production ML Systems",
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

