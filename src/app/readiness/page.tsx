"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AppShell } from "@/components/app-shell";
import { AlertCircle, CheckCircle2, Server, User } from "lucide-react";

type ChecklistItem = {
  id: string;
  label: string;
  hint?: string;
};

type Checklist = {
  id: string;
  title: string;
  description: string;
  icon: "model" | "platform" | "career";
  items: ChecklistItem[];
};

const checklists: Checklist[] = [
  {
    id: "model-ready",
    title: "Is my model ready for production?",
    description: "A quick sniff‑test before you ship a model into a real environment.",
    icon: "model",
    items: [
      { id: "schema", label: "Input & output schemas are clearly defined", hint: "Types, shapes, ranges, optional vs required." },
      { id: "repro", label: "Training is fully reproducible", hint: "Code, config, data version, and environment are captured." },
      { id: "monitoring", label: "Basic metrics & logs are emitted", hint: "Latency, error rates, and a core business metric." },
      { id: "fallbacks", label: "There is a safe fallback path", hint: "What happens if the model fails or is unavailable?" },
      { id: "drift-plan", label: "You have a drift / retraining plan", hint: "When will you retrain? On what signals?" },
    ],
  },
  {
    id: "platform-ready",
    title: "Is my platform ready for more teams?",
    description: "Before inviting more teams onboard, check the basics of scale and governance.",
    icon: "platform",
    items: [
      { id: "environments", label: "Environments are clearly separated", hint: "At least dev / staging / prod with clear promotion rules." },
      { id: "ci", label: "CI is mandatory for critical repos", hint: "Lint, typecheck and tests run on PRs and block merges." },
      { id: "observability", label: "Centralized logs and metrics exist", hint: "Teams know where to look when something breaks." },
      { id: "access", label: "Access control is in place", hint: "Least privilege for data, models, and deployment targets." },
      { id: "docs", label: "Onboarding docs exist and are discoverable", hint: "One link to share for \"How do I deploy a model here?\"" },
    ],
  },
  {
    id: "career-ready",
    title: "Is my MLOps profile ready?",
    description: "For career moves into MLOps, make sure your story is clear and concrete.",
    icon: "career",
    items: [
      { id: "projects", label: "You can describe 1–2 concrete ML systems you worked on", hint: "What the system did, where it ran, who used it." },
      { id: "impact", label: "You can quantify impact", hint: "Latency, reliability, cost, or business metrics that improved." },
      { id: "tooling", label: "You can talk through your tooling choices", hint: "CI, infra, orchestrators, registries, monitoring, etc." },
      { id: "failure", label: "You have a failure story ready", hint: "What broke, what you learned, and what you changed." },
      { id: "roadmap", label: "You have a learning path you’re following", hint: "Tie it back to the Learning Paths and Roles pages." },
    ],
  },
];

export default function ReadinessPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getProgress = (list: Checklist) => {
    const total = list.items.length;
    const done = list.items.filter((item) => checked[`${list.id}:${item.id}`]).length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, pct };
  };

  const overall = useMemo(() => {
    const totals = checklists.map(getProgress);
    const done = totals.reduce((acc, t) => acc + t.done, 0);
    const total = totals.reduce((acc, t) => acc + t.total, 0);
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, pct };
  }, [checked]);

  return (
    <AppShell title="Readiness">
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Readiness checklists</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Use these quick checklists as conversation starters with your team, not as rigid gates. Tick
              items you feel confident about today.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-sm">
            <span className="text-muted-foreground">Overall readiness</span>
            <div className="flex items-center gap-2">
              {overall.pct >= 60 ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-500" />
              )}
              <span className="font-medium">{overall.pct}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {checklists.map((list) => {
          const progress = getProgress(list);
          const Icon = list.icon === "model" ? Server : list.icon === "platform" ? Server : User;

          return (
            <Card key={list.id} className="flex flex-col h-full">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <CardTitle className="text-lg">{list.title}</CardTitle>
                  </div>
                  <Badge variant="outline">
                    {progress.done}/{progress.total}
                  </Badge>
                </div>
                <CardDescription>{list.description}</CardDescription>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${progress.pct}%` }}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col space-y-3 text-sm">
                <div className="space-y-2">
                  {list.items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-2 rounded-md border border-border/60 px-3 py-2 cursor-pointer hover:bg-accent/40 transition-colors"
                    >
                      <Checkbox
                        checked={checked[`${list.id}:${item.id}`] ?? false}
                        onCheckedChange={() => toggle(`${list.id}:${item.id}`)}
                        className="mt-0.5"
                      />
                      <div className="space-y-1">
                        <p className="font-medium text-xs md:text-sm">{item.label}</p>
                        {item.hint && (
                          <p className="text-[11px] md:text-xs text-muted-foreground">{item.hint}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                {list.id === "career-ready" && (
                  <div className="pt-2 mt-auto text-xs text-muted-foreground">
                    Tie this checklist into real roles and recruiters:
                    <span className="inline-flex gap-2 ml-1">
                      <Link href="/roles" className="underline underline-offset-2">
                        Roles
                      </Link>
                      <Link href="/recruiters" className="underline underline-offset-2">
                        Recruiters
                      </Link>
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}

