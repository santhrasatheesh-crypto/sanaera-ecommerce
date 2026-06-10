'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navigation/Navbar';
import Footer from '@/components/Layout/Footer';
import ProductCard from '@/components/Products/ProductCard';
import { motion } from 'framer-motion';
import { IProduct } from '@/types';
import Link from 'next/link';

export default function Home() {
  const [featured, setFeatured] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('/api/products?featured=true&limit=8');
        const data = await response.json();
        if (data.success) {
          setFeatured(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-cream to-ice-melt-light flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-7xl md:text-8xl font-serif font-bold text-deep-espresso mb-6 tracking-tight">
            SANAÉRA
          </h1>
          <p className="text-2xl md:text-3xl font-serif text-merlot mb-8 tracking-luxury">
            For Every Version of You
          </p>
          <p className="text-lg font-sans text-deep-espresso mb-12 opacity-80">
            Luxury fashion with desi heritage inspiration. Contemporary, sophisticated, timeless.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-merlot text-cream px-12 py-4 font-sans font-semibold hover:bg-merlot-dark transition tracking-widest"
          >
            EXPLORE COLLECTION
          </Link>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-5xl font-serif text-deep-espresso mb-2">Featured Products</h2>
            <div className="w-20 h-1 bg-merlot"></div>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-ice-melt-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-serif text-deep-espresso mb-6">Our Story</h2>
            <p className="text-lg font-sans text-deep-espresso opacity-80 leading-relaxed">
              SANAÉRA celebrates the fusion of luxury and heritage. Every piece is crafted with precision, combining contemporary design with the rich traditions of Indian fashion. We believe in creating timeless pieces that make you feel confident in every version of yourself.
            </p>
            <Link
              href="/about"
              className="inline-block mt-8 text-merlot font-sans font-semibold hover:text-merlot-dark tracking-widest"
            >
              LEARN MORE →
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
