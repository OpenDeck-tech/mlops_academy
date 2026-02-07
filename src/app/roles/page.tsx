import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { getServerLocale } from "@/lib/i18n-server";
import { translate } from "@/lib/i18n";

export default async function RolesPage() {
  const [sessResult, locale] = await Promise.all([getSession().then((s) => ({ isSignedIn: Boolean(s.userId || s.email) })).catch(() => ({ isSignedIn: false })), getServerLocale()]);
  const isSignedIn = sessResult.isSignedIn;
  const t = (key: string) => translate(locale, key);

  type Region = "London" | "USA" | "China" | "Contract" | "Other";

  const roles: Array<{
    id: number;
    title: string;
    company: string;
    location: string;
    region: Region;
    url: string;
    description: string;
  }> = [
    {
      id: 1,
      title: "MLOps engineer",
      company: "Accenture",
      location: "Vilnius (per listing)",
      region: "Other",
      url: "https://www.accenture.com/lv-en/careers/jobdetails?id=R00218776_en",
      description:
        "MLOps engineer role focused on building cloud MLOps pipelines, CI/CD orchestration, model deployment, versioning, monitoring, and collaboration with data teams.",
    },
    {
      id: 2,
      title: "MLOps Engineer",
      company: "J.P. Morgan",
      location: "London",
      region: "London",
      url: "https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/job/210689350?utm_medium=jobboard&utm_source=LinkedIn",
      description:
        "MLOps role in a large-scale financial environment, focusing on cloud MLOps pipelines, CI/CD, model deployment, and close collaboration with data science and engineering teams.",
    },
    {
      id: 4,
      title: "Senior Machine Learning Engineer (MLOps)",
      company: "ASOS",
      location: "See listing",
      region: "London",
      url: "https://jobs.smartrecruiters.com/ASOS/744000104699685-senior-machine-learning-engineer-mlops-",
      description:
        "Design and implement reusable ML templates, deployment patterns, and MLOps tooling for scalable ML solutions. Collaborate with ML teams (Forecasting, Recommendations, Marketing, etc.), drive standardisation, CI/CD for ML, model registries, monitoring, and feature management. Azure, Python, MLflow, Docker/Kubernetes. Hybrid (2+ days/week in office).",
    },
    {
      id: 6,
      title: "MLOps Engineer",
      company: "Tekever",
      location: "See listing",
      region: "Other",
      url: "https://careers.tekever.com/jobs/6439831-mlops-engineer?utm_source=LinkedIn",
      description:
        "MLOps Engineer role at Tekever. View the full job description and details at the link below.",
    },
    {
      id: 7,
      title: "Senior MLOps Engineer",
      company: "Optima Partners",
      location: "Charlotte Square, Edinburgh · Hybrid",
      region: "London",
      url: "https://careers.optimapartners.co.uk/jobs/7084649-senior-mlops-engineer?utm_source=LinkedIn",
      description:
        "Build and scale ML pipelines, data platforms, and production-ready models. MLOps, Data Engineering, and DevOps: MLflow, Databricks, Azure, CI/CD, Terraform. PyTorch, TensorFlow, Scikit-learn. 3+ years MLOps/ML engineering. Data consultancy headquartered in Edinburgh, UK.",
    },
    {
      id: 8,
      title: "Senior MLOps Engineer - Football Metrics",
      company: "Hudl",
      location: "London, Barcelona, Remote (UK) or Remote (Spain)",
      region: "London",
      url: "https://job-boards.greenhouse.io/hudl/jobs/7212118",
      description:
        "Build and scale ML infrastructure for next-generation sports analytics. Own MLOps pipelines from raw data to production; CI/CD for ML, retraining automation, monitoring. Collaborate with Data Scientists and ML Engineers. MLflow, Kubeflow, Airflow, Feast, DVC, W&B; Python, AWS/SageMaker. London, Barcelona or remote UK/Spain.",
    },
    {
      id: 9,
      title: "Senior MLOps Engineer – LLMOps",
      company: "TRM Labs",
      location: "United States",
      region: "USA",
      url: "https://job-boards.greenhouse.io/trmlabs/jobs/5711370004?gh_src=21d21f294us",
      description:
        "Blockchain intelligence company. Build and scale AI/ML infrastructure for LLMs and agentic systems: CI/CD for training, evaluation, deployment; Langfuse, GitHub Actions; vector DBs, feature stores, model registries; LangChain, LlamaIndex, vLLM, MLflow, BentoML. Python, Docker, Kubernetes, Terraform. 5+ years Data/ML Engineer experience. US base salary range $200k–$220k.",
    },
    {
      id: 10,
      title: "Cloud - ML Platform Engineer",
      company: "Bedrock Robotics",
      location: "New York & San Francisco",
      region: "USA",
      url: "https://job-boards.greenhouse.io/bedrockrobotics/jobs/4807788008?gh_src=gnfll9db8us",
      description:
        "Senior/Staff ML Platform Engineers for physical-world autonomy (robotics, construction). Build labeling and evaluation pipelines, data mining, experiment tracking, scaled training; MLOps frameworks and best practices. Ray, Kubeflow, MLflow, Metaflow, Airflow, Feast, Vertex, SageMaker. 5+ years ML platform/infra. NY or SF.",
    },
    {
      id: 11,
      title: "Senior MLOps Engineer",
      company: "LVT",
      location: "Remote",
      region: "USA",
      url: "https://lvt.wd501.myworkdayjobs.com/LVT/job/Remote/Senior-MLOps-Engineer_JR100009?source=LinkedIn",
      description:
        "Senior MLOps Engineer role at LVT. Remote position. View the full job description and details at the link below.",
    },
    {
      id: 12,
      title: "ML Ops Engineer — Agentic AI Lab (Founding Team)",
      company: "Fabrion",
      location: "See listing",
      region: "Other",
      url: "https://jobs.ashbyhq.com/fabrion/277bb01a-80b0-4ee3-b0ef-20287174f597/application?utm_source=7b4V09v5gW",
      description:
        "ML Ops Engineer role on the Agentic AI Lab founding team at Fabrion. View the full job description and details at the link below.",
    },
    {
      id: 13,
      title: "AIML - Software Engineer, Machine Learning Platform & Infrastructure",
      company: "Apple",
      location: "United States (see listing)",
      region: "USA",
      url: "https://jobs.apple.com/en-us/details/200617349/aiml-software-engineer-machine-learning-platform-infrastructure?board_id=17682",
      description:
        "Software Engineer role in Apple's AIML organization, focused on Machine Learning Platform and Infrastructure. View the full job description and details at the link below.",
    },
    {
      id: 14,
      title: "Open role",
      company: "Tesla",
      location: "See listing",
      region: "Other",
      url: "https://app.mokahr.com/apply/tesla/68247?source=LinkedIn#/job/ee145253-c9f2-4188-84b4-8852d610da05",
      description:
        "Tesla role via Mokahr. View the full job title, description, and location at the link below.",
    },
    {
      id: 15,
      title: "Lead MLOps Engineer",
      company: "Randstad",
      location: "London Area, United Kingdom",
      region: "London",
      url: "https://www.linkedin.com/jobs/view/4356820024/",
      description:
        "Lead MLOps Engineer – London, permanent. Own ML infrastructure and MLOps foundations; CI/CD for ML, productionise models, Docker/Kubernetes, Terraform/Helm. Staff/lead-level MLOps or DevOps. Python, PyTorch/TensorFlow, AWS/GCP/Azure. Relocation support possible.",
    },
    {
      id: 16,
      title: "Senior Python Engineer - AI",
      company: "Man Group",
      location: "London, England, United Kingdom",
      region: "London",
      url: "https://www.linkedin.com/jobs/view/4292932813/",
      description:
        "Build the firm's core AI and ML platform in the Machine Learning Technology team. Partner with research, trading, and operations to design and deploy AI/ML applications and agents. GenAI and ML; Python, production services, software best practices. Advantageous: TypeScript/React/Next.js, PostgreSQL/Redis, GenAI agents, model fine-tuning. Global alternative investment manager; London HQ.",
    },
    {
      id: 17,
      title: "MLOps Engineer",
      company: "See listing",
      location: "London",
      region: "London",
      url: "https://www.linkedin.com/jobs/view/4367243343/",
      description:
        "MLOps engineer role in investment banking, London. View the full job title, company, and description at the link below.",
    },
    {
      id: 18,
      title: "See listing",
      company: "See listing",
      location: "See listing",
      region: "Contract",
      url: "https://www.linkedin.com/jobs/view/4317479290/",
      description:
        "Contract MLOps-related role. View the full job title, company, location, and description at the link below.",
    },
    {
      id: 19,
      title: "ML Engineer",
      company: "Contact recruiter",
      location: "London, UK · Hybrid (2 days/week) · 5 months (extendable)",
      region: "Contract",
      url: "https://www.linkedin.com/in/prachi-patil-567481294/",
      description:
        "Contract: 5 months (extendable). 350–400 GBP/day (Inside IR35). Redis cluster setup; Kafka/Flink streaming pipelines; S3 data pipeline; real-time micro-batches (5 min, hourly, daily); Mongo/Atlas or S3; SageMaker MLOps, training & model deployment; PyTorch. Apply via recruiter (link below).",
    },
    {
      id: 20,
      title: "ML Engineer",
      company: "See listing",
      location: "See listing",
      region: "Other",
      url: "https://www.linkedin.com/jobs/view/4344587055/",
      description:
        "ML Engineer role in investment banking (via LinkedIn). View the full job title, company, location, and description at the link below.",
    },
    {
      id: 21,
      title: "MLOps Engineer",
      company: "Inara",
      location: "London · Remote (occasional client-site)",
      region: "Contract",
      url: "https://artificialintelligencejobs.co.uk/view-job/mlops-engineer-52ab94da0bf2",
      description:
        "Contract: initially 3 months. £500–550/day Inside IR35. Consultancy-led team building production-grade ML platforms for end clients. End-to-end MLOps platforms, MLflow (experiment tracking, model registry), production deployments, CI/CD for ML, model governance and monitoring, Databricks, AWS/SageMaker, Docker/Kubernetes, Terraform, Python. Remote with occasional travel to client-site. Via Artificial Intelligence Jobs UK.",
    },
  ];

  const regionOrder: Region[] = ["London", "USA", "China", "Contract", "Other"];
  const rolesByRegion = regionOrder.map((region) => ({
    region,
    roles: roles.filter((r) => r.region === region),
  }));

  const regionAccent: Record<Region, { border: string; bg: string; cardBorder: string }> = {
    London: { border: "border-l-blue-400 dark:border-l-blue-500", bg: "bg-blue-50/60 dark:bg-blue-950/25", cardBorder: "border-l-blue-200 dark:border-l-blue-800/80" },
    USA: { border: "border-l-indigo-400 dark:border-l-indigo-500", bg: "bg-indigo-50/50 dark:bg-indigo-950/20", cardBorder: "border-l-indigo-200 dark:border-l-indigo-800/80" },
    China: { border: "border-l-teal-400 dark:border-l-teal-500", bg: "bg-teal-50/50 dark:bg-teal-950/20", cardBorder: "border-l-teal-200 dark:border-l-teal-800/80" },
    Contract: { border: "border-l-slate-500 dark:border-l-slate-400", bg: "bg-slate-100/60 dark:bg-slate-800/30", cardBorder: "border-l-slate-300 dark:border-l-slate-600/80" },
    Other: { border: "border-l-slate-400 dark:border-l-slate-500", bg: "bg-slate-50/60 dark:bg-slate-900/25", cardBorder: "border-l-slate-200 dark:border-l-slate-700/80" },
  };

  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
      <Link
        href="/blank"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("Back to Home")}
      </Link>

      <div className="mb-12 pl-4 border-l-4 border-slate-300 dark:border-slate-600 rounded-r-md bg-slate-50/70 dark:bg-slate-900/40 py-4 pr-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-lg bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200">
            <Briefcase className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-semibold text-foreground">{t("Roles")}</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Curated MLOps roles by location and type: London, USA, China, Contract. We’ll be updating these manually for now.
        </p>
      </div>

      <Card className="mb-10 border-l-4 border-l-slate-300 dark:border-l-slate-600">
        <CardHeader>
          <CardTitle className="text-xl">
            {isSignedIn ? "You’re browsing as a signed-in user" : "Want to save your progress?"}
          </CardTitle>
          <CardDescription>
            {isSignedIn
              ? t("Head to your dashboard for subscription and account settings.")
              : t("Create an account (or sign in) to access personalized features, learning paths, and Pro content.")}
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
                <Link href="/signup">{t("Create account")}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">{t("Sign In")}</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {roles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">{t("No roles added yet. Check back soon!")}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-12">
          {rolesByRegion.map(
            ({ region, roles: regionRoles }) =>
              regionRoles.length > 0 && (
                <section key={region}>
                  <h2
                    className={`text-xl font-semibold text-foreground mb-4 pb-2 pt-2 pl-3 rounded-r border-b border-border/60 ${regionAccent[region].border} ${regionAccent[region].bg}`}
                  >
                    {region} ({regionRoles.length})
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {regionRoles.map((role) => (
                      <Card
                        key={role.id}
                        className={`transition-all hover:shadow-lg h-full flex flex-col border-l-4 ${regionAccent[region].cardBorder}`}
                      >
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
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="gap-2 w-full hover:bg-primary/10 hover:border-primary/40 hover:text-primary"
                            >
                              <a
                                href={role.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center"
                              >
                                {role.company === "Contact recruiter" ? t("Contact recruiter") : t("View role")}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )
          )}
        </div>
      )}
    </div>
  );
}

