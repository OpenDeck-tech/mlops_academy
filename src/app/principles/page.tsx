import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lightbulb, Repeat, Zap, Eye, GitBranch, Shield, Layers } from "lucide-react";
import { AppShell } from "@/components/app-shell";

const principles = [
  {
    id: "reproducibility",
    title: "Reproducibility",
    icon: Repeat,
    oneLiner: "Same inputs, same outputs — every time.",
    description:
      "Environments, code, data, and model artifacts must be versioned and replayable. If you can't reproduce a run, you can't debug or improve it.",
  },
  {
    id: "automation",
    title: "Automation",
    icon: Zap,
    oneLiner: "Remove manual steps; reduce human error.",
    description:
      "Build, test, deploy, and monitor via pipelines. Manual handoffs and one-off scripts don't scale. Automate the path from commit to production.",
  },
  {
    id: "observability",
    title: "Observability",
    icon: Eye,
    oneLiner: "You can't fix what you can't see.",
    description:
      "Logs, metrics, traces, and model/feature drift signals. Know when things break or degrade before users do. Define SLOs and alert on them.",
  },
  {
    id: "versioning",
    title: "Versioning",
    icon: GitBranch,
    oneLiner: "Code, data, and models are first-class versioned assets.",
    description:
      "Track which model, which dataset, and which code produced a given outcome. Versioning enables rollback, audit, and reproducible experiments.",
  },
  {
    id: "governance",
    title: "Governance & Safety",
    icon: Shield,
    oneLiner: "Control who can change what, and what gets to production.",
    description:
      "Access control, approval gates, and compliance. Production changes should be auditable and gated. Model risk and fairness belong in the loop.",
  },
  {
    id: "separation",
    title: "Environment Separation",
    icon: Layers,
    oneLiner: "Local → Dev → Staging → Prod. Don't skip steps.",
    description:
      "Clear boundaries between environments prevent "works on my machine" and protect production. Each stage has a purpose: build, integrate, validate, run.",
  },
];

export default function PrinciplesPage() {
  return (
    <AppShell title="Principles">
      <Link
        href="/blank"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Environments
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Lightbulb className="h-8 w-8 text-amber-500 dark:text-amber-400" />
          <h1 className="text-4xl font-semibold">First Principles of MLOps</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Tools change; these principles don't. Think from first principles when designing or reviewing ML systems.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {principles.map((p) => {
          const Icon = p.icon;
          return (
            <Card key={p.id} className="transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{p.title}</CardTitle>
                </div>
                <CardDescription className="text-base font-medium text-foreground/90 pt-1">
                  {p.oneLiner}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 p-4 rounded-lg bg-muted/50 border border-border/60">
        <p className="text-sm text-muted-foreground">
          These principles map to the pipeline: <Link href="/blank" className="underline font-medium text-foreground hover:no-underline">Environments</Link> (Local → Prod),{" "}
          <Link href="/journeys" className="underline font-medium text-foreground hover:no-underline">Learning Paths</Link>, and{" "}
          <Link href="/roadmap" className="underline font-medium text-foreground hover:no-underline">Roadmap</Link>.
        </p>
      </div>
    </AppShell>
  );
}
