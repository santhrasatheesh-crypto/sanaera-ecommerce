'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Cart() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-serif text-merlot mb-12 tracking-wider">SHOPPING CART</h1>

        <div className="bg-white rounded-lg p-8 shadow-lg text-center">
          <p className="text-gray-600 mb-6">Your cart is empty</p>
          <Link href="/shop" className="inline-block px-8 py-3 bg-merlot text-cream font-serif tracking-wider hover:bg-deep-espresso transition">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  )
}
