import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/app-shell";
import { ArrowLeft, ArrowRight, BarChart3, Code2, Compass, Star } from "lucide-react";

type JourneyStep = {
  id: string;
  title: string;
  description: string;
  href?: string;
  external?: boolean;
};

type Journey = {
  id: string;
  title: string;
  subtitle: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  audience: string;
  steps: JourneyStep[];
  /** Optional: where "Start with this path" goes (e.g. first step). If unset, links to /journeys#id */
  startHref?: string;
};

const journeys: Journey[] = [
  {
    id: "ds-to-mlops",
    title: "Data Scientist → MLOps Engineer",
    subtitle: "Turn notebooks and experiments into production systems.",
    level: "intermediate",
    duration: "4–8 weeks (self-paced)",
    audience: "Current data scientists / ML researchers",
    steps: [
      {
        id: "envs",
        title: "Map your environments",
        description: "Review Local, Development, Staging and Production environment patterns and map them to your current workflow.",
        href: "/blank",
      },
      {
        id: "ci",
        title: "Add real CI to one project",
        description: "Use the Continuous Integration page to introduce linting, typechecks and tests to an existing ML repo.",
        href: "/environments/development/continuous-integration",
      },
      {
        id: "code-practices",
        title: "Refactor one pipeline for maintainability",
        description: "Apply code best practices to one core pipeline: separate concerns, configuration, logging and error handling.",
        href: "/environments/development/code-practices",
      },
      {
        id: "monitoring",
        title: "Define monitoring and drift signals",
        description: "Draft what you would monitor for your current model in production: latency, errors, business KPIs and drift.",
      },
    ],
  },
  {
    id: "swe-to-platform",
    title: "Software Engineer → MLOps / Platform",
    subtitle: "Leverage infra and DX skills to build ML platforms.",
    level: "intermediate",
    duration: "4–6 weeks (self-paced)",
    audience: "Backend / infra / platform engineers",
    steps: [
      {
        id: "local-dev",
        title: "Harden local ML dev",
        description: "Use the Local Environment track to make local ML dev reproducible: env management, Docker, shell commands.",
        href: "/environments/local",
      },
      {
        id: "mcp",
        title: "Experiment with MCP",
        description:
          "Build a tiny MCP server from the Development → MCP page and think about how your org could expose tools and resources.",
        href: "/environments/development/mcp",
      },
      {
        id: "ops",
        title: "Clarify SLOs and runbooks",
        description: "From the Production environment mindset, write draft SLOs and a basic incident runbook for one ML service.",
        href: "/environments/production",
      },
    ],
  },
  {
    id: "career-switch",
    title: "Breaking into MLOps",
    subtitle: "Pair learning with concrete career moves.",
    level: "beginner",
    duration: "2–4 weeks (self-paced)",
    audience: "Engineers and analysts exploring MLOps roles",
    startHref: "/blog",
    steps: [
      {
        id: "overview",
        title: "Read an MLOps role overview",
        description:
          "Use the Blog and Roles sections to understand how companies describe the MLOps role and its expectations.",
        href: "/blog",
      },
      {
        id: "skills-map",
        title: "Map your skills to job descriptions",
        description:
          "Pick one or two roles and explicitly mark where you are strong vs. weak across infra, data, CI/CD, and monitoring.",
        href: "/roles",
      },
      {
        id: "network",
        title: "Connect with practitioners and recruiters",
        description:
          "Use Practitioners, Recruiters and Community links from the sidebar to have 2–3 conversations with people doing the work.",
        href: "/recruiters",
      },
    ],
  },
];

const levelLabel: Record<Journey["level"], string> = {
  beginner: "Beginner-friendly",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

/** Per-path accent colors (border + header strip + step numbers) */
const pathColors: Record<string, { border: string; accent: string; step: string }> = {
  "ds-to-mlops": {
    border: "border-l-emerald-500 dark:border-l-emerald-400",
    accent: "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300",
    step: "text-emerald-600 dark:text-emerald-400",
  },
  "swe-to-platform": {
    border: "border-l-blue-500 dark:border-l-blue-400",
    accent: "bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300",
    step: "text-blue-600 dark:text-blue-400",
  },
  "career-switch": {
    border: "border-l-amber-500 dark:border-l-amber-400",
    accent: "bg-amber-500/10 dark:bg-amber-400/10 text-amber-700 dark:text-amber-300",
    step: "text-amber-600 dark:text-amber-400",
  },
};

function getPathColor(journeyId: string) {
  return pathColors[journeyId] ?? pathColors["ds-to-mlops"];
}

export default function JourneysPage() {
  return (
    <AppShell title="Learning paths">
      <div className="mb-10 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Learning Paths</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Choose a path that matches your background and goals. Follow it linearly, or dip into the
              steps that feel most relevant right now.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>Designed for practical, real-world MLOps work</span>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-base md:text-lg">How to use these paths</CardTitle>
              <CardDescription>
                Pick one primary path and treat it as a guide. You don&apos;t need to complete every step
                before applying what you learn at work.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <BarChart3 className="h-3 w-3" />
                Skills-focused
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Compass className="h-3 w-3" />
                Self-paced
              </Badge>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {journeys.map((journey) => {
          const colors = getPathColor(journey.id);
          return (
          <Card key={journey.id} className={`flex flex-col h-full border-l-4 ${colors.border}`}>
            <CardHeader className={`space-y-2 rounded-t-lg ${colors.accent} -mx-px -mt-px px-6 pt-6`}>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-xl">{journey.title}</CardTitle>
                <Badge variant="outline">{levelLabel[journey.level]}</Badge>
              </div>
              <CardDescription>{journey.subtitle}</CardDescription>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Code2 className="h-3 w-3" />
                  {journey.audience}
                </span>
                <span>•</span>
                <span>{journey.duration}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-3">
              <div className="space-y-3 text-sm">
                {journey.steps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-2">
                    <div className={`mt-0.5 text-xs font-medium w-5 shrink-0 ${colors.step}`}>
                      {index + 1}.
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{step.title}</p>
                      <p className="text-muted-foreground text-xs md:text-sm">{step.description}</p>
                      {step.href && (
                        <Button
                          asChild
                          variant="link"
                          size="sm"
                          className="h-auto px-0 text-xs md:text-sm text-primary inline-flex items-center gap-1"
                        >
                          {step.external ? (
                            <a href={step.href} target="_blank" rel="noopener noreferrer">
                              Go to resource
                              <ArrowRight className="h-3 w-3" />
                            </a>
                          ) : (
                            <Link href={step.href}>
                              Go to resource
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 mt-auto">
                <Button asChild variant="outline" size="sm" className="w-full justify-center">
                  <Link href={journey.startHref ?? `/journeys#${journey.id}`}>
                    Start with this path
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>

      <div className="mt-10">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground px-0"
        >
          <Link href="/blank">
            <ArrowLeft className="h-3 w-3" />
            Back to environments hub
          </Link>
        </Button>
      </div>
    </AppShell>
  );
}

