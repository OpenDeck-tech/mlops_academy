import { cookies } from "next/headers";
import { getIronSession, SessionOptions } from "iron-session";

export type ProSession = {
  isPro?: boolean;
  upgradedAt?: string;
};

const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD || "",
  cookieName: "mlops_academy_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    httpOnly: true,
    path: "/",
  },
};

export async function getSession() {
  if (!sessionOptions.password || sessionOptions.password.length < 32) {
    throw new Error("IRON_SESSION_PASSWORD must be set to a strong value (>=32 chars)");
  }
  return getIronSession<ProSession>(await cookies(), sessionOptions);
}


