import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lightbulb, Repeat, Zap, Eye, GitBranch, Shield, Layers } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { getServerLocale } from "@/lib/i18n-server";
import { translate } from "@/lib/i18n";

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
      "Clear boundaries between environments prevent \"works on my machine\" and protect production. Each stage has a purpose: build, integrate, validate, run.",
  },
];

const principleColors: Record<string, { border: string; accent: string; icon: string }> = {
  reproducibility: {
    border: "border-l-emerald-500 dark:border-l-emerald-400",
    accent: "bg-emerald-500/5 dark:bg-emerald-400/5",
    icon: "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400",
  },
  automation: {
    border: "border-l-amber-500 dark:border-l-amber-400",
    accent: "bg-amber-500/5 dark:bg-amber-400/5",
    icon: "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400",
  },
  observability: {
    border: "border-l-blue-500 dark:border-l-blue-400",
    accent: "bg-blue-500/5 dark:bg-blue-400/5",
    icon: "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400",
  },
  versioning: {
    border: "border-l-violet-500 dark:border-l-violet-400",
    accent: "bg-violet-500/5 dark:bg-violet-400/5",
    icon: "bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400",
  },
  governance: {
    border: "border-l-rose-500 dark:border-l-rose-400",
    accent: "bg-rose-500/5 dark:bg-rose-400/5",
    icon: "bg-rose-500/10 dark:bg-rose-400/10 text-rose-600 dark:text-rose-400",
  },
  separation: {
    border: "border-l-sky-500 dark:border-l-sky-400",
    accent: "bg-sky-500/5 dark:bg-sky-400/5",
    icon: "bg-sky-500/10 dark:bg-sky-400/10 text-sky-600 dark:text-sky-400",
  },
};

export default async function PrinciplesPage() {
  const locale = await getServerLocale();
  const t = (key: string) => translate(locale, key);

  return (
    <AppShell title="Principles">
      <Link
        href="/blank"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("Back to Environments")}
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Lightbulb className="h-8 w-8 text-amber-500 dark:text-amber-400" />
          <h1 className="text-4xl font-semibold">{t("First Principles of MLOps")}</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {t("Tools change; these principles don't. Think from first principles when designing or reviewing ML systems.")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {principles.map((p) => {
          const Icon = p.icon;
          const colors = principleColors[p.id] ?? principleColors.reproducibility;
          return (
            <Card key={p.id} className={`border-l-4 ${colors.border} transition-all hover:shadow-lg`}>
              <CardHeader className={`pb-2 rounded-t-xl border-b border-border/50 ${colors.accent}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.icon}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{t(p.title)}</CardTitle>
                </div>
                <CardDescription className="text-base font-medium text-foreground/90 pt-1">
                  {t(p.oneLiner)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t(p.description)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 p-4 rounded-xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-200/60 dark:border-amber-800/40">
        <p className="text-sm text-muted-foreground">
          These principles map to the pipeline: <Link href="/blank" className="underline font-medium text-foreground hover:no-underline">Environments</Link> (Local → Prod),{" "}
          <Link href="/journeys" className="underline font-medium text-foreground hover:no-underline">Learning Paths</Link>, and{" "}
          <Link href="/roadmap" className="underline font-medium text-foreground hover:no-underline">Roadmap</Link>.
        </p>
      </div>
    </AppShell>
  );
}
