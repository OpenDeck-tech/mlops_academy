"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface EnvironmentCenter {
  step: number;
  id: string;
  title: string;
  description: string;
  href: string;
}

interface Theme {
  label: string;
  building: string;
  roof: string;
  border: string;
  accent: string;
  led: string;
  glow: string;
  rackCount: number;
  coolingUnits: number;
  buildingWidth: string;
  buildingHeight: string;
  hasAntenna?: boolean;
  hasRedundancy?: boolean;
}

const themes: Record<string, Theme> = {
  local: {
    label: "LOCAL",
    building: "from-slate-700 to-slate-900 dark:from-slate-800 dark:to-slate-950",
    roof: "bg-slate-600 dark:bg-slate-700",
    border: "border-blue-400/60 dark:border-blue-500/50",
    accent: "text-blue-600 dark:text-blue-400",
    led: "bg-blue-400 shadow-[0_0_4px_rgba(96,165,250,0.8)]",
    glow: "group-hover:shadow-[0_0_24px_rgba(59,130,246,0.25)]",
    rackCount: 1,
    coolingUnits: 1,
    buildingWidth: "w-[4.5rem]",
    buildingHeight: "h-[5.5rem]",
  },
  development: {
    label: "DEV",
    building: "from-slate-700 to-slate-900 dark:from-slate-800 dark:to-slate-950",
    roof: "bg-slate-600 dark:bg-slate-700",
    border: "border-green-400/60 dark:border-green-500/50",
    accent: "text-green-600 dark:text-green-400",
    led: "bg-green-400 shadow-[0_0_4px_rgba(74,222,128,0.8)]",
    glow: "group-hover:shadow-[0_0_24px_rgba(34,197,94,0.25)]",
    rackCount: 2,
    coolingUnits: 2,
    buildingWidth: "w-[6.5rem]",
    buildingHeight: "h-[6.5rem]",
  },
  staging: {
    label: "STAGE",
    building: "from-slate-700 to-slate-900 dark:from-slate-800 dark:to-slate-950",
    roof: "bg-slate-600 dark:bg-slate-700",
    border: "border-amber-400/60 dark:border-amber-500/50",
    accent: "text-amber-600 dark:text-amber-400",
    led: "bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.8)]",
    glow: "group-hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]",
    rackCount: 3,
    coolingUnits: 2,
    buildingWidth: "w-[8.5rem]",
    buildingHeight: "h-[7.5rem]",
  },
  production: {
    label: "PROD",
    building: "from-slate-700 to-slate-900 dark:from-slate-800 dark:to-slate-950",
    roof: "bg-slate-600 dark:bg-slate-700",
    border: "border-red-400/60 dark:border-red-500/50",
    accent: "text-red-600 dark:text-red-400",
    led: "bg-red-400 shadow-[0_0_4px_rgba(248,113,113,0.8)]",
    glow: "group-hover:shadow-[0_0_28px_rgba(239,68,68,0.3)]",
    rackCount: 5,
    coolingUnits: 3,
    buildingWidth: "w-[11rem]",
    buildingHeight: "h-[8.5rem]",
    hasAntenna: true,
    hasRedundancy: true,
  },
};

