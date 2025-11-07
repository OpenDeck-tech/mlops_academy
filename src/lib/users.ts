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

// Check if we're in a serverless environment (Vercel, etc.)
const IS_SERVERLESS = process.env.VERCEL === "1" || process.env.AWS_LAMBDA_FUNCTION_NAME || !process.env.HOME;

// In-memory storage for serverless environments
let inMemoryUsers: User[] = [];

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

async function ensureDataDir() {
  if (IS_SERVERLESS) {
    return; // Skip file operations in serverless
  }
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
      // If we can't create directory, we're likely in serverless - use in-memory
      console.warn("Cannot create data directory, using in-memory storage");
    }
  }
}

async function readUsers(): Promise<User[]> {
  if (IS_SERVERLESS) {
    return inMemoryUsers;
  }
  
  try {
    await ensureDataDir();
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // Fallback to in-memory if file operations fail
    return inMemoryUsers;
  }
}

async function writeUsers(users: User[]): Promise<void> {
  if (IS_SERVERLESS) {
    inMemoryUsers = users;
    return;
  }
  
  try {
    await ensureDataDir();
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    // Fallback to in-memory if file operations fail
    console.warn("Cannot write users to file, using in-memory storage", error);
    inMemoryUsers = users;
  }
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

