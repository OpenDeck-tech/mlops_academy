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
      className="w-12 h-12 rounded-full bg-[#f5f5dc] text-gray-900 dark:text-gray-900 hover:bg-[#e8e8d0] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
      title="Sign Out"
    >
      <LogOut className="h-5 w-5" />
    </button>
  );
}

