/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../api/firebase"; // ✅ Import Firebase
import { collection, addDoc } from "firebase/firestore";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isBookingSaved, setIsBookingSaved] = useState(false);
  const [error, setError] = useState("");
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  // ✅ Listen for Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.error("❌ User not logged in! Redirecting to login...");
        router.push("/login"); // ✅ Redirect to login if user is not logged in
      }
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Function to save booking data to Firestore
  // ✅ Function to save booking data to Firestore and then call the API
const saveBooking = async () => {
  try {
    if (!firebaseUser) return;

    const tripTitle = searchParams.get("tripTitle");
    const tickets = Number(searchParams.get("tickets"));
    const totalPrice = Number(searchParams.get("totalPrice"));
    const startCity = searchParams.get("startCity");
    const privateRoom = searchParams.get("privateRoom") === "true";
    const passengerNames = JSON.parse(searchParams.get("passengerNames") || "[]");
    const customerEmail = firebaseUser.email; // ✅ Use Firebase user email

    if (!tripTitle || !tickets || !totalPrice || !startCity || !customerEmail) {
      console.error("❌ Missing booking details");
      return;
    }

    console.log(`✅ Storing booking in Firestore for user: ${firebaseUser.uid}`);

    // ✅ Save booking to Firestore under `/users/{userId}/bookings`
    const userBookingsRef = collection(db, `users/${firebaseUser.uid}/bookings`);
    const docRef = await addDoc(userBookingsRef, {
      tripTitle,
      tickets,
      totalPrice,
      startCity,
      privateRoom,
      passengerNames,
      customerEmail,
      userId: firebaseUser.uid,
      createdAt: new Date(),
    });

    console.log("✅ Booking saved successfully in Firestore!", docRef.id);
    setIsBookingSaved(true);

    // ✅ Call Next.js API after saving in Firestore
    console.log("📨 Calling Next.js API to process booking...");
    const response = await fetch("/api/save-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tripTitle,
        tickets,
        totalPrice,
        startCity,
        privateRoom,
        passengerNames,
        customerEmail,
      }),
    });

    if (!response.ok) {
      throw new Error(`❌ API Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ API Response:", data);

    router.push("/bookfinal"); // ✅ Redirect after all steps complete
  } catch (err) {
    console.error("❌ Error in booking process:", err);
    setError("An error occurred while saving your booking.");
  }
};


  // ✅ Run `saveBooking` only when user is available
  useEffect(() => {
    if (firebaseUser) {
      saveBooking();
    }
  }, [firebaseUser, searchParams]);

  return (
    <div className="text-center p-12">
      {isBookingSaved ? (
        <>
          <h1 className="text-green-600 text-2xl font-bold">✅ Payment Successful!</h1>
          <p>Your booking has been saved successfully.</p>
        </>
      ) : error ? (
        <>
          <h1 className="text-red-600 text-2xl font-bold">❌ Payment Success, but Booking Failed</h1>
          <p>{error}</p>
        </>
      ) : (
        <>
          <h1 className="text-gray-700 text-2xl font-bold">⏳ Processing your booking...</h1>
          <p>Please wait while we confirm your booking.</p>
        </>
      )}
    </div>
  );
};

export default SuccessPage;
