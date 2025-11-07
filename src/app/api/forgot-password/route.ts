import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/users";
import { createPasswordResetToken } from "@/lib/password-reset";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await getUserByEmail(email);

    // For security, don't reveal if email exists or not
    // Always return success message
    if (user) {
      // User exists, create reset token and send email
      const token = await createPasswordResetToken(email);
      await sendPasswordResetEmail(email, token);
    }
    // If user doesn't exist, we still return success (security best practice)

    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error", error);
    return NextResponse.json(
      { error: "Unable to process request. Please try again." },
      { status: 500 }
    );
  }
}

