"use client";

import { useEffect, useRef } from "react";

/** Calls POST /api/streak once per mount to record activity for today (idempotent). */
export function StreakRecorder() {
  const recorded = useRef(false);
  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    fetch("/api/streak", { method: "POST", credentials: "include" }).catch(() => {});
  }, []);
  return null;
}
