"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Wrench, Bug, Link2, BookOpen, ClipboardList } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export function TroubleshootingContent() {
  return (
    <AppShell title="Troubleshooting">
      <Link
        href="/environments/staging"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Staging Environment</span>
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Wrench className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          <h1 className="text-4xl font-semibold">Troubleshooting in Staging</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Debug and resolve issues before they reach production. Environment-specific debugging, integration failures, and pre-production runbooks.
        </p>
      </div>

      <Tabs defaultValue="debugging" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="debugging">Debugging</TabsTrigger>
          <TabsTrigger value="integration">Integration Issues</TabsTrigger>
          <TabsTrigger value="runbooks">Runbooks</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="debugging" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Bug className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Environment-Specific Debugging</CardTitle>
              </div>
              <CardDescription>
                Staging often behaves differently from local or production. Isolate config, secrets, and scale.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Config and secrets</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Confirm staging uses its own env vars and secrets (no prod credentials); mismatches cause auth or connectivity failures</li>
                  <li className="list-disc">Compare key config (feature flags, API endpoints, DB connection strings) between staging and production; document intentional differences</li>
                  <li className="list-disc">Use structured logging with environment and request IDs so you can trace a single flow across services in staging</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reproducing and isolating</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Reproduce the issue in staging first: same payloads, headers, and (where possible) data shape as production</li>
                  <li className="list-disc">If the bug only appears under load, use staging load tests to recreate; check for timeouts, connection limits, and resource limits</li>
                  <li className="list-disc">For ML: validate input schema and model version in staging; drift or version mismatches can surface only in staging if prod uses cached paths</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Link2 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Integration Testing and Failures</CardTitle>
              </div>
              <CardDescription>
                Flaky or failing integration tests in staging usually point to environment, timing, or dependency issues.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Common causes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Service discovery and URLs:</strong> Staging services may use different hostnames or ports; ensure tests and app config point to staging endpoints</li>
                  <li className="list-disc"><strong>Data and state:</strong> Tests that depend on specific DB state or external data can fail if staging DB is reset or out of sync; use fixtures or dedicated test data</li>
                  <li className="list-disc"><strong>Timing and timeouts:</strong> Staging can be slower than local; increase timeouts for integration tests and add retries with backoff for transient failures</li>
                  <li className="list-disc"><strong>Auth and identity:</strong> Staging may use a different IdP or test users; align test credentials and token validation with staging config</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Debugging steps</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Run the same test locally against staging APIs (or a staging stub) to see if the failure is environment-specific</li>
                  <li className="list-disc">Check logs and traces for the failing request; correlate with deploy time to catch bad releases or config drift</li>
                  <li className="list-disc">Document which integrations are required for staging (APIs, DBs, message queues) and add health checks so failures are visible early</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="runbooks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Pre-Production Runbooks</CardTitle>
              </div>
              <CardDescription>
                Standard procedures for frequent staging issues so the team can resolve them without ad-hoc digging.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Runbook structure</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Each runbook should include: symptom, how to confirm, likely causes, step-by-step fix, rollback if needed, and owner or escalation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Example runbooks for staging</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Deploy failed or stuck:</strong> Check pipeline logs, image/artifact availability, and staging cluster capacity; roll back to last good deploy and re-run</li>
                  <li className="list-disc"><strong>Tests pass locally but fail in staging:</strong> Compare env vars, feature flags, and service URLs; check staging DB and external dependencies; re-run with increased timeouts</li>
                  <li className="list-disc"><strong>Model or inference errors in staging:</strong> Verify artifact version and input schema; check model server logs and resource limits; confirm staging has the same (or compatible) runtime as production</li>
                  <li className="list-disc"><strong>Staging unreachable or timeouts:</strong> Verify network and ingress; check if staging is scaled down or paused; confirm DNS and load balancer config</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <ClipboardList className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Troubleshooting Checklist</CardTitle>
              </div>
              <CardDescription>
                Use this before escalating or before promoting a fix from staging to production.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li className="list-disc">Issue is reproduced in staging with clear steps and (where possible) logs or screenshots</li>
                <li className="list-disc">Root cause is identified (config, code, data, dependency, or infrastructure)</li>
                <li className="list-disc">Fix is applied and verified in staging (tests green, manual smoke check if needed)</li>
                <li className="list-disc">Runbook or docs updated if the issue was environment-specific or likely to recur</li>
                <li className="list-disc">If the fix touches production path, same change is promoted via normal release process and validated in prod</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
