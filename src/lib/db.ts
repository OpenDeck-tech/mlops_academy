import { Pool } from "pg";

// Note: We use the standard 'pg' Pool for both Vercel Postgres and local Postgres
// Vercel Postgres provides POSTGRES_URL automatically when you add it to your project

// Unified Postgres connection pool
// Works with both Vercel Postgres (via POSTGRES_URL) and local Postgres
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    // Vercel Postgres provides POSTGRES_URL automatically
    // For local dev, use POSTGRES_URL or DATABASE_URL from .env.local
    const connectionString = process.env.mlops_POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || process.env.mlops_PRISMA_DATABASE_URL;
    
    if (!connectionString) {
      throw new Error(
        "POSTGRES_URL, POSTGRES_PRISMA_URL, or DATABASE_URL must be set. " +
        "For local: postgresql://user:password@localhost:5432/dbname\n" +
        "For Vercel: POSTGRES_URL is automatically set when you add Vercel Postgres"
      );
    }

    pool = new Pool({
      connectionString,
      // Vercel Postgres requires SSL, local usually doesn't
      ssl: process.env.VERCEL === "1" 
        ? { rejectUnauthorized: false } 
        : process.env.POSTGRES_SSL === "true" 
          ? { rejectUnauthorized: false } 
          : false,
    });
  }
  
  return pool;
}

// Unified database query function
export async function dbQuery<T = unknown>(
  query: string,
  params?: any[]
): Promise<T[]> {
  const dbPool = getPool();
  const result = await dbPool.query(query, params || []);
  return result.rows as T[];
}

// Initialize database tables
export async function initDatabase() {
  try {
    // Create users table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        stripe_customer_id TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create magic_link_tokens table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS magic_link_tokens (
        token TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create password_reset_tokens table
    await dbQuery(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        token TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create indexes for better performance
    await dbQuery(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `);
    
    await dbQuery(`
      CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id)
    `);

    await dbQuery(`
      CREATE INDEX IF NOT EXISTS idx_magic_link_tokens_email ON magic_link_tokens(email)
    `);

    await dbQuery(`
      CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_email ON password_reset_tokens(email)
    `);

    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

