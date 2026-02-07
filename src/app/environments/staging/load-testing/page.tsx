import { getIsPro } from "@/lib/pro";
import { redirect } from "next/navigation";
import { LoadTestingContent } from "./load-testing-content";

export const dynamic = "force-dynamic";

export default async function StagingLoadTestingPage() {
  const isPro = await getIsPro();
  if (!isPro) {
    redirect("/environments/staging");
  }

  return <LoadTestingContent />;
}
