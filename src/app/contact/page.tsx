'use client';

import Navbar from '@/components/Navigation/Navbar';
import Footer from '@/components/Layout/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Implement contact form submission
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="min-h-96 bg-gradient-to-b from-cream to-ice-melt-light flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-serif text-deep-espresso mb-4">Contact Us</h1>
          <p className="text-xl font-sans text-deep-espresso opacity-80">We'd love to hear from you</p>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-serif text-deep-espresso mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-lg text-merlot mb-2">Email</h3>
                <p className="font-sans text-deep-espresso">support@sanaera.com</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-merlot mb-2">Phone</h3>
                <p className="font-sans text-deep-espresso">+91 XXXX XXXX XX</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-merlot mb-2">WhatsApp</h3>
                <p className="font-sans text-deep-espresso">+91 XXXX XXXX XX</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-merlot mb-2">Business Hours</h3>
                <p className="font-sans text-deep-espresso">Monday - Friday: 10:00 AM - 6:00 PM</p>
                <p className="font-sans text-deep-espresso">Saturday - Sunday: 12:00 PM - 5:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif text-deep-espresso mb-8">Send Message</h2>

            <div>
              <label className="block text-sm font-sans text-deep-espresso mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-ice-melt focus:outline-none focus:border-merlot"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-sans text-deep-espresso mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-ice-melt focus:outline-none focus:border-merlot"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-sans text-deep-espresso mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-ice-melt focus:outline-none focus:border-merlot"
              />
            </div>

            <div>
              <label className="block text-sm font-sans text-deep-espresso mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-ice-melt focus:outline-none focus:border-merlot"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-merlot text-cream py-3 font-sans font-semibold hover:bg-merlot-dark disabled:opacity-50 transition"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </>
  );
}
