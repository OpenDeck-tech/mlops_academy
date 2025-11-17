import { verifyMagicLinkToken } from "@/lib/magic-links";
import { getUserByEmail } from "@/lib/users";
import { getSession } from "@/lib/session";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid_token", request.url));
  }

  const email = await verifyMagicLinkToken(token);

  if (!email) {
    return NextResponse.redirect(new URL("/login?error=expired_token", request.url));
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

  // Set session and redirect to blank page (regardless of subscription status)
  const sess = await getSession();
  if (user) {
    sess.userId = user.id;
  }
  sess.email = email;
  sess.isPro = hasActiveSubscription;
  if (hasActiveSubscription) {
    sess.upgradedAt = new Date().toISOString();
  }
  await sess.save();

  return NextResponse.redirect(new URL("/blank", request.url));
}

