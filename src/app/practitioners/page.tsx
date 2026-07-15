import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Users, ExternalLink, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/app-shell";

export default function PractitionersPage() {
  const practitioners = [
    {
      id: 1,
      name: "João Paulo Euko",
      title: "MLOps Engineer @ BioNTech / InstaDeep",
      linkedinUrl: "https://www.linkedin.com/in/joaopeuko/",
      websiteUrl: "https://joaopeuko.com",
      description:
        "Builds the infrastructure that lets ML research ship as production systems—CI/CD pipelines, Kubernetes deployments, and scalable platforms for AI at BioNTech/InstaDeep.",
      featured: true,
    },
  ];

  return (
    <AppShell title="Practitioners">
      <Link
        href="/blank"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors px-2 py-1 -ml-2 rounded hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Environments
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-semibold">MLOps Practitioners</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Learn from people shipping ML in production. Reach out for informal conversations about how they
          work, what they&apos;ve learned, and how they got started.
        </p>
      </div>

      {practitioners.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No practitioners added yet. Check back soon!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practitioners.map((practitioner) => (
            <Card
              key={practitioner.id}
              className={`transition-all hover:shadow-lg h-full flex flex-col ${
                practitioner.featured ? "border-l-4 border-l-blue-500 dark:border-l-blue-400" : ""
              }`}
            >
              <CardHeader>
                {practitioner.featured && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                    Featured practitioner
                  </p>
                )}
                <CardTitle className="text-xl">{practitioner.name}</CardTitle>
                <CardDescription className="text-sm mt-1">{practitioner.title}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 flex-1">{practitioner.description}</p>
                <div className="pt-4 border-t space-y-2">
                  <Button asChild variant="outline" size="sm" className="gap-2 w-full">
                    <a
                      href={practitioner.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Linkedin className="h-4 w-4" />
                      View LinkedIn Profile
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                  {practitioner.websiteUrl && (
                    <Button asChild variant="ghost" size="sm" className="gap-2 w-full">
                      <a
                        href={practitioner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        Visit website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
