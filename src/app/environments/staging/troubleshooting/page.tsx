import { getIsPro } from "@/lib/pro";
import { redirect } from "next/navigation";
import { TroubleshootingContent } from "./troubleshooting-content";

export const dynamic = "force-dynamic";

export default async function StagingTroubleshootingPage() {
  const isPro = await getIsPro();
  if (!isPro) {
    redirect("/environments/staging");
  }

  return <TroubleshootingContent />;
}
