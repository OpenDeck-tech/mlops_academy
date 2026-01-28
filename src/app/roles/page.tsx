import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RolesPage() {
  const roles = [
    {
      id: 1,
      title: "MLOps engineer",
      company: "Accenture",
      location: "Vilnius (per listing)",
      url: "https://www.accenture.com/lv-en/careers/jobdetails?id=R00218776_en",
      description:
        "MLOps engineer role focused on building cloud MLOps pipelines, CI/CD orchestration, model deployment, versioning, monitoring, and collaboration with data teams.",
    },
    {
      id: 2,
      title: "MLOps Engineer",
      company: "J.P. Morgan",
      location: "Per job listing",
      url: "https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/job/210689350?utm_medium=jobboard&utm_source=LinkedIn",
      description:
        "MLOps role in a large-scale financial environment, focusing on cloud MLOps pipelines, CI/CD, model deployment, and close collaboration with data science and engineering teams.",
    },
    // Add more roles here as needed
  ];

  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
      <Link
        href="/blank"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-[#f5f5dc]">
            <Briefcase className="h-6 w-6 text-gray-900" />
          </div>
          <h1 className="text-4xl font-semibold">Roles</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Curated MLOps roles. We’ll be updating these manually for now.
        </p>
      </div>

      {roles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No roles added yet. Check back soon!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.id} className="transition-all hover:shadow-lg h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-sm mt-1">
                  {role.company}
                  {role.location ? ` • ${role.location}` : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 flex-1">{role.description}</p>
                <div className="pt-4 border-t">
                  <Button asChild variant="outline" size="sm" className="gap-2 w-full">
                    <a
                      href={role.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      View role
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

