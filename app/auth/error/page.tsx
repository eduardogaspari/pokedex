'use client'

import { useSearchParams } from 'next/navigation'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-red-600">
          Authentication Error
        </h1>
        <p className="text-gray-700 mb-4">
          {error
            ? `Error: ${error}`
            : 'An unexpected error occurred during authentication.'}
        </p>
        <a
          href="/login"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 text-center inline-block"
        >
          Return to Login
        </a>
      </div>
    </div>
  )
}
