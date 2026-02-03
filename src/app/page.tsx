"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShellCommandsSection } from "@/components/shell-commands-section";
import { LogoCarousel } from "@/components/logo-carousel";
import { ShareButtons } from "@/components/share-buttons";
import { useTranslation } from "@/contexts/language-context";
import Link from "next/link";

export default function Home() {
  const { t } = useTranslation();

  async function checkout() {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url as string;
  }

  return (
    <main>
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <Link 
          href="/signup" 
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[#ADFF2F] hover:bg-[#9AFF1F] text-black transition-colors shadow-sm"
        >
          {t("Sign Up")}
        </Link>
        <Link 
          href="/login" 
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[#ADFF2F] hover:bg-[#9AFF1F] text-black transition-colors shadow-sm"
        >
          {t("Sign In")}
        </Link>
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          {t("Dashboard")}
        </Link>
        <ThemeToggle />
      </div>
      <section className="container mx-auto max-w-5xl px-6 py-20 text-center">
        <Badge className="mb-4" variant="secondary">{t("MLOps Academy")}</Badge>
        <h1 className="text-5xl font-semibold tracking-tight">{t("Master MLOps. Build production ML systems that last.")}</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {t("Curated, no-fluff curriculum from real-world experience. Tools change, fundamentals don't.")}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-3">
            <Button size="lg" onClick={checkout}>{t("Get Pro Access")}</Button>
            <Link href="/mlops-for-kids" className="text-sm underline">{t("MLOps for Starters!")}</Link>
          </div>
          <a href="https://www.mlopsengineer.co/journeys" target="_blank" rel="noopener noreferrer" className="text-sm underline">{t("Preview curriculum")}</a>
        </div>
        <div className="mt-8 pt-6 border-t border-border/60 w-full max-w-md mx-auto">
          <ShareButtons title="Share with your team" variant="compact" />
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            {t("The next generation of best-prepared innovators are MLOps engineers")}
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-medium mb-6 text-center text-muted-foreground">{t("Why MLOps engineers?")}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">{t("Bridge theory and production")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("MLOps engineers uniquely combine machine learning expertise with systems engineering, turning research into real-world impact.")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">{t("Master complexity at scale")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("They navigate the full ML lifecycle—from data pipelines to model deployment—building systems that work reliably at scale.")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">{t("Drive business outcomes")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("By ensuring models perform in production, MLOps engineers directly connect technical work to measurable business value.")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">{t("Future-proof skills")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("As AI adoption accelerates, the demand for engineers who can operationalize ML systems continues to grow exponentially.")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="curriculum" className="container mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t("Foundations")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>{t("Data versioning & lineage")}</li>
                <li>{t("Experiment tracking")}</li>
                <li>{t("Reproducibility")}</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("Systems")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>{t("Pipelines (batch/stream)")}</li>
                <li>{t("Training orchestration")}</li>
                <li>{t("CI/CD for ML")}</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("Operations")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>{t("Monitoring & drift")}</li>
                <li>{t("Governance & risk")}</li>
                <li>{t("Cost & SLOs")}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <ShellCommandsSection />
      </section>

      <section id="microservices" className="container mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            Building Robust Microservices for Data-Intensive Applications
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Learn to architect and deploy microservices that efficiently handle large-scale data processing, 
            ensuring scalability, reliability, and performance.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Data Pipeline Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>Streaming vs batch processing</li>
                <li>Event-driven architectures</li>
                <li>Data partitioning strategies</li>
                <li>Message queue patterns</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Scalability & Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>Horizontal scaling patterns</li>
                <li>Caching strategies</li>
                <li>Database optimization</li>
                <li>Load balancing & routing</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reliability & Resilience</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>Circuit breakers & retries</li>
                <li>Fault tolerance patterns</li>
                <li>Distributed tracing</li>
                <li>Graceful degradation</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Data Storage & Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>Polyglot persistence</li>
                <li>Data consistency models</li>
                <li>Schema evolution</li>
                <li>Data lifecycle management</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Monitoring & Observability</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>Metrics & alerting</li>
                <li>Log aggregation</li>
                <li>Performance profiling</li>
                <li>Data quality monitoring</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Security & Governance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>Data encryption at rest & in transit</li>
                <li>Access control & authentication</li>
                <li>Compliance & audit trails</li>
                <li>Data privacy patterns</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="pricing" className="container mx-auto max-w-4xl px-6 pb-32">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">{t("Pro Access")}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">{t("All current and future content. One subscription.")}</p>
            <div className="text-5xl font-semibold">$10.99<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
            <Button size="lg" className="mt-6" onClick={checkout}>{t("Subscribe")}</Button>
          </CardContent>
        </Card>
      </section>
      <LogoCarousel />
    </main>
  );
}
