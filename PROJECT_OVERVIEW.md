# ConceptAI - Project Overview

## What is ConceptAI?

ConceptAI is a SaaS application that uses Google's Gemini AI to explain complex concepts in simple, easy-to-understand terms. It's designed with a one-time payment model—users pay once and get lifetime access.

## Key Features

### 1. User Authentication
- Email/password authentication via Supabase
- Secure session management
- Protected routes with middleware

### 2. One-Time Payment System
- Stripe integration for payment processing
- One-time payment for lifetime access (no subscriptions)
- Webhook handling for automatic access provisioning
- Test mode support for development

### 3. Gemini AI Integration
- Users provide their own Gemini API key
- API key verification system
- Multiple explanation styles:
  - Simple (Like I'm 5)
  - Beginner Friendly
  - Intermediate
  - Advanced
  - Using Analogies
  - Step by Step

### 4. Modern UI/UX
- Responsive design with Tailwind CSS
- Clean, gradient-based color scheme (purple/blue)
- Intuitive navigation
- Real-time feedback and loading states

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

### Backend
- **API Routes**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Payments**: Stripe

### AI
- **Provider**: Google Gemini AI
- **Model**: gemini-pro

### Deployment
- **Platform**: Vercel (optimized for)
- **Environment**: Serverless

## Project Structure

```
project/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── checkout/            # Stripe checkout
│   │   ├── explain/             # Concept explanation
│   │   ├── verify-gemini/       # API key verification
│   │   └── webhook/             # Stripe webhook handler
│   ├── auth/                    # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/               # Main dashboard
│   ├── explain/                 # Explain concept feature
│   ├── payment-success/         # Payment confirmation
│   ├── settings/                # User settings (API key)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── lib/                         # Utility functions
│   ├── supabase/               # Supabase utilities
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client
│   │   └── middleware.ts       # Auth middleware
│   └── types/                  # TypeScript types
│       └── database.ts         # Database types
├── supabase/                   # Supabase configuration
│   └── migrations/             # Database migrations
├── middleware.ts               # Next.js middleware
├── .env.example                # Environment variables template
├── README.md                   # Project documentation
├── SETUP.md                    # Setup instructions
├── DEPLOYMENT.md               # Deployment guide
└── PROJECT_OVERVIEW.md         # This file
```

## User Flow

### 1. New User Journey

```
Landing Page
    ↓
Sign Up
    ↓
Dashboard (Payment Required)
    ↓
Stripe Checkout
    ↓
Payment Success
    ↓
Dashboard (Access Granted)
    ↓
Settings (Add Gemini API Key)
    ↓
Verify API Key
    ↓
Explain Concept Feature
```

### 2. Returning User Journey

```
Landing Page
    ↓
Login
    ↓
Dashboard
    ↓
Explain Concept Feature
```

## Database Schema

### user_profiles

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key, references auth.users |
| gemini_api_key | text | User's Gemini API key (nullable) |
| gemini_key_verified | boolean | Whether key has been verified |
| has_paid | boolean | Payment status |
| created_at | timestamp | Account creation timestamp |
| updated_at | timestamp | Last update timestamp |

**Security**: 
- Row Level Security (RLS) enabled
- Users can only access their own profile
- Policies enforce read/write restrictions

## API Endpoints

### POST /api/checkout
Creates a Stripe checkout session for payment.

**Authentication**: Required  
**Request**: None  
**Response**: Redirects to Stripe checkout  

### POST /api/webhook
Handles Stripe webhook events (checkout completion).

**Authentication**: Stripe signature verification  
**Request**: Stripe event payload  
**Response**: `{ received: true }`  

### POST /api/verify-gemini
Verifies a Gemini API key by making a test request.

**Authentication**: Required  
**Request**: 
```json
{ "apiKey": "string" }
```
**Response**: 
```json
{ "success": true, "message": "API key verified" }
```

### POST /api/explain
Generates an explanation for a given concept.

**Authentication**: Required  
**Authorization**: Payment + Verified API key required  
**Request**: 
```json
{
  "concept": "string",
  "style": "simple|beginner|intermediate|advanced|analogy|stepbystep"
}
```
**Response**: 
```json
{ "explanation": "string" }
```

## Environment Variables

### Required for Development
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-only)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key (server-only)
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `STRIPE_PRICE_ID` - Stripe price ID for the product
- `NEXT_PUBLIC_APP_URL` - Application URL

