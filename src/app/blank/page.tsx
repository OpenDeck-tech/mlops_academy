"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Code, Layers, Rocket, Headphones, LogOut } from "lucide-react";
import { MLOpsSidebar } from "@/components/mlops-sidebar";

export default function BlankPage() {
  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  }
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
        <button
          onClick={handleLogout}
          className="w-12 h-12 rounded-full bg-[#f5f5dc] text-gray-900 dark:text-gray-900 hover:bg-[#e8e8d0] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
          title="Sign Out"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-semibold mb-2">MLOps Environments</h1>
        <p className="text-muted-foreground text-lg mb-6">
          Explore best practices, tricks, and concepts for each environment
        </p>
        <Button asChild size="lg" className="bg-[#f5f5dc] text-gray-900 dark:text-gray-900 hover:bg-[#e8e8d0]">
          <Link href="/podcasts" className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            MLOps Podcasts
          </Link>
        </Button>
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

