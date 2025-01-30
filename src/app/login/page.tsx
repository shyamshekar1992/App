'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router for navigation
import { auth } from '../api/firebase'; // Firebase auth instance
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signIn } from 'next-auth/react'; // GitHub login from next-auth
import Link from 'next/link';

const Login: React.FC = () => {
  const router = useRouter(); // Initialize Next.js router
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error messages

  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setError(''); // Clear any previous errors

    try {
      // Firebase login with email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Use router to navigate to dashboard
      router.push('/dashboard');
    } catch (err: unknown) {
      // Handle login errors
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Firebase Email/Password Login Form */}
        <form onSubmit={handleFirebaseLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="mb-4 text-right">
            <Link href="/forgot-password" className="text-blue-600 hover:underline text-sm">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Log In
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-4 text-center">
          <p>OR</p>
        </div>

        {/* GitHub Login Button */}
        <button
          onClick={() =>
            signIn('github', {
              redirect: true,
              callbackUrl: '/dashboard',
            })
          }
          className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          Sign in with GitHub
        </button>

        <div className="mt-4 text-center">
          <p>
            Don’t have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
