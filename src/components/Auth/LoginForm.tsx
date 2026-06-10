'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { validateEmail } from '@/utils/validation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error('Invalid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful!');
        localStorage.setItem('token', data.data.token);
        router.push('/account');
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        disabled={loading}
        className="w-full bg-merlot text-cream py-3 font-sans font-semibold hover:bg-merlot-dark disabled:opacity-50 transition"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
