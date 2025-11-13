import { randomBytes } from "crypto";
import { dbQuery } from "./db";

export interface MagicLinkToken {
  token: string;
  email: string;
  expiresAt: string;
  used: boolean;
}

interface TokenRow {
  token: string;
  email: string;
  expires_at: Date | string;
  used: boolean;
}

export async function createMagicLinkToken(email: string): Promise<string> {
  // Clean up expired tokens
  const now = new Date();
  await dbQuery(
    `DELETE FROM magic_link_tokens WHERE expires_at < $1 OR used = true`,
    [now]
  );

  // Generate secure random token
  const token = randomBytes(32).toString("hex");
  
  // Token expires in 1 hour
  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000);

  // Insert token into database
  await dbQuery(
    `INSERT INTO magic_link_tokens (token, email, expires_at) VALUES ($1, $2, $3)`,
    [token, email.toLowerCase(), expiresAt]
  );

  return token;
}

export async function verifyMagicLinkToken(token: string): Promise<string | null> {
  const now = new Date();
  
  // Find token that hasn't been used and hasn't expired
  const rows = await dbQuery<TokenRow>(
    `SELECT * FROM magic_link_tokens WHERE token = $1 AND used = false AND expires_at > $2`,
    [token, now]
  );

  if (rows.length === 0) {
    return null; // Token not found, already used, or expired
  }

  const tokenRow = rows[0];
  const expiresAt = typeof tokenRow.expires_at === "string" 
    ? new Date(tokenRow.expires_at) 
    : tokenRow.expires_at;

  if (expiresAt <= now) {
    return null; // Token expired
  }

  // Mark token as used
  await dbQuery(
    `UPDATE magic_link_tokens SET used = true WHERE token = $1`,
    [token]
  );

  return tokenRow.email;
}
