"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { LogoCarousel } from "@/components/logo-carousel";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(true);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.redirectTo) {
          window.location.href = data.redirectTo;
        } else if (data.message?.includes("create an account")) {
          setError(data.message + ". You can continue using email-only login.");
        } else {
          window.location.href = "/blank";
        }
      } else {
        setError(data.error || "Unable to log in. Please check your credentials.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMagicLinkSent(true);
      } else {
        setError(data.error || "Unable to send magic link. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Use your password or get a magic link sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          {magicLinkSent ? (
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                  Check your email!
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  We&apos;ve sent a sign-in link to <strong>{email}</strong>. Click the link in the email to sign in.
                </p>
              </div>
              {email.toLowerCase().endsWith("@gmail.com") && (
                <Button
                  className="w-full bg-[#ADFF2F] hover:bg-[#9AFF1F] text-black font-semibold"
                  onClick={() => {
                    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
                  }}
                >
                  Open Gmail
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setMagicLinkSent(false);
                  setEmail("");
                }}
              >
                Send Another Link
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={showPasswordInput ? handleLogin : handleMagicLink} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                {showPasswordInput && (
                  <>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked === true)}
                          disabled={loading}
                        />
                        <Label
                          htmlFor="remember"
                          className="text-sm font-normal cursor-pointer"
                        >
                          Remember me for 30 days
                        </Label>
                      </div>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </>
                )}
                {error && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                    {error}
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-[#ADFF2F] hover:bg-[#9AFF1F] text-black font-semibold" 
                  disabled={loading}
                >
                  {loading 
                    ? (showPasswordInput ? "Signing in..." : "Sending...") 
                    : (showPasswordInput ? "Sign In" : "Send Magic Link")
                  }
                </Button>
              </form>
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordInput(!showPasswordInput);
                    setPassword("");
                    setError("");
                  }}
                  className="text-sm text-primary hover:underline w-full text-center"
                >
                  {showPasswordInput 
                    ? "Use magic link instead" 
                    : "Use password instead"}
                </button>
                <div className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign Up
                  </Link>
                </div>
                <div className="text-center pt-2 border-t">
                  <Link 
                    href="/dashboard" 
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      </div>
      <LogoCarousel />
    </div>
  );
}

