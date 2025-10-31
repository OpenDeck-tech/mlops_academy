import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  stripeCustomerId?: string;
  createdAt: string;
}

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function readUsers(): Promise<User[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeUsers(users: User[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function createUser(email: string, password: string): Promise<User> {
  const users = await readUsers();
  
  // Check if user already exists
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("User already exists");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    email: email.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeUsers(users);

  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await readUsers();
  return users.find((u) => u.id === id) || null;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function linkStripeCustomer(userId: string, stripeCustomerId: string): Promise<void> {
  const users = await readUsers();
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.stripeCustomerId = stripeCustomerId;
    await writeUsers(users);
  }
}

export async function getUserByStripeCustomerId(stripeCustomerId: string): Promise<User | null> {
  const users = await readUsers();
  return users.find((u) => u.stripeCustomerId === stripeCustomerId) || null;
}

