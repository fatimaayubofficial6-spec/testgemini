# Quick Setup Guide

Follow these steps to get ConceptAI up and running.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is fine)
- A Stripe account (test mode for development)
- Git installed

## Step 1: Clone and Install

```bash
git clone <your-repo-url>
cd <repo-name>
npm install
```

## Step 2: Set Up Supabase

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `conceptai` (or any name you prefer)
   - Database Password: (save this, though you won't need it for the app)
   - Region: Choose closest to your users
5. Wait for the project to be created (~2 minutes)

### 2.2 Run Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase/migrations/20240101000000_initial_schema.sql`
4. Click "Run" or press `Ctrl+Enter`
5. You should see "Success. No rows returned"

### 2.3 Get Your Supabase Keys

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these values:
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (click "Reveal") → This is your `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Important**: Keep the `service_role` key secret! Never commit it or expose it in client-side code.

## Step 3: Set Up Stripe

### 3.1 Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and sign up
2. Complete account setup (you can skip business details for testing)
3. Make sure you're in **Test Mode** (toggle in top right)

### 3.2 Get API Keys

1. Go to **Developers** → **API keys**
2. Copy:
   - **Publishable key** → This is your `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (click "Reveal") → This is your `STRIPE_SECRET_KEY`

### 3.3 Create a Product

1. Go to **Products** → **Add product**
2. Fill in details:
   - Name: `ConceptAI Lifetime Access`
   - Description: `One-time payment for lifetime access`
3. Under **Pricing**:
   - Select **One time**
   - Enter price (e.g., $49.00 or $4.90 for testing)
   - Currency: USD (or your preferred currency)
4. Click **Save product**
5. On the product page, find the **Price ID** (starts with `price_`)
6. Copy this → This is your `STRIPE_PRICE_ID`

### 3.4 Set Up Webhook (For Local Development)

For local development, we'll set this up later. For production deployment, see DEPLOYMENT.md.

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` and fill in your values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_placeholder_for_now
STRIPE_PRICE_ID=price_your_price_id_here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

⚠️ **Note**: We'll set up the webhook secret in Step 6.

## Step 5: Test the Build

```bash
npm run build
```

If the build succeeds, you're ready to run the app!

## Step 6: Set Up Stripe Webhook for Local Testing

### 6.1 Install Stripe CLI

**macOS (Homebrew):**
```bash
brew install stripe/stripe-cli/stripe
```

**Windows (Scoop):**
```bash
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

**Linux:**
```bash
# Download the latest release from:
# https://github.com/stripe/stripe-cli/releases/latest
```

### 6.2 Authenticate Stripe CLI

```bash
stripe login
```

This will open a browser for authentication.

### 6.3 Forward Webhooks to Local Server

In a **new terminal window**, run:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

This will output a webhook signing secret like:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

### 6.4 Update .env.local

Copy the `whsec_` secret and update your `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

Keep this terminal window open while developing!

## Step 7: Run the Development Server

In your main terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 8: Test the Complete Flow

### 8.1 Create an Account

1. Click "Sign Up"
2. Enter email and password
3. You'll be redirected to the dashboard

### 8.2 Make a Test Payment

1. Click "Complete Payment"
2. Use Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)
3. Complete payment
4. You'll be redirected to payment success page

### 8.3 Get a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API key" or "Create API key"
4. Copy the API key

### 8.4 Configure Gemini API Key

1. In the app, go to **Settings**
2. Paste your Gemini API key
3. Click "Save Key"
4. Click "Verify Key"
5. Wait for verification (should take a few seconds)
6. You'll see a success message

### 8.5 Explain a Concept

1. Go to dashboard and click "Start Explaining Concepts"
2. Enter a concept (e.g., "Quantum Computing")
3. Choose an explanation style
4. Click "Explain This Concept"
5. Wait for the AI explanation!

## Troubleshooting

### Build Errors

If you get environment variable errors during build, create a temporary `.env.local` with placeholder values just to complete the build.

### Supabase Connection Issues

- Verify your URL and keys are correct
- Check that the migration was run successfully
- Ensure RLS policies are enabled

### Stripe Webhook Not Working

- Make sure Stripe CLI is running (`stripe listen...`)
- Check the webhook secret in `.env.local` matches
- Restart your Next.js dev server after updating env vars

### Gemini API Errors

- Verify the API key is valid
- Check your Google Cloud project has Gemini API enabled
- Ensure you haven't exceeded API quotas

## Next Steps

- **Production Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Customization**: Edit pages in `/app` directory
- **Styling**: Modify Tailwind classes or update `globals.css`
- **Database**: Add more tables or modify schema in Supabase

## Getting Help

- Check [README.md](README.md) for architecture details
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
- Open an issue on GitHub for bugs or questions

## Security Reminders

✅ Never commit `.env.local` to version control  
✅ Never expose `service_role` key in client-side code  
✅ Keep Stripe secret keys secure  
✅ Use environment variables for all sensitive data  
✅ Enable RLS on all Supabase tables  
✅ Validate user input on both client and server  

Enjoy building with ConceptAI! 🚀
