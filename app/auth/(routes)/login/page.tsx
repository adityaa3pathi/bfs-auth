'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../../../components/ui/input'; // Assuming you're using shadcn UI Input component
import { Button } from '../../../../components/ui/button'; // Assuming you're using shadcn UI Button component
import { Card, CardHeader, CardTitle, CardContent, CardFooter  } from '../../../../components/ui/card'; // Card for wrapping the form

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Set the correct header for JSON
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {

      
      router.push('/search'); 
      router.refresh();// Redirect after login
      
    } else {
      const data = await res.json();
      console.error(data.error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="mt-1 block w-full"
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <a href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
