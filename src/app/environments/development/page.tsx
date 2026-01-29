import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, GitBranch, Code, Users, Database, Network } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export default function DevelopmentEnvironmentPage() {
  const topics = [
    {
      id: "continuous-integration",
      title: "Continuous Integration",
      description: "Automate testing and validation in development workflows",
      icon: GitBranch,
      content: "Learn CI pipelines, automated testing, code quality checks, build automation, and integration strategies for ML development workflows.",
    },
    {
      id: "code-practices",
      title: "Code Best Practices",
      description: "Development standards and practices for ML codebases",
      icon: Code,
      content: "Explore coding standards, version control best practices, code review processes, documentation, and maintainable ML code patterns.",
    },
    {
      id: "collaboration",
      title: "Team Collaboration",
      description: "Workflow strategies for collaborative ML development",
      icon: Users,
      content: "Understand collaboration workflows, branch strategies, experiment tracking, shared resources, and team coordination in ML projects.",
    },
    {
      id: "data-management",
      title: "Data Management",
      description: "Handling data in development environments",
      icon: Database,
      content: "Learn data versioning, synthetic data, data pipelines, feature stores, and data management practices for development.",
    },
    {
      id: "mcp",
      title: "Model Context Protocol",
      description: "Standardized integration protocol for AI models and external tools",
      icon: Network,
      content: "Explore MCP for connecting AI models to data sources, MLOps tools, and external services in a standardized way.",
    },
  ];

  return (
    <AppShell title="Development">
      <Link href="/blank" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors px-2 py-1 -ml-2 rounded hover:bg-accent/50">
        <ArrowLeft className="h-4 w-4" />
        Back to Environments
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-semibold mb-2">Development Environment</h1>
        <p className="text-muted-foreground text-lg">
          Best practices for development workflows and collaboration
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = topic.icon;
          const href = topic.id === "collaboration"
            ? "/environments/development/collaboration"
            : topic.id === "code-practices"
            ? "/environments/development/code-practices"
            : topic.id === "continuous-integration"
            ? "/environments/development/continuous-integration"
            : topic.id === "data-management"
            ? "/environments/development/data-management"
            : topic.id === "mcp"
            ? "/environments/development/mcp"
            : undefined;
          const cardContent = (
            <>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
                    <Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                </div>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{topic.content}</p>
              </CardContent>
            </>
          );
          
          return (
            <Card 
              key={topic.id} 
              className={`h-full transition-all hover:shadow-lg ${href ? "cursor-pointer" : ""}`}
            >
              {href ? (
                <Link href={href} className="block h-full">
                  {cardContent}
                </Link>
              ) : (
                cardContent
              )}
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}

