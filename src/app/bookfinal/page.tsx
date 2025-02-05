"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../api/firebase"; // Import Firebase auth instance

export default function BookingSuccessPage() {
  return (
    <SessionProvider> {/* ✅ Temporary Fix */}
      <BookingSuccess />
    </SessionProvider>
  );
}

function BookingSuccess() {
  const router = useRouter();
  const { data: session } = useSession(); // Get NextAuth session
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  // ✅ Check Firebase authentication state (same as Navbar)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Redirect handler
  const handleRedirect = () => {
    if (session || firebaseUser) {
      router.push("/dashboard"); // Redirect logged-in users
    } else {
      router.push("/"); // Redirect logged-out users
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-500 text-white rounded-full text-3xl">
          ✓
        </div>
        <h1 className="text-2xl font-bold">Booking Successful!</h1>
        <p className="text-gray-600 mt-2">
          Check your email or spam folder for the booking confirmation.
        </p>
        <button
          onClick={handleRedirect}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {session || firebaseUser ? "Go to My Bookings" : "Go to Home"}
        </button>
      </div>
    </div>
  );
}
