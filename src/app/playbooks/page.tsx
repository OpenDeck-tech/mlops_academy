import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/app-shell";
import { ArrowRight, GitMerge, Radar, Workflow } from "lucide-react";

export default function PlaybooksPage() {
  return (
    <AppShell title="Playbooks">
      <div className="mb-10 space-y-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Playbooks</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Opinionated, copy‑and‑adapt guides for common MLOps scenarios. Use these as starting points, not
            as rigid standards.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">CI/CD</Badge>
          <Badge variant="secondary">Monitoring</Badge>
          <Badge variant="secondary">LLM & MCP</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* CI/CD Playbook */}
        <Card className="flex flex-col h-full">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <GitMerge className="h-5 w-5 text-green-600 dark:text-green-400" />
                CI/CD for an ML service
              </CardTitle>
              <Badge variant="outline">Playbook</Badge>
            </div>
            <CardDescription>
              Turn a single ML model service into a pipeline with linting, tests, and safe deploys.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4 text-sm">
            <div>
              <p className="font-medium mb-1">Checklist</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Define one Git repo as the source of truth for the service.</li>
                <li>Add lint, typecheck and test commands (`npm run lint`, `npm run test`).</li>
                <li>Create a minimal GitHub Actions workflow that runs on PR and `main`.</li>
                <li>Fail the pipeline on any lint/test/typecheck error.</li>
                <li>Build a container image or artifact only on `main` or tagged releases.</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Where to start</p>
              <p className="text-muted-foreground">
                Use the Continuous Integration page for a more detailed breakdown and copy‑pasteable
                workflow example.
              </p>
            </div>
            <div className="pt-2 mt-auto">
              <Button asChild size="sm" variant="outline" className="w-full justify-center">
                <Link href="/environments/development/continuous-integration">
                  View CI playbook
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring & Drift Playbook */}
        <Card className="flex flex-col h-full">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Radar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Monitoring & drift signals
              </CardTitle>
              <Badge variant="outline">Playbook</Badge>
            </div>
            <CardDescription>
              Define what you monitor for a model in production before you deploy it.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4 text-sm">
            <div>
              <p className="font-medium mb-1">Signals to define</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Request latency: P50 / P95 / P99.</li>
                <li>Error rate: HTTP and application‑level errors.</li>
                <li>Business metric: e.g. approval rate, fraud catch rate.</li>
                <li>Data quality: missing values, ranges, category cardinality.</li>
                <li>Drift: feature distributions vs. training data.</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">How to apply</p>
              <p className="text-muted-foreground">
                Start by writing these down for one model using the Production environment mindset, then
                wire them into your existing monitoring stack (Prometheus, cloud metrics, etc.).
              </p>
            </div>
            <div className="pt-2 mt-auto">
              <Button asChild size="sm" variant="outline" className="w-full justify-center">
                <Link href="/environments/production">
                  Open production guide
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* MCP / LLM Integration Playbook */}
        <Card className="flex flex-col h-full">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Workflow className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                MCP & tools integration
              </CardTitle>
              <Badge variant="outline">Playbook</Badge>
            </div>
            <CardDescription>
              Expose your existing tools and data sources to LLMs using Model Context Protocol.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4 text-sm">
            <div>
              <p className="font-medium mb-1">High‑level steps</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Pick 1–2 high‑value tools (e.g. metrics query, model registry lookup).</li>
                <li>Implement a small MCP server that wraps those tools.</li>
                <li>Expose safe parameters only (no raw SQL from the model).</li>
                <li>Log all MCP calls for later analysis and debugging.</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Where to learn more</p>
              <p className="text-muted-foreground">
                The MCP page under the Development environment walks through core concepts, MLOps
                benefits, and example server/client code.
              </p>
            </div>
            <div className="pt-2 mt-auto">
              <Button asChild size="sm" variant="outline" className="w-full justify-center">
                <Link href="/environments/development/mcp">
                  Open MCP guide
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

