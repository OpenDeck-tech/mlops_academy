import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, UserSearch, ExternalLink, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RecruitersPage() {
  const recruiters = [
    {
      id: 1,
      name: "Cody Middlebrook",
      title: "MLOps Recruiter",
      linkedinUrl: "https://www.linkedin.com/in/cody-middlebrook/",
      description: "Specialized in connecting MLOps talent with top opportunities in machine learning operations.",
    },
    // Add more recruiters here as needed
  ];

  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
      <Link href="/blank" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-[#f5f5dc]">
            <UserSearch className="h-6 w-6 text-gray-900" />
          </div>
          <h1 className="text-4xl font-semibold">MLOps Recruiters</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Connect with specialized recruiters who focus on MLOps roles and opportunities
        </p>
      </div>

      {recruiters.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No recruiters added yet. Check back soon!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recruiters.map((recruiter) => (
            <Card key={recruiter.id} className="transition-all hover:shadow-lg h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{recruiter.name}</CardTitle>
                <CardDescription className="text-sm mt-1">
                  {recruiter.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {recruiter.description}
                </p>
                <div className="pt-4 border-t">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-2 w-full"
                  >
                    <a
                      href={recruiter.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Linkedin className="h-4 w-4" />
                      View LinkedIn Profile
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

