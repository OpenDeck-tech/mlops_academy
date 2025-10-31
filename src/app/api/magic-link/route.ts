import { NextResponse } from "next/server";
import { createMagicLinkToken } from "@/lib/magic-links";
import { sendMagicLinkEmail } from "@/lib/email";
import { getUserByEmail } from "@/lib/users";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists or has an active Stripe subscription
    const user = await getUserByEmail(email);
    
    let hasAccess = false;
    
    if (user) {
      hasAccess = true;
    } else {
      // Check Stripe for subscription
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
        hasAccess = subscriptions.data.length > 0;
      }
    }

    // Always send magic link (security: don't reveal if email exists)
    // But we'll note if they need to subscribe
    const token = await createMagicLinkToken(email);
    
    try {
      await sendMagicLinkEmail(email, token);
    } catch (emailError) {
      console.error("Email sending failed", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: hasAccess 
        ? "Check your email for the sign-in link" 
        : "Check your email for the sign-in link. If you don't have an account, you'll need to subscribe first."
    });
  } catch (error) {
    console.error("Magic link error", error);
    return NextResponse.json(
      { error: "Unable to send magic link" },
      { status: 500 }
    );
  }
}

