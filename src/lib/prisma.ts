import { PrismaClient } from '../../generated/prisma-client'
import { withAccelerate } from '@prisma/extension-accelerate'

// Get the connection string that Prisma will use (from schema: mlops_PRISMA_DATABASE_URL)
const connectionString = process.env.mlops_PRISMA_DATABASE_URL || process.env.mlops_POSTGRES_URL;

// Check if we're using Prisma Accelerate (connection string must start with prisma:// or prisma+postgres://)
const isAccelerate = 
  connectionString?.startsWith('prisma://') ||
  connectionString?.startsWith('prisma+postgres://');

// Only use Accelerate if we have an Accelerate connection string
// Otherwise use regular Prisma Client
const basePrisma = new PrismaClient();
const prisma = isAccelerate 
  ? basePrisma.$extends(withAccelerate())
  : basePrisma;

export default prisma

