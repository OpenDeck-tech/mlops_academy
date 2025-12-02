"use client";

import { LogOut } from "lucide-react";

export function LogoutButtonClient() {
  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-full bg-[#ADFF2F] hover:bg-[#9AFF1F] text-black flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-sm text-sm font-medium"
      title="Sign Out"
    >
      <LogOut className="h-4 w-4" />
      <span>Sign out</span>
    </button>
  );
}

