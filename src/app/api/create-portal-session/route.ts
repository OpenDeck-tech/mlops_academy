import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { stripe } from "@/lib/stripe";
import { getUserById } from "@/lib/users";

export async function POST() {
  try {
    const sess = await getSession();
    
    if (!sess.userId && !sess.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let customerId: string | null = null;

    // Try to get customer ID from user record
    if (sess.userId) {
      const user = await getUserById(sess.userId);
      if (user?.stripeCustomerId) {
        customerId = user.stripeCustomerId;
      }
    }

    // If no customer ID from user record, try to find by email
    if (!customerId && sess.email) {
      const customers = await stripe.customers.list({
        email: sess.email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }
    }

    if (!customerId) {
      return NextResponse.json(
        { error: "No Stripe customer found" },
        { status: 404 }
      );
    }

    // Create a Stripe Customer Portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}

