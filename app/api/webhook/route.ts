import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-11-17.clover',
  })
}

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  const stripe = getStripe()

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.client_reference_id

    if (userId) {
      try {
        const supabaseAdmin = getSupabaseAdmin()
        const { error } = await supabaseAdmin
          .from('user_profiles')
          .update({ has_paid: true })
          .eq('id', userId)

        if (error) {
          console.error('Error updating user profile:', error)
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
        }
      } catch (err) {
        console.error('Error processing webhook:', err)
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
