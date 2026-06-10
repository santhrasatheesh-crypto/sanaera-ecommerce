'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AiFillInstagram, AiFillFacebook, AiFillTwitter } from 'react-icons/ai';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setEmail('');
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <footer className="bg-deep-espresso text-cream py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-serif font-bold mb-4">SANAÉRA</h3>
          <p className="text-sm font-sans opacity-70">For every version of you. Luxury fashion with a desi heritage touch.</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-serif font-bold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm font-sans">
            <li><Link href="/shop" className="hover:text-ice-melt transition">All Products</Link></li>
            <li><Link href="/collections" className="hover:text-ice-melt transition">Collections</Link></li>
            <li><Link href="/shop?sort=newest" className="hover:text-ice-melt transition">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-serif font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm font-sans">
            <li><Link href="/about" className="hover:text-ice-melt transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-ice-melt transition">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-ice-melt transition">Terms</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-serif font-bold mb-4">Newsletter</h4>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-merlot text-cream px-4 py-2 text-sm focus:outline-none"
            />
            <button className="w-full bg-ice-melt text-deep-espresso py-2 font-sans font-semibold hover:bg-ice-melt-dark transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-merlot mt-8 pt-8">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <p className="text-sm font-sans opacity-70">© 2024 SANAÉRA. All rights reserved.</p>
          <div className="flex gap-4">
            <AiFillInstagram size={20} className="hover:text-ice-melt cursor-pointer transition" />
            <AiFillFacebook size={20} className="hover:text-ice-melt cursor-pointer transition" />
            <AiFillTwitter size={20} className="hover:text-ice-melt cursor-pointer transition" />
          </div>
        </div>
      </div>
    </footer>
  );
}
