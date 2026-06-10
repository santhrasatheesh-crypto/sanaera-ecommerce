'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials')
      } else if (result?.ok) {
        router.push('/admin/dashboard')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-merlot to-deep-espresso flex items-center justify-center">
      <div className="bg-cream rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-serif text-merlot mb-6 tracking-wider text-center">ADMIN LOGIN</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium text-deep-espresso mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-merlot"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deep-espresso mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-merlot"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-merlot text-cream py-2 rounded font-serif tracking-wider hover:bg-deep-espresso transition disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  )
}
