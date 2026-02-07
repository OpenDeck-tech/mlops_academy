import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Activity, Shield, DollarSign, Bell, Wrench, Database } from "lucide-react";
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
    {
      id: "data-management",
      title: "Data Management",
      description: "Production data pipelines, feature serving, governance, and data quality",
      icon: Database,
      content: "Operate production data pipelines, feature stores, and data quality monitoring. Governance, lineage, and SLOs for production data.",
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
          const isProOnly = topic.id === "monitoring-drift";
          const href = topic.id === "data-management"
            ? "/environments/production/data-management"
            : topic.id === "monitoring-drift"
              ? "/environments/production/monitoring-drift"
              : undefined;
          const cardContent = (
            <>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/20">
                    <Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                  {isProOnly && (
                    <span className="rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 text-xs font-medium px-2 py-0.5">
                      Pro
                    </span>
                  )}
                </div>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{topic.content}</p>
              </CardContent>
            </>
          );
          return (
            <Card
              key={topic.id}
              className={`h-full transition-all hover:shadow-lg ${href ? "cursor-pointer" : ""}`}
            >
              {href ? (
                <Link href={href} className="block h-full">
                  {cardContent}
                </Link>
              ) : (
                cardContent
              )}
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}

