'use client'

export const dynamic = 'force-dynamic'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PaymentSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. You now have lifetime access to ConceptAI!
        </p>

        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Go to Dashboard
          </Link>
          
          <p className="text-sm text-gray-500">
            Redirecting automatically in 5 seconds...
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Next Steps:</h3>
          <ol className="text-left text-sm text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="font-bold text-purple-600 mr-2">1.</span>
              <span>Go to Settings and add your Gemini API key</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-purple-600 mr-2">2.</span>
              <span>Verify your API key</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-purple-600 mr-2">3.</span>
              <span>Start explaining concepts!</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
