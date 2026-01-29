import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Rocket, Wrench, Gauge } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export default function StagingEnvironmentPage() {
  const topics = [
    {
      id: "continuous-deployment",
      title: "Continuous Deployment",
      description: "Automate deployments to staging and manage release pipelines",
      icon: Rocket,
      content: "Learn CD pipelines, automated deployment strategies, blue-green deployments, canary releases, and rollback procedures for staging environments.",
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description: "Debug and resolve issues before they reach production",
      icon: Wrench,
      content: "Master troubleshooting techniques specific to staging, environment-specific debugging, integration testing, and pre-production issue resolution.",
    },
    {
      id: "load-testing",
      title: "Load Testing",
      description: "Test system performance and capacity under realistic load conditions",
      icon: Gauge,
      content: "Understand load testing strategies, performance benchmarks, stress testing, capacity planning, and identifying bottlenecks before production.",
    },
  ];

  return (
    <AppShell title="Staging">
      <Link href="/blank" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors px-2 py-1 -ml-2 rounded hover:bg-accent/50">
        <ArrowLeft className="h-4 w-4" />
        Back to Environments
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-semibold mb-2">Staging Environment</h1>
        <p className="text-muted-foreground text-lg">
          Testing and validation strategies before production deployment
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Card key={topic.id} className="h-full transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                    <Icon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                </div>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{topic.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}

