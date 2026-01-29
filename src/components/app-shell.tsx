"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNav } from "@/components/sidebar/sidebar-nav";
import { sidebarSections } from "@/components/sidebar/sections";
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

  return (
    <div className="min-h-screen bg-background">
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
                  <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <SheetHeader className="border-b">
                    <SheetTitle>
                      <Link href="/blank" onClick={() => setOpen(false)}>
                        MLOps Academy
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <SidebarNav sections={sidebarSections} onNavigate={() => setOpen(false)} />
                  </div>
                  <div className="mt-auto border-t p-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                </SheetContent>
              </Sheet>
            )}

            <Link href="/blank" className="font-semibold tracking-tight">
              MLOps Academy
            </Link>

            {title && <span className="hidden md:inline text-sm text-muted-foreground">/ {title}</span>}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            {actions}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        className="transition-all duration-300"
        style={showSidebar ? ({ marginLeft: "var(--sidebar-width)" } as React.CSSProperties) : undefined}
      >
        <div className="container mx-auto max-w-7xl px-6 py-10">{children}</div>
      </main>
    </div>
  );
}

