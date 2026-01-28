import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";

export default async function BlogPage() {
  let isSignedIn = false;
  try {
    const sess = await getSession();
    isSignedIn = Boolean(sess.userId || sess.email);
  } catch {
    // If session isn't configured (e.g. missing IRON_SESSION_PASSWORD), keep blog public.
    isSignedIn = false;
  }

  const blogPosts = [
    {
      id: 1,
      title: "MLOps Principles",
      description: "As machine learning and AI propagate in software products and services, we need to establish best practices and tools to test, deploy, manage, and monitor ML models in real-world production. Learn about iterative-incremental development, automation, continuous deployment, versioning, testing, reproducibility, and monitoring.",
      url: "https://ml-ops.org/content/mlops-principles",
      author: "MLOps.org",
      category: "Principles & Best Practices",
    },
    {
      id: 2,
      title: "A Day in the Life of an MLOps Engineer",
      description:
        "A practical overview of an MLOps engineer’s responsibilities, common challenges, and what the end-to-end lifecycle looks like in real organizations.",
      url: "https://www.algomox.com/resources/blog/day-in-life-of-mlops-engineer/",
      author: "Algomox",
      category: "Careers",
    },
    // Add more blog posts here as needed
  ];

  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-[#f5f5dc]">
            <BookOpen className="h-6 w-6 text-gray-900" />
          </div>
          <h1 className="text-4xl font-semibold">MLOps Blog</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Curated articles and resources about machine learning operations, best practices, and industry insights
        </p>
      </div>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="text-xl">
            {isSignedIn ? "You’re browsing as a signed-in user" : "Want to save your progress?"}
          </CardTitle>
          <CardDescription>
            {isSignedIn
              ? "Head to your dashboard for subscription and account settings."
              : "Create an account (or sign in) to access personalized features and Pro content."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {isSignedIn ? (
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild className="bg-[#ADFF2F] hover:bg-[#9AFF1F] text-black font-semibold">
                <Link href="/signup">Create account</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Sign in</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {blogPosts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No blog posts added yet. Check back soon!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.category}</span>
                </div>
                <CardDescription className="mt-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-4">
                  <iframe
                    data-testid="embed-iframe"
                    style={{ borderRadius: '12px', minHeight: '600px' }}
                    src={post.url}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="border-0"
                  />
                </div>
                <div className="mt-4 pt-4 border-t flex items-center justify-center">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      Open in New Tab
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

