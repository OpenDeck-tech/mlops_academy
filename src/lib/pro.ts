import { getSession } from "@/lib/session";
import { getUserById } from "@/lib/users";
import { stripe } from "@/lib/stripe";

/**
 * Returns true if the current user has Pro access (session flag or active Stripe subscription).
 * Use for gating Pro-only pages and features.
 */
export async function getIsPro(): Promise<boolean> {
  const sess = await getSession();
  if (sess.isPro) return true;

  let hasActiveSubscription = false;

  if (sess.email) {
    try {
      const customers = await stripe.customers.list({ email: sess.email, limit: 1 });
      if (customers.data.length > 0) {
        const subs = await stripe.subscriptions.list({
          customer: customers.data[0].id,
          status: "all",
          limit: 1,
        });
        if (subs.data.length > 0 && subs.data[0].status === "active") {
          hasActiveSubscription = true;
        }
      }
    } catch {
      // ignore
    }
  }

  if (!hasActiveSubscription && sess.userId) {
    try {
      const user = await getUserById(sess.userId);
      if (user?.stripeCustomerId) {
        const subs = await stripe.subscriptions.list({
          customer: user.stripeCustomerId,
          status: "all",
          limit: 1,
        });
        if (subs.data.length > 0 && subs.data[0].status === "active") {
          hasActiveSubscription = true;
        }
      }
    } catch {
      // ignore
    }
  }

  return hasActiveSubscription;
}
