import bcrypt from "bcryptjs";
import { dbQuery } from "./db";
import prisma from "./prisma";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  stripeCustomerId?: string;
  createdAt: string;
}

// Database row interface (snake_case from Postgres)
interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  stripe_customer_id: string | null;
  created_at: Date | string;
}

function rowToUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    stripeCustomerId: row.stripe_customer_id || undefined,
    createdAt: typeof row.created_at === "string" ? row.created_at : row.created_at.toISOString(),
  };
}

export async function createUser(email: string, password: string): Promise<User> {
  // Check if user already exists
  const existing = await getUserByEmail(email);
  if (existing) {
    throw new Error("User already exists");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  const userId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  const emailLower = email.toLowerCase();

  // Insert user into database using Prisma
  const user = await prisma.user.create({
    data: {
      id: userId,
      email: emailLower,
      passwordHash: passwordHash,
    }
  });

  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    stripeCustomerId: user.stripeCustomerId || undefined,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function getUserByEmail(email: string): Promise<User | null> {
  // Using Prisma instead of raw SQL
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    stripeCustomerId: user.stripeCustomerId || undefined,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function getUserById(id: string): Promise<User | null> {
  const rows = await dbQuery<UserRow>(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );

  if (rows.length === 0) {
    return null;
  }

  return rowToUser(rows[0]);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function linkStripeCustomer(userId: string, stripeCustomerId: string): Promise<void> {
  await dbQuery(
    `UPDATE users SET stripe_customer_id = $1 WHERE id = $2`,
    [stripeCustomerId, userId]
  );
}

export async function getUserByStripeCustomerId(stripeCustomerId: string): Promise<User | null> {
  const rows = await dbQuery<UserRow>(
    `SELECT * FROM users WHERE stripe_customer_id = $1`,
    [stripeCustomerId]
  );

  if (rows.length === 0) {
    return null;
  }

  return rowToUser(rows[0]);
}

export async function updateUserPassword(email: string, newPassword: string): Promise<void> {
  const passwordHash = await bcrypt.hash(newPassword, 10);
  
  const result = await dbQuery(
    `UPDATE users SET password_hash = $1 WHERE email = $2`,
    [passwordHash, email.toLowerCase()]
  );

  // Check if any rows were updated
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
}
