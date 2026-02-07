import { NextResponse } from "next/server";
import { getUserByEmail, verifyPassword } from "@/lib/users";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { email, password, rememberMe } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    // Try to find user in our database
    const user = await getUserByEmail(email);

    if (!user) {
      // User not in DB - check Stripe below
      // Fallback: Check Stripe (for users who paid before signup)
      const customers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        const customer = customers.data[0];
        const subscriptions = await stripe.subscriptions.list({
          customer: customer.id,
          status: "active",
          limit: 1,
        });

        if (subscriptions.data.length > 0) {
          // User has active subscription but no account - set session without password check
          const sess = await getSession();
          sess.email = email;
          sess.isPro = true;
          sess.upgradedAt = new Date().toISOString();
          await sess.save();

          return NextResponse.json({ 
            success: true,
            message: "Please create an account to enable password authentication"
          });
        }
      }

      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // OAuth-only users must sign in with their provider
    if (user.authProvider === "google") {
      return NextResponse.json(
        { error: "This account uses Google Sign-In. Please sign in with Google." },
        { status: 400 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user has active subscription
    let hasActiveSubscription = false;

    if (user.stripeCustomerId) {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: "active",
        limit: 1,
      });
      hasActiveSubscription = subscriptions.data.length > 0;
    } else {
      // Also check by email as fallback
      const customers = await stripe.customers.list({
        email: user.email,
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

    // Set session with remember me preference
    const sess = await getSession(rememberMe === true);
    sess.userId = user.id;
    sess.email = user.email;
    sess.isPro = hasActiveSubscription;
    sess.rememberMe = rememberMe === true;
    if (hasActiveSubscription) {
      sess.upgradedAt = new Date().toISOString();
    }
    await sess.save();

    if (!hasActiveSubscription) {
      return NextResponse.json(
        { 
          success: true,
          message: "Account verified. Please subscribe to access Pro content.",
          redirectTo: "/blank"
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ 
      success: true,
      redirectTo: "/blank"
    });
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json(
      { error: "Unable to log in" },
      { status: 500 }
    );
  }
}

