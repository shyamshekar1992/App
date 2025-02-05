/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getSession } from 'next-auth/react';
import { auth } from '../api/firebase'; // Import Firebase auth
import { useRouter } from 'next/navigation';

const db = getFirestore(); // Initialize Firestore

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ uid?: string; name?: string; email?: string } | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        return;
      }

      // If no NextAuth session, check Firebase authentication
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid, // Store UID to fetch bookings
            name: firebaseUser.displayName || 'Firebase User',
            email: firebaseUser.email || 'No Email',
          });
          fetchBookings(firebaseUser.uid); // Fetch user's bookings
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    };

    fetchSession();
  }, []);

  const fetchBookings = async (userId: string) => {
    try {
      const bookingsRef = collection(db, `users/${userId}/bookings`);
      const snapshot = await getDocs(bookingsRef);
      const bookingData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingData);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-white rounded shadow-md">
          <p className="text-lg text-gray-700 mb-4">You are not logged in.</p>
          <a href="/login" className="text-blue-600 hover:underline text-lg">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <p className="text-lg text-gray-600">
        <strong>Email:</strong> {user.email}
      </p>

      <h2 className="text-2xl font-semibold mt-6">Your Bookings</h2>

      {bookings.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="border p-4 rounded-lg shadow-md bg-black">
              <h3 className="text-lg font-bold">{booking.tripTitle}</h3>
              <p>Tickets: {booking.tickets}</p>
              <p>Total Price: €{booking.totalPrice}</p>
              <p>Start City: {booking.startCity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default Dashboard;
