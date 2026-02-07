"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Activity, BarChart3, GitBranch, LayoutDashboard, ClipboardList } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export function MonitoringDriftContent() {
  return (
    <AppShell title="Monitoring and Drift">
      <Link
        href="/environments/production"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Production Environment</span>
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="h-8 w-8 text-red-600 dark:text-red-400" />
          <h1 className="text-4xl font-semibold">Monitoring and Drift</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Track model performance, detect data and concept drift, and monitor system health in production.
        </p>
      </div>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="drift">Drift Types</TabsTrigger>
          <TabsTrigger value="dashboards">Dashboards & Alerts</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="h-6 w-6 text-red-600 dark:text-red-400" />
                <CardTitle>What to Monitor</CardTitle>
              </div>
              <CardDescription>
                Core metrics for production ML: system health, model performance, and business outcomes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">System and infra</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Latency:</strong> p50, p95, p99 per endpoint; track request duration and queue time</li>
                  <li className="list-disc"><strong>Throughput:</strong> Requests/inferences per second; compare to capacity and SLOs</li>
                  <li className="list-disc"><strong>Errors:</strong> 4xx, 5xx, timeouts; error rate and failure modes</li>
                  <li className="list-disc"><strong>Resources:</strong> CPU, memory, GPU utilisation; connection pools, disk I/O</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Model and data</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Model performance:</strong> Accuracy, precision, recall, or task-specific metrics on a held-out or live sample</li>
                  <li className="list-disc"><strong>Input/output distributions:</strong> Feature and prediction distributions over time; baseline vs current</li>
                  <li className="list-disc"><strong>Data quality:</strong> Missing values, schema violations, freshness; upstream pipeline health</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Business</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">At least one metric that ties to business outcomes (e.g. conversion, revenue, user satisfaction) so you know when the model is helping or hurting</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drift" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <GitBranch className="h-6 w-6 text-red-600 dark:text-red-400" />
                <CardTitle>Data Drift, Model Drift, Concept Drift</CardTitle>
              </div>
              <CardDescription>
                Types of drift and how to detect and respond to them in production.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Data drift</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  The distribution of input features changes over time (e.g. new user segments, seasonal shifts). The model was trained on the old distribution; performance can degrade.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Detect: compare feature distributions (e.g. histograms, KL divergence, PSI) between a baseline (training or recent window) and live traffic</li>
                  <li className="list-disc">Respond: retrain or fine-tune with newer data; add features or adjust preprocessing; document and alert so the team can decide</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Model drift / performance degradation</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Model accuracy or other performance metrics worsen over time. Can be caused by data drift, concept drift, or changes in the world the model wasn’t trained for.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Detect: track accuracy (or task metric) on a labelled sample, shadow mode, or proxy metrics (e.g. downstream business KPIs)</li>
                  <li className="list-disc">Respond: retrain, roll back to a previous model version, or fix data pipeline; root-cause before retraining</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Concept drift</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  The relationship between inputs and target changes (e.g. what “good” means changes). Same features, different mapping to outcomes.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Detect: performance metrics drop without obvious data drift; domain experts or business signals indicate the task has changed</li>
                  <li className="list-disc">Respond: retrain with recent labels; consider different features or model architecture; document concept change for audit</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <LayoutDashboard className="h-6 w-6 text-red-600 dark:text-red-400" />
                <CardTitle>Dashboards and Alerting</CardTitle>
              </div>
              <CardDescription>
                Turn metrics and drift signals into dashboards and actionable alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Dashboards</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Single pane: latency, errors, throughput, and at least one model/business metric so on-call can see system and model health together</li>
                  <li className="list-disc">Drift view: feature and prediction distributions over time; baseline vs current; link to runbooks when drift exceeds threshold</li>
                  <li className="list-disc">Use Prometheus, Grafana, Datadog, or cloud-native metrics; ML-specific tools (e.g. WhyLabs, Evidently, Fiddler) for drift and model metrics</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Alerting</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Alert on SLO breaches (e.g. p99 latency, error rate) and on drift thresholds (e.g. PSI or accuracy drop beyond a limit)</li>
                  <li className="list-disc">Avoid alert fatigue: tier alerts (critical vs warning), aggregate where possible, and document runbooks so responders know what to do</li>
                  <li className="list-disc">Integrate with incident management (PagerDuty, Opsgenie) and runbooks; review and tune thresholds periodically</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <ClipboardList className="h-6 w-6 text-red-600 dark:text-red-400" />
                <CardTitle>Monitoring and Drift Checklist</CardTitle>
              </div>
              <CardDescription>
                Before and after going live: ensure monitoring and drift detection are in place.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li className="list-disc">Latency, error rate, and throughput are instrumented and visible on a dashboard</li>
                <li className="list-disc">At least one model or business metric is tracked (accuracy, proxy, or outcome)</li>
                <li className="list-disc">Data drift (and where relevant, concept drift) is defined, measured, and alerted on</li>
                <li className="list-disc">Alerts have clear ownership and runbooks; thresholds are documented and reviewed</li>
                <li className="list-disc">Retraining or rollback process is documented and tested when drift or performance degrades</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
