import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/session";
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
  sess.isPro = true;
  sess.upgradedAt = new Date().toISOString();
  await sess.save();

  redirect("/pro");
}


