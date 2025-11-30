import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Server, Code, Layers, Rocket, CheckCircle2 } from "lucide-react";
import { MLOpsSidebar } from "@/components/mlops-sidebar";
import { LogoutButtonClient } from "@/components/logout-button-client";
import { ScrollingQuotes } from "@/components/scrolling-quotes";
import { getSession } from "@/lib/session";

export default async function BlankPage() {
  const sess = await getSession();
  const environments = [
    {
      id: "local",
      title: "Local Environment",
      description: "Set up and optimize your local development workspace",
      icon: Code,
      href: "/environments/local",
      color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    },
    {
      id: "development",
      title: "Development Environment",
      description: "Best practices for development workflows and collaboration",
      icon: Server,
      href: "/environments/development",
      color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    },
    {
      id: "staging",
      title: "Staging Environment",
      description: "Testing and validation strategies before production",
      icon: Layers,
      href: "/environments/staging",
      color: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
    },
    {
      id: "production",
      title: "Production Environment",
      description: "Deployment, monitoring, and operational excellence",
      icon: Rocket,
      href: "/environments/production",
      color: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <MLOpsSidebar />
      <div className="flex-1 ml-64 min-h-screen container mx-auto max-w-7xl px-6 py-12 relative">
        {/* Sign Out Button - Circular */}
        <div className="absolute top-4 right-4 z-10">
          <LogoutButtonClient />
        </div>

      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-4xl font-semibold">MLOps Environments</h1>
          {sess.isPro && (
            <Badge className="bg-[#39ff14] text-black border-0 px-4 py-1.5 rounded-full flex items-center font-semibold shadow-[0_0_10px_rgba(57,255,20,0.5)]">
              <span>Pro</span>
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-lg mb-4">
          Explore best practices, tricks, and concepts for each environment
        </p>
        {sess.isPro && (
          <div className="flex items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-[#39ff14] hover:bg-[#32e612] text-black rounded-full font-semibold shadow-[0_0_10px_rgba(57,255,20,0.5)]">
              <Link href="/pro" className="flex items-center gap-2">
                Access Pro Content
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        )}
      </div>
      
      {/* Scrolling Quotes */}
      <div className="mb-8">
        <ScrollingQuotes />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {environments.map((env) => {
          const Icon = env.icon;
          return (
            <Link key={env.id} href={env.href} className="block h-full">
              <Card className={`h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer ${env.color}`}>
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-background/50">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{env.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">{env.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* The MLOps Engineer Venn Diagram */}
      <div className="mt-12 flex justify-center">
        <Card className="max-w-xl w-full">
          <CardContent className="p-6">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="/mlops-engineer-venn.png"
                alt="The MLOps Engineer - Venn diagram showing the intersection of Infrastructure, Software, and Machine Learning"
                fill
                className="object-contain"
                priority
              />
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}

