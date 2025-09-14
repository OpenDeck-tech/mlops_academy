# MLOps Academy

Paid curriculum site for mastering MLOps.

## Quickstart

1. Create env file

```bash
cp .env.example .env.local
```

2. Fill required vars in `.env.local`:
- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID`
- `IRON_SESSION_PASSWORD` (>=32 chars)

3. Install and run

```bash
npm i
npm run dev
```

## Stripe Flow
- POST `/api/checkout` creates Checkout session → redirects to Stripe
- `/success?session_id=...` verifies the session and sets a signed cookie
- `/pro` requires the cookie and shows the curriculum

## Deploy
- Set environment variables in your hosting provider
- Point domain to the deployed site
# mlops_academy
