'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { EXPLANATION_STYLES } from '@/lib/types/database'

export default function ExplainPage() {
  const [concept, setConcept] = useState('')
  const [style, setStyle] = useState('simple')
  const [explanation, setExplanation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasAccess, setHasAccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAccess()
  }, [])

  const checkAccess = async () => {
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

      if (!profile?.has_paid || !profile?.gemini_key_verified) {
        router.push('/dashboard')
        return
      }

      setHasAccess(true)
    } catch (err) {
      console.error('Error checking access:', err)
      router.push('/dashboard')
    }
  }

  const handleExplain = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setExplanation('')
    setLoading(true)

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept, style }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get explanation')
      }

      setExplanation(data.explanation)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
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
            <Link
              href="/settings"
              className="text-gray-700 hover:text-purple-600 transition"
            >
              Settings
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Explain Any Concept
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <form onSubmit={handleExplain} className="space-y-6">
              <div>
                <label htmlFor="concept" className="block text-sm font-medium text-gray-700 mb-2">
                  What concept would you like to understand?
                </label>
                <input
                  id="concept"
                  type="text"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  required
                  placeholder="e.g., Quantum Computing, Black Holes, Blockchain..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-lg"
                />
              </div>

              <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                  Explanation Style
                </label>
                <select
                  id="style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent text-lg appearance-none bg-white cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  {EXPLANATION_STYLES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !concept}
                className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {loading ? 'Generating Explanation...' : 'Explain This Concept'}
              </button>
            </form>
          </div>

          {explanation && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Explanation
              </h2>
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {explanation}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
