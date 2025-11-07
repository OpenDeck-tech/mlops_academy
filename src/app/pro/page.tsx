import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default async function ProPage() {
  const sess = await getSession();
  if (!sess.isPro) {
    redirect("/");
  }

  return (
    <div className="container mx-auto max-w-5xl px-6 py-16">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          Dashboard
        </Link>
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-semibold tracking-tight">MLOps Academy Pro</h1>
      <p className="text-muted-foreground mt-2">Deep, practical curriculum. Continuously updated.</p>
      <Separator className="my-8" />

      <Tabs defaultValue="foundations">
        <TabsList>
          <TabsTrigger value="foundations">Foundations</TabsTrigger>
          <TabsTrigger value="systems">Systems</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="coding">Coding Exercises</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>
        <TabsContent value="foundations">
          <Card>
            <CardHeader>
              <CardTitle>Foundations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc pl-6">
                <li>Data versioning and lineage</li>
                <li>Feature engineering at scale</li>
                <li>Reproducibility and experiment tracking</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="systems">
          <Card>
            <CardHeader>
              <CardTitle>Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc pl-6">
                <li>Batch and streaming pipelines</li>
                <li>Model training orchestration</li>
                <li>CI/CD for ML systems</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="platform">
          <Card>
            <CardHeader>
              <CardTitle>Platform</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc pl-6">
                <li>Feature store design</li>
                <li>Model registry and governance</li>
                <li>Serving: online and batch</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="operations">
          <Card>
            <CardHeader>
              <CardTitle>Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc pl-6">
                <li>Monitoring, drift, and alerting</li>
                <li>Safety, privacy, and compliance</li>
                <li>Cost controls and SLOs</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="coding">
          <Card>
            <CardHeader>
              <CardTitle>Coding Exercises</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                LeetCode-style problems with MLOps context. Master the programming skills that matter in production ML systems.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Problem Types:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data pipeline optimization</li>
                    <li>• Model versioning systems</li>
                    <li>• Feature store caching</li>
                    <li>• Anomaly detection algorithms</li>
                    <li>• Distributed training coordination</li>
                    <li>• Load balancing for model serving</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Skills Covered:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Concurrent programming</li>
                    <li>• System design patterns</li>
                    <li>• Memory management</li>
                    <li>• Error handling & resilience</li>
                    <li>• Performance optimization</li>
                    <li>• Production considerations</li>
                  </ul>
                </div>
              </div>
              <div className="pt-4">
                <a href="/pro/coding" className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Start Coding Exercises →
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="communication">
          <Card>
            <CardHeader>
              <CardTitle>Stakeholder Communication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Master the art of communicating MLOps concepts to stakeholders, executives, and technical teams. Learn frameworks, templates, and strategies for effective presentations.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Key Topics:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Executive briefings & ROI frameworks</li>
                    <li>• Technical deep-dives for engineers</li>
                    <li>• Product manager alignment</li>
                    <li>• Conference presentation strategies</li>
                    <li>• Stakeholder-specific messaging</li>
                    <li>• Common pitfalls & how to avoid them</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">You&apos;ll Learn:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• How to translate technical concepts</li>
                    <li>• Building compelling narratives</li>
                    <li>• Meeting preparation frameworks</li>
                    <li>• Visual storytelling techniques</li>
                    <li>• Handling difficult questions</li>
                    <li>• Real-world templates & examples</li>
                  </ul>
                </div>
              </div>
              <div className="pt-4">
                <Button asChild>
                  <Link href="/pro/communication">
                    View Communication Guide →
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Get Personalized Help</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Book a 1:1 call with an MLOps expert. Get architecture reviews, career guidance, and technical deep dives.
            </p>
            <Button asChild>
              <Link href="/pro/book-call">
                Book a 1:1 Call
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


