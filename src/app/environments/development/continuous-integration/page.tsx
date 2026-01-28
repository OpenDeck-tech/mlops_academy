"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, GitBranch, CheckCircle2, AlertCircle, Zap, Package, ShieldCheck } from "lucide-react";
import { MLOpsSidebar } from "@/components/mlops-sidebar";
import { CodeBlock } from "@/components/code-block";

export default function ContinuousIntegrationPage() {
  return (
    <div className="flex min-h-screen">
      <MLOpsSidebar />
      <div
        className="flex-1 min-h-screen container mx-auto max-w-7xl px-6 py-12 transition-all duration-300"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        <Link
          href="/environments/development"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Development Environment</span>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <GitBranch className="h-8 w-8 text-green-600 dark:text-green-400" />
            <h1 className="text-4xl font-semibold">Continuous Integration</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Automate tests, quality checks, and safe merges for ML codebases.
          </p>
        </div>

        <Tabs defaultValue="basics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="checks">Checks</TabsTrigger>
            <TabsTrigger value="ml-specific">ML-Specific</TabsTrigger>
            <TabsTrigger value="github-actions">GitHub Actions</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>What CI should do</CardTitle>
                </div>
                <CardDescription>Make “merge” the safe default</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">
                    Run on every PR and on main: lint, typecheck, tests, and a minimal build.
                  </li>
                  <li className="list-disc">
                    Fail fast with clear logs (so developers fix issues quickly).
                  </li>
                  <li className="list-disc">
                    Gate merges on required checks (branch protection).
                  </li>
                  <li className="list-disc">
                    Produce artifacts when useful (test reports, coverage, build outputs).
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>PR policy (simple and effective)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">At least 1 approval for PRs</li>
                  <li className="list-disc">All required checks must pass</li>
                  <li className="list-disc">No direct pushes to main</li>
                  <li className="list-disc">Squash merge (optional) to keep history clean</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checks" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Core checks to include</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Code quality</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                      <li className="list-disc">Lint (ESLint / Ruff)</li>
                      <li className="list-disc">Format check (Prettier / Black)</li>
                      <li className="list-disc">Typecheck (tsc / mypy/pyright)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Tests</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                      <li className="list-disc">Unit tests (fast)</li>
                      <li className="list-disc">Integration tests (selected)</li>
                      <li className="list-disc">Smoke test / minimal build</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="font-semibold mb-2">Suggested “fast” CI sequence</h3>
                  <CodeBlock
                    language="bash"
                    code={`# Example order (fastest failures first)
npm run lint
npm run typecheck
npm test
npm run build`}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Common CI failure modes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Works on my machine: unpinned versions, missing env vars</li>
                  <li className="list-disc">Slow tests: no test split, no caching, heavy fixtures</li>
                  <li className="list-disc">Flaky tests: timeouts, random seeds, ordering dependencies</li>
                  <li className="list-disc">Hidden coupling: tests require network or external services</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ml-specific" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>ML-specific CI checks</CardTitle>
                </div>
                <CardDescription>Catch issues unique to data + models</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Schema checks (feature columns, types, required fields)</li>
                  <li className="list-disc">Data sanity tests (null rates, ranges, cardinality, leakage checks)</li>
                  <li className="list-disc">Reproducibility checks (fixed seeds, deterministic configs)</li>
                  <li className="list-disc">Model artifact validation (can load, expected signature)</li>
                  <li className="list-disc">“Tiny train” smoke test (train on a tiny sample to validate pipeline)</li>
                </ul>
                <div className="pt-2">
                  <h3 className="font-semibold mb-2">Tiny-train smoke test idea</h3>
                  <CodeBlock
                    language="text"
                    code={`Goal: validate the full training pipeline quickly.

- Load a tiny dataset sample (e.g., 1000 rows)
- Run feature engineering end-to-end
- Train for 1-2 epochs / a few steps
- Assert model can be saved and reloaded
- Assert metrics are finite (not NaN)`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="github-actions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Minimal GitHub Actions workflow</CardTitle>
                <CardDescription>Drop-in example you can adapt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock
                  language="yaml"
                  code={`name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test --if-present
      - run: npm run build`}
                />
                <p className="text-sm text-muted-foreground">
                  Tip: keep “fast checks” required on PRs; run heavier jobs (e2e, larger tests) on main or nightly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Caching + speed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <ul className="space-y-2 ml-4">
                  <li className="list-disc">Use `npm ci` and enable dependency cache</li>
                  <li className="list-disc">Split jobs (lint/typecheck/tests) when it helps parallelism</li>
                  <li className="list-disc">Avoid downloading large model/data artifacts in PR CI</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Practical tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Start with a small required set; add checks only when they pay off</li>
                  <li className="list-disc">Treat CI time as a product metric (watch p95 duration)</li>
                  <li className="list-disc">Make failures obvious: short log summaries + clear error messages</li>
                  <li className="list-disc">Prefer deterministic tests (seed randomness, fixed test data)</li>
                  <li className="list-disc">Keep secrets out of PR builds (use mocks/stubs for external calls)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next step</CardTitle>
                <CardDescription>Connect CI to your workflow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Once CI is stable, add branch protection rules so merges require passing checks.
                </p>
                <p className="text-sm text-muted-foreground">
                  Then add a “release” workflow (build + deploy) that triggers only after main merges.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

