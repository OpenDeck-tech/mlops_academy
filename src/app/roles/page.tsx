import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";

export default async function RolesPage() {
  let isSignedIn = false;
  try {
    const sess = await getSession();
    isSignedIn = Boolean(sess.userId || sess.email);
  } catch {
    isSignedIn = false;
  }

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
    {
      id: 3,
      title: "Senior MLOps Engineer",
      company: "Marks & Spencer",
      location: "London, Greater London",
      url: "https://jobs.marksandspencer.com/job-search/digital-tech/london-greater-london/senior-mlops-engineer/300006962812844?utm_medium=JobSlots&utm_source=LinkedIn&utm_campaign=33_5568_LinkedIn&utm_term=1x1&utm_content=JobFeed",
      description:
        "Digital & Tech role working with data scientists to deliver ML solutions: design and implement ML pipelines and infrastructure, productionise models, embed automation and monitoring, and drive MLOps maturity. Python, Spark, Azure, CI/CD for ML. Hybrid (office 3 days/week).",
    },
    {
      id: 4,
      title: "Senior Machine Learning Engineer (MLOps)",
      company: "ASOS",
      location: "See listing",
      url: "https://jobs.smartrecruiters.com/ASOS/744000104699685-senior-machine-learning-engineer-mlops-",
      description:
        "Design and implement reusable ML templates, deployment patterns, and MLOps tooling for scalable ML solutions. Collaborate with ML teams (Forecasting, Recommendations, Marketing, etc.), drive standardisation, CI/CD for ML, model registries, monitoring, and feature management. Azure, Python, MLflow, Docker/Kubernetes. Hybrid (2+ days/week in office).",
    },
    {
      id: 5,
      title: "Open role",
      company: "Ohme",
      location: "See listing",
      url: "https://ohme-ev.com/job-postings/?gh_jid=4694069101",
      description:
        "Ohme is an EV charging and smart energy technology company. View the full job description and details at the link below.",
    },
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

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="text-xl">
            {isSignedIn ? "You’re browsing as a signed-in user" : "Want to save your progress?"}
          </CardTitle>
          <CardDescription>
            {isSignedIn
              ? "Head to your dashboard for subscription and account settings."
              : "Create an account (or sign in) to access personalized features, learning paths, and Pro content."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {isSignedIn ? (
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild className="bg-[#ADFF2F] hover:bg-[#9AFF1F] text-black font-semibold">
                <Link href="/signup">Create account</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Sign in</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>

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

