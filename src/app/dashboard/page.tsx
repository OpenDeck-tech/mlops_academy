import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/users";
import { stripe } from "@/lib/stripe";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/logout-button";
import { ShellCommandsSection } from "@/components/shell-commands-section";
import Link from "next/link";
import { Calendar, Mail, CreditCard, CheckCircle2, XCircle } from "lucide-react";
import { ManageSubscriptionButton } from "@/components/manage-subscription-button";

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

  return (
    <div className="container mx-auto max-w-5xl px-6 py-16">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your account and subscription</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
    </div>
  );
}

