"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Menu, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslation } from "@/contexts/language-context";
import { useGuide } from "@/contexts/guide-context";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { sidebarGroups } from "@/components/sidebar/sections";
import { SidebarNav } from "@/components/sidebar/sidebar-nav";

export function MLOpsSidebar() {
  const [isPro, setIsPro] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t } = useTranslation();
  const { startTour } = useGuide();

  useEffect(() => {
    // Check Pro status from session
    fetch("/api/check-pro-status")
      .then((res) => res.json())
      .then((data) => setIsPro(data.isPro || false))
      .catch(() => setIsPro(false));

    // Load sidebar state from localStorage
    const savedState = localStorage.getItem("sidebar-collapsed");
    const initialCollapsed = savedState === "true";
    setIsCollapsed(initialCollapsed);
    
    const applySidebarWidthVar = (collapsed: boolean) => {
      // On mobile, keep content full-width; sidebar behaves like an overlay.
      if (window.matchMedia("(max-width: 767px)").matches) {
        document.documentElement.style.setProperty("--sidebar-width", "0px");
        return;
      }
      document.documentElement.style.setProperty(
        "--sidebar-width",
        collapsed ? "80px" : "256px"
      );
    };

    // Set initial CSS variable
    applySidebarWidthVar(initialCollapsed);

    // Keep in sync on viewport changes
    const onResize = () => applySidebarWidthVar(initialCollapsed);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // Save sidebar state to localStorage and update CSS variable
    localStorage.setItem("sidebar-collapsed", isCollapsed.toString());
    if (window.matchMedia("(max-width: 767px)").matches) {
      document.documentElement.style.setProperty("--sidebar-width", "0px");
      return;
    }
    document.documentElement.style.setProperty("--sidebar-width", isCollapsed ? "80px" : "256px");
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen border-r border-border/50 flex flex-col transition-all duration-300 z-40",
        "bg-sidebar/95 dark:bg-sidebar/90 backdrop-blur-xl",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <div className="absolute top-4 right-0 translate-x-1/2 z-50">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background border-2 shadow-md hover:shadow-lg"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? t("Expand sidebar") : t("Collapse sidebar")}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className={cn("p-6 pt-20 flex flex-col flex-1", isCollapsed && "px-3")}>
        <div className="flex-1">
          {!isCollapsed && <h2 className="mb-4 px-3 text-lg font-semibold text-foreground">{t("Resources")}</h2>}
          {isPro && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/pro"
                    className={cn(
                      "flex items-center gap-2 rounded-full text-sm font-semibold transition-colors mb-4",
                      "bg-[#ADFF2F] hover:bg-[#9AFF1F] text-black",
                      "shadow-[0_0_10px_rgba(173,255,47,0.5)]",
                      isCollapsed ? "justify-center px-2 py-2" : "justify-center px-4 py-2"
                    )}
                  >
                    {isCollapsed ? (
                      <Menu className="h-5 w-5" />
                    ) : (
                      <span>{t("Pro Content")}</span>
                    )}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>Pro Content</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          )}
          <SidebarNav groups={sidebarGroups} isCollapsed={isCollapsed} />
        </div>
        <div className={cn("mt-auto pt-4 border-t space-y-2", isCollapsed && "px-2")}>
          <div className={cn("px-3", isCollapsed && "px-0 flex justify-center")}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
                      isCollapsed && "justify-center px-2"
                    )}
                    onClick={startTour}
                  >
                    <Compass className="h-4 w-4 shrink-0" />
                    {!isCollapsed && <span>{t("Show me around")}</span>}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>{t("Show me around")}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className={cn("px-3", isCollapsed && "px-0 flex justify-center")}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}

