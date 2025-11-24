"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShellCommandsSection } from "@/components/shell-commands-section";
import { LogoCarousel } from "@/components/logo-carousel";
import Link from "next/link";

export default function Home() {
  async function checkout() {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url as string;
  }

  return (
    <main>
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <div className="bg-[#f5f5dc] px-4 py-2 rounded-lg">
          <Link href="/signup" className="text-sm font-medium text-gray-900 dark:text-gray-900">Sign Up</Link>
        </div>
        <div className="bg-[#f5f5dc] px-4 py-2 rounded-lg">
          <Link href="/login" className="text-sm font-medium text-gray-900 dark:text-gray-900">Sign In</Link>
        </div>
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          Dashboard
        </Link>
        <ThemeToggle />
      </div>
      <section className="container mx-auto max-w-5xl px-6 py-20 text-center">
        <Badge className="mb-4" variant="secondary">MLOps Academy</Badge>
        <h1 className="text-5xl font-semibold tracking-tight">Master MLOps. Build production ML systems that last.</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Curated, no-fluff curriculum from real-world experience. Tools change, fundamentals don&apos;t.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-3">
            <Button size="lg" onClick={checkout}>Get Pro Access</Button>
            <Link href="/mlops-for-kids" className="text-sm underline">MLOps for Kids 🚀</Link>
          </div>
          <a href="#curriculum" className="text-sm underline">Preview curriculum</a>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            The next generation of best-prepared innovators are MLOps engineers
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-medium mb-6 text-center text-muted-foreground">Why MLOps engineers?</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Bridge theory and production</h4>
                <p className="text-sm text-muted-foreground">
                  MLOps engineers uniquely combine machine learning expertise with systems engineering, turning research into real-world impact.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Master complexity at scale</h4>
                <p className="text-sm text-muted-foreground">
                  They navigate the full ML lifecycle—from data pipelines to model deployment—building systems that work reliably at scale.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Drive business outcomes</h4>
                <p className="text-sm text-muted-foreground">
                  By ensuring models perform in production, MLOps engineers directly connect technical work to measurable business value.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Future-proof skills</h4>
                <p className="text-sm text-muted-foreground">
                  As AI adoption accelerates, the demand for engineers who can operationalize ML systems continues to grow exponentially.
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
              <CardTitle>Foundations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>Data versioning & lineage</li>
                <li>Experiment tracking</li>
                <li>Reproducibility</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>Pipelines (batch/stream)</li>
                <li>Training orchestration</li>
                <li>CI/CD for ML</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>Monitoring & drift</li>
                <li>Governance & risk</li>
                <li>Cost & SLOs</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <ShellCommandsSection />
      </section>

      <section id="pricing" className="container mx-auto max-w-4xl px-6 pb-32">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Pro Access</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">All current and future content. One subscription.</p>
            <div className="text-5xl font-semibold">$10.99<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
            <Button size="lg" className="mt-6" onClick={checkout}>Subscribe</Button>
          </CardContent>
        </Card>
      </section>
      <LogoCarousel />
    </main>
  );
}
