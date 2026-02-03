import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";

/** Get locale from cookie on the server (for server components). Do not import this in client components. */
export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get("NEXT_LOCALE")?.value;
  return value === "zh" ? "zh" : "en";
}
