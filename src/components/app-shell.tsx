"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNav } from "@/components/sidebar/sidebar-nav";
import { sidebarGroups } from "@/components/sidebar/sections";
import { MLOpsSidebar } from "@/components/mlops-sidebar";

type Props = {
  children: React.ReactNode;
  /** Optional right-side actions (e.g., logout) */
  actions?: React.ReactNode;
  /** If true, show desktop sidebar */
  showSidebar?: boolean;
  /** Optional page title shown in topbar (md+) */
  title?: string;
};

export function AppShell({ children, actions, showSidebar = true, title }: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className={cn(
          "absolute z-[100] rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium shadow-md",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "left-[-9999px] top-4 focus:left-4 focus:block"
        )}
      >
        {t("Skip to main content")}
      </a>
      {showSidebar && (
        <div className="hidden md:block">
          <MLOpsSidebar />
        </div>
      )}

      {/* Top bar — liquid glass: translucent, blurred, soft border */}
      <header
        className={cn(
          "sticky top-0 z-30 border-b border-border/50",
          "bg-background/70 dark:bg-background/60 backdrop-blur-xl",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.05)] dark:shadow-[0_1px_0_0_rgba(0,0,0,0.1)]"
        )}
        style={showSidebar ? ({ marginLeft: "var(--sidebar-width)" } as React.CSSProperties) : undefined}
      >
        <div className="h-14 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showSidebar && (
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden" aria-label={t("Open menu")}>
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <SheetHeader className="border-b">
                    <SheetTitle>
                      <Link href="/blank" onClick={() => setOpen(false)}>
                        {t("MLOps Academy")}
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <SidebarNav groups={sidebarGroups} onNavigate={() => setOpen(false)} />
                  </div>
                  <div className="mt-auto border-t p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-muted-foreground">{t("Theme")}</span>
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-muted-foreground">{t("Language")}</span>
                      <LanguageSwitcher />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}

            <Link href="/blank" className="font-semibold tracking-tight">
              {t("MLOps Academy")}
            </Link>

            {title && <span className="hidden md:inline text-sm text-muted-foreground">/ {t(title)}</span>}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden sm:flex" />
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            {actions}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        id="main-content"
        className="transition-all duration-300"
        style={showSidebar ? ({ marginLeft: "var(--sidebar-width)" } as React.CSSProperties) : undefined}
        tabIndex={-1}
      >
        <div className="container mx-auto max-w-7xl px-6 py-10">{children}</div>
      </main>
    </div>
  );
}

