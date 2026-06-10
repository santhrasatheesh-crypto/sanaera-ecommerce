'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-ice-melt to-cream">
      <nav className="flex justify-between items-center px-8 py-6 bg-cream/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-3xl font-serif text-merlot tracking-widest">SANAÉRA</h1>
        <div className="hidden md:flex gap-8 text-sm tracking-wide">
          <Link href="#" className="hover:text-merlot transition">HOME</Link>
          <Link href="/shop" className="hover:text-merlot transition">SHOP</Link>
          <Link href="#" className="hover:text-merlot transition">COLLECTIONS</Link>
          <Link href="#" className="hover:text-merlot transition">ABOUT</Link>
        </div>
        <div className="flex gap-4">
          <button className="text-merlot hover:opacity-70 transition">🔍</button>
          <Link href="#" className="text-merlot hover:opacity-70 transition">❤️</Link>
          <Link href="/cart" className="text-merlot hover:opacity-70 transition">🛍️</Link>
        </div>
      </nav>

      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-merlot/10 to-ice-melt/10"
        />
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-6xl md:text-7xl font-serif text-merlot mb-6 tracking-wider">FOR EVERY</h2>
            <h2 className="text-6xl md:text-7xl font-serif text-merlot mb-6 tracking-wider">VERSION OF YOU</h2>
          </motion.div>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-deep-espresso/70 mb-8 max-w-2xl mx-auto"
          >
            Discover luxury fashion inspired by Desi heritage. Handcrafted elegance meets contemporary style.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-6 justify-center"
          >
            <Link href="/shop" className="px-10 py-4 bg-merlot text-cream font-serif text-lg tracking-wider hover:bg-deep-espresso transition duration-300">
              SHOP NOW
            </Link>
            <Link href="#" className="px-10 py-4 border-2 border-merlot text-merlot font-serif text-lg tracking-wider hover:bg-merlot hover:text-cream transition duration-300">
              EXPLORE
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-8 bg-cream">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif text-center text-merlot mb-16 tracking-wider">FEATURED COLLECTIONS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {['New Arrivals', 'Festive Wear', 'Ethnic Fusion'].map((collection, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-ice-melt/30 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer group"
              >
                <div className="h-80 bg-gradient-to-br from-merlot/20 to-deep-espresso/20 flex items-center justify-center group-hover:scale-105 transition duration-300">
                  <h3 className="text-3xl font-serif text-merlot tracking-wider text-center">{collection}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="bg-deep-espresso text-cream py-16 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-serif mb-4 tracking-wider">SANAÉRA</h3>
            <p className="text-sm opacity-70">Luxury fashion for every version of you.</p>
          </div>
          <div>
            <h4 className="font-serif tracking-wider mb-4">SHOP</h4>
            <ul className="text-sm space-y-2 opacity-70">
              <li><Link href="/shop" className="hover:opacity-100 transition">All Products</Link></li>
              <li><Link href="/shop?sort=new" className="hover:opacity-100 transition">New Arrivals</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Collections</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif tracking-wider mb-4">COMPANY</h4>
            <ul className="text-sm space-y-2 opacity-70">
              <li><Link href="#" className="hover:opacity-100 transition">About Us</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Contact</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif tracking-wider mb-4">LEGAL</h4>
            <ul className="text-sm space-y-2 opacity-70">
              <li><Link href="#" className="hover:opacity-100 transition">Privacy</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Terms</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Shipping</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/20 pt-8 text-center text-sm opacity-70">
          <p>&copy; 2024 SANAÉRA. All rights reserved. Luxury Fashion Redefined.</p>
        </div>
      </footer>
    </div>
  )
}
