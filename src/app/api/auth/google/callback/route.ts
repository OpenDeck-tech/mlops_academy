import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { getUserByEmail, createUserFromOAuth } from "@/lib/users";
import { stripe } from "@/lib/stripe";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=access_denied`, baseUrl));
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/login?error=missing_params", baseUrl));
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get("oauth_state")?.value;
  cookieStore.delete("oauth_state");

  if (!savedState || state !== savedState) {
    return NextResponse.redirect(new URL("/login?error=invalid_state", baseUrl));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=oauth_not_configured", baseUrl));
  }

  try {
    const tokenRes = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error("Google token exchange failed", err);
      return NextResponse.redirect(new URL("/login?error=token_exchange_failed", baseUrl));
    }

    const tokens = await tokenRes.json();
    const accessToken = tokens.access_token;
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login?error=no_token", baseUrl));
    }

    const userInfoRes = await fetch(USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userInfoRes.ok) {
      return NextResponse.redirect(new URL("/login?error=userinfo_failed", baseUrl));
    }

    const userInfo = await userInfoRes.json();
    const email = userInfo.email?.trim();
    if (!email) {
      return NextResponse.redirect(new URL("/login?error=no_email", baseUrl));
    }

    let user = await getUserByEmail(email);

    if (!user) {
      try {
        user = await createUserFromOAuth(email, "google");
      } catch (e) {
        if ((e as Error).message === "User already exists") {
          user = await getUserByEmail(email);
          if (!user) {
            return NextResponse.redirect(new URL("/login?error=create_failed", baseUrl));
          }
        } else {
          throw e;
        }
      }
    }

    let hasActiveSubscription = false;
    if (user.stripeCustomerId) {
      const subs = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: "active",
        limit: 1,
      });
      hasActiveSubscription = subs.data.length > 0;
    }
    if (!hasActiveSubscription) {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        const subs = await stripe.subscriptions.list({
          customer: customers.data[0].id,
          status: "active",
          limit: 1,
        });
        hasActiveSubscription = subs.data.length > 0;
      }
    }

    const sess = await getSession(true);
    sess.userId = user.id;
    sess.email = user.email;
    sess.isPro = hasActiveSubscription;
    sess.rememberMe = true;
    if (hasActiveSubscription) {
      sess.upgradedAt = new Date().toISOString();
    }
    await sess.save();

    return NextResponse.redirect(new URL("/blank", baseUrl));
  } catch (err) {
    console.error("Google OAuth callback error", err);
    return NextResponse.redirect(new URL("/login?error=server_error", baseUrl));
  }
}
