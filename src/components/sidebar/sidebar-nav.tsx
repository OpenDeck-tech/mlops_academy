"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { SidebarSection, SidebarGroup } from "@/components/sidebar/sections";

type Props = {
  /** Grouped nav (preferred): renders section titles + items */
  groups?: SidebarGroup[];
  /** Flat list (fallback): renders items only */
  sections?: SidebarSection[];
  isCollapsed?: boolean;
  onNavigate?: () => void;
  className?: string;
};

export function SidebarNav({ groups, sections, isCollapsed = false, onNavigate, className }: Props) {
  const itemsByGroup = groups
    ? groups.map((g) => ({ title: g.title, items: g.items }))
    : sections
      ? [{ title: null as string | null, items: sections }]
      : [];

  return (
    <TooltipProvider>
      <nav className={cn("space-y-6", className)}>
        {itemsByGroup.map(({ title, items }) => (
          <div key={title ?? "main"} className="space-y-2">
            {title && !isCollapsed && (
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {title}
              </p>
            )}
            <div className="space-y-1">
              {items.map((section) => {
                const Icon = section.icon;
                const linkClassName = cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-accent/50 hover:text-foreground",
                  "text-muted-foreground",
                  isCollapsed && "justify-center px-2"
                );

                const content = (
                  <>
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span>{section.title}</span>}
                  </>
                );

                const LinkEl = section.external ? (
                  <a
                    href={section.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                    onClick={onNavigate}
                  >
                    {content}
                  </a>
                ) : (
                  <Link href={section.href} className={linkClassName} onClick={onNavigate}>
                    {content}
                  </Link>
                );

                return (
                  <Tooltip key={section.id}>
                    <TooltipTrigger asChild>{LinkEl}</TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <p>{section.title}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </TooltipProvider>
  );
}
