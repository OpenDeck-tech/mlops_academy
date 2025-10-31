"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShellCommandsSection } from "@/components/shell-commands-section";
import Link from "next/link";

export default function Home() {
  async function checkout() {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url as string;
  }

  return (
    <main>
      <div className="absolute top-4 right-4 flex items-center gap-4">
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
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button size="lg" onClick={checkout}>Get Pro Access</Button>
          <Link href="/signup" className="text-sm underline">Sign Up</Link>
          <Link href="/login" className="text-sm underline">Sign In</Link>
          <a href="#curriculum" className="text-sm underline">Preview curriculum</a>
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
            <div className="text-5xl font-semibold">$19<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
            <Button size="lg" className="mt-6" onClick={checkout}>Subscribe</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
