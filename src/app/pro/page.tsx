import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function ProPage() {
  const sess = await getSession();
  if (!sess.isPro) {
    redirect("/");
  }

  return (
    <div className="container mx-auto max-w-5xl px-6 py-16">
      <div className="absolute top-4 right-4">
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
      </Tabs>
    </div>
  );
}


