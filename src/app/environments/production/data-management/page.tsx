"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Database, Workflow, Store, Shield, Activity, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export default function ProductionDataManagementPage() {
  return (
    <AppShell title="Production / Data Management">
      <Link
        href="/environments/production"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Production Environment</span>
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Database className="h-8 w-8 text-red-600 dark:text-red-400" />
          <h1 className="text-4xl font-semibold">Data Management in Production</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Production data pipelines, feature serving, governance, and data quality at scale
        </p>
      </div>

      <Tabs defaultValue="pipelines" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="pipelines">Data Pipelines</TabsTrigger>
          <TabsTrigger value="feature-serving">Feature Serving</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="pipelines" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Workflow className="h-6 w-6 text-red-600 dark:text-red-400" />
                <CardTitle>Production Data Pipelines</CardTitle>
              </div>
              <CardDescription>
                Running and operating data pipelines in production for training and inference.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">SLA/SLO for pipeline completion (e.g. “training data refreshed by 6am”)</li>
                  <li className="list-disc">Idempotency and exactly-once or at-least-once semantics where needed</li>
                  <li className="list-disc">Monitoring: run duration, failure rate, data freshness, row counts</li>
                  <li className="list-disc">Alerting on failures, schema changes, or anomalous volumes</li>
                  <li className="list-disc">Rollback: ability to re-run from a previous version or revert outputs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Operational Practices</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Version pipeline code and config; deploy via CI/CD like application code</li>
                  <li className="list-disc">Log lineage (inputs → outputs) for audits and debugging</li>
                  <li className="list-disc">Use the same pipeline code path as dev/staging where possible; differ only by config and scale</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feature-serving" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Store className="h-6 w-6 text-red-600 dark:text-red-400" />
                <CardTitle>Feature Store Serving</CardTitle>
              </div>
              <CardDescription>
                Low-latency, reliable feature serving for production inference.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Production Concerns</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Latency:</strong> P99 within SLO (e.g. &lt;50ms); use caching and pre-aggregation</li>
                  <li className="list-disc"><strong>Availability:</strong> Feature store and dependencies (DBs, APIs) under SLA</li>
                  <li className="list-disc"><strong>Consistency:</strong> Same feature logic as training; validate offline vs online parity in staging</li>
                  <li className="list-disc"><strong>Fallbacks:</strong> Defaults or graceful degradation when a feature source is down</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Monitoring</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Track request latency, error rate, and cache hit rate per feature or endpoint</li>
                  <li className="list-disc">Alert on SLO breaches and dependency failures</li>
                  <li className="list-disc">Sample and log feature values for debugging and drift analysis</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                <CardTitle>Data Governance in Production</CardTitle>
              </div>
              <CardDescription>
                Access control, audit, and compliance for production data and models.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Key Areas</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Access control:</strong> Who can read/write production datasets and feature stores; principle of least privilege</li>
                  <li className="list-disc"><strong>Audit trails:</strong> Log who accessed or changed data, when, and from where</li>
                  <li className="list-disc"><strong>Data lineage:</strong> Trace data from source to model input for compliance and incident response</li>
                  <li className="list-disc"><strong>Retention & deletion:</strong> Policies for how long data is kept and how to delete it (e.g. GDPR)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Checklist</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Document data ownership and classification (PII, confidential, public)</li>
                  <li className="list-disc">Integrate with central identity and access management (IAM)</li>
                  <li className="list-disc">Run regular access reviews and automate retention where possible</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Activity className="h-6 w-6 text-red-600 dark:text-red-400" />
                <CardTitle>Data Quality in Production</CardTitle>
              </div>
              <CardDescription>
                Monitoring and guarding data quality for production ML.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">What to Monitor</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Schema:</strong> Detect unexpected columns, type changes, or missing required fields</li>
                  <li className="list-disc"><strong>Distributions:</strong> Compare live feature distributions to a baseline; alert on significant drift</li>
                  <li className="list-disc"><strong>Completeness:</strong> Null rates, missing keys, and pipeline freshness</li>
                  <li className="list-disc"><strong>Anomalies:</strong> Spike in volume, unexpected values, or broken upstream sources</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Actions</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Run quality checks in the pipeline; block or quarantine bad data and alert</li>
                  <li className="list-disc">Define SLIs for data quality (e.g. “&lt;0.1% nulls for feature X”) and alert on breaches</li>
                  <li className="list-disc">Use the same quality rules in staging to catch issues before production</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                <CardTitle>Production Data Management Checklist</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li className="list-disc">Data pipelines have SLOs, monitoring, and alerting</li>
                <li className="list-disc">Feature serving meets latency and availability SLOs with fallbacks</li>
                <li className="list-disc">Access control and audit logging are in place for production data</li>
                <li className="list-disc">Data quality and drift are monitored with clear alerting</li>
                <li className="list-disc">Lineage is recorded for key data flows and model inputs</li>
                <li className="list-disc">Retention and deletion policies are documented and enforced</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
