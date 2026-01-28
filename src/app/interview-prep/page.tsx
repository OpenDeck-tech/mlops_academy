import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/app-shell";
import { ArrowRight, HelpCircle, Layers, Server, User } from "lucide-react";

type Question = {
  id: string;
  prompt: string;
  hint: string;
  href?: string;
  linkLabel?: string;
};

export default function InterviewPrepPage() {
  const conceptQuestions: Question[] = [
    {
      id: "envs",
      prompt: "Explain the difference between development, staging, and production environments for ML systems.",
      hint: "Talk about risk, data, access, and what changes are allowed in each.",
      href: "/blank",
      linkLabel: "Review environments hub",
    },
    {
      id: "ci",
      prompt: "What should a good CI pipeline for an ML repo include?",
      hint: "Think lint, typecheck, tests, basic build, and where heavy jobs (e2e, large tests) belong.",
      href: "/environments/development/continuous-integration",
      linkLabel: "Open CI guide",
    },
    {
      id: "monitoring",
      prompt: "How would you monitor a model in production?",
      hint: "Include latency, errors, data quality, drift, and at least one business metric.",
      href: "/environments/production",
      linkLabel: "Open production guide",
    },
  ];

  const systemDesignQuestions: Question[] = [
    {
      id: "batch-online",
      prompt: "Design a system that serves batch and real‑time predictions from the same model.",
      hint: "Discuss storage, feature reuse, consistency, and deployment patterns.",
    },
    {
      id: "mcp",
      prompt: "How would you expose internal tools and data sources to an LLM safely?",
      hint: "Bring in ideas from MCP: tools, resources, prompts, and permission boundaries.",
      href: "/environments/development/mcp",
      linkLabel: "Review MCP page",
    },
  ];

  const handsOnQuestions: Question[] = [
    {
      id: "pipeline-debug",
      prompt: "A nightly training pipeline has started to fail intermittently. How do you debug it?",
      hint: "Talk logs, metrics, inputs, recent changes, and isolating the failure stage.",
    },
    {
      id: "drift",
      prompt: "You notice performance degrading in production. How do you confirm and act on drift?",
      hint: "Compare current vs training distributions and metrics; propose retraining or rollback.",
    },
  ];

  const behavioralQuestions: Question[] = [
    {
      id: "failure-story",
      prompt: "Tell me about a time an ML system you worked on failed in production.",
      hint: "Be specific about what broke, impact, your role, and what you changed afterwards.",
    },
    {
      id: "stakeholders",
      prompt: "Describe a situation where you had to align data science, engineering, and product on an MLOps decision.",
      hint: "Explain trade‑offs, communication style, and how you reached an acceptable compromise.",
      href: "/pro/communication",
      linkLabel: "See communication guide",
    },
  ];

  return (
    <AppShell title="Interview prep">
      <div className="mb-8 space-y-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Interview prep</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Use these prompts to practice telling clear, concrete stories about your MLOps work. Tie answers
            back to systems, trade‑offs, and impact.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="inline-flex items-center gap-1">
            <Server className="h-3 w-3" />
            Systems
          </Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1">
            <Layers className="h-3 w-3" />
            End‑to‑end
          </Badge>
          <Badge variant="secondary" className="inline-flex items-center gap-1">
            <User className="h-3 w-3" />
            Stakeholders
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="concepts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="concepts">Concepts</TabsTrigger>
          <TabsTrigger value="system-design">System design</TabsTrigger>
          <TabsTrigger value="hands-on">Hands‑on</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
        </TabsList>

        <TabsContent value="concepts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                Core MLOps concepts
              </CardTitle>
              <CardDescription>Warm‑up questions to make sure your fundamentals are crisp.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {conceptQuestions.map((q) => (
                <div key={q.id} className="border rounded-md px-3 py-2 space-y-1">
                  <p className="font-medium">{q.prompt}</p>
                  <p className="text-xs text-muted-foreground">{q.hint}</p>
                  {q.href && (
                    <Button
                      asChild
                      variant="link"
                      size="sm"
                      className="h-auto px-0 text-xs inline-flex items-center gap-1"
                    >
                      <Link href={q.href}>
                        {q.linkLabel ?? "Review related content"}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system-design" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System design prompts</CardTitle>
              <CardDescription>
                Focus on data flows, failure modes, observability, and how teams would operate the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {systemDesignQuestions.map((q) => (
                <div key={q.id} className="border rounded-md px-3 py-2 space-y-1">
                  <p className="font-medium">{q.prompt}</p>
                  <p className="text-xs text-muted-foreground">{q.hint}</p>
                  {q.href && (
                    <Button
                      asChild
                      variant="link"
                      size="sm"
                      className="h-auto px-0 text-xs inline-flex items-center gap-1"
                    >
                      <Link href={q.href}>
                        {q.linkLabel ?? "Review related content"}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hands-on" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hands‑on troubleshooting</CardTitle>
              <CardDescription>
                Show how you think through messy, real‑world problems with incomplete information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {handsOnQuestions.map((q) => (
                <div key={q.id} className="border rounded-md px-3 py-2 space-y-1">
                  <p className="font-medium">{q.prompt}</p>
                  <p className="text-xs text-muted-foreground">{q.hint}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavioral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Behavioral & communication</CardTitle>
              <CardDescription>
                Prepare stories that highlight ownership, collaboration, and clear communication.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {behavioralQuestions.map((q) => (
                <div key={q.id} className="border rounded-md px-3 py-2 space-y-1">
                  <p className="font-medium">{q.prompt}</p>
                  <p className="text-xs text-muted-foreground">{q.hint}</p>
                  {q.href && (
                    <Button
                      asChild
                      variant="link"
                      size="sm"
                      className="h-auto px-0 text-xs inline-flex items-center gap-1"
                    >
                      <Link href={q.href}>
                        {q.linkLabel ?? "Review related content"}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

