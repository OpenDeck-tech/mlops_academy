import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/session";
import { getUserByEmail, linkStripeCustomer } from "@/lib/users";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SuccessPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const sessionId = typeof searchParams["session_id"] === "string" ? (searchParams["session_id"] as string) : undefined;

  if (!sessionId) {
    redirect("/");
  }

  const checkout = await stripe.checkout.sessions.retrieve(sessionId);
  if (checkout.status !== "complete") {
    redirect("/");
  }

  const sess = await getSession();
  
  // Get customer email from checkout
  const customerEmail = checkout.customer_email || checkout.customer_details?.email;
  const stripeCustomerId = typeof checkout.customer === "string" ? checkout.customer : checkout.customer?.id;

  if (customerEmail) {
    // Try to link to existing user account
    const user = await getUserByEmail(customerEmail);
    if (user && stripeCustomerId) {
      await linkStripeCustomer(user.id, stripeCustomerId);
      sess.userId = user.id;
      sess.email = user.email;
    } else {
      sess.email = customerEmail;
    }
  }

  sess.isPro = true;
  sess.upgradedAt = new Date().toISOString();
  await sess.save();

  redirect("/pro");
}


