import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/users";
import { stripe } from "@/lib/stripe";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogoutButton } from "@/components/logout-button";
import { ShellCommandsSection } from "@/components/shell-commands-section";
import Link from "next/link";
import { Calendar, Mail, CreditCard, CheckCircle2, XCircle } from "lucide-react";
import { ManageSubscriptionButton } from "@/components/manage-subscription-button";
import { AppShell } from "@/components/app-shell";

// Note: This page needs to be dynamic due to Stripe API calls
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const sess = await getSession();
  
  if (!sess.userId && !sess.email) {
    redirect("/login");
  }

  let user = null;
  let subscription = null;
  let customer = null;
  let hasActiveSubscription = false;

  if (sess.userId) {
    user = await getUserById(sess.userId);
  }

  // Get Stripe subscription info
  if (sess.email) {
    const customers = await stripe.customers.list({
      email: sess.email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      customer = customers.data[0];
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: "all",
        limit: 1,
      });

      if (subscriptions.data.length > 0) {
        subscription = subscriptions.data[0];
        hasActiveSubscription = subscription.status === "active";
      }
    }
  }

  // If user has stripeCustomerId, try that too
  if (user?.stripeCustomerId) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: "all",
        limit: 1,
      });
      if (subscriptions.data.length > 0 && !subscription) {
        subscription = subscriptions.data[0];
        hasActiveSubscription = subscription.status === "active";
      }
    } catch (e) {
      // Ignore
    }
  }

  const displayEmail = sess.email || user?.email || "Unknown";
  const accountCreated = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })
    : "N/A";

  const isPro = Boolean(sess.isPro || hasActiveSubscription);

  return (
    <AppShell title="Dashboard" actions={<LogoutButton />}>
      <div className="mb-8 space-y-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Your MLOps command center — account, learning, and career in one place.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <Card>
            <CardHeader>
              <CardTitle>Skills overview</CardTitle>
              <CardDescription>
                High-level view of the areas this app can help you grow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Environments & infra", value: 70 },
                { label: "CI/CD & testing", value: 60 },
                { label: "Monitoring & reliability", value: 40 },
                { label: "LLM / MCP & tools", value: 35 },
                { label: "Career & interviewing", value: 50 },
              ].map((skill) => (
                <div key={skill.label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{skill.label}</span>
                    <span className="text-muted-foreground">{skill.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                This is a simple guide, not a formal assessment. Use it to decide where to focus next.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next best actions</CardTitle>
              <CardDescription>
                A few high-leverage things you can do in the next hour.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div className="space-y-1">
                  <p className="font-medium">Explore your environments</p>
                  <p className="text-muted-foreground">
                    Review Local, Development, Staging, and Production environment guides to make your current setup more production-like.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/blank">Open environments hub</Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary/80" />
                <div className="space-y-1">
                  <p className="font-medium">Tighten your CI pipeline</p>
                  <p className="text-muted-foreground">
                    Use the Continuous Integration page to add or refine linting, typechecking, and tests in your current project.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/environments/development/continuous-integration">
                      View CI playbook
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary/60" />
                <div className="space-y-1">
                  <p className="font-medium">
                    {isPro ? "Go deeper with Pro content" : "Plan your path into MLOps"}
                  </p>
                  <p className="text-muted-foreground">
                    {isPro
                      ? "Use the Pro curriculum and coding exercises to simulate real MLOps scenarios."
                      : "Browse the curriculum and roles page to understand the skills your next role will expect."}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {isPro ? (
                      <>
                        <Button asChild size="sm">
                          <Link href="/pro">Open Pro curriculum</Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href="/pro/coding">Do a coding exercise</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild size="sm">
                          <Link href="/#curriculum">View curriculum</Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href="/roles">See current roles</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{displayEmail}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Account Created</p>
              <p className="font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {accountCreated}
              </p>
            </div>
            {user && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium">Password Protected</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={hasActiveSubscription ? "default" : "secondary"}>
                  {hasActiveSubscription ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      Inactive
                    </span>
                  )}
                </Badge>
              </div>
              {subscription && (
                <>
                  <Separator className="my-3" />
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Plan</p>
                      <p className="font-medium">MLOps Academy Pro</p>
                    </div>
                    {subscription && typeof subscription === "object" && "current_period_end" in subscription && typeof subscription.current_period_end === "number" && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {hasActiveSubscription ? "Renews on" : "Expired on"}
                        </p>
                        <p className="font-medium">
                          {new Date(subscription.current_period_end * 1000).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
              {!subscription && hasActiveSubscription === false && (
                <p className="text-sm text-muted-foreground mt-3">
                  No active subscription found. Subscribe to access Pro content.
                </p>
              )}
            </div>
            {hasActiveSubscription && (
              <>
                <Separator />
                <ManageSubscriptionButton />
              </>
            )}
            {!hasActiveSubscription && (
              <>
                <Separator />
                <Button className="w-full" asChild>
                  <Link href="/#pricing">Subscribe Now</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Navigate to different sections of MLOps Academy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {hasActiveSubscription ? (
              <>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/pro">
                    Browse Curriculum
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/pro/coding">
                    Coding Exercises
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/pro/book-call">
                    Book 1:1 Call
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/">
                    Home
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/#curriculum">
                    View Curriculum
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/#pricing">
                    See Pricing
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/">
                    Home
                  </Link>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Essential Shell Commands */}
      <ShellCommandsSection />

      {/* Account Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/login">Change Password</Link>
            </Button>
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}

