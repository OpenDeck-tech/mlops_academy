import { Pool } from "pg";

// Note: We use the standard 'pg' Pool for both Vercel Postgres and local Postgres
// Vercel Postgres provides POSTGRES_URL automatically when you add it to your project

// Unified Postgres connection pool
// Works with both Vercel Postgres (via POSTGRES_URL) and local Postgres
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    // Vercel Postgres provides POSTGRES_URL automatically
    // For local dev, use POSTGRES_URL, DATABASE_URL, or mlops_DATABASE_URL from .env.local
    const connectionString = 
      process.env.POSTGRES_URL || 
      process.env.DATABASE_URL || 
      process.env.mlops_DATABASE_URL ||
      process.env.POSTGRES_PRISMA_URL;
    
    if (!connectionString) {
      throw new Error(
        "POSTGRES_URL, DATABASE_URL, or mlops_DATABASE_URL must be set. " +
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

// Track if we've tried to initialize
let initializationAttempted = false;

// Unified database query function
export async function dbQuery<T = unknown>(
  query: string,
  params?: any[]
): Promise<T[]> {
  const dbPool = getPool();
  
  try {
    const result = await dbPool.query(query, params || []);
    return result.rows as T[];
  } catch (error: any) {
    // If table doesn't exist and we haven't tried to initialize, try auto-initialization
    if (error?.code === '42P01' && !initializationAttempted) {
      initializationAttempted = true;
      console.log("Tables not found, attempting auto-initialization...");
      try {
        await initDatabase();
        // Retry the query after initialization
        const result = await dbPool.query(query, params || []);
        return result.rows as T[];
      } catch (initError) {
        console.error("Auto-initialization failed:", initError);
        throw new Error(
          "Database tables not initialized. Please visit /api/init-db to initialize the database."
        );
      }
    }
    throw error;
  }
}

// Initialize database tables
// This function uses direct pool queries to avoid recursion with dbQuery
export async function initDatabase() {
  const dbPool = getPool();
  
  try {
    // Create users table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        stripe_customer_id TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create magic_link_tokens table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS magic_link_tokens (
        token TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create password_reset_tokens table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        token TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create indexes for better performance
    await dbPool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `);
    
    await dbPool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id)
    `);

    await dbPool.query(`
      CREATE INDEX IF NOT EXISTS idx_magic_link_tokens_email ON magic_link_tokens(email)
    `);

    await dbPool.query(`
      CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_email ON password_reset_tokens(email)
    `);

    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

