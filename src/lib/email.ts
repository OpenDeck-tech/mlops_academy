import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not set in environment variables");
  // Don't throw in production, but log the error
  if (process.env.NODE_ENV === "production") {
    console.error("Email functionality will not work without RESEND_API_KEY");
  }
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.FROM_EMAIL || "MLOps Academy <onboarding@resend.dev>";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function sendMagicLinkEmail(email: string, token: string) {
  if (!resend) {
    console.error("Resend client not initialized. RESEND_API_KEY is missing.");
    throw new Error("Email service is not configured. Please set RESEND_API_KEY in environment variables.");
  }

  const magicLink = `${BASE_URL}/verify-email?token=${token}`;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Sign in to MLOps Academy",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">MLOps Academy</h1>
            </div>
            <div style="background: #ffffff; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-top: 0;">Sign in to your account</h2>
              <p style="color: #666; font-size: 16px;">Click the button below to securely sign in to your MLOps Academy account. This link will expire in 1 hour.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${magicLink}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Sign In
                </a>
              </div>
              
              <p style="color: #999; font-size: 14px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                If you didn&apos;t request this link, you can safely ignore this email. 
                <br><br>
                Or copy and paste this link into your browser:
                <br>
                <a href="${magicLink}" style="color: #667eea; word-break: break-all;">${magicLink}</a>
              </p>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
              <p>© ${new Date().getFullYear()} MLOps Academy. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
      text: `
Sign in to MLOps Academy

Click the link below to securely sign in to your account. This link will expire in 1 hour.

${magicLink}

If you didn't request this link, you can safely ignore this email.

© ${new Date().getFullYear()} MLOps Academy. All rights reserved.
      `,
    });

    console.log("Magic link email sent successfully to:", email);
    return { success: true };
  } catch (error) {
    console.error("Failed to send magic link email", error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  if (!resend) {
    console.error("Resend client not initialized. RESEND_API_KEY is missing.");
    throw new Error("Email service is not configured. Please set RESEND_API_KEY in environment variables.");
  }

  const resetLink = `${BASE_URL}/reset-password?token=${token}`;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Reset your MLOps Academy password",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">MLOps Academy</h1>
            </div>
            <div style="background: #ffffff; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-top: 0;">Reset your password</h2>
              <p style="color: #666; font-size: 16px;">We received a request to reset your password. Click the button below to create a new password. This link will expire in 1 hour.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Reset Password
                </a>
              </div>
              
              <p style="color: #999; font-size: 14px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                If you didn&apos;t request a password reset, you can safely ignore this email. Your password will not be changed.
                <br><br>
                Or copy and paste this link into your browser:
                <br>
                <a href="${resetLink}" style="color: #667eea; word-break: break-all;">${resetLink}</a>
              </p>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
              <p>© ${new Date().getFullYear()} MLOps Academy. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
      text: `
Reset your MLOps Academy password

We received a request to reset your password. Click the link below to create a new password. This link will expire in 1 hour.

${resetLink}

If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.

© ${new Date().getFullYear()} MLOps Academy. All rights reserved.
      `,
    });

    console.log("Password reset email sent successfully to:", email);
    return { success: true };
  } catch (error) {
    console.error("Failed to send password reset email", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    throw error;
  }
}

