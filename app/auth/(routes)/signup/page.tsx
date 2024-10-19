'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../../../components/ui/input'; // Assuming you're using shadcn UI Input component
import { Button } from '../../../../components/ui/button'; // Assuming you're using shadcn UI Button component
import { Card, CardHeader, CardTitle, CardContent, CardFooter  } from '../../../../components/ui/card';



export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/auth/login'); // Redirect to sign-in page after successful signup
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
                placeholder="Enter a strong password"
                required
                className="mt-1 block w-full"
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/sign-in" className="text-blue-600 hover:underline">
              Sign in here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
