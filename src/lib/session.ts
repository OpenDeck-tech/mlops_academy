import { cookies } from "next/headers";
import { getIronSession, SessionOptions } from "iron-session";

export type ProSession = {
  userId?: string;
  email?: string;
  isPro?: boolean;
  upgradedAt?: string;
  rememberMe?: boolean;
};

export async function getSession(rememberMe?: boolean) {
  const password = process.env.IRON_SESSION_PASSWORD || "";
  if (!password || typeof password !== 'string' || password.length < 32) {
    throw new Error("IRON_SESSION_PASSWORD must be set to a strong value (>=32 chars)");
  }

  // First, read existing session to check current rememberMe value
  const tempOptions: SessionOptions = {
    password,
    cookieName: "mlops_academy_session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true,
      path: "/",
    },
  };
  
  const tempSession = await getIronSession<ProSession>(await cookies(), tempOptions);
  
  // Use passed rememberMe if provided, otherwise use stored value (defaults to false)
  const shouldRemember = rememberMe !== undefined ? rememberMe : (tempSession.rememberMe ?? false);

  // Create session with appropriate expiration
  const sessionOptions: SessionOptions = {
    password,
    cookieName: "mlops_academy_session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      // Set cookie expiration based on remember me
      maxAge: shouldRemember ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60, // 30 days or 7 days
    },
  };

  const session = await getIronSession<ProSession>(await cookies(), sessionOptions);
  
  // Update rememberMe if explicitly passed
  if (rememberMe !== undefined && session.rememberMe !== rememberMe) {
    session.rememberMe = rememberMe;
    await session.save();
  }
  
  return session;
}


