# ConceptAI Setup & Deployment Checklist

Use this checklist to ensure you've completed all necessary steps.

## 🔧 Development Setup

### Local Environment
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Code editor ready (VS Code recommended)
- [ ] Cloned repository
- [ ] Ran `npm install`

### Supabase Setup
- [ ] Created Supabase account
- [ ] Created new project
- [ ] Ran database migration in SQL Editor
- [ ] Copied Project URL
- [ ] Copied Anon/Public key
- [ ] Copied Service Role key
- [ ] Verified `user_profiles` table exists
- [ ] Verified RLS policies are enabled

### Stripe Setup
- [ ] Created Stripe account
- [ ] Enabled Test Mode
- [ ] Copied Publishable key
- [ ] Copied Secret key
- [ ] Created product with one-time pricing
- [ ] Copied Price ID
- [ ] Installed Stripe CLI
- [ ] Authenticated Stripe CLI (`stripe login`)
- [ ] Started webhook listener (`stripe listen...`)
- [ ] Copied Webhook Secret

### Environment Variables
- [ ] Created `.env.local` file
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Set `STRIPE_SECRET_KEY`
- [ ] Set `STRIPE_WEBHOOK_SECRET`
- [ ] Set `STRIPE_PRICE_ID`
- [ ] Set `NEXT_PUBLIC_APP_URL=http://localhost:3000`

### Build & Run
- [ ] Ran `npm run build` successfully
- [ ] Ran `npm run dev` successfully
- [ ] App opens at `http://localhost:3000`

## ✅ Testing Locally

### Authentication Flow
- [ ] Can access landing page
- [ ] Can navigate to signup page
- [ ] Can create new account
- [ ] Gets redirected to dashboard after signup
- [ ] Can logout
- [ ] Can login with existing account
- [ ] Protected routes redirect to login when not authenticated

### Payment Flow
- [ ] Dashboard shows payment required message
- [ ] "Complete Payment" button works
- [ ] Redirects to Stripe checkout
- [ ] Can complete payment with test card (4242 4242 4242 4242)
- [ ] Redirects to payment success page
- [ ] Dashboard shows payment completed
- [ ] Webhook received in Stripe CLI terminal

### Settings & API Key
- [ ] Can access settings page
- [ ] Can enter Gemini API key
- [ ] "Save Key" button works
- [ ] "Verify Key" button works
- [ ] API key verification succeeds
- [ ] Success message appears
- [ ] Dashboard shows API key verified

### Explanation Feature
- [ ] Can access explain page (after payment & verified key)
- [ ] Can enter concept name
- [ ] Can select explanation style
- [ ] "Explain This Concept" button works
- [ ] Explanation appears below form
- [ ] Can try different concepts
- [ ] Can try different styles
- [ ] All 6 styles work

### Error Handling
- [ ] Shows error for invalid login credentials
- [ ] Shows error for invalid API key
- [ ] Shows error when accessing explain without payment
- [ ] Shows error when accessing explain without verified key
- [ ] Handles network errors gracefully

## 🚀 Production Deployment

### Pre-Deployment
- [ ] All local tests passing
- [ ] Environment variables documented
- [ ] Committed code to Git
- [ ] Pushed to GitHub

### Vercel Setup
- [ ] Created Vercel account
- [ ] Connected GitHub repository
- [ ] Added all environment variables
- [ ] Updated `NEXT_PUBLIC_APP_URL` to Vercel domain
- [ ] Deployed successfully
- [ ] Visited deployed URL and app loads

### Post-Deployment Configuration

#### Stripe
- [ ] Created production webhook endpoint
- [ ] Updated webhook URL to `https://your-app.vercel.app/api/webhook`
- [ ] Added `checkout.session.completed` event
- [ ] Copied webhook secret
- [ ] Updated `STRIPE_WEBHOOK_SECRET` in Vercel
- [ ] Redeployed after env var change
- [ ] Tested webhook with Stripe CLI

#### Supabase
- [ ] Added Vercel domain to Site URL
- [ ] Added Vercel domain to Redirect URLs
- [ ] Tested authentication on production

