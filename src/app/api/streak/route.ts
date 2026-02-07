import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStreak, recordActivity } from "@/lib/streak";

export const dynamic = "force-dynamic";

/** GET: return current user's streak (no side effects) */
export async function GET() {
  try {
    const sess = await getSession();
    const userId = sess.userId;
    if (!userId) {
      return NextResponse.json({ currentStreak: 0, longestStreak: 0, lastActiveAt: null });
    }
    const data = await getStreak(userId);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { currentStreak: 0, longestStreak: 0, lastActiveAt: null },
      { status: 500 }
    );
  }
}

/** POST: record activity for today (idempotent), return updated streak */
export async function POST() {
  try {
    const sess = await getSession();
    const userId = sess.userId;
    if (!userId) {
      return NextResponse.json({ currentStreak: 0, longestStreak: 0, lastActiveAt: null });
    }
    const data = await recordActivity(userId);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { currentStreak: 0, longestStreak: 0, lastActiveAt: null },
      { status: 500 }
    );
  }
}