function ServerRack({ ledClass, delay = 0 }: { ledClass: string; delay?: number }) {
  return (
    <div className="flex-1 min-w-0 rounded-[2px] border border-black/30 bg-gradient-to-b from-slate-800 to-slate-950 p-[2px]">
      <div className="flex h-full flex-col gap-[2px]">
        {Array.from({ length: 7 }).map((_, row) => (
          <div
            key={row}
            className="flex flex-1 items-center gap-[2px] rounded-[1px] bg-slate-950/70 px-[2px]"
          >
            <span
              className={cn(
                "h-[3px] w-[3px] shrink-0 rounded-full",
                ledClass,
                row % 2 === 0 && "animate-pulse"
              )}
              style={{ animationDelay: `${delay + row * 120}ms` }}
            />
            <span className="h-[1px] flex-1 rounded-full bg-slate-700/80" />
            <span
              className={cn("h-[2px] w-[2px] shrink-0 rounded-full opacity-50", ledClass)}
              style={{ animationDelay: `${delay + row * 80}ms` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CoolingUnit() {
  return (
    <div className="rounded-[2px] border border-slate-500/80 bg-gradient-to-b from-slate-500 to-slate-600 px-1 py-0.5 shadow-sm">
      <div className="grid grid-cols-2 gap-0.5">
        <div className="h-2 w-2 rounded-full border border-slate-400/60 bg-slate-700">
          <div className="h-full w-full animate-spin rounded-full border border-transparent border-t-slate-400/40" style={{ animationDuration: "3s" }} />
        </div>
        <div className="h-2 w-2 rounded-full border border-slate-400/60 bg-slate-700">
          <div className="h-full w-full animate-spin rounded-full border border-transparent border-t-slate-400/40" style={{ animationDuration: "2.5s", animationDirection: "reverse" }} />
        </div>
      </div>
    </div>
  );
}

function DataCenterBuilding({ env }: { env: EnvironmentCenter }) {
  const theme = themes[env.id] ?? themes.local;

  return (
    <div className="flex flex-col items-center">
      {/* Roof cooling units */}
      <div className="mb-0.5 flex items-end justify-center gap-1">
        {Array.from({ length: theme.coolingUnits }).map((_, i) => (
          <CoolingUnit key={i} />
        ))}
        {theme.hasAntenna && (
          <div className="flex flex-col items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <div className="h-3 w-px bg-slate-500" />
            <div className="h-1 w-3 rounded-t-full border border-b-0 border-slate-500" />
          </div>
        )}
      </div>

      {/* Building facade */}
      <div
        className={cn(
          "relative rounded-t-sm border-2 bg-gradient-to-b shadow-lg transition-all duration-300",
          theme.building,
          theme.border,
          theme.buildingWidth,
          theme.buildingHeight,
          theme.glow
        )}
      >
        {/* Window band / server hall */}
        <div className="absolute inset-x-1.5 top-2 bottom-3 rounded-[2px] border border-slate-600/50 bg-slate-950/40 p-1">
          <div className="flex h-full gap-[3px]">
            {Array.from({ length: theme.rackCount }).map((_, i) => (
              <ServerRack key={i} ledClass={theme.led} delay={i * 200} />
            ))}
          </div>
        </div>

        {/* Entrance */}
        <div className="absolute bottom-0 left-1/2 h-2.5 w-4 -translate-x-1/2 rounded-t-[2px] border border-b-0 border-slate-600/60 bg-slate-800" />

        {theme.hasRedundancy && (
          <div className="absolute -right-1 top-1/2 flex -translate-y-1/2 flex-col gap-0.5">
            <div className={cn("h-1 w-1 rounded-full", theme.led)} />
            <div className={cn("h-1 w-1 rounded-full animate-pulse", theme.led)} style={{ animationDelay: "500ms" }} />
            <div className={cn("h-1 w-1 rounded-full", theme.led)} />
          </div>
        )}

        {/* Step badge */}
        <span className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border bg-background text-[10px] font-bold tabular-nums shadow-sm">
          {env.step}
        </span>
      </div>

      {/* Platform base */}
      <div className="mt-0.5 h-1 w-[110%] rounded-full bg-gradient-to-r from-transparent via-slate-400/40 to-transparent" />
      <div className={cn("mt-1 text-[10px] font-bold tracking-widest", theme.accent)}>
        {theme.label}
      </div>
    </div>
  );
}

function PipelineConnector() {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center px-1 min-w-[2rem] max-w-[4rem] self-center pb-16">
      <div className="relative w-full">
        <div className="h-px w-full bg-gradient-to-r from-border via-muted-foreground/40 to-border" />
        <div className="absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-muted-foreground/60 animate-[pipeline-flow_2s_ease-in-out_infinite]" />
        <div
          className="absolute top-1/2 left-0 h-1 w-1 -translate-y-1/2 rounded-full bg-muted-foreground/30 animate-[pipeline-flow_2s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 right-0 h-0 w-0 -translate-y-1/2 border-y-[4px] border-l-[6px] border-y-transparent border-l-muted-foreground/50" />
      </div>
    </div>
  );
}

export function EnvironmentDataCenters({ environments }: { environments: EnvironmentCenter[] }) {
  return (
    <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-end lg:justify-center lg:gap-0">
      {environments.map((env, index) => (
        <div key={env.id} className="flex flex-col items-center lg:flex-row lg:items-end">
          <Link href={env.href} className="group flex flex-col items-center text-center transition-transform hover:scale-[1.03]">
            <DataCenterBuilding env={env} />
            <div className="mt-4 max-w-[11rem] px-2">
              <h3 className="text-base font-semibold leading-tight group-hover:underline">{env.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{env.description}</p>
            </div>
          </Link>
          {index < environments.length - 1 && <PipelineConnector />}
        </div>
      ))}
    </div>
  );
}
