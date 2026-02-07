"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Gauge, TrendingUp, Wrench, Cpu, ClipboardList } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export function LoadTestingContent() {
  return (
    <AppShell title="Load Testing">
      <Link
        href="/environments/staging"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Staging Environment</span>
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Gauge className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          <h1 className="text-4xl font-semibold">Load Testing in Staging</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Test system performance and capacity under realistic load before production. Benchmarks, stress testing, and bottleneck identification.
        </p>
      </div>

      <Tabs defaultValue="strategies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="tools">Tools & Metrics</TabsTrigger>
          <TabsTrigger value="ml">ML / Inference</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Load Testing Strategies</CardTitle>
              </div>
              <CardDescription>
                Run load tests in staging so you find limits and bottlenecks before production.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Types of load tests</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Baseline / smoke:</strong> Low concurrency to confirm the system works under minimal load; run after every staging deploy</li>
                  <li className="list-disc"><strong>Load test:</strong> Steady traffic at expected or peak load; measure latency, throughput, and error rate</li>
                  <li className="list-disc"><strong>Stress test:</strong> Ramp beyond expected load until the system degrades or fails; find breaking point and recovery behavior</li>
                  <li className="list-disc"><strong>Soak / endurance:</strong> Sustained load over hours to catch memory leaks, connection pool exhaustion, and gradual degradation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">In staging</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Staging should mirror production topology (same services, scaled down) so load tests are representative</li>
                  <li className="list-disc">Use production-like data volumes and request shapes where possible; anonymised or synthetic if needed</li>
                  <li className="list-disc">Define pass/fail criteria (e.g. p99 latency &lt; 200ms, error rate &lt; 0.1%) and run them in CI or before each release</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Wrench className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Tools and Metrics</CardTitle>
              </div>
              <CardDescription>
                What to measure and common tools for generating load and collecting metrics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Key metrics</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Latency:</strong> p50, p95, p99 response time; track per endpoint or per model</li>
                  <li className="list-disc"><strong>Throughput:</strong> Requests per second (RPS) or inferences per second; compare to production targets</li>
                  <li className="list-disc"><strong>Error rate:</strong> 4xx, 5xx, timeouts; understand failure mode under load</li>
                  <li className="list-disc"><strong>Resource usage:</strong> CPU, memory, GPU; identify bottlenecks (e.g. CPU-bound vs I/O-bound)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tools</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>k6, Locust, Gatling:</strong> Scriptable load generators; run from CI or on a schedule against staging</li>
                  <li className="list-disc"><strong>Artillery:</strong> Good for API and HTTP load testing; YAML config, plugins for metrics</li>
                  <li className="list-disc"><strong>Prometheus + Grafana:</strong> Scrape metrics from staging; dashboards for latency, RPS, and resource usage</li>
                  <li className="list-disc">Combine load generation (k6/Locust) with observability (Prometheus, logs) so you can correlate load with behaviour</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ml" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Cpu className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>ML and Inference Load Testing</CardTitle>
              </div>
              <CardDescription>
                Staging load tests for model serving, batch jobs, and feature pipelines.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li className="list-disc"><strong>Inference endpoints:</strong> Send realistic request volumes and payload sizes; measure latency and throughput per model or version</li>
                <li className="list-disc"><strong>Batch / offline:</strong> Run large batch jobs in staging with production-like data size; validate runtime and resource limits</li>
                <li className="list-disc"><strong>GPU and batching:</strong> If production uses GPU or dynamic batching, staging should too; load test with similar batch sizes and concurrency</li>
                <li className="list-disc"><strong>Feature and data pipelines:</strong> Load test feature computation and data ingestion so staging proves the pipeline can keep up at scale</li>
                <li className="list-disc">Document baseline metrics (e.g. p99 latency at 100 RPS) and re-run after model or infra changes; catch regressions before production</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <ClipboardList className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Load Testing Checklist</CardTitle>
              </div>
              <CardDescription>
                Before promoting a release, run load tests in staging and confirm results.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li className="list-disc">Staging topology and config mirror production (same services, scaled down)</li>
                <li className="list-disc">Load test at least at expected peak load; stress test to find limits</li>
                <li className="list-disc">Pass/fail criteria defined and met (latency, error rate, throughput)</li>
                <li className="list-disc">Metrics and dashboards reviewed; no unexplained spikes or degradation</li>
                <li className="list-disc">For ML: inference and (if applicable) batch pipelines load tested; baseline recorded</li>
                <li className="list-disc">Results documented and shared; any known limits or caveats noted for production</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
