"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, MessageSquare, GitBranch, CheckCircle2, AlertCircle, Clock, Target } from "lucide-react";
import { MLOpsSidebar } from "@/components/mlops-sidebar";

export default function TeamCollaborationPage() {
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
          <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
          <h1 className="text-4xl font-semibold">Team Collaboration</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Workflow strategies for collaborative ML development
        </p>
      </div>

      <Tabs defaultValue="importance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="importance">Importance</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="coordination">Coordination</TabsTrigger>
        </TabsList>

        {/* Importance Tab */}
        <TabsContent value="importance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Why Team Collaboration Matters in ML</CardTitle>
              </div>
              <CardDescription>Understanding the critical role of collaboration in ML development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Complexity of ML Projects</h3>
                <p className="text-sm text-muted-foreground">
                  ML projects involve multiple domains: data engineering, model development, infrastructure, 
                  and deployment. No single person can master all aspects, making collaboration essential 
                  for successful ML systems.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Knowledge Sharing and Learning</h3>
                <p className="text-sm text-muted-foreground">
                  ML is a rapidly evolving field. Collaborative environments enable team members to share 
                  new techniques, best practices, and lessons learned, accelerating the entire team's 
                  growth and project success.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Quality and Reliability</h3>
                <p className="text-sm text-muted-foreground">
                  Code reviews, pair programming, and collaborative debugging catch errors early. In ML, 
                  where bugs can be subtle (data leakage, model drift, etc.), multiple perspectives are 
                  crucial for maintaining quality.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Experiment Reproducibility</h3>
                <p className="text-sm text-muted-foreground">
                  Collaborative ML requires shared experiment tracking, versioned code, data, and models. 
                  Without proper collaboration practices, experiments become irreproducible, wasting time 
                  and resources.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">5. Faster Iteration Cycles</h3>
                <p className="text-sm text-muted-foreground">
                  When teams collaborate effectively, they can parallelize work, share resources, and 
                  iterate faster. This is especially important in ML where experimentation cycles can 
                  be long and resource-intensive.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Benefits of Effective Collaboration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Reduced Technical Debt:</strong> Early code reviews and shared standards prevent accumulation of technical debt</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Better Model Performance:</strong> Diverse perspectives lead to better feature engineering and model selection</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Knowledge Preservation:</strong> Shared documentation and practices ensure knowledge isn't lost when team members leave</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Faster Onboarding:</strong> Clear collaboration practices help new team members become productive quickly</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Risk Mitigation:</strong> Multiple eyes on code and experiments catch issues before they reach production</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workflow Strategies Tab */}
        <TabsContent value="workflows" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <GitBranch className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Git Workflow Strategies</CardTitle>
              </div>
              <CardDescription>Branching strategies for collaborative ML development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Git Flow for ML Projects</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Use a structured branching strategy that accommodates both code and experiment tracking:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>main/master:</strong> Production-ready code and models</li>
                  <li className="list-disc"><strong>develop:</strong> Integration branch for ongoing development</li>
                  <li className="list-disc"><strong>feature/:</strong> New features, experiments, or model improvements</li>
                  <li className="list-disc"><strong>experiment/:</strong> Experimental branches for trying new approaches</li>
                  <li className="list-disc"><strong>hotfix/:</strong> Urgent fixes for production issues</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Pull Request Best Practices</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Keep PRs small and focused on a single change</li>
                  <li className="list-disc">Include experiment tracking links (MLflow, Weights & Biases)</li>
                  <li className="list-disc">Document model performance changes and trade-offs</li>
                  <li className="list-disc">Require at least one approval before merging</li>
                  <li className="list-disc">Run automated tests and checks before review</li>
                  <li className="list-disc">Use descriptive commit messages and PR descriptions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Experiment Branching Strategy</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For ML projects, consider a separate experiment tracking system:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc">Use experiment tracking tools (MLflow, Weights & Biases) for all experiments</li>
                  <li className="list-disc">Tag experiments with branch names and PR numbers</li>
                  <li className="list-disc">Document experiment results in PR descriptions</li>
                  <li className="list-disc">Keep experiment branches separate until results are validated</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Development Workflow Patterns</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Feature Development Workflow</h3>
                <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                  <li>Create feature branch from develop</li>
                  <li>Implement feature with tests</li>
                  <li>Run experiments and track results</li>
                  <li>Create PR with experiment links</li>
                  <li>Address review feedback</li>
                  <li>Merge to develop after approval</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Model Iteration Workflow</h3>
                <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                  <li>Create experiment branch</li>
                  <li>Track experiment in MLflow/W&B</li>
                  <li>Document findings and metrics</li>
                  <li>Share results with team for feedback</li>
                  <li>If successful, create feature PR</li>
                  <li>If not, document learnings and close branch</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Code Review Workflow</h3>
                <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                  <li>Submit PR with clear description</li>
                  <li>Automated checks run (tests, linting)</li>
                  <li>Team members review code and experiments</li>
                  <li>Address feedback and update PR</li>
                  <li>Re-request review after changes</li>
                  <li>Merge after approval and passing checks</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>The Importance of Communication</CardTitle>
              </div>
              <CardDescription>Effective communication strategies for ML teams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Why Communication is Critical</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  ML projects involve complex decisions about data, models, infrastructure, and trade-offs. 
                  Without clear communication, teams waste time on misaligned work, duplicate efforts, 
                  and miss critical insights.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Shared Understanding:</strong> Everyone needs to understand model requirements, constraints, and success metrics</li>
                  <li className="list-disc"><strong>Decision Transparency:</strong> Document why certain models, features, or approaches were chosen</li>
                  <li className="list-disc"><strong>Knowledge Transfer:</strong> Share learnings from experiments, failures, and successes</li>
                  <li className="list-disc"><strong>Risk Communication:</strong> Clearly communicate model limitations, edge cases, and potential issues</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Communication Channels and Tools</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Documentation</h4>
                    <p className="text-sm text-muted-foreground">
                      Maintain up-to-date documentation for models, APIs, data pipelines, and infrastructure. 
                      Use tools like Confluence, Notion, or markdown files in repositories.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Experiment Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Use MLflow, Weights & Biases, or similar tools to share experiment results, 
                      model metrics, and artifacts with the team.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Code Comments and Docstrings</h4>
                    <p className="text-sm text-muted-foreground">
                      Write clear docstrings explaining model logic, data transformations, and 
                      non-obvious implementation decisions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Regular Sync Meetings</h4>
                    <p className="text-sm text-muted-foreground">
                      Hold regular standups, experiment reviews, and architecture discussions to 
                      keep the team aligned and share knowledge.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Document Experiment Decisions:</strong> When sharing experiment results, explain 
                    why you tried a particular approach, what you learned, and what you'll try next.
                  </div>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Share Model Limitations:</strong> Clearly communicate what your model can and 
                    cannot do, edge cases, and known failure modes.
                  </div>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Use Visualizations:</strong> Share charts, confusion matrices, and performance 
                    dashboards to make model behavior understandable to non-technical stakeholders.
                  </div>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Write Clear PR Descriptions:</strong> Explain what changed, why it changed, 
                    how to test it, and include links to related experiments or issues.
                  </div>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Maintain Runbooks:</strong> Document common tasks, troubleshooting steps, and 
                    operational procedures for production ML systems.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coordination Tab */}
        <TabsContent value="coordination" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Team Coordination Strategies</CardTitle>
              </div>
              <CardDescription>Effective coordination for ML development teams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Resource Sharing and Management</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  ML development often requires shared resources like GPUs, compute clusters, and data storage:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Resource Scheduling:</strong> Use tools like Kubernetes, Slurm, or cloud job schedulers to manage shared compute resources</li>
                  <li className="list-disc"><strong>Experiment Queuing:</strong> Implement queues for long-running experiments to prevent resource conflicts</li>
                  <li className="list-disc"><strong>Cost Tracking:</strong> Monitor and allocate cloud costs to projects and teams</li>
                  <li className="list-disc"><strong>Shared Data Access:</strong> Use feature stores and data versioning to share datasets across the team</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Parallel Work Coordination</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Enable team members to work in parallel without conflicts:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Feature Flags:</strong> Use feature flags to allow parallel development of model features</li>
                  <li className="list-disc"><strong>Namespace Isolation:</strong> Use separate namespaces or environments for different experiments</li>
                  <li className="list-disc"><strong>Model Registry:</strong> Centralized model registry prevents conflicts and enables model sharing</li>
                  <li className="list-disc"><strong>Data Versioning:</strong> Version datasets so team members can work with consistent data snapshots</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Feedback Loops and Iteration</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Establish feedback mechanisms to improve collaboration:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="list-disc"><strong>Regular Reviews:</strong> Hold weekly experiment reviews to share results and get feedback</li>
                  <li className="list-disc"><strong>Retrospectives:</strong> Conduct regular retrospectives to identify collaboration pain points</li>
                  <li className="list-disc"><strong>Pair Programming:</strong> Use pair programming for complex model development and debugging</li>
                  <li className="list-disc"><strong>Code Review Feedback:</strong> Make code reviews constructive and educational, not just gatekeeping</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coordination Tools and Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-sm">Experiment Tracking Tools</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">MLflow: Open-source platform for managing ML lifecycle</li>
                    <li className="list-disc">Weights & Biases: Experiment tracking and collaboration</li>
                    <li className="list-disc">Neptune: ML experiment management and collaboration</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-sm">Model Registry</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Centralized model storage and versioning</li>
                    <li className="list-disc">Model metadata and lineage tracking</li>
                    <li className="list-disc">Staging and promotion workflows</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-sm">Feature Stores</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Shared feature definitions and storage</li>
                    <li className="list-disc">Feature versioning and lineage</li>
                    <li className="list-disc">Consistent features across training and serving</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-sm">Project Management</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Use Jira, Linear, or GitHub Projects to track ML work</li>
                    <li className="list-disc">Link issues to experiments and PRs</li>
                    <li className="list-disc">Track model performance improvements over time</li>
                  </ul>
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

