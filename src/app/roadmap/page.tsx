import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Map, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export default function RoadmapPage() {
  return (
    <AppShell title="Roadmap">
        <Link href="/blank" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Environments
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Map className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-semibold">MLOps Roadmap</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            A comprehensive guide to becoming an MLOps engineer
          </p>
        </div>

        <Card className="transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle>MLOps Learning Path</CardTitle>
            <CardDescription>
              Interactive roadmap showing the skills and technologies you need to master MLOps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 space-y-4">
              {/* Try object tag as alternative embedding method */}
              <div className="relative w-full" style={{ minHeight: '800px' }}>
                <object
                  data="https://roadmap.sh/mlops"
                  type="text/html"
                  width="100%"
                  height="800"
                  className="rounded-lg border-0"
                  style={{ borderRadius: '12px' }}
                  aria-label="MLOps Roadmap"
                >
                  {/* Fallback content if object tag doesn't work */}
                  <div className="flex flex-col items-center justify-center h-full min-h-[600px] bg-muted rounded-lg p-8 text-center space-y-4">
                    <Map className="h-16 w-16 text-muted-foreground" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">MLOps Roadmap</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Explore the comprehensive MLOps learning path with interactive guides, 
                        skill checklists, and recommended resources to become a proficient MLOps engineer.
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="gap-2"
                      >
                        <a
                          href="https://roadmap.sh/mlops"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          View Interactive Roadmap
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>The roadmap includes:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Foundation skills (Python, Git, Linux)</li>
                        <li>ML fundamentals and frameworks</li>
                        <li>MLOps tools and platforms</li>
                        <li>Deployment and monitoring strategies</li>
                        <li>Best practices and real-world scenarios</li>
                      </ul>
                    </div>
                  </div>
                </object>
              </div>
              
              {/* Always show the direct link button */}
              <div className="pt-4 border-t flex items-center justify-center">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <a
                    href="https://roadmap.sh/mlops"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Open Full Roadmap in New Tab
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
    </AppShell>
  );
}

