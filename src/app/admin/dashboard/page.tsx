'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (status === 'loading') return <div>Loading...</div>

  if (!session) return null

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-serif text-merlot mb-12 tracking-wider">ADMIN DASHBOARD</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { title: 'Total Orders', value: '1,234', icon: '📦' },
            { title: 'Revenue', value: '₹45,67,890', icon: '💰' },
            { title: 'Customers', value: '567', icon: '👥' },
            { title: 'Low Stock Items', value: '12', icon: '⚠️' },
          ].map((card, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-2">{card.icon}</div>
              <p className="text-gray-600 text-sm mb-2">{card.title}</p>
              <p className="text-2xl font-serif text-merlot">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-serif text-merlot mb-4">PRODUCT MANAGEMENT</h2>
            <button className="px-6 py-2 bg-merlot text-cream rounded font-serif tracking-wider hover:bg-deep-espresso transition">
              Add Product
            </button>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-serif text-merlot mb-4">ORDER MANAGEMENT</h2>
            <button className="px-6 py-2 bg-merlot text-cream rounded font-serif tracking-wider hover:bg-deep-espresso transition">
              View Orders
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mt-8">
          <p className="text-yellow-800 font-medium">⚠️ Low Stock Alert</p>
          <p className="text-yellow-700 text-sm">12 products have stock below 10 units</p>
        </div>
      </div>
    </div>
  )
}
