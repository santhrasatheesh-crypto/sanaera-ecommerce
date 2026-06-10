'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineHeart, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections' },
    { name: 'New Arrivals', href: '/shop?sort=newest' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cream border-b border-ice-melt">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold text-merlot tracking-luxury">
            SANAÉRA
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-sans text-deep-espresso hover:text-merlot transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <button className="text-deep-espresso hover:text-merlot transition-colors">
              <AiOutlineHeart size={24} />
            </button>
            <button className="text-deep-espresso hover:text-merlot transition-colors">
              <AiOutlineShoppingCart size={24} />
            </button>
            <button className="text-deep-espresso hover:text-merlot transition-colors">
              <AiOutlineUser size={24} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-deep-espresso"
            >
              {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pt-4 border-t border-ice-melt mt-4"
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-deep-espresso hover:text-merlot"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
