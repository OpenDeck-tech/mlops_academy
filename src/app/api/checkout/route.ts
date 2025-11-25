import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST() {
  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL;
    if (!origin) {
      throw new Error("NEXT_PUBLIC_SITE_URL is not set");
    }

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      throw new Error("STRIPE_PRICE_ID is not set");
    }

    // Verify the price exists and is active
    try {
      const price = await stripe.prices.retrieve(priceId);
      if (!price.active) {
        throw new Error(`Price ${priceId} exists but is not active`);
      }
    } catch (priceError: any) {
      if (priceError.type === "StripeInvalidRequestError" && priceError.code === "resource_missing") {
        const stripeKeyType = process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_") ? "LIVE" : "TEST";
        console.error(`Price ID ${priceId} not found in ${stripeKeyType} mode`);
        throw new Error(
          `Price ID ${priceId} not found. Make sure you're using a ${stripeKeyType} mode price ID that matches your ${stripeKeyType} Stripe secret key.`
        );
      }
      throw priceError;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout error", error);
    
    // Provide more helpful error messages
    if (error.message?.includes("Price ID") || error.message?.includes("not found")) {
      return NextResponse.json(
        { 
          error: error.message || "Price ID mismatch. Ensure your STRIPE_PRICE_ID matches your Stripe key mode (test vs live)." 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: error.message || "Unable to create checkout session",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}


