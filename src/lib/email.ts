import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || "MLOps Academy <onboarding@resend.dev>";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function sendMagicLinkEmail(email: string, token: string) {
  const magicLink = `${BASE_URL}/verify-email?token=${token}`;

  try {
    await resend.emails.send({
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

    return { success: true };
  } catch (error) {
    console.error("Failed to send magic link email", error);
    throw error;
  }
}

