"use client";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <Button 
      variant="outline" 
      className="w-full justify-start text-destructive hover:text-destructive"
      onClick={handleLogout}
    >
      Sign Out
    </Button>
  );
}

