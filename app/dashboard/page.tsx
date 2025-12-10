import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const handleLogout = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-purple-600">
            ConceptAI
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/settings"
              className="text-gray-700 hover:text-purple-600 transition"
            >
              Settings
            </Link>
            <form action={handleLogout}>
              <button
                type="submit"
                className="text-gray-700 hover:text-purple-600 transition"
              >
                Logout
              </button>
            </form>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to ConceptAI Dashboard
          </h1>

          {/* Payment Status */}
          {!profile?.has_paid ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-yellow-800 mb-2">
                🔒 Unlock Full Access
              </h2>
              <p className="text-yellow-700 mb-4">
                Complete your one-time payment to access the ConceptAI explanation feature.
              </p>
              <form action="/api/checkout" method="POST">
                <button
                  type="submit"
                  className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition"
                >
                  Complete Payment - Get Lifetime Access
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                ✅ Payment Completed
              </h2>
              <p className="text-green-700">
                You have full access to all features!
              </p>
            </div>
          )}

          {/* Gemini Key Status */}
          {profile?.has_paid && (
            <div className={`${profile.gemini_key_verified ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'} border rounded-xl p-6 mb-8`}>
              <h2 className="text-xl font-semibold mb-2">
                {profile.gemini_key_verified ? '✅ Gemini API Key Verified' : '⚙️ Setup Your Gemini API Key'}
              </h2>
              <p className="text-gray-700 mb-4">
                {profile.gemini_key_verified 
                  ? 'Your Gemini API key is configured and ready to use.'
                  : 'You need to add and verify your Gemini API key to start using the explanation feature.'}
              </p>
              {!profile.gemini_key_verified && (
                <Link
                  href="/settings"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Go to Settings
                </Link>
              )}
            </div>
          )}

          {/* Main Feature Access */}
          {profile?.has_paid && profile.gemini_key_verified && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Ready to Learn!
              </h2>
              <p className="text-gray-600 mb-6">
                Use the Explain Concept feature to understand any topic in simple terms.
              </p>
              <Link
                href="/explain"
                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition text-lg"
              >
                Start Explaining Concepts →
              </Link>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How It Works
            </h2>
            <ol className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">1.</span>
                <span>Complete the one-time payment to unlock the platform</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">2.</span>
                <span>Add your Gemini API key in Settings (get it free from Google AI Studio)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">3.</span>
                <span>Start explaining any concept with various learning styles!</span>
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  )
}
