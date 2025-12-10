'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setIsVerified(profile.gemini_key_verified)
        if (profile.gemini_api_key) {
          setGeminiKey('••••••••••••••••')
        }
      }
    } catch (err) {
      console.error('Error loading profile:', err)
    }
  }

  const handleVerifyKey = async () => {
    if (!geminiKey || geminiKey.startsWith('•')) {
      setError('Please enter a valid Gemini API key')
      return
    }

    setError('')
    setSuccess('')
    setVerifying(true)

    try {
      const response = await fetch('/api/verify-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: geminiKey }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed')
      }

      setIsVerified(true)
      setSuccess('Gemini API key verified successfully!')
      setGeminiKey('••••••••••••••••')
      setTimeout(() => router.push('/dashboard'), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify key')
    } finally {
      setVerifying(false)
    }
  }

  const handleSaveKey = async () => {
    if (!geminiKey || geminiKey.startsWith('•')) {
      setError('Please enter a valid Gemini API key')
      return
    }

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ 
          gemini_api_key: geminiKey,
          gemini_key_verified: false 
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      setSuccess('API key saved. Please verify it now.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save key')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
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
              href="/dashboard"
              className="text-gray-700 hover:text-purple-600 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-purple-600 transition"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Settings</h1>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Gemini API Key
            </h2>

            {isVerified && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-semibold">
                  ✅ Your Gemini API key is verified and active
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800">{success}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label htmlFor="geminiKey" className="block text-sm font-medium text-gray-700 mb-2">
                  Gemini API Key
                </label>
                <input
                  id="geminiKey"
                  type="text"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Get your free Gemini API key from{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline"
                  >
                    Google AI Studio
                  </a>
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSaveKey}
                  disabled={loading || verifying}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Key'}
                </button>
                <button
                  onClick={handleVerifyKey}
                  disabled={loading || verifying || !geminiKey}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {verifying ? 'Verifying...' : 'Verify Key'}
                </button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                How to get a Gemini API Key:
              </h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Visit Google AI Studio</li>
                <li>Sign in with your Google account</li>
                <li>Click &quot;Get API key&quot;</li>
                <li>Copy your API key and paste it above</li>
                <li>Click &quot;Verify Key&quot; to test it</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
