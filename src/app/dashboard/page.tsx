'use client';

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getSession } from 'next-auth/react';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      // Check for NextAuth session
      const session = await getSession();

      if (session) {
        // If NextAuth session exists, set user from session
        setUser({
          name: session.user?.name || 'No Name',
          email: session.user?.email || 'No Email',
        });
        setLoading(false);
        return;
      }

      // If no NextAuth session, check for Firebase session
      const auth = getAuth();
      onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          // Set user details from Firebase
          setUser({
            name: firebaseUser.displayName || 'Firebase User',
            email: firebaseUser.email || 'No Email',
          });
        } else {
          // No user logged in
          setUser(null);
        }
        setLoading(false);
      });
    };

    fetchSession();
  }, []);

  if (loading) {
    // Show loading state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    // If no user is logged in, prompt login
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-white rounded shadow-md">
          <p className="text-lg text-gray-700 mb-4">You are not logged in.</p>
          <a
            href="/login"
            className="text-blue-600 hover:underline text-lg"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // If user is logged in, show dashboard
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <p className="text-lg text-gray-600">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-md text-gray-500 mt-4">
        You are successfully logged in. Enjoy exploring your dashboard!
      </p>
    </div>
  );
};

export default Dashboard;
