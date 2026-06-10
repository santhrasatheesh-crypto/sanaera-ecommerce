'use client';

import Navbar from '@/components/Navigation/Navbar';
import Footer from '@/components/Layout/Footer';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="min-h-96 bg-gradient-to-b from-cream to-ice-melt-light flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-6xl font-serif text-deep-espresso mb-6">About SANAÉRA</h1>
          <p className="text-xl font-sans text-deep-espresso opacity-80">
            Where luxury meets heritage, and every piece tells a story
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-serif text-deep-espresso mb-6">Our Story</h2>
            <div className="w-12 h-1 bg-merlot mb-8"></div>
            <p className="text-lg font-sans text-deep-espresso opacity-80 leading-relaxed mb-6">
              SANAÉRA was born from a passion for celebrating the diverse beauty of contemporary Indian fashion. Our founder envisioned a luxury brand that would honor our desi heritage while embracing modern sophistication.
            </p>
            <p className="text-lg font-sans text-deep-espresso opacity-80 leading-relaxed">
              Every piece in our collection is meticulously crafted to tell a story—a story of empowerment, elegance, and self-expression. From the finest fabrics to the intricate details, we believe that fashion should make you feel confident in every version of yourself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-ice-melt-light">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-serif text-deep-espresso mb-12 text-center"
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Luxury',
                description: 'We believe luxury is not just about price, but about quality, craftsmanship, and the experience.',
              },
              {
                title: 'Heritage',
                description: 'Our designs celebrate the rich traditions of Indian fashion while embracing contemporary aesthetics.',
              },
              {
                title: 'Empowerment',
                description: 'Every piece is designed to help you feel confident and beautiful in every version of yourself.',
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-cream p-8 text-center"
              >
                <h3 className="font-serif text-2xl text-merlot mb-4">{value.title}</h3>
                <p className="font-sans text-deep-espresso opacity-80">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
