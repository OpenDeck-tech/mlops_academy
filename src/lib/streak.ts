import prisma from "./prisma";

export type StreakData = {
  currentStreak: number;
  longestStreak: number;
  lastActiveAt: string | null;
};

/** Get UTC date string YYYY-MM-DD for a Date (uses UTC day) */
function toUTCDateString(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Get yesterday's UTC date string */
function yesterdayUTC(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return toUTCDateString(d);
}

/**
 * Get streak data for a user. Returns zeros if user not found or streak columns missing.
 */
export async function getStreak(userId: string): Promise<StreakData> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        lastActiveAt: true,
        currentStreak: true,
        longestStreak: true,
      },
    });
    if (!user) {
      return { currentStreak: 0, longestStreak: 0, lastActiveAt: null };
    }
    const u = user as { lastActiveAt?: Date | null; currentStreak?: number; longestStreak?: number };
    return {
      currentStreak: u.currentStreak ?? 0,
      longestStreak: u.longestStreak ?? 0,
      lastActiveAt: u.lastActiveAt ? toUTCDateString(u.lastActiveAt) : null,
    };
  } catch {
    return { currentStreak: 0, longestStreak: 0, lastActiveAt: null };
  }
}

/**
 * Record activity for today (idempotent per day). Updates lastActiveAt, currentStreak, longestStreak.
 * Uses UTC date: activity counts for the UTC day it occurs.
 */
export async function recordActivity(userId: string): Promise<StreakData> {
  const now = new Date();
  const today = toUTCDateString(now);
  const yesterday = yesterdayUTC();

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { lastActiveAt: true, currentStreak: true, longestStreak: true },
    });
    if (!user) {
      return { currentStreak: 0, longestStreak: 0, lastActiveAt: null };
    }

    const u = user as { lastActiveAt?: Date | null; currentStreak?: number; longestStreak?: number };
    const last = u.lastActiveAt ? toUTCDateString(u.lastActiveAt) : null;
    const currentStreak = u.currentStreak ?? 0;
    const longestStreak = u.longestStreak ?? 0;

    let newStreak = currentStreak;
    if (last === today) {
      // Already counted today
      return {
        currentStreak,
        longestStreak,
        lastActiveAt: today,
      };
    }
    if (last === yesterday) {
      newStreak = currentStreak + 1;
    } else {
      newStreak = 1;
    }
    const newLongest = Math.max(longestStreak, newStreak);

    await prisma.user.update({
      where: { id: userId },
      data: {
        lastActiveAt: now,
        currentStreak: newStreak,
        longestStreak: newLongest,
      },
    });

    return {
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastActiveAt: today,
    };
  } catch {
    return { currentStreak: 0, longestStreak: 0, lastActiveAt: null };
  }
}
