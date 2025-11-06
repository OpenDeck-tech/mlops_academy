import { verifyMagicLinkToken } from "@/lib/magic-links";
import { getUserByEmail } from "@/lib/users";
import { getSession } from "@/lib/session";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function VerifyEmailPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const token = typeof searchParams["token"] === "string" ? searchParams["token"] : undefined;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invalid Link</CardTitle>
            <CardDescription>
              The verification link is invalid or missing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login" className="text-primary hover:underline">
              Return to Sign In
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const email = await verifyMagicLinkToken(token);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Link Expired</CardTitle>
            <CardDescription>
              This sign-in link has expired or already been used. Please request a new one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login" className="text-primary hover:underline">
              Request New Link
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User exists or has subscription - set session
  const user = await getUserByEmail(email);
  let hasActiveSubscription = false;

  if (user?.stripeCustomerId) {
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: "active",
      limit: 1,
    });
    hasActiveSubscription = subscriptions.data.length > 0;
  } else {
    // Check Stripe by email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customers.data[0].id,
        status: "active",
        limit: 1,
      });
      hasActiveSubscription = subscriptions.data.length > 0;
    }
  }

  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Subscription Required</CardTitle>
            <CardDescription>
              You need an active subscription to access MLOps Academy Pro.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/#pricing" className="text-primary hover:underline">
              Subscribe Now
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Set session and redirect
  const sess = await getSession();
  if (user) {
    sess.userId = user.id;
  }
  sess.email = email;
  sess.isPro = true;
  sess.upgradedAt = new Date().toISOString();
  await sess.save();

  redirect("/pro");
}