### Production Testing
- [ ] Landing page loads
- [ ] Can sign up
- [ ] Can make payment
- [ ] Webhook fires correctly
- [ ] Payment status updates in database
- [ ] Can add and verify Gemini API key
- [ ] Can explain concepts
- [ ] All styles work
- [ ] Mobile responsive
- [ ] No console errors

## 🔒 Security Checklist

### Environment Variables
- [ ] `.env.local` in `.gitignore`
- [ ] No secrets in code
- [ ] Service role key only in server-side code
- [ ] Webhook secret properly verified

### Database
- [ ] RLS enabled on `user_profiles` table
- [ ] Policies prevent unauthorized access
- [ ] Users can only see own profile
- [ ] No public read access

### API Routes
- [ ] All routes verify authentication
- [ ] Payment status checked before allowing features
- [ ] API key verification works
- [ ] Webhook signature verified

### Frontend
- [ ] No sensitive data in client-side code
- [ ] Protected routes have guards
- [ ] Proper error messages (no internal details exposed)

## 📊 Monitoring & Maintenance

### Set Up Monitoring
- [ ] Vercel Analytics enabled (optional)
- [ ] Error tracking configured (Sentry, etc.) (optional)
- [ ] Stripe Dashboard bookmarked
- [ ] Supabase Dashboard bookmarked

### Regular Checks
- [ ] Monitor Vercel logs for errors
- [ ] Check Stripe Dashboard for payments
- [ ] Check Supabase usage
- [ ] Review user feedback

## 📝 Documentation

### For Users
- [ ] How to get Gemini API key
- [ ] How to use the app
- [ ] Pricing information
- [ ] Support contact

### For Developers
- [ ] README.md complete
- [ ] Setup guide available
- [ ] Deployment guide available
- [ ] Code commented where needed

## 🎯 Launch Checklist

### Before Launch
- [ ] All functionality tested
- [ ] Mobile responsive
- [ ] Fast page load times
- [ ] SEO metadata updated
- [ ] Favicon and branding complete
- [ ] Terms of Service (optional)
- [ ] Privacy Policy (optional)

### At Launch
- [ ] Switch Stripe to production mode
- [ ] Update Stripe keys in Vercel
- [ ] Use production Stripe webhook
- [ ] Update product pricing if needed
- [ ] Test one live payment
- [ ] Monitor for errors

### After Launch
- [ ] Backup database
- [ ] Monitor error logs
- [ ] Track user signups
- [ ] Track payments
- [ ] Collect user feedback
- [ ] Plan improvements

## 🐛 Troubleshooting Reference

### Build Fails
- [ ] Check TypeScript errors
- [ ] Verify all imports
- [ ] Check environment variables

### Authentication Issues
- [ ] Verify Supabase keys
- [ ] Check RLS policies
- [ ] Clear browser cookies

### Payment Issues
- [ ] Verify Stripe keys
- [ ] Check webhook is working
- [ ] Review Stripe logs
- [ ] Verify webhook secret

### Explanation Issues
- [ ] Verify Gemini API key
- [ ] Check API quotas
- [ ] Review error messages
- [ ] Test with simple concepts

## ✨ Optional Enhancements

### Features to Add Later
- [ ] Password reset
- [ ] Email verification
- [ ] Profile settings
- [ ] Explanation history
- [ ] Sharing feature
- [ ] Multiple AI models
- [ ] Dark mode
- [ ] Mobile app

### Improvements
- [ ] Rate limiting
- [ ] Caching
- [ ] Analytics
- [ ] A/B testing
- [ ] SEO optimization
- [ ] Performance monitoring

---

## Quick Status Check

Copy this and fill it out:

```
Status: [ ] Development  [ ] Testing  [ ] Deployed  [ ] Live

Supabase: [ ] Setup  [ ] Working
Stripe: [ ] Setup  [ ] Working
Vercel: [ ] Setup  [ ] Deployed
Testing: [ ] Passed
Production: [ ] Live

Last Updated: ___________
```

---

## Notes

Use this space for your own notes, issues encountered, or reminders:

```
[Your notes here]
```
