# Getting Started with ConceptAI

Welcome! This guide will help you understand what ConceptAI is and how to get started.

## What is ConceptAI?

ConceptAI is a SaaS (Software as a Service) application that helps people understand complex concepts through AI-powered explanations. It's built with:

- **Next.js** - A modern React framework
- **Supabase** - For database and authentication
- **Google Gemini AI** - For generating explanations
- **Stripe** - For handling payments

## Business Model

ConceptAI uses a **one-time payment** model:
- Users pay once
- Get lifetime access
- No subscriptions or recurring charges

## How It Works

### For End Users:
1. Sign up for an account
2. Make a one-time payment
3. Add their own Gemini API key (free from Google)
4. Start explaining any concept in various styles

### For You (The Developer):
1. Set up the infrastructure (Supabase, Stripe)
2. Configure environment variables
3. Deploy to Vercel
4. Monitor and maintain

## What's Included

This repository includes:

### ✅ Complete Application
- Landing page with features showcase
- Authentication (login/signup)
- Payment integration with Stripe
- Dashboard with payment status checks
- Settings page for API key management
- Concept explanation page with 6 different styles
- Payment success page

### ✅ Database Schema
- SQL migration files for Supabase
- Row Level Security (RLS) policies
- Automatic user profile creation

### ✅ API Routes
- `/api/checkout` - Create Stripe checkout session
- `/api/webhook` - Handle payment confirmations
- `/api/verify-gemini` - Verify Gemini API keys
- `/api/explain` - Generate explanations

### ✅ Security
- Protected routes with middleware
- Secure session management
- API key verification
- Webhook signature validation

### ✅ Documentation
- README - Overview and basic setup
- QUICKSTART - Get running in 15 minutes
- SETUP - Detailed step-by-step guide
- DEPLOYMENT - Production deployment instructions
- PROJECT_OVERVIEW - Architecture and technical details

## Prerequisites

Before you start, you'll need:

### Accounts (All Free Tiers Available)
- [ ] GitHub account (for version control)
- [ ] Supabase account (for database & auth)
- [ ] Stripe account (for payments)
- [ ] Google account (for Gemini API - used by your users)
- [ ] Vercel account (for deployment)

### Local Development
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command Line

## Next Steps

Choose your path:

### 🚀 I want to get it running quickly
→ Go to [QUICKSTART.md](QUICKSTART.md)

### 📚 I want detailed instructions
→ Go to [SETUP.md](SETUP.md)

### 🌐 I want to deploy to production
→ Go to [DEPLOYMENT.md](DEPLOYMENT.md)

### 🔍 I want to understand the architecture
→ Go to [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)

## Key Concepts

### Supabase
Your backend platform providing:
- PostgreSQL database
- Authentication system
- Automatic APIs for your data
- Real-time subscriptions (not used in v1, but available)

### Stripe
Your payment processor providing:
- Secure payment handling
- Test mode for development
- Webhooks for payment confirmations
- Dashboard for tracking payments

### Gemini API
Google's AI model that:
- Users provide their own API key (free tier available)
- Generates explanations
- Supports various prompt styles
- No cost to you (cost to users via their own keys)

### Vercel
Your hosting platform providing:
- Automatic deployments from Git
- Serverless functions
- CDN for fast global access
- Free tier for hobby projects

## Customization Ideas

Once you have it running, you can:

### Easy Customizations
- Change colors and branding
- Modify explanation styles
- Update pricing
- Add more features to the dashboard

### Medium Customizations
- Add more AI models (Claude, GPT-4)
- Save explanation history
- Add user profiles
- Implement sharing features

### Advanced Customizations
- Add team accounts
- Create a mobile app
- Build an API for third parties
- Add analytics and tracking

## Cost Breakdown

### Development (Free)
- Supabase: Free tier (up to 50,000 monthly active users)
- Stripe: Free (only pay transaction fees when you get paid)
- Vercel: Free tier (hobby plan)
- Gemini API: Free for users (they use their own keys)

### Production Costs
- Supabase: $25/month for Pro (optional, only if you outgrow free tier)
- Stripe: 2.9% + $0.30 per transaction
- Vercel: $20/month for Pro (optional, only if you need more)
- Gemini API: Still $0 (users pay for their own usage)

**Minimum to start**: $0 upfront!

## Support and Help

### Documentation Files
- [README.md](README.md) - Main documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick setup
- [SETUP.md](SETUP.md) - Detailed setup
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Technical details

### Common Issues
Check the "Troubleshooting" sections in:
- SETUP.md for development issues
- DEPLOYMENT.md for production issues

### Getting Help
1. Check the documentation files
2. Review error messages carefully
3. Search for similar issues online
4. Open a GitHub issue if needed

## What to Expect

### Time Investment
- **Initial Setup**: 30-60 minutes
- **Learning the Codebase**: 2-4 hours
- **Customization**: Varies based on changes
- **Deployment**: 30 minutes

### Skill Level
- **Beginner**: Follow QUICKSTART.md and SETUP.md exactly
- **Intermediate**: Understand the code and make small changes
- **Advanced**: Customize extensively and add new features

## Ready?

Pick your starting point:

1. **Just want to see it work?** → [QUICKSTART.md](QUICKSTART.md)
2. **Want to understand everything?** → [SETUP.md](SETUP.md)
3. **Ready to deploy?** → [DEPLOYMENT.md](DEPLOYMENT.md)
4. **Want technical details?** → [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)

Good luck! 🚀
