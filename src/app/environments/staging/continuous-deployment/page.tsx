import { getIsPro } from "@/lib/pro";
import { redirect } from "next/navigation";
import { ContinuousDeploymentContent } from "./continuous-deployment-content";

export const dynamic = "force-dynamic";

export default async function ContinuousDeploymentPage() {
  const isPro = await getIsPro();
  if (!isPro) {
    redirect("/environments/staging");
  }

  return <ContinuousDeploymentContent />;
}
