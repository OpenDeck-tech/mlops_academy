"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Database, GitBranch, Sparkles, Workflow, Store, CheckCircle2, AlertCircle } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { AppShell } from "@/components/app-shell";

export default function DataManagementPage() {
  return (
    <AppShell title="Data Management">
      <Link
        href="/environments/development"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Development Environment</span>
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Database className="h-8 w-8 text-green-600 dark:text-green-400" />
          <h1 className="text-4xl font-semibold">Data Management</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Data versioning, synthetic data, pipelines, feature stores, and practices for development
        </p>
      </div>

      <Tabs defaultValue="versioning" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          <TabsTrigger value="versioning">Data Versioning</TabsTrigger>
          <TabsTrigger value="synthetic">Synthetic Data</TabsTrigger>
          <TabsTrigger value="pipelines">Data Pipelines</TabsTrigger>
          <TabsTrigger value="feature-stores">Feature Stores</TabsTrigger>
          <TabsTrigger value="practices">Practices</TabsTrigger>
        </TabsList>

        {/* Data Versioning */}
        <TabsContent value="versioning" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <GitBranch className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Why Version Data in Development</CardTitle>
              </div>
              <CardDescription>
                Reproducibility and auditability depend on knowing exactly which data was used for each run.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Principles</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Track dataset identity (name + version or commit) for every training run</li>
                  <li className="list-disc">Store metadata: schema, row count, checksums, creation date</li>
                  <li className="list-disc">Use immutable versions: new data → new version, never overwrite</li>
                  <li className="list-disc">Link data versions to code (e.g. Git tag or commit) in experiment logs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tools & Patterns</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  In development, you can start simple and scale up:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>File-based:</strong> DVC, Git LFS, or object storage with versioned paths (e.g. s3://bucket/datasets/raw/v1/)</li>
                  <li className="list-disc"><strong>Catalog:</strong> Data catalogs (OpenLineage, DataHub) for lineage and discovery</li>
                  <li className="list-disc"><strong>ML-specific:</strong> MLflow Datasets, Kubeflow artifact tracking, or custom version tables</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Example: Logging data version in config</h3>
                <CodeBlock
                  code={`# config/train_v1.yaml
data:
  train_path: "s3://my-bucket/datasets/train/v2.3"
  val_path: "s3://my-bucket/datasets/val/v2.3"
  schema_version: "1.0"
model:
  ...`}
                  language="yaml"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Synthetic Data */}
        <TabsContent value="synthetic" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Using Synthetic Data in Development</CardTitle>
              </div>
              <CardDescription>
                Generate data for local testing, CI, and privacy-safe development when real data is scarce or sensitive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">When to Use Synthetic Data</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Unit and integration tests: deterministic, small datasets that exercise code paths</li>
                  <li className="list-disc">CI pipelines: no dependency on real data storage or access rights</li>
                  <li className="list-disc">Privacy: avoid PII in dev; use synthetic clones or synthetic-only subsets</li>
                  <li className="list-disc">Edge cases: generate rare classes or failure scenarios to test robustness</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Approaches</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Rule-based / Faker:</strong> Random but schema-valid data (names, dates, IDs) for non-ML tests</li>
                  <li className="list-disc"><strong>Statistical:</strong> Sample from distributions that match real data summary stats</li>
                  <li className="list-disc"><strong>Model-based:</strong> GANs, diffusion, or LLM-generated text for more realistic structure (use with care for bias and leakage)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Best Practices</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Version and commit synthetic generators so tests are reproducible</li>
                  <li className="list-disc">Document what the synthetic data is meant to simulate (and what it doesn’t)</li>
                  <li className="list-disc">Don’t train final production models on synthetic-only data unless that’s the product design; use it for dev and tests</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Pipelines */}
        <TabsContent value="pipelines" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Workflow className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Data Pipelines in Development</CardTitle>
              </div>
              <CardDescription>
                Local and dev pipelines for ingestion, transformation, and validation before staging/production.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Pipeline Stages (Dev)</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Ingest:</strong> Pull from source (DB dump, files, API) or use cached/sampled data</li>
                  <li className="list-disc"><strong>Transform:</strong> Clean, normalize, feature engineering — keep logic in code and config-driven</li>
                  <li className="list-disc"><strong>Validate:</strong> Schema checks, nulls, distributions; fail fast on contract violations</li>
                  <li className="list-disc"><strong>Output:</strong> Write versioned datasets (paths or artifact store) for training and evaluation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Development Workflow</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Run pipelines locally or in dev CI to catch issues early:
                </p>
                <CodeBlock
                  code={`# Example: run data pipeline then train (local script or CI step)
python -m src.data.pipeline --config config/data_dev.yaml --output-dir ./data/out
python -m src.training.train --config config/train_dev.yaml --data-dir ./data/out`}
                  language="text"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Use the same pipeline code (or a clear subset) in dev and prod; switch config and scale</li>
                  <li className="list-disc">Add data quality checks (e.g. Great Expectations, custom assertions) as part of the pipeline</li>
                  <li className="list-disc">Log pipeline runs (inputs, outputs, duration) for debugging and lineage</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feature Stores */}
        <TabsContent value="feature-stores" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Store className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Feature Stores in Development</CardTitle>
              </div>
              <CardDescription>
                Centralized feature computation, storage, and reuse across training and serving.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">What a Feature Store Provides</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Definition:</strong> Features defined once (names, types, transformations)</li>
                  <li className="list-disc"><strong>Offline:</strong> Historical feature values for training (point-in-time correct)</li>
                  <li className="list-disc"><strong>Online:</strong> Low-latency feature values for inference</li>
                  <li className="list-disc"><strong>Consistency:</strong> Same logic for training and serving to avoid train–serve skew</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Development Usage</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Start with a simple “feature layer”: shared Python modules that compute features; call from training and from a small serving path</li>
                  <li className="list-disc">Add a dedicated store (Feast, Tecton, custom) when you have multiple models and teams reusing the same features</li>
                  <li className="list-disc">In dev, use local or dev instances; version feature definitions and backfill logic in code</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Avoiding Train–Serve Skew</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Use one code path for feature computation in both training and serving, and validate in dev that offline and online outputs match for sample keys.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Practices */}
        <TabsContent value="practices" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Data Management Checklist</CardTitle>
              </div>
              <CardDescription>
                Practices to adopt in development for reliable, reproducible data handling.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Version every dataset used for training; log dataset ID/version in experiment metadata</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Validate data with schema and quality checks in the pipeline; fail fast in CI</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Use synthetic or sampled data for automated tests; keep generators versioned</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Document data sources, owners, and refresh frequency in a catalog or README</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Keep feature computation in shared code used by both training and serving</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Store configs (paths, versions, schemas) in code or config files, not only in notebooks</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Common Pitfalls</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li className="list-disc">Training on “latest” data without versioning → unreproducible runs</li>
                <li className="list-disc">Different feature logic in training vs serving → train–serve skew and degraded production performance</li>
                <li className="list-disc">No data validation in CI → broken pipelines only discovered in staging or prod</li>
                <li className="list-disc">Large, unversioned datasets in Git → use DVC, LFS, or object storage instead</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
