'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navigation/Navbar';
import Footer from '@/components/Layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
}

export default function AccountPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">Loading...</div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-serif text-deep-espresso mb-2">My Account</h1>
          <div className="w-20 h-1 bg-merlot mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-cream border border-ice-melt p-6">
                <h3 className="font-serif text-xl text-deep-espresso mb-6">Account Menu</h3>
                <nav className="space-y-4">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`block w-full text-left px-4 py-2 font-sans ${
                      activeTab === 'overview'
                        ? 'bg-merlot text-cream'
                        : 'text-deep-espresso hover:bg-ice-melt'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`block w-full text-left px-4 py-2 font-sans ${
                      activeTab === 'orders'
                        ? 'bg-merlot text-cream'
                        : 'text-deep-espresso hover:bg-ice-melt'
                    }`}
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`block w-full text-left px-4 py-2 font-sans ${
                      activeTab === 'wishlist'
                        ? 'bg-merlot text-cream'
                        : 'text-deep-espresso hover:bg-ice-melt'
                    }`}
                  >
                    Wishlist
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`block w-full text-left px-4 py-2 font-sans ${
                      activeTab === 'addresses'
                        ? 'bg-merlot text-cream'
                        : 'text-deep-espresso hover:bg-ice-melt'
                    }`}
                  >
                    Addresses
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 font-sans text-deep-espresso hover:bg-red-100"
                  >
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-cream border border-ice-melt p-6">
                    <h2 className="font-serif text-2xl text-deep-espresso mb-4">Personal Information</h2>
                    <div className="space-y-2">
                      <p className="font-sans">
                        <span className="font-semibold">Name:</span> {user.name || 'Not set'}
                      </p>
                      <p className="font-sans">
                        <span className="font-semibold">Email:</span> {user.email}
                      </p>
                      <p className="font-sans">
                        <span className="font-semibold">Phone:</span> {user.phone || 'Not set'}
                      </p>
                      <p className="font-sans">
                        <span className="font-semibold">Member Since:</span> {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-cream border border-ice-melt p-6">
                    <h2 className="font-serif text-2xl text-deep-espresso mb-4">Recent Orders</h2>
                    {orders.length === 0 ? (
                      <p className="font-sans text-gray-600">No orders yet</p>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map((order) => (
                          <div key={order.id} className="flex items-center justify-between border-b border-ice-melt pb-4">
                            <div>
                              <p className="font-sans font-semibold">{order.orderNumber}</p>
                              <p className="text-sm text-gray-600 font-sans">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className="bg-merlot-light text-cream px-3 py-1 text-sm font-sans">{order.status}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-cream border border-ice-melt p-6">
                  <h2 className="font-serif text-2xl text-deep-espresso mb-6">Your Orders</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="font-sans text-gray-600 mb-4">No orders yet</p>
                      <Link
                        href="/shop"
                        className="inline-block bg-merlot text-cream px-6 py-2 font-sans font-semibold hover:bg-merlot-dark"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-ice-melt p-4 hover:shadow-lg transition">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-serif text-lg text-deep-espresso font-semibold">{order.orderNumber}</p>
                              <p className="font-sans text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-serif text-lg text-deep-espresso font-semibold">₹{order.total}</p>
                              <span className="inline-block bg-merlot-light text-cream px-3 py-1 text-xs font-sans font-semibold">
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Other tabs would have similar structure */}
              {activeTab === 'wishlist' && (
                <div className="bg-cream border border-ice-melt p-6">
                  <h2 className="font-serif text-2xl text-deep-espresso mb-6">My Wishlist</h2>
                  <p className="font-sans text-gray-600">Feature coming soon</p>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="bg-cream border border-ice-melt p-6">
                  <h2 className="font-serif text-2xl text-deep-espresso mb-6">My Addresses</h2>
                  <p className="font-sans text-gray-600">Feature coming soon</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
