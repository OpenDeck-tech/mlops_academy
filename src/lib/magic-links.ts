import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export interface MagicLinkToken {
  token: string;
  email: string;
  expiresAt: string;
  used: boolean;
}

const TOKENS_FILE = path.join(process.cwd(), "data", "magic-link-tokens.json");

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function readTokens(): Promise<MagicLinkToken[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(TOKENS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeTokens(tokens: MagicLinkToken[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(TOKENS_FILE, JSON.stringify(tokens, null, 2));
}

export async function createMagicLinkToken(email: string): Promise<string> {
  const tokens = await readTokens();
  
  // Clean up expired tokens
  const now = new Date();
  const validTokens = tokens.filter((t) => {
    const expiresAt = new Date(t.expiresAt);
    return expiresAt > now && !t.used;
  });

  // Generate secure random token
  const token = randomBytes(32).toString("hex");
  
  // Token expires in 1 hour
  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000);

  const magicToken: MagicLinkToken = {
    token,
    email: email.toLowerCase(),
    expiresAt: expiresAt.toISOString(),
    used: false,
  };

  validTokens.push(magicToken);
  await writeTokens(validTokens);

  return token;
}

export async function verifyMagicLinkToken(token: string): Promise<string | null> {
  const tokens = await readTokens();
  const now = new Date();
  
  const magicToken = tokens.find((t) => t.token === token && !t.used);

  if (!magicToken) {
    return null; // Token not found or already used
  }

  const expiresAt = new Date(magicToken.expiresAt);
  if (expiresAt <= now) {
    return null; // Token expired
  }

  // Mark token as used
  magicToken.used = true;
  await writeTokens(tokens);

  return magicToken.email;
}

