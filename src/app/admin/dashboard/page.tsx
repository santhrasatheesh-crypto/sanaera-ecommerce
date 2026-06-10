'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const response = await fetch('/api/admin/auth/verify', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          localStorage.removeItem('adminToken');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('adminToken', data.data.token);
        setIsAuthenticated(true);
        toast.success('Admin login successful');
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    toast.success('Logged out');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-deep-espresso flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-cream p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-serif text-deep-espresso mb-6">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-sans text-deep-espresso mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-ice-melt focus:outline-none focus:border-merlot"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-sans text-deep-espresso mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-ice-melt focus:outline-none focus:border-merlot"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-merlot text-cream py-3 font-sans font-semibold hover:bg-merlot-dark transition"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-deep-espresso text-cream px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold">SANAÉRA Admin</h1>
          <button
            onClick={handleLogout}
            className="bg-merlot px-4 py-2 font-sans font-semibold hover:bg-merlot-dark transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation */}
        <div className="flex gap-4 mb-8 border-b border-ice-melt">
          {['dashboard', 'products', 'orders', 'customers', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-sans font-semibold border-b-2 transition ${
                activeTab === tab
                  ? 'border-merlot text-merlot'
                  : 'border-transparent text-deep-espresso hover:text-merlot'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-3xl font-serif text-deep-espresso">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Orders', value: '1,234', color: 'merlot' },
                { label: 'Revenue', value: '₹45,60,000', color: 'ice-melt' },
                { label: 'Total Customers', value: '892', color: 'merlot' },
                { label: 'Products', value: '156', color: 'ice-melt' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-${stat.color} p-6 text-center`}
                >
                  <p className="font-sans text-sm opacity-80 mb-2">{stat.label}</p>
                  <p className="font-serif text-3xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-ice-melt p-6">
              <h3 className="font-serif text-2xl text-deep-espresso mb-6">Recent Orders</h3>
              <div className="space-y-4">
                {[
                  { order: '#ORD-001', customer: 'John Doe', amount: '₹8,500', status: 'Delivered' },
                  { order: '#ORD-002', customer: 'Jane Smith', amount: '₹12,300', status: 'Processing' },
                  { order: '#ORD-003', customer: 'Priya Kumar', amount: '₹6,800', status: 'Shipped' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-ice-melt pb-4">
                    <div>
                      <p className="font-sans font-semibold">{item.order}</p>
                      <p className="text-sm text-gray-600 font-sans">{item.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-sans font-semibold">{item.amount}</p>
                      <span className="bg-merlot-light text-cream px-3 py-1 text-xs font-sans font-semibold">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-serif text-deep-espresso">Product Management</h2>
              <button className="bg-merlot text-cream px-6 py-2 font-sans font-semibold hover:bg-merlot-dark transition">
                Add Product
              </button>
            </div>

            <div className="bg-white border border-ice-melt overflow-hidden">
              <table className="w-full">
                <thead className="bg-deep-espresso text-cream">
                  <tr>
                    <th className="px-6 py-4 text-left font-sans font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-sans font-semibold">SKU</th>
                    <th className="px-6 py-4 text-left font-sans font-semibold">Price</th>
                    <th className="px-6 py-4 text-left font-sans font-semibold">Stock</th>
                    <th className="px-6 py-4 text-left font-sans font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '1', name: 'Silk Saree', sku: 'SAR-001', price: '₹8,500', stock: '45' },
                    { id: '2', name: 'Fusion Dress', sku: 'FUS-002', price: '₹5,200', stock: '32' },
                    { id: '3', name: 'Ethnic Kurta', sku: 'KUR-003', price: '₹3,800', stock: '67' },
                  ].map((product) => (
                    <tr key={product.id} className="border-t border-ice-melt">
                      <td className="px-6 py-4 font-sans">{product.name}</td>
                      <td className="px-6 py-4 font-sans text-sm text-gray-600">{product.sku}</td>
                      <td className="px-6 py-4 font-sans">{product.price}</td>
                      <td className="px-6 py-4 font-sans">{product.stock}</td>
                      <td className="px-6 py-4 font-sans space-x-2">
                        <button className="text-merlot hover:text-merlot-dark text-sm font-semibold">Edit</button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-semibold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Other tabs would have similar content */}
        {['orders', 'customers', 'analytics'].includes(activeTab) && (
          <div className="text-center py-12">
            <p className="font-sans text-gray-600">This section is under development</p>
          </div>
        )}
      </div>
    </div>
  );
}
