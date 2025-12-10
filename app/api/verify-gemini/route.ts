import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    try {
      const result = await model.generateContent('Say "verified" if you can read this.')
      const response = await result.response
      const text = response.text()

      if (text) {
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ 
            gemini_api_key: apiKey,
            gemini_key_verified: true 
          })
          .eq('id', user.id)

        if (updateError) {
          throw updateError
        }

        return NextResponse.json({ success: true, message: 'API key verified' })
      } else {
        return NextResponse.json({ error: 'Invalid API key' }, { status: 400 })
      }
    } catch (err) {
      console.error('Gemini verification error:', err)
      return NextResponse.json(
        { error: 'Invalid API key or API error' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify API key' },
      { status: 500 }
    )
  }
}