### Required for Production
Same as development, but with production values.

## Security Considerations

### Authentication
- Supabase handles password hashing and session management
- JWT tokens stored in HTTP-only cookies
- Middleware protects authenticated routes

### Authorization
- Database RLS policies enforce access control
- API routes verify user authentication
- Payment status checked before allowing feature access

### API Keys
- User API keys stored in database (consider encryption in production)
- API keys never exposed to client-side code
- Server-side verification before storing

### Payments
- Webhook signature verification prevents spoofing
- Client reference ID used to associate payments with users
- Test mode for development

## Customization Guide

### Change Branding
1. Update colors in `tailwind.config.js`
2. Modify logo/name in layout components
3. Update metadata in `app/layout.tsx`

### Add More Explanation Styles
1. Add to `EXPLANATION_STYLES` in `lib/types/database.ts`
2. Add corresponding prompt in `app/api/explain/route.ts`

### Change Payment Amount
1. In Stripe Dashboard: Products → Edit product
2. Update price
3. Copy new Price ID to `.env.local`

### Add Features
- New pages: Create in `app/` directory
- New API routes: Create in `app/api/` directory
- New database tables: Add migration SQL files

## Performance Considerations

### Optimization
- Server-side rendering for SEO
- Dynamic rendering for authenticated pages
- Static assets served from CDN (Vercel)
- Database indexes on frequently queried fields

### Scaling
- Serverless functions scale automatically
- Supabase can handle moderate traffic on free tier
- Consider connection pooling for high traffic
- Rate limiting may be needed for API routes

### Monitoring
- Vercel Analytics for page views
- Stripe Dashboard for payment metrics
- Supabase Dashboard for database metrics
- Consider Sentry for error tracking

## Testing Strategy

### Manual Testing Checklist
- [ ] Sign up flow
- [ ] Login flow
- [ ] Payment flow (test card)
- [ ] Webhook reception
- [ ] API key verification
- [ ] Concept explanation with each style
- [ ] Logout and re-login
- [ ] Mobile responsiveness

### Test Credentials
- **Stripe Test Card**: 4242 4242 4242 4242
- **Expiry**: Any future date
- **CVC**: Any 3 digits

## Common Issues and Solutions

### Issue: Webhook not working locally
**Solution**: Make sure Stripe CLI is running with `stripe listen --forward-to localhost:3000/api/webhook`

### Issue: Supabase connection error
**Solution**: Verify environment variables and check RLS policies

### Issue: Gemini API errors
**Solution**: Verify API key is valid and has proper permissions

### Issue: Build fails
**Solution**: Ensure all TypeScript errors are resolved and environment variables are set for build time

## Future Enhancements

### Potential Features
- [ ] Conversation history
- [ ] Save favorite explanations
- [ ] Share explanations with others
- [ ] Multiple AI models (Claude, GPT-4)
- [ ] Team accounts
- [ ] API for third-party integrations
- [ ] Mobile app
- [ ] Export explanations as PDF

### Potential Improvements
- [ ] API key encryption at rest
- [ ] Rate limiting per user
- [ ] Admin dashboard
- [ ] Usage analytics per user
- [ ] Email notifications
- [ ] Password reset flow
- [ ] Social authentication
- [ ] Dark mode

## Contributing

If you'd like to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
- Open a GitHub issue
- Check documentation files (README, SETUP, DEPLOYMENT)
- Review code comments

---

Built with ❤️ using Next.js, Supabase, Stripe, and Gemini AI
