# Prisma Query Guide

This guide shows you how to query your database using Prisma.

## Import Prisma Client

```typescript
import prisma from "@/lib/prisma";
```

## Basic Queries

### Find All Users

```typescript
const users = await prisma.user.findMany();
```

### Find Many with Conditions

```typescript
// Find users with email ending in "prisma.io"
const users = await prisma.user.findMany({
  where: {
    email: { endsWith: "prisma.io" }
  },
});
```

### Find Unique User

```typescript
// Find a single user by email (unique field)
const user = await prisma.user.findUnique({
  where: { email: "user@example.com" }
});
```

### Find First User

```typescript
// Get the first user matching conditions
const user = await prisma.user.findFirst({
  where: {
    email: { contains: "@" }
  }
});
```

## Query Options

### Select Specific Fields

```typescript
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    createdAt: true,
    // stripeCustomerId is not selected
  }
});
```

### Limit Results

```typescript
const users = await prisma.user.findMany({
  take: 10, // Get only 10 users
});
```

### Skip Results (Pagination)

```typescript
const users = await prisma.user.findMany({
  skip: 20,  // Skip first 20
  take: 10,   // Get next 10
});
```

### Order By

```typescript
const users = await prisma.user.findMany({
  orderBy: {
    createdAt: 'desc' // or 'asc'
  }
});
```

## Where Conditions

### String Filters

```typescript
// Contains
const users = await prisma.user.findMany({
  where: {
    email: { contains: "@gmail" }
  }
});

// Starts with
const users = await prisma.user.findMany({
  where: {
    email: { startsWith: "admin" }
  }
});

// Ends with
const users = await prisma.user.findMany({
  where: {
    email: { endsWith: "prisma.io" }
  }
});

// Exact match
const user = await prisma.user.findUnique({
  where: { email: "exact@email.com" }
});
```

### Date Filters

```typescript
const recentUsers = await prisma.user.findMany({
  where: {
    createdAt: {
      gte: new Date('2024-01-01'), // Greater than or equal
    }
  }
});
```

### Multiple Conditions

```typescript
const users = await prisma.user.findMany({
  where: {
    email: { contains: "@" },
    createdAt: { gte: new Date('2024-01-01') },
    stripeCustomerId: { not: null } // Has Stripe customer
  }
});
```

## Create, Update, Delete

### Create User

```typescript
const user = await prisma.user.create({
  data: {
    id: "user_123",
    email: "new@example.com",
    passwordHash: "hashed_password",
  }
});
```

### Update User

```typescript
const user = await prisma.user.update({
  where: { email: "user@example.com" },
  data: {
    stripeCustomerId: "cus_123"
  }
});
```

### Delete User

```typescript
await prisma.user.delete({
  where: { email: "user@example.com" }
});
```

### Upsert (Create or Update)

```typescript
const user = await prisma.user.upsert({
  where: { email: "user@example.com" },
  update: { stripeCustomerId: "cus_123" },
  create: {
    id: "user_123",
    email: "user@example.com",
    passwordHash: "hashed_password",
  }
});
```

## Count

```typescript
const count = await prisma.user.count();
```

## Magic Link Tokens

```typescript
// Find token
const token = await prisma.magicLinkToken.findUnique({
  where: { token: "abc123" }
});

// Find all tokens for an email
const tokens = await prisma.magicLinkToken.findMany({
  where: { email: "user@example.com" }
});

// Create token
const newToken = await prisma.magicLinkToken.create({
  data: {
    token: "abc123",
    email: "user@example.com",
    expiresAt: new Date(Date.now() + 3600000), // 1 hour
  }
});
```

## Password Reset Tokens

```typescript
// Similar to magic link tokens
const token = await prisma.passwordResetToken.findUnique({
  where: { token: "reset123" }
});
```

## Testing Queries

Visit these URLs to test different queries:

- `http://localhost:3000/api/test-prisma?type=all` - Get all users
- `http://localhost:3000/api/test-prisma?type=endsWith&domain=prisma.io` - Find emails ending with domain
- `http://localhost:3000/api/test-prisma?type=contains&search=@gmail` - Find emails containing string
- `http://localhost:3000/api/test-prisma?type=unique&email=user@example.com` - Find unique user
- `http://localhost:3000/api/test-prisma?type=count` - Count users
- `http://localhost:3000/api/test-prisma?type=first` - Get first user

## Examples in Your Codebase

### In API Routes

```typescript
// src/app/api/users/route.ts
import prisma from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
```

### In Server Components

```typescript
// src/app/users/page.tsx
import prisma from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany();
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
}
```

### In Server Actions

```typescript
// src/app/actions.ts
'use server'
import prisma from "@/lib/prisma";

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  });
}
```

## Best Practices

1. **Always use lowercase for emails** when querying:
   ```typescript
   const user = await prisma.user.findUnique({
     where: { email: email.toLowerCase() }
   });
   ```

2. **Use select to limit fields** when you don't need all data:
   ```typescript
   const users = await prisma.user.findMany({
     select: { id: true, email: true }
   });
   ```

3. **Handle null results**:
   ```typescript
   const user = await prisma.user.findUnique({
     where: { email: "test@example.com" }
   });
   
   if (!user) {
     // Handle not found
   }
   ```

4. **Use transactions** for multiple operations:
   ```typescript
   await prisma.$transaction([
     prisma.user.create({ data: {...} }),
     prisma.magicLinkToken.create({ data: {...} })
   ]);
   ```

