import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user has an active subscription in Stripe
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return NextResponse.json(
        { error: "No subscription found for this email" },
        { status: 404 }
      );
    }

    const customer = customers.data[0];

    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json(
        { error: "No active subscription found. Please subscribe to access Pro content." },
        { status: 403 }
      );
    }

    // User has active subscription - set session
    const sess = await getSession();
    sess.isPro = true;
    sess.upgradedAt = new Date().toISOString();
    await sess.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json(
      { error: "Unable to verify subscription" },
      { status: 500 }
    );
  }
}

