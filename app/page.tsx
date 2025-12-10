import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">ConceptAI</div>
          <div className="space-x-4">
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-purple-600 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Understand Any Concept
            <span className="text-purple-600"> Simply</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Powered by AI, ConceptAI breaks down complex topics into easy-to-understand explanations.
            Choose your learning style and master any concept.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Link
              href="/auth/signup"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition shadow-lg"
            >
              Get Started - One-Time Payment
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Uses Google Gemini AI to provide accurate and clear explanations
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Multiple Styles</h3>
              <p className="text-gray-600">
                Choose from various explanation styles that match your learning preference
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2">One-Time Payment</h3>
              <p className="text-gray-600">
                Pay once, use forever. No subscriptions, no recurring charges
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>© 2024 ConceptAI. All rights reserved.</p>
      </footer>
    </div>
  )
}
