import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Activity, Shield, DollarSign, Bell, Wrench } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export default function ProductionEnvironmentPage() {
  const topics = [
    {
      id: "monitoring-drift",
      title: "Monitoring and Drift",
      description: "Track model performance, detect data drift, and monitor system health in production",
      icon: Activity,
      content: "Learn how to set up comprehensive monitoring systems, detect model drift, data drift, and concept drift. Understand metrics, dashboards, and alerting strategies.",
    },
    {
      id: "governance-risk",
      title: "Governance & Risk",
      description: "Implement governance frameworks, compliance, and risk management practices",
      icon: Shield,
      content: "Explore governance models, compliance requirements, audit trails, model versioning policies, and risk assessment frameworks for production ML systems.",
    },
    {
      id: "cost-slos",
      title: "Cost & SLOs",
      description: "Optimize costs and define Service Level Objectives for production workloads",
      icon: DollarSign,
      content: "Understand cost optimization strategies, resource allocation, SLO definition and tracking, budget management, and performance-cost trade-offs.",
    },
    {
      id: "alerting",
      title: "Alerting",
      description: "Design effective alerting systems for production ML infrastructure",
      icon: Bell,
      content: "Learn alerting best practices, threshold configuration, escalation policies, notification channels, and reducing alert fatigue.",
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description: "Debug and resolve issues in production ML systems",
      icon: Wrench,
      content: "Master troubleshooting techniques, log analysis, debugging strategies, incident response, and post-mortem practices for production issues.",
    },
  ];

  return (
    <AppShell title="Production">
      <Link href="/blank" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors px-2 py-1 -ml-2 rounded hover:bg-accent/50">
        <ArrowLeft className="h-4 w-4" />
        Back to Environments
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-semibold mb-2">Production Environment</h1>
        <p className="text-muted-foreground text-lg">
          Deployment, monitoring, and operational excellence for production ML systems
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Card key={topic.id} className="h-full transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/20">
                    <Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
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

