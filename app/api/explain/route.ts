import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const stylePrompts: Record<string, string> = {
  simple: "Explain this concept as if I'm 5 years old, using very simple language and examples:",
  beginner: "Explain this concept for a complete beginner, using clear and accessible language:",
  intermediate: "Explain this concept for someone with intermediate knowledge, providing good detail:",
  advanced: "Explain this concept in depth for someone with advanced understanding:",
  analogy: "Explain this concept using analogies and metaphors to make it relatable:",
  stepbystep: "Explain this concept step by step, breaking it down into clear stages:",
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile?.has_paid) {
      return NextResponse.json(
        { error: 'Payment required' },
        { status: 403 }
      )
    }

    if (!profile?.gemini_key_verified || !profile?.gemini_api_key) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 403 }
      )
    }

    const { concept, style } = await request.json()

    if (!concept || !style) {
      return NextResponse.json(
        { error: 'Concept and style are required' },
        { status: 400 }
      )
    }

    const genAI = new GoogleGenerativeAI(profile.gemini_api_key)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `${stylePrompts[style] || stylePrompts.simple}\n\nConcept: ${concept}`

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const explanation = response.text()

      return NextResponse.json({ explanation })
    } catch (err) {
      console.error('Gemini API error:', err)
      return NextResponse.json(
        { error: 'Failed to generate explanation. Please check your API key.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Explain error:', error)
    return NextResponse.json(
      { error: 'Failed to generate explanation' },
      { status: 500 }
    )
  }
}
