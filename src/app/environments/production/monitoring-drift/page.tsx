import { getIsPro } from "@/lib/pro";
import { redirect } from "next/navigation";
import { MonitoringDriftContent } from "./monitoring-drift-content";

export const dynamic = "force-dynamic";

export default async function ProductionMonitoringDriftPage() {
  const isPro = await getIsPro();
  if (!isPro) {
    redirect("/environments/production");
  }

  return <MonitoringDriftContent />;
}
