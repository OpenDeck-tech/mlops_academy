import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getIsPro } from "@/lib/pro";

/**
 * Reference: what each tier can access. Used for docs and debugging.
 */
const REGULAR_ACCESS = {
  description: "Logged-in user without Pro subscription",
  routes: [
    "/",
    "/blank",
    "/principles",
    "/journeys",
    "/playbooks",
    "/readiness",
    "/blog",
    "/roadmap",
    "/abbreviations",
    "/podcasts",
    "/roles",
    "/recruiters",
    "/dashboard",
    "/login",
    "/signup",
    "/environments/local",
    "/environments/development",
    "/environments/staging",
    "/environments/production",
  ],
  features: [
    "All public learning content (Principles, Journeys, Playbooks, Readiness, Blog, Roadmap, Abbreviations)",
    "Podcasts, Roles, Recruiters",
    "Environment guides (Local, Development, Staging hub, Production)",
    "Dashboard (account, skills overview, next actions)",
    "Staging: Load Testing topic (non-Pro)",
  ],
};

const PRO_ONLY_ACCESS = {
  routes: [
    "/pro",
    "/pro/coding",
    "/pro/coding/data-pipeline-optimization",
    "/pro/coding/model-versioning-system",
    "/pro/communication",
    "/pro/book-call",
    "/environments/staging/continuous-deployment",
    "/environments/staging/troubleshooting",
  ],
  features: [
    "Pro hub and curriculum",
    "Coding exercises (e.g. data pipeline optimization, model versioning system)",
    "Pro communication and book-a-call",
    "Staging: Continuous Deployment (Pro)",
    "Staging: Troubleshooting (Pro)",
    "Pro badge and 'Access Pro Content' CTA on environments",
    "Dashboard: Pro curriculum and coding exercise CTAs",
  ],
};

const GUEST_ACCESS = {
  description: "Not logged in",
  routes: ["/", "/blank", "/principles", "/journeys", "/playbooks", "/readiness", "/blog", "/roadmap", "/abbreviations", "/podcasts", "/roles", "/recruiters", "/login", "/signup"],
  features: [
    "All public learning content",
    "Cannot access Dashboard",
    "No Pro content",
  ],
};

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sess = await getSession();
    const isPro = await getIsPro();
    const isLoggedIn = Boolean(sess.userId || sess.email);

    let tier: "guest" | "regular" | "pro" = "guest";
    if (isLoggedIn) {
      tier = isPro ? "pro" : "regular";
    }

    const asUser =
      tier === "guest"
        ? GUEST_ACCESS
        : tier === "pro"
          ? {
              description: "Pro subscriber",
              routes: [...REGULAR_ACCESS.routes, ...PRO_ONLY_ACCESS.routes],
              features: [...REGULAR_ACCESS.features, ...PRO_ONLY_ACCESS.features],
            }
          : REGULAR_ACCESS;

    return NextResponse.json({
      tier,
      isLoggedIn,
      isPro,
      asUser: {
        description: tier === "guest" ? "Not logged in" : tier === "pro" ? "Pro subscriber" : "Logged in (no Pro)",
        routes: asUser.routes,
        features: asUser.features,
      },
      reference: {
        regular: REGULAR_ACCESS,
        proOnly: PRO_ONLY_ACCESS,
        guest: GUEST_ACCESS,
      },
      testing: {
        howToSeeAsRegular: "Sign up or log in with a normal account. Do not complete a Pro subscription.",
        howToSeeAsPro: "Subscribe via the pricing CTA (Stripe Checkout). In test mode use Stripe test card 4242 4242 4242 4242. After success you are redirected and session is marked Pro.",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not determine access tier", tier: "guest", isLoggedIn: false, isPro: false },
      { status: 500 }
    );
  }
}
