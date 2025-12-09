"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Network, Zap, Database, Code, CheckCircle2, AlertCircle, Plug, Server, Shield } from "lucide-react";
import { MLOpsSidebar } from "@/components/mlops-sidebar";
import { CodeBlock } from "@/components/code-block";

export default function MCPPage() {
  return (
    <div className="flex min-h-screen">
      <MLOpsSidebar />
      <div className="flex-1 min-h-screen container mx-auto max-w-7xl px-6 py-12 transition-all duration-300" style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <Link 
          href="/environments/development" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Development Environment</span>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Network className="h-8 w-8 text-green-600 dark:text-green-400" />
            <h1 className="text-4xl font-semibold">Model Context Protocol (MCP)</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Standardized integration protocol for connecting AI models to external tools and data sources
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mlops">MLOps Benefits</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Network className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>What is Model Context Protocol?</CardTitle>
                </div>
                <CardDescription>Understanding the open standard for AI model integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    The <strong>Model Context Protocol (MCP)</strong> is an open-source standard introduced by Anthropic 
                    in November 2024 that provides a universal interface for connecting large language models (LLMs) 
                    and AI applications to external tools, systems, and data sources. MCP enables AI models to access 
                    real-time data and execute functions beyond their initial training, making them more useful and 
                    context-aware in production environments.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Key Characteristics</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc"><strong>Open Standard:</strong> Freely available protocol that anyone can implement</li>
                    <li className="list-disc"><strong>Client-Server Architecture:</strong> AI applications (clients) communicate with MCP servers that expose capabilities</li>
                    <li className="list-disc"><strong>Multi-Language Support:</strong> SDKs available in Python, TypeScript, Java, Go, Rust, and more</li>
                    <li className="list-disc"><strong>Secure by Design:</strong> Built with security and permission management in mind</li>
                    <li className="list-disc"><strong>Extensible:</strong> Supports custom tools, resources, and prompts for domain-specific needs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Core Components</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1 text-sm">Tools</h4>
                      <p className="text-sm text-muted-foreground">
                        Functions that AI models can call to perform actions, such as querying databases, 
                        executing code, or interacting with APIs.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-sm">Resources</h4>
                      <p className="text-sm text-muted-foreground">
                        Data sources that AI models can read from, such as files, databases, or external APIs.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-sm">Prompts</h4>
                      <p className="text-sm text-muted-foreground">
                        Reusable prompt templates that can be dynamically populated with context from resources.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Why MCP Matters for AI Development</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Standardized Integration:</strong> Eliminates the need for custom integrations 
                      between every AI application and external service, reducing development time and complexity.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Real-Time Data Access:</strong> Enables AI models to work with current, live data 
                      rather than being limited to their training data, making them more useful in production.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Tool Integration:</strong> Allows AI models to perform actions, not just generate 
                      text, enabling more sophisticated workflows and automation.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Vendor Independence:</strong> Open standard means you're not locked into a single 
                      vendor's ecosystem, providing flexibility and future-proofing.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Security and Permissions:</strong> Built-in mechanisms for controlling what AI 
                      models can access and do, critical for enterprise deployments.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Industry Adoption</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  MCP has rapidly gained adoption from major AI providers and tech companies:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>OpenAI:</strong> Integrated MCP into ChatGPT desktop app, Agents SDK, and Responses API (March 2025)</li>
                  <li className="list-disc"><strong>Google DeepMind:</strong> Announced support for MCP in upcoming Gemini models and infrastructure (April 2025)</li>
                  <li className="list-disc"><strong>Microsoft:</strong> Integrated MCP into GitHub, Microsoft 365, and Azure platforms</li>
                  <li className="list-disc"><strong>Anthropic:</strong> Original creator and maintainer of the protocol</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MLOps Benefits Tab */}
          <TabsContent value="mlops" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Server className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>MCP in MLOps Workflows</CardTitle>
                </div>
                <CardDescription>How Model Context Protocol enhances ML operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Enhanced Data Access</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    MCP enables AI models and ML systems to securely access and process data from various 
                    external sources in real-time:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Connect to databases (PostgreSQL, MongoDB, BigQuery) for live data queries</li>
                    <li className="list-disc">Access cloud storage (S3, GCS, Azure Blob) for model artifacts and datasets</li>
                    <li className="list-disc">Integrate with feature stores (Feast, Tecton) for consistent feature access</li>
                    <li className="list-disc">Query data lakes and data warehouses for training and inference data</li>
                    <li className="list-disc">Access APIs and external services for real-time data enrichment</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Tool Integration for ML Pipelines</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Standardize the integration of AI models with MLOps tools and services:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc"><strong>Experiment Tracking:</strong> Integrate with MLflow, Weights & Biases, or Neptune for experiment logging</li>
                    <li className="list-disc"><strong>Model Registry:</strong> Connect to model registries for versioning and deployment workflows</li>
                    <li className="list-disc"><strong>Data Preprocessing:</strong> Execute data transformation pipelines through MCP tools</li>
                    <li className="list-disc"><strong>Model Evaluation:</strong> Run evaluation scripts and metrics calculation as MCP tools</li>
                    <li className="list-disc"><strong>Deployment Automation:</strong> Trigger deployments, A/B tests, and rollbacks through standardized interfaces</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Model Monitoring and Observability</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use MCP to connect monitoring systems with AI models for better observability:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Query model performance metrics from monitoring dashboards</li>
                    <li className="list-disc">Access drift detection results and alerts</li>
                    <li className="list-disc">Retrieve production logs and error traces</li>
                    <li className="list-disc">Integrate with observability platforms (Datadog, New Relic, Prometheus)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">4. Scalability and Flexibility</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    MCP's open standard and multi-language support enable organizations to build tailored 
                    connections while maintaining compatibility:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Build custom MCP servers for domain-specific ML tools</li>
                    <li className="list-disc">Maintain compatibility with the broader MCP ecosystem</li>
                    <li className="list-disc">Scale integrations across multiple teams and projects</li>
                    <li className="list-disc">Respect data access permissions and security policies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Database className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>MLOps Use Cases for MCP</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">AI-Powered MLOps Assistants</h3>
                    <p className="text-sm text-muted-foreground">
                      Build AI assistants that help ML engineers by accessing experiment results, model registries, 
                      and monitoring dashboards through MCP, enabling natural language queries about model performance, 
                      experiment history, and system health.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">Automated Model Operations</h3>
                    <p className="text-sm text-muted-foreground">
                      Use MCP to enable AI models to automatically trigger retraining pipelines, deploy models, 
                      or rollback deployments based on monitoring alerts and performance metrics.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">Data Pipeline Orchestration</h3>
                    <p className="text-sm text-muted-foreground">
                      Integrate MCP with data orchestration tools (Airflow, Prefect) to enable AI-driven 
                      pipeline optimization, data quality checks, and automated data validation.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">Feature Engineering Automation</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect AI models to feature stores and data sources through MCP to enable automated 
                      feature discovery, validation, and engineering workflows.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">Model Documentation and Knowledge</h3>
                    <p className="text-sm text-muted-foreground">
                      Use MCP to connect AI assistants to model registries, experiment tracking systems, and 
                      documentation, enabling automatic generation of model cards, experiment summaries, and 
                      knowledge base queries.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Code className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Getting Started with MCP</CardTitle>
                </div>
                <CardDescription>Setting up MCP in your MLOps environment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Install MCP SDK</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Choose the SDK for your preferred language:
                  </p>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium mb-1 text-sm">Python</h4>
                      <CodeBlock code="pip install mcp" language="bash" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-sm">TypeScript/Node.js</h4>
                      <CodeBlock code="npm install @modelcontextprotocol/sdk" language="bash" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Create an MCP Server</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    MCP servers expose tools, resources, and prompts. Here's a simple Python example:
                  </p>
                  <CodeBlock 
                    code={`from mcp import Server, Tool

# Create an MCP server
server = Server("mlops-tools")

# Define a tool for querying model metrics
@server.tool()
async def get_model_metrics(model_name: str, version: str):
    """
    Get performance metrics for a specific model version.
    
    Args:
        model_name: Name of the model
        version: Model version to query
    
    Returns:
        Dictionary containing model metrics
    """
    # Your implementation to fetch metrics from MLflow, etc.
    metrics = await fetch_metrics_from_registry(model_name, version)
    return metrics

# Start the server
if __name__ == "__main__":
    server.run()`}
                    language="python"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Connect an MCP Client</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect your AI application to the MCP server:
                  </p>
                  <CodeBlock 
                    code={`from mcp import Client

# Create a client and connect to the server
client = Client("http://localhost:8000")

# List available tools
tools = await client.list_tools()
print(f"Available tools: {[t.name for t in tools]}")

# Call a tool
metrics = await client.call_tool(
    "get_model_metrics",
    {"model_name": "fraud-detection", "version": "v1.2.3"}
)
print(f"Model metrics: {metrics}")`}
                    language="python"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">4. Define Resources</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Expose data sources as MCP resources:
                  </p>
                  <CodeBlock 
                    code={`@server.resource("model-registry://models/{model_name}")
async def get_model_info(model_name: str):
    """
    Get information about a model from the registry.
    """
    model_info = await fetch_model_from_registry(model_name)
    return {
        "name": model_info.name,
        "version": model_info.version,
        "metrics": model_info.metrics,
        "created_at": model_info.created_at.isoformat()
    }`}
                    language="python"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Plug className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Integrating MCP with MLOps Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">MLflow Integration</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create an MCP server that exposes MLflow functionality:
                  </p>
                  <CodeBlock 
                    code={`import mlflow
from mcp import Server, Tool

server = Server("mlflow-mcp")

@server.tool()
async def get_experiment_runs(experiment_id: str):
    """Get all runs for an MLflow experiment."""
    runs = mlflow.search_runs(experiment_ids=[experiment_id])
    return runs.to_dict("records")

@server.tool()
async def register_model(run_id: str, model_name: str):
    """Register a model from an MLflow run."""
    mlflow.register_model(f"runs:/{run_id}/model", model_name)
    return {"status": "registered", "model_name": model_name}`}
                    language="python"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Feature Store Integration</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect to feature stores for real-time feature access:
                  </p>
                  <CodeBlock 
                    code={`from feast import FeatureStore
from mcp import Server, Resource

fs = FeatureStore(repo_path="./feature_repo")
server = Server("feast-mcp")

@server.resource("feast://features/{feature_name}")
async def get_feature(feature_name: str, entity_id: str):
    """Get feature values for an entity."""
    features = fs.get_online_features(
        features=[feature_name],
        entity_rows=[{"entity_id": entity_id}]
    )
    return features.to_dict()`}
                    language="python"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Database Integration</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Expose database queries as MCP tools:
                  </p>
                  <CodeBlock 
                    code={`import asyncpg
from mcp import Server, Tool

server = Server("database-mcp")
pool = await asyncpg.create_pool("postgresql://...")

@server.tool()
async def query_model_metrics(
    model_name: str,
    start_date: str,
    end_date: str
):
    """Query model performance metrics from database."""
    async with pool.acquire() as conn:
        rows = await conn.fetch("""
            SELECT * FROM model_metrics
            WHERE model_name = $1
            AND timestamp BETWEEN $2 AND $3
        """, model_name, start_date, end_date)
        return [dict(row) for row in rows]`}
                    language="python"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>MLOps MCP Examples</CardTitle>
                </div>
                <CardDescription>Real-world examples of MCP in MLOps workflows</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Example 1: AI Assistant for Model Monitoring</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    An AI assistant that helps ML engineers monitor and debug production models:
                  </p>
                  <CodeBlock 
                    code={`# MCP Server exposing monitoring tools
@server.tool()
async def check_model_health(model_name: str):
    """Check if a model is healthy based on recent metrics."""
    metrics = await get_recent_metrics(model_name, hours=24)
    
    issues = []
    if metrics["latency_p95"] > 1000:
        issues.append("High latency detected")
    if metrics["error_rate"] > 0.01:
        issues.append("High error rate")
    if metrics["drift_score"] > 0.1:
        issues.append("Data drift detected")
    
    return {
        "model": model_name,
        "status": "healthy" if not issues else "degraded",
        "issues": issues,
        "metrics": metrics
    }

@server.tool()
async def get_model_explanations(model_name: str, prediction_id: str):
    """Get feature importance and explanations for a prediction."""
    explanation = await generate_shap_explanation(model_name, prediction_id)
    return explanation`}
                    language="python"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Example 2: Automated Experiment Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use MCP to enable AI-driven analysis of experiment results:
                  </p>
                  <CodeBlock 
                    code={`@server.tool()
async def analyze_experiment(experiment_id: str):
    """Analyze an experiment and provide insights."""
    runs = await get_experiment_runs(experiment_id)
    
    # Find best run
    best_run = max(runs, key=lambda r: r["metrics"]["f1_score"])
    
    # Analyze hyperparameter impact
    hyperparam_analysis = analyze_hyperparameters(runs)
    
    # Check for overfitting
    train_metrics = best_run["metrics"]["train_accuracy"]
    val_metrics = best_run["metrics"]["val_accuracy"]
    overfitting = train_metrics - val_metrics > 0.1
    
    return {
        "best_run": best_run["run_id"],
        "best_f1": best_run["metrics"]["f1_score"],
        "hyperparameter_insights": hyperparam_analysis,
        "overfitting_detected": overfitting,
        "recommendations": generate_recommendations(runs)
    }`}
                    language="python"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Example 3: Data Pipeline Orchestration</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Integrate MCP with data pipelines for AI-driven orchestration:
                  </p>
                  <CodeBlock 
                    code={`@server.tool()
async def trigger_data_pipeline(pipeline_name: str, config: dict):
    """Trigger a data pipeline with specific configuration."""
    pipeline = get_pipeline(pipeline_name)
    run_id = await pipeline.run_async(config)
    return {"run_id": run_id, "status": "triggered"}

@server.tool()
async def check_data_quality(dataset_name: str):
    """Check data quality metrics for a dataset."""
    quality_metrics = await compute_data_quality(dataset_name)
    
    issues = []
    if quality_metrics["missing_rate"] > 0.05:
        issues.append("High missing value rate")
    if quality_metrics["duplicate_rate"] > 0.01:
        issues.append("Duplicate records detected")
    
    return {
        "dataset": dataset_name,
        "quality_score": quality_metrics["overall_score"],
        "issues": issues,
        "metrics": quality_metrics
    }`}
                    language="python"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Best Practices Tab */}
          <TabsContent value="best-practices" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Security and Permissions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Implement Access Control</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Use authentication and authorization for MCP servers</li>
                    <li className="list-disc">Implement role-based access control (RBAC) for different tools and resources</li>
                    <li className="list-disc">Validate and sanitize all inputs to prevent injection attacks</li>
                    <li className="list-disc">Use least-privilege principles when granting access</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Secure Data Access</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Use encrypted connections (TLS/SSL) for all MCP communications</li>
                    <li className="list-disc">Implement data masking for sensitive information</li>
                    <li className="list-disc">Log all data access for audit purposes</li>
                    <li className="list-disc">Respect data privacy regulations (GDPR, CCPA)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Error Handling and Validation</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Validate all tool parameters before execution</li>
                    <li className="list-disc">Implement proper error handling and return meaningful error messages</li>
                    <li className="list-disc">Set timeouts for long-running operations</li>
                    <li className="list-disc">Use rate limiting to prevent abuse</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Development Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Clear Tool Documentation:</strong> Write comprehensive docstrings for all tools, 
                      including parameter descriptions, return types, and example usage.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Idempotent Operations:</strong> Design tools to be idempotent when possible, 
                      allowing safe retries and preventing unintended side effects.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Version Your MCP Servers:</strong> Use versioning for your MCP servers to enable 
                      backward compatibility and gradual migrations.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Monitor and Log:</strong> Implement comprehensive logging and monitoring for MCP 
                      servers to track usage, performance, and errors.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Test Thoroughly:</strong> Write unit tests, integration tests, and end-to-end 
                      tests for your MCP servers, especially for production-critical tools.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Resource Management:</strong> Properly manage connections, memory, and compute 
                      resources in your MCP servers to prevent leaks and ensure scalability.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>MLOps-Specific Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">Model Versioning</h3>
                    <p className="text-sm text-muted-foreground">
                      Always include model version information in tool calls and responses. This ensures 
                      traceability and helps debug issues in production.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">Experiment Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Integrate MCP tools with experiment tracking systems to automatically log tool usage 
                      and results as part of experiment metadata.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">Cost Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitor and limit resource usage for expensive operations (model inference, data processing) 
                      to control costs in production environments.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">Performance Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Cache frequently accessed data, use async operations for I/O-bound tasks, and optimize 
                      database queries to ensure MCP servers perform well under load.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

