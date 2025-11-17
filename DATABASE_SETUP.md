# Database Setup Guide

## Quick Start

The application now uses **Postgres** for all data storage (users, magic links, password resets).

## For Production (Vercel)

### Step 1: Create Vercel Postgres Database

1. Go to your Vercel project dashboard
2. Click on the **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Enter a name (e.g., `mlops-academy-db`)
6. Select a region
7. Click **Create**

Vercel will automatically add `POSTGRES_URL` to your environment variables.

### Step 2: Initialize Database Tables

After creating the database, initialize the tables by visiting:

```
https://your-site.vercel.app/api/init-db
```

Or use curl:
```bash
curl https://your-site.vercel.app/api/init-db
```

This will create:
- `users` table
- `magic_link_tokens` table
- `password_reset_tokens` table
- All necessary indexes

### Step 3: Verify

Check Vercel function logs to confirm tables were created successfully.

## For Local Development

### Step 1: Set Up Local Postgres

Make sure you have Postgres running locally. If not:

```bash
# macOS with Homebrew
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb mlops_academy
```

### Step 2: Configure Environment Variables

Add to your `.env.local`:

```bash
POSTGRES_URL=postgresql://your_username@localhost:5432/mlops_academy
```

Replace `your_username` with your Postgres username. If you have a password:

```bash
POSTGRES_URL=postgresql://username:password@localhost:5432/mlops_academy
```

### Step 3: Initialize Database Tables

Run the initialization endpoint:

```bash
# Start your dev server
npm run dev

# In another terminal, initialize the database
curl http://localhost:3000/api/init-db
```

Or visit `http://localhost:3000/api/init-db` in your browser.

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  stripe_customer_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Magic Link Tokens Table
```sql
CREATE TABLE magic_link_tokens (
  token TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Password Reset Tokens Table
```sql
CREATE TABLE password_reset_tokens (
  token TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Troubleshooting

### "POSTGRES_URL must be set" Error

**Local Development:**
- Make sure `.env.local` has `POSTGRES_URL` set
- Format: `postgresql://user:password@localhost:5432/dbname`
- Restart your dev server after adding the variable

**Production (Vercel):**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Verify `POSTGRES_URL` is set (it should be auto-added when you create the database)
- Redeploy if you just added the database

### Connection Errors

**Local:**
- Verify Postgres is running: `pg_isready` or `psql -l`
- Check your connection string format
- Ensure the database exists: `createdb mlops_academy`

**Vercel:**
- Check Vercel function logs for connection errors
- Verify the database is created and active in Vercel dashboard
- Ensure `POSTGRES_URL` environment variable is set

### Tables Not Created

- Visit `/api/init-db` endpoint to create tables
- Check function logs for any errors
- Verify you have proper database permissions

## Migration from In-Memory Storage

If you had users in the old in-memory/file storage:

1. The old data is not automatically migrated
2. Users will need to sign up again
3. Existing Stripe customers can still log in via magic link (they'll be prompted to create an account)

## Next Steps

After setting up the database:
1. ✅ Initialize tables (`/api/init-db`)
2. ✅ Test signup flow
3. ✅ Test login flow
4. ✅ Test magic link emails
5. ✅ Test password reset

Your authentication system is now production-ready! 🎉

