"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Rocket, GitBranch, Layers, RotateCcw, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export function ContinuousDeploymentContent() {
  return (
    <AppShell title="Continuous Deployment">
      <Link
        href="/environments/staging"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Staging Environment</span>
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Rocket className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          <h1 className="text-4xl font-semibold">Continuous Deployment in Staging</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Automate deployments to staging, manage release pipelines, and validate before production
        </p>
      </div>

      <Tabs defaultValue="pipelines" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="pipelines">CD Pipelines</TabsTrigger>
          <TabsTrigger value="strategies">Deployment Strategies</TabsTrigger>
          <TabsTrigger value="rollback">Rollback</TabsTrigger>
          <TabsTrigger value="practices">Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="pipelines" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <GitBranch className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Release Pipelines for Staging</CardTitle>
              </div>
              <CardDescription>
                From commit to staging: build, test, and deploy in a single pipeline.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Pipeline stages</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Build:</strong> Build images or artifacts from the same commit; tag with Git SHA or semantic version</li>
                  <li className="list-disc"><strong>Test:</strong> Unit tests, integration tests, and (where possible) contract tests run in CI before deploy</li>
                  <li className="list-disc"><strong>Deploy to staging:</strong> Automated deploy to staging (e.g. Kubernetes, ECS, or platform of choice) with the same config as production, different scale and secrets</li>
                  <li className="list-disc"><strong>Smoke / sanity:</strong> Post-deploy checks to confirm the app and key flows are healthy</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ML-specific considerations</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Deploy model serving containers or endpoints to staging with the same API contract as production</li>
                  <li className="list-disc">Run inference tests or shadow traffic against staging to validate model and pipeline before production</li>
                  <li className="list-disc">Version model artifacts and config in the pipeline; staging should receive the exact artifact you intend to promote</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Layers className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Deployment Strategies</CardTitle>
              </div>
              <CardDescription>
                Blue-green, canary, and rolling deployments in staging reduce risk and validate release process.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Blue-green</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Two identical environments (blue = current, green = new). Deploy to green, run tests, then switch traffic. Instant rollback by switching back.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Use in staging to practice the switch and rollback; same pattern can be used in production</li>
                  <li className="list-disc">Ensure DB and config migrations are compatible with both versions during the cutover</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Canary</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Roll out to a small subset of traffic (e.g. 5% → 50% → 100%). Monitor errors and latency; roll back if metrics degrade.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">In staging, canary can mean “deploy to one replica first” and validate before scaling up</li>
                  <li className="list-disc">Useful for ML model releases: compare new vs old model behavior on a slice of traffic</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rolling</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Replace instances one (or a few) at a time. No second full environment; rollback by deploying the previous version again.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Common in Kubernetes (rolling update). Validate in staging that rollbacks and health checks behave as expected</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rollback" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <RotateCcw className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Rollback Procedures</CardTitle>
              </div>
              <CardDescription>
                Define and practice rollback so staging and production can recover quickly from bad releases.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Principles</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>One-command rollback:</strong> Revert to the previous known-good version (image, manifest, or config) without manual steps</li>
                  <li className="list-disc"><strong>Data and config:</strong> Model artifacts, feature config, and DB migrations must support rolling back; avoid one-way migrations where possible</li>
                  <li className="list-disc"><strong>Automated checks:</strong> After rollback, run the same smoke/health checks to confirm the system is stable</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">In staging</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Run rollback drills regularly: deploy a change, then roll back and verify</li>
                  <li className="list-disc">Document the exact commands or pipeline steps (e.g. “Revert to tag X” or “Redeploy previous Helm release”)</li>
                  <li className="list-disc">For ML: keep previous model version available so you can switch back if the new model underperforms</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practices" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Staging CD Practices</CardTitle>
              </div>
              <CardDescription>
                Checklist and best practices for continuous deployment in staging.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li className="list-disc">Staging is deployed from the same pipeline and artifact store as production; only environment and secrets differ</li>
                <li className="list-disc">Every production release is first deployed to staging and validated (tests, smoke, manual checks where needed)</li>
                <li className="list-disc">Rollback is tested in staging and documented; the same process is used in production</li>
                <li className="list-disc">Staging config (resources, replicas, feature flags) mirrors production where possible so behavior is representative</li>
                <li className="list-disc">Use staging for canary or blue-green rehearsals so the team is confident before production releases</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
