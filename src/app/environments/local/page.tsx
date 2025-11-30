import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, TestTube, Container, Terminal, Settings, Code2 } from "lucide-react";

export default function LocalEnvironmentPage() {
  const topics = [
    {
      id: "testing",
      title: "Testing",
      description: "Unit tests, integration tests, and testing strategies for ML code",
      icon: TestTube,
      content: "Learn testing frameworks, unit testing for ML models, integration testing, mocking strategies, and test-driven development for ML projects.",
    },
    {
      id: "docker",
      title: "Docker",
      description: "Containerization and container management for local development",
      icon: Container,
      content: "Master Docker basics, Dockerfiles for ML, docker-compose, container orchestration, and best practices for local ML development environments.",
    },
    {
      id: "shell-commands",
      title: "Shell Commands",
      description: "Essential command-line tools and workflows for ML development",
      icon: Terminal,
      content: "Explore essential shell commands, automation scripts, environment management, file operations, and productivity tips for ML engineers.",
    },
    {
      id: "local-setup",
      title: "Local Setup",
      description: "Configure and optimize your local development environment",
      icon: Settings,
      content: "Learn environment setup, virtual environments, dependency management, IDE configuration, and tools for productive local ML development.",
    },
    {
      id: "programming",
      title: "Programming",
      description: "LeetCode questions and answers on data structures and software engineering",
      icon: Code2,
      content: "Practice coding with LeetCode problems covering data structures, algorithms, and software engineering principles essential for MLOps development.",
    },
  ];

  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
      <Link href="/blank" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Environments
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-semibold mb-2">Local Environment</h1>
        <p className="text-muted-foreground text-lg">
          Set up and optimize your local development workspace
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = topic.icon;
          const href = topic.id === "programming" 
            ? "/environments/local/programming" 
            : topic.id === "testing"
            ? "/environments/local/testing"
            : topic.id === "docker"
            ? "/environments/local/docker"
            : topic.id === "local-setup"
            ? "/environments/local/local-setup"
            : undefined;
          const cardContent = (
            <>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
    </div>
  );
}

