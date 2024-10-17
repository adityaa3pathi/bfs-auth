'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../../../components/ui/input'; // Assuming you have these components from shadcn
import { cn } from '../../../../lib/utils';// Utility function for Tailwind class concatenation
import { Button } from '../../../../components/ui/button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/search');
    } else {
      const data = await res.json();
      console.error(data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign In</h2>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1 block w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 block w-full"
            required
          />
        </div>

        <Button
          type="submit"
          className={cn('w-full', loading ? 'bg-gray-400 cursor-not-allowed' : '')}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
