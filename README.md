# ConceptAI - AI-Powered Concept Explanation SaaS

A Next.js SaaS application that uses Google Gemini AI to explain complex concepts in simple, easy-to-understand terms. Users can choose from various explanation styles and pay once for lifetime access.

## 📚 Documentation

**New to ConceptAI?** Start here: [Getting Started Guide](GETTING_STARTED.md)

### Setup & Deployment
- 🚀 **[Quick Start](QUICKSTART.md)** - Get running in 15 minutes
- 📖 **[Setup Guide](SETUP.md)** - Detailed setup instructions  
- 🌐 **[Deployment Guide](DEPLOYMENT.md)** - Deploy to Vercel
- ✅ **[Checklist](CHECKLIST.md)** - Complete setup & deployment checklist

### Technical Documentation
- 🏗️ **[Project Overview](PROJECT_OVERVIEW.md)** - Architecture and technical details

## Features

- 🔐 **User Authentication** - Powered by Supabase Auth
- 💳 **One-Time Payment** - Stripe integration for lifetime access
- 🧠 **AI-Powered Explanations** - Uses Google Gemini API
- 🎯 **Multiple Learning Styles** - Choose your preferred explanation format
- ⚙️ **Custom API Keys** - Users provide their own Gemini API key
- 🚀 **Ready for Vercel** - Optimized for serverless deployment

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **AI**: Google Gemini API
- **Payments**: Stripe
- **Deployment**: Vercel

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration:
   ```sql
   -- Copy and paste the contents of supabase/migrations/20240101000000_initial_schema.sql
   ```
3. Get your Supabase credentials from **Project Settings** > **API**:
   - Project URL
   - Anon/Public Key
   - Service Role Key (keep this secret!)

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from **Developers** > **API keys**
3. Create a product:
   - Go to **Products** > **Add product**
   - Set it as a one-time payment
   - Copy the Price ID
4. Set up webhook:
   - Go to **Developers** > **Webhooks**
   - Add endpoint: `https://your-domain.com/api/webhook`
   - Listen to: `checkout.session.completed`
   - Copy the webhook signing secret

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID=your_stripe_price_id

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **New Project**
3. Import your GitHub repository
4. Add all environment variables from `.env.local`
5. Update `NEXT_PUBLIC_APP_URL` to your Vercel domain
6. Deploy!

### 3. Update Stripe Webhook

After deployment, update your Stripe webhook endpoint to:
```
https://your-vercel-domain.vercel.app/api/webhook
```

## User Flow

1. **Sign Up** - User creates an account
2. **Payment** - User completes one-time payment via Stripe
3. **Settings** - User adds their Gemini API key (free from Google AI Studio)
4. **Verify** - User verifies their API key
5. **Use** - User can now explain any concept with various styles

## Explanation Styles

- **Simple (Like I'm 5)** - Very basic, kid-friendly explanations
- **Beginner Friendly** - Clear and accessible for beginners
- **Intermediate** - Good detail for those with some knowledge
- **Advanced** - In-depth explanations for experts
- **Using Analogies** - Concepts explained through relatable metaphors
- **Step by Step** - Broken down into clear stages

## Getting a Gemini API Key

Users need to provide their own Gemini API key:

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google account
3. Click "Get API key"
4. Copy the key and paste it in Settings
5. Verify the key

## API Routes

- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhook` - Handle Stripe webhook events
- `POST /api/verify-gemini` - Verify Gemini API key
- `POST /api/explain` - Generate concept explanation

## Database Schema

### user_profiles

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (references auth.users) |
| gemini_api_key | text | Encrypted Gemini API key |
| gemini_key_verified | boolean | Whether key has been verified |
| has_paid | boolean | Payment status |
| created_at | timestamp | Account creation time |
| updated_at | timestamp | Last update time |

## Security Features

- Row Level Security (RLS) enabled on all tables
- API keys stored securely in database
- Middleware protection for authenticated routes
- Stripe webhook signature verification
- Server-side API key validation

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
