import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  const sess = await getSession();
  await sess.destroy();
  return NextResponse.json({ success: true });
}

export async function GET() {
  const sess = await getSession();
  await sess.destroy();
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
}

