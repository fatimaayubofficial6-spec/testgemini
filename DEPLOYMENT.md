# Deployment Guide for ConceptAI

## Prerequisites

Before deploying, make sure you have:

1. ✅ Supabase project created
2. ✅ Database migration executed
3. ✅ Stripe account with product/price created
4. ✅ All environment variables ready

## Step-by-Step Deployment to Vercel

### 1. Prepare Your Environment Variables

Have these ready:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=
NEXT_PUBLIC_APP_URL=
```

### 2. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add all environment variables
6. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked

# Deploy to production
vercel --prod
```

### 4. Post-Deployment Configuration

#### A. Update Stripe Webhook

1. Go to Stripe Dashboard > Developers > Webhooks
2. Update your webhook endpoint to:
   ```
   https://your-app.vercel.app/api/webhook
   ```
3. Make sure it listens to: `checkout.session.completed`

#### B. Update Environment Variable

In Vercel, update:
```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

Then redeploy:
```bash
vercel --prod
```

#### C. Test Stripe Webhook (Optional but Recommended)

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Forward webhooks to your local server
stripe listen --forward-to https://your-app.vercel.app/api/webhook

# Trigger a test event
stripe trigger checkout.session.completed
```

### 5. Configure Supabase

Update your Supabase project settings:

1. Go to Authentication > URL Configuration
2. Add your Vercel domain to **Site URL**:
   ```
   https://your-app.vercel.app
   ```
3. Add redirect URLs:
   ```
   https://your-app.vercel.app/**
   ```

### 6. Test Your Deployment

1. Visit your deployed app
2. Sign up for a new account
3. Complete a test payment (use Stripe test card: 4242 4242 4242 4242)
4. Add a Gemini API key in settings
5. Verify the key
6. Try explaining a concept

## Environment-Specific Settings

### Production
- Use production Stripe keys
- Use production Supabase keys
- Set proper CORS and security headers

### Staging (Optional)
- Use test Stripe keys
- Use separate Supabase project
- Update webhook URLs accordingly

## Troubleshooting

### Stripe Webhook Not Working

1. Check webhook signing secret is correct
2. Verify webhook endpoint URL
3. Check Vercel function logs
4. Test with Stripe CLI

### Supabase Connection Issues

1. Verify environment variables are set
2. Check Supabase project is active
3. Verify database migration was run
4. Check RLS policies are enabled

### Gemini API Not Working

1. Users must provide their own API key
2. Verify API key verification endpoint works
3. Check Gemini API quota/limits

### Build Failures

Common issues:
- Missing environment variables
- TypeScript errors
- Missing dependencies

Solution:
```bash
# Clean install
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

## Monitoring

### Vercel Analytics

Enable in Vercel Dashboard:
1. Go to your project
2. Click "Analytics"
3. Enable Web Analytics

### Error Tracking

Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- PostHog for product analytics

## Custom Domain (Optional)

1. Go to Vercel Dashboard > Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable
5. Update Stripe webhook URL
6. Update Supabase redirect URLs

## Backup Strategy

### Database Backups

Supabase automatically backs up your database. Configure:
1. Go to Database > Backups
2. Enable Point-in-Time Recovery (PITR)
3. Set backup schedule

### Code Backups

- GitHub repository serves as code backup
- Vercel keeps deployment history

## Scaling Considerations

- Vercel automatically scales serverless functions
- Monitor Supabase usage and upgrade plan as needed
- Watch Stripe API rate limits
- Consider implementing rate limiting for API routes

## Security Checklist

- ✅ Environment variables are set and secure
- ✅ Supabase RLS policies are enabled
- ✅ Stripe webhook signature verification is active
- ✅ API routes have proper authentication
- ✅ CORS is properly configured
- ✅ Sensitive data is not exposed in client-side code

## Support

For issues:
1. Check Vercel function logs
2. Check Supabase logs
3. Check Stripe webhook logs
4. Review this deployment guide
5. Open a GitHub issue
