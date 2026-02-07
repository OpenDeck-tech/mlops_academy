"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { LogoCarousel } from "@/components/logo-carousel";

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  oauth_not_configured: "Sign-in with Google is not configured. Use email and password.",
  access_denied: "You declined access. Try again or use email and password.",
  missing_params: "Invalid callback. Please try again.",
  invalid_state: "Session expired. Please try again.",
  token_exchange_failed: "Google sign-in failed. Please try again.",
  no_token: "Google did not return a token. Please try again.",
  userinfo_failed: "Could not load your profile. Please try again.",
  no_email: "Your Google account has no email we can use.",
  create_failed: "Could not create account. Try signing up with email first.",
  server_error: "Something went wrong. Please try again.",
};

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(true);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  useEffect(() => {
    const err = searchParams.get("error");
    if (err && OAUTH_ERROR_MESSAGES[err]) {
      setError(OAUTH_ERROR_MESSAGES[err]);
    }
  }, [searchParams]);

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
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2 border-2"
                  disabled={loading}
                  onClick={() => {
                    setError("");
                    window.location.href = "/api/auth/google";
                  }}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign in with Google
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                  </div>
                </div>
              </div>
              <form onSubmit={showPasswordInput ? handleLogin : handleMagicLink} className="space-y-4 mt-4">
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

function LoginFallback() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Use your password or get a magic link sent to your email</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-10 rounded-md bg-muted animate-pulse" />
            <div className="mt-4 h-10 rounded-md bg-muted animate-pulse w-3/4 mx-auto" />
          </CardContent>
        </Card>
      </div>
      <LogoCarousel />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}

