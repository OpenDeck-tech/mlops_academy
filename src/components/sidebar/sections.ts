"use client";

import {
  Headphones,
  TwitterIcon,
  LinkedinIcon,
  Briefcase,
  Calendar,
  MessageSquare,
  BookOpen,
  UserSearch,
  Map,
  FileText,
  Network,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export type SidebarSection = {
  id: string;
  title: string;
  icon: LucideIcon;
  href: string;
  external: boolean;
};

export const sidebarSections: SidebarSection[] = [
  { id: "podcasts", title: "Podcasts", icon: Headphones, href: "/podcasts", external: false },
  {
    id: "tweets",
    title: "Tweets",
    icon: TwitterIcon,
    href: "https://x.com/search?q=%23mlops&src=typed_query&f=top",
    external: true,
  },
  {
    id: "practitioners",
    title: "Practitioners on LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/search/results/people/?keywords=mlops%20engineer&origin=SWITCH_SEARCH_VERTICAL",
    external: true,
  },
  // Learning & journeys
  { id: "journeys", title: "Learning Paths", icon: BookOpen, href: "/journeys", external: false },
  { id: "playbooks", title: "Playbooks", icon: ClipboardList, href: "/playbooks", external: false },
  { id: "readiness", title: "Readiness", icon: ClipboardList, href: "/readiness", external: false },
  { id: "roles", title: "Roles", icon: Briefcase, href: "/roles", external: false },
  { id: "community", title: "MLOps Community", icon: Calendar, href: "https://mlops.community/", external: true },
  { id: "reddit", title: "Reddit", icon: MessageSquare, href: "https://www.reddit.com/r/mlops/", external: true },
  { id: "blog", title: "Blog", icon: BookOpen, href: "/blog", external: false },
  { id: "mcp", title: "MCP", icon: Network, href: "/environments/development/mcp", external: false },
  { id: "recruiters", title: "Recruiters", icon: UserSearch, href: "/recruiters", external: false },
  { id: "roadmap", title: "MLOps Roadmap", icon: Map, href: "/roadmap", external: false },
  { id: "abbreviations", title: "Abbreviations", icon: FileText, href: "/abbreviations", external: false },
];

