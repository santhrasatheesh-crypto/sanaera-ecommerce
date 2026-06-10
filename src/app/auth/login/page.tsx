'use client';

import Navbar from '@/components/Navigation/Navbar';
import Footer from '@/components/Layout/Footer';
import LoginForm from '@/components/Auth/LoginForm';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-cream to-ice-melt-light">
        <div className="max-w-md mx-auto px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-cream border border-ice-melt p-8">
              <h1 className="text-4xl font-serif text-deep-espresso mb-2">
                {isLogin ? 'Login' : 'Register'}
              </h1>
              <div className="w-12 h-1 bg-merlot mb-8"></div>

              {isLogin ? (
                <>
                  <LoginForm />
                  <p className="text-center font-sans text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-merlot font-semibold hover:text-merlot-dark"
                    >
                      Register
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-sans text-deep-espresso mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-ice-melt focus:outline-none focus:border-merlot"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-sans text-deep-espresso mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-ice-melt focus:outline-none focus:border-merlot"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-sans text-deep-espresso mb-2">Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-ice-melt focus:outline-none focus:border-merlot"
                        placeholder="••••••••"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-merlot text-cream py-3 font-sans font-semibold hover:bg-merlot-dark transition"
                    >
                      Create Account
                    </button>
                  </form>
                  <p className="text-center font-sans text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-merlot font-semibold hover:text-merlot-dark"
                    >
                      Login
                    </button>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
