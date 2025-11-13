# Production Setup Guide

## Critical: Database Required for Production

⚠️ **IMPORTANT**: The current implementation uses in-memory storage for user data in serverless environments (Vercel). This means user data is **lost between function invocations** and is **not suitable for production**.

### Current Issue
- User accounts created in one serverless function invocation are not available in the next
- This is why you cannot sign in after creating an account
- Magic links and password resets also use in-memory storage

### Solution: Add a Database

You need to migrate to a proper database. Recommended options:

#### Option 1: Vercel Postgres (Recommended) ✅ **IMPLEMENTED**

The codebase now uses Postgres! Here's how to set it up:

**1. Create Vercel Postgres Database:**
```bash
# In your Vercel project dashboard:
# 1. Go to Storage tab
# 2. Click "Create Database"
# 3. Select "Postgres"
# 4. Choose a name (e.g., "mlops-academy-db")
# 5. Select a region
# 6. Click "Create"
```

Vercel will automatically add `POSTGRES_URL` to your environment variables.

**2. Initialize Database Tables:**
After creating the database, visit this URL once to create the tables:
```
https://your-site.vercel.app/api/init-db
```

Or run locally (if you have POSTGRES_URL set):
```bash
curl http://localhost:3000/api/init-db
```

**3. For Local Development:**
Add to your `.env.local`:
```bash
POSTGRES_URL=postgresql://user:password@localhost:5432/mlops_academy
```

Replace with your local Postgres credentials.

#### Option 2: Supabase (Free tier available)
- Sign up at https://supabase.com
- Create a new project
- Use the Supabase client to store users

#### Option 3: MongoDB Atlas (Free tier available)
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Use MongoDB client to store users

#### Option 4: PlanetScale (MySQL, Free tier)
- Sign up at https://planetscale.com
- Create a database
- Use Prisma or MySQL client

## Email Configuration

### Required Environment Variables

Make sure these are set in your Vercel project settings:

1. **RESEND_API_KEY** (Required)
   - Get from: https://resend.com/api-keys
   - Add in Vercel: Settings → Environment Variables

2. **FROM_EMAIL** (Optional, but recommended)
   - Format: `MLOps Academy <noreply@yourdomain.com>`
   - Must be a verified domain in Resend (for production)
   - Default: `onboarding@resend.dev` (for testing only)

3. **NEXT_PUBLIC_SITE_URL** (Required for email links)
   - Your production URL: `https://mlops.opendeck.co.uk`
   - Add in Vercel: Settings → Environment Variables

### Verify Email Setup

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Ensure all variables are set for **Production**, **Preview**, and **Development**
3. Check Resend dashboard for email delivery logs
4. Test with a real email address

## Session Configuration

### Required Environment Variable

**IRON_SESSION_PASSWORD** (Required)
- Must be at least 32 characters
- Generate: `openssl rand -base64 32`
- Add in Vercel: Settings → Environment Variables
- **Keep this secret!** Never commit to git

## Stripe Configuration

### Required Environment Variables

1. **STRIPE_SECRET_KEY** (Required)
   - Get from: https://dashboard.stripe.com/apikeys
   - Use **Live** key for production

2. **STRIPE_PRICE_ID** (Required)
   - Get from: Stripe Dashboard → Products → Your Product → Pricing
   - Format: `price_xxxxxxxxxxxxx`

3. **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY** (Optional, for client-side)
   - Get from: https://dashboard.stripe.com/apikeys

## Quick Checklist

- [ ] Database configured and connected
- [ ] User storage migrated from in-memory to database
- [ ] RESEND_API_KEY set in Vercel
- [ ] FROM_EMAIL configured (with verified domain)
- [ ] NEXT_PUBLIC_SITE_URL set to production URL
- [ ] IRON_SESSION_PASSWORD set (32+ characters)
- [ ] STRIPE_SECRET_KEY set (live key)
- [ ] STRIPE_PRICE_ID set
- [ ] Test signup flow
- [ ] Test login flow
- [ ] Test magic link emails
- [ ] Test password reset emails

## Testing

After setup, test:
1. Create a new account
2. Sign in with password
3. Request magic link
4. Check email inbox (and spam folder)
5. Reset password
6. Verify session persists across page refreshes

## Support

If emails are not being received:
1. Check Resend dashboard for delivery status
2. Check spam/junk folder
3. Verify FROM_EMAIL domain is verified in Resend
4. Check Vercel function logs for errors
5. Ensure RESEND_API_KEY is correct

