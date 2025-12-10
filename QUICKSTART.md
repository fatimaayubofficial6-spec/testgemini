# 🚀 Quick Start Guide

Get ConceptAI running in 15 minutes!

## Prerequisites

- Node.js 18+
- A Supabase account (free)
- A Stripe account (test mode)

## Steps

### 1️⃣ Install Dependencies (2 min)

```bash
npm install
```

### 2️⃣ Set Up Supabase (5 min)

1. Create project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migration from `supabase/migrations/20240101000000_initial_schema.sql`
3. Get your keys from Project Settings → API

### 3️⃣ Set Up Stripe (5 min)

1. Create account at [stripe.com](https://stripe.com)
2. Create a product with one-time pricing
3. Get your keys from Developers → API keys

### 4️⃣ Configure Environment (2 min)

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (from stripe listen)
STRIPE_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5️⃣ Set Up Stripe Webhook (1 min)

In a separate terminal:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```

Copy the `whsec_` secret to `.env.local`

### 6️⃣ Run the App (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Test It Out!

1. **Sign up** with any email/password
2. **Make a payment** using card: `4242 4242 4242 4242`
3. **Get Gemini API key** from [Google AI Studio](https://aistudio.google.com/app/apikey)
4. **Add & verify** your key in Settings
5. **Explain a concept** - Try "Quantum Computing"!

## Need More Details?

- 📖 [Full Setup Guide](SETUP.md) - Detailed instructions
- 🚀 [Deployment Guide](DEPLOYMENT.md) - Deploy to Vercel
- 📚 [Project Overview](PROJECT_OVERVIEW.md) - Architecture details
- 📝 [README](README.md) - Complete documentation

## Troubleshooting

**Build errors?** Make sure `.env.local` exists with valid values.

**Webhook not working?** Ensure Stripe CLI is running with `stripe listen`.

**Supabase errors?** Verify you ran the database migration.

**Gemini errors?** Check your API key is valid at Google AI Studio.

## Support

Having issues? Check the [SETUP.md](SETUP.md) file or open an issue on GitHub.

Happy explaining! 🎉
