"use client";

import Link from "next/link";
import { Headphones, TwitterIcon, LinkedinIcon, Briefcase, Calendar, MessageSquare, BookOpen, UserSearch, Map, FileText, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sidebarSections = [
  {
    id: "podcasts",
    title: "MLOps Podcasts",
    icon: Headphones,
    href: "/podcasts",
    external: false,
  },
  {
    id: "tweets",
    title: "Tweets on MLOps",
    icon: TwitterIcon,
    href: "https://x.com/search?q=%23mlops&src=typed_query&f=top",
    external: true,
  },
  {
    id: "practitioners",
    title: "MLOps Practitioners on LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/search/results/people/?keywords=mlops%20engineer&origin=SWITCH_SEARCH_VERTICAL",
    external: true,
  },
  {
    id: "roles",
    title: "MLOps Roles",
    icon: Briefcase,
    href: "https://www.linkedin.com/jobs/search-results/?keywords=mlops&origin=BLENDED_SEARCH_RESULT_NAVIGATION_SEE_ALL&originToLandingJobPostings=4336034565%2C4300953237%2C4316361058",
    external: true,
  },
  {
    id: "events",
    title: "MLOps Events",
    icon: Calendar,
    href: "/events",
    external: false,
  },
  {
    id: "reddit",
    title: "Reddit - MLOps",
    icon: MessageSquare,
    href: "https://www.reddit.com/r/mlops/",
    external: true,
  },
  {
    id: "blog",
    title: "MLOps Blog",
    icon: BookOpen,
    href: "/blog",
    external: false,
  },
  {
    id: "recruiters",
    title: "MLOps Recruiters",
    icon: UserSearch,
    href: "/recruiters",
    external: false,
  },
  {
    id: "roadmap",
    title: "MLOps Roadmap",
    icon: Map,
    href: "/roadmap",
    external: false,
  },
  {
    id: "abbreviations",
    title: "Abbreviations",
    icon: FileText,
    href: "/abbreviations",
    external: false,
  },
];

export function MLOpsSidebar() {
  const [isPro, setIsPro] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    
    // Set initial CSS variable
    document.documentElement.style.setProperty(
      "--sidebar-width",
      initialCollapsed ? "80px" : "256px"
    );
  }, []);

  useEffect(() => {
    // Save sidebar state to localStorage and update CSS variable
    localStorage.setItem("sidebar-collapsed", isCollapsed.toString());
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isCollapsed ? "80px" : "256px"
    );
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen border-r bg-background flex flex-col transition-all duration-300 z-40",
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
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className={cn("p-6 pt-20 flex flex-col flex-1", isCollapsed && "px-3")}>
        <nav className="space-y-2 flex-1">
          {!isCollapsed && (
            <h2 className="mb-6 px-3 text-lg font-semibold text-foreground">Resources</h2>
          )}
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
                      <span>Pro Content</span>
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
          <TooltipProvider>
            {sidebarSections.map((section) => {
              const Icon = section.icon;
              const linkClassName = cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-accent/50 hover:text-[#ADFF2F]",
                "text-[#ADFF2F]",
                isCollapsed && "justify-center px-2"
              );

              const linkContent = (
                <>
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{section.title}</span>}
                </>
              );

              if (section.external) {
                return (
                  <Tooltip key={section.id}>
                    <TooltipTrigger asChild>
                      <a
                        href={section.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClassName}
                      >
                        {linkContent}
                      </a>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <p>{section.title}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              }

              return (
                <Tooltip key={section.id}>
                  <TooltipTrigger asChild>
                    <Link href={section.href} className={linkClassName}>
                      {linkContent}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{section.title}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>
        <div className={cn("mt-auto pt-4 border-t", isCollapsed && "px-2")}>
          <div className={cn("px-3", isCollapsed && "px-0 flex justify-center")}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}

