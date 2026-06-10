'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const mockProducts = [
  { id: 1, name: 'Silk Saree', price: 5000, image: 'https://via.placeholder.com/300x400?text=Silk+Saree', occasion: 'Festive' },
  { id: 2, name: 'Ethnic Kurti', price: 2500, image: 'https://via.placeholder.com/300x400?text=Ethnic+Kurti', occasion: 'Daily' },
  { id: 3, name: 'Designer Lehenga', price: 8000, image: 'https://via.placeholder.com/300x400?text=Lehenga', occasion: 'Wedding' },
  { id: 4, name: 'Cotton Fusion', price: 3000, image: 'https://via.placeholder.com/300x400?text=Fusion', occasion: 'Casual' },
]

export default function Shop() {
  const [filteredProducts] = useState(mockProducts)

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-deep-espresso text-cream py-16 text-center">
        <h1 className="text-5xl font-serif tracking-wider mb-4">SHOP COLLECTION</h1>
        <p className="text-lg opacity-70">Discover our curated luxury fashion pieces</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-lg mb-4 text-merlot">OCCASION</h3>
            <div className="space-y-2">
              {['All', 'Festive', 'Daily', 'Wedding', 'Casual'].map(o => (
                <label key={o} className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked={o === 'All'} />
                  <span className="text-sm">{o}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-serif text-lg mb-4 text-merlot">PRICE</h3>
            <input type="range" min="0" max="10000" className="w-full" />
          </div>
          <div>
            <h3 className="font-serif text-lg mb-4 text-merlot">SIZE</h3>
            <div className="space-y-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
                <label key={s} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{s}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-serif text-lg mb-4 text-merlot">FABRIC</h3>
            <div className="space-y-2">
              {['Silk', 'Cotton', 'Linen', 'Blend'].map(f => (
                <label key={f} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{f}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/product/${product.id}`}>
                <div className="group cursor-pointer">
                  <div className="bg-gray-200 rounded-lg overflow-hidden mb-4 h-80 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <h3 className="font-serif text-lg text-merlot mb-2 group-hover:text-deep-espresso">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.occasion}</p>
                  <p className="font-serif text-xl text-merlot">₹{product.price.toLocaleString()}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
