"use client";

import Link from "next/link";
import { Headphones, Twitter, Linkedin, Briefcase, Calendar, MessageSquare, BookOpen, UserSearch, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
    icon: Twitter,
    href: "https://x.com/search?q=%23mlops&src=typed_query&f=top",
    external: true,
  },
  {
    id: "practitioners",
    title: "MLOps Practitioners on LinkedIn",
    icon: Linkedin,
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
];

export function MLOpsSidebar() {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    // Check Pro status from session
    fetch("/api/check-pro-status")
      .then((res) => res.json())
      .then((data) => setIsPro(data.isPro || false))
      .catch(() => setIsPro(false));
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-background p-6 pt-20">
      <nav className="space-y-2">
        <h2 className="mb-6 px-3 text-lg font-semibold">Resources</h2>
        {isPro && (
          <Link
            href="/pro"
            className={cn(
              "flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors mb-4",
              "bg-[#39ff14] hover:bg-[#32e612] text-black",
              "shadow-[0_0_10px_rgba(57,255,20,0.5)]"
            )}
          >
            <span>Pro Content</span>
          </Link>
        )}
        {sidebarSections.map((section) => {
          const Icon = section.icon;
          const linkClassName = cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            "text-muted-foreground"
          );
          
          if (section.external) {
            return (
              <a
                key={section.id}
                href={section.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                <Icon className="h-5 w-5" />
                <span>{section.title}</span>
              </a>
            );
          }
          
          return (
            <Link
              key={section.id}
              href={section.href}
              className={linkClassName}
            >
              <Icon className="h-5 w-5" />
              <span>{section.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

