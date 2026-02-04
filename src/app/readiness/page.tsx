import { getSession } from "@/lib/session";
import { ReadinessClient } from "./readiness-client";

export default async function ReadinessPage() {
  const sess = await getSession().catch(() => null);
  const isSignedIn = Boolean(sess?.userId || sess?.email);

  return <ReadinessClient isSignedIn={isSignedIn} />;
}
