import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

// Get the connection string that Prisma will use (from schema: mlops_PRISMA_DATABASE_URL)
// Prisma reads from mlops_PRISMA_DATABASE_URL as specified in schema.prisma
const connectionString = process.env.mlops_PRISMA_DATABASE_URL || process.env.mlops_POSTGRES_URL || process.env.DATABASE_URL;

// Check if we're using Prisma Accelerate (connection string must start with prisma:// or prisma+postgres://)
const isAccelerate = 
  connectionString?.startsWith('prisma://') ||
  connectionString?.startsWith('prisma+postgres://');

// Debug logging (remove in production if needed)
if (process.env.NODE_ENV !== 'production') {
  console.log('[Prisma] Connection string type:', connectionString ? connectionString.substring(0, 20) + '...' : 'not set');
  console.log('[Prisma] Using Accelerate:', isAccelerate);
}

// Only use Accelerate if we have an Accelerate connection string
// This prevents errors when using regular postgres:// URLs
let prisma: any;

if (isAccelerate && connectionString) {
  // Use Accelerate only when we have an Accelerate connection string
  try {
    const basePrisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionString
        }
      }
    });
    prisma = basePrisma.$extends(withAccelerate());
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Prisma] Initialized with Accelerate');
    }
  } catch (error) {
    console.error('Failed to initialize Prisma with Accelerate, falling back to regular client:', error);
    prisma = new PrismaClient();
  }
} else {
  // Use regular Prisma Client for standard postgres:// URLs
  // Prisma will read mlops_PRISMA_DATABASE_URL from environment automatically
  // DO NOT use Accelerate extension here
  prisma = new PrismaClient();
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Prisma] Initialized without Accelerate (regular Postgres)');
  }
}

export default prisma

