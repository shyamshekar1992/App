import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAryEIbv7dLrIxfuJXyg2X5QkiwUDaSOXA",
  authDomain: "travel-app-3a2ce.firebaseapp.com",
  projectId: "travel-app-3a2ce",
  storageBucket: "travel-app-3a2ce.appspot.com", // Corrected URL
  messagingSenderId: "122338024938",
  appId: "1:122338024938:web:59ab027690699653702693",
  measurementId: "G-Y2WG7F6XNW",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firebase Analytics (conditionally for browser environments)
let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export Firebase instances
export { app, auth, analytics };
