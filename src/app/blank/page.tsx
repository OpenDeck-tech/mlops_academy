import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Lightbulb } from "lucide-react";
import { LogoutButtonClient } from "@/components/logout-button-client";
import { ScrollingQuotes } from "@/components/scrolling-quotes";
import { InteractiveVennDiagram } from "@/components/interactive-venn-diagram";
import { EnvironmentDataCenters } from "@/components/environment-data-centers";
import { ShareButtons } from "@/components/share-buttons";
import { getSession } from "@/lib/session";
import { getServerLocale } from "@/lib/i18n-server";
import { translate } from "@/lib/i18n";
import { AppShell } from "@/components/app-shell";

export default async function BlankPage() {
  const [sess, locale] = await Promise.all([getSession(), getServerLocale()]);
  const t = (key: string) => translate(locale, key);

  const environments = [
    { step: 1, id: "local", titleKey: "Local Environment", descKey: "Set up and optimize your local development workspace", href: "/environments/local" },
    { step: 2, id: "development", titleKey: "Development Environment", descKey: "Best practices for development workflows and collaboration", href: "/environments/development" },
    { step: 3, id: "staging", titleKey: "Staging Environment", descKey: "Testing and validation strategies before production", href: "/environments/staging" },
    { step: 4, id: "production", titleKey: "Production Environment", descKey: "Deployment, monitoring, and operational excellence", href: "/environments/production" },
  ];

  return (
    <AppShell title="Environments" actions={<LogoutButtonClient />}>
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-4xl font-semibold">{t("MLOps Environments")}</h1>
          {sess.isPro && (
            <Badge className="bg-[#ADFF2F] text-black border-0 px-4 py-1.5 rounded-full flex items-center font-semibold shadow-[0_0_10px_rgba(173,255,47,0.5)]">
              <span>{t("Pro")}</span>
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-lg mb-1">
          {t("From laptop to production — one pipeline.")}
        </p>
        <p className="text-muted-foreground text-sm mb-4">
          {t("Explore best practices and concepts for each stage (Local → Dev → Staging → Prod).")}
        </p>
        <div className="flex justify-center mb-6">
          <ShareButtons title="Share" variant="compact" />
        </div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {sess.isPro && (
            <Button
              asChild
              size="lg"
              className="bg-[#ADFF2F] hover:bg-[#9AFF1F] text-black rounded-full font-semibold shadow-[0_0_10px_rgba(173,255,47,0.5)]"
            >
              <Link href="/pro" className="flex items-center gap-2">
                {t("Access Pro Content")}
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {t("Dashboard")}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="text-muted-foreground">
            <Link href="/principles" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              {t("First principles")}
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4 text-center">
          {t("Pipeline")}
        </p>
        <EnvironmentDataCenters
          environments={environments.map((env) => ({
            step: env.step,
            id: env.id,
            title: t(env.titleKey),
            description: t(env.descKey),
            href: env.href,
          }))}
        />
      </div>

      {/* Interactive Venn Diagram - above the static image */}
      <div className="mt-12">
        <InteractiveVennDiagram />
      </div>

      {/* The MLOps Engineer Venn Diagram - Static image */}
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
      
      {/* Footer with Scrolling Quotes */}
      <ScrollingQuotes />
    </AppShell>
  );
}

