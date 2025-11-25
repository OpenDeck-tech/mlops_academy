import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const sess = await getSession();
    return NextResponse.json({ isPro: sess.isPro || false });
  } catch (error) {
    return NextResponse.json({ isPro: false });
  }
}

