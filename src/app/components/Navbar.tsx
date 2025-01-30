"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import {
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../api/firebase"; // Import Firebase auth instance
import { useRouter } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
const Navbar: React.FC = () => {
  const { data: session } = useSession(); // Get session data
  const [isOpen, setIsOpen] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      if (firebaseUser) {
        await firebaseSignOut(auth);
        console.log("Successfully logged out from Firebase.");
      }

      if (session) {
        await nextAuthSignOut({ callbackUrl: "/" });
        console.log("Successfully logged out from NextAuth.");
      }

      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-semibold tracking-wide">
          <Link href="/">BAVARIA TRAVELS</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <Link href="/aboutus" className="hover:text-gray-400">
              About
            </Link>
          </li>
          <li>
            <Link href="/cookies" className="hover:text-gray-400">
              Cookies
            </Link>
          </li>
          <li>
            <Link href="/faq" className="hover:text-gray-400">
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-400">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/terms" className="block hover:text-gray-400">
              Terms
            </Link>
          </li>
          <li>
            <Link href="/explore" className="block hover:text-gray-400">
              Explore Trips
            </Link>
          </li>

          {/* Conditional Links */}
          {session || firebaseUser ? (
            <>
              <li className="text-gray-300">
                Welcome, {session?.user?.name || firebaseUser?.email || "User"}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-gray-400">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gray-400">
                  Signup
                </Link>
              </li>
            </>
          )}
          <LanguageSwitcher />
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white px-6 py-4 space-y-4 text-lg">
          <Link href="/aboutus" className="block hover:text-gray-400">
            About
          </Link>
          <Link href="/cookies" className="block hover:text-gray-400">
            Cookies
          </Link>
          <Link href="/faq" className="block hover:text-gray-400">
            FAQ
          </Link>
          <Link href="/contact" className="block hover:text-gray-400">
            Contact
          </Link>
          <Link href="/terms" className="block hover:text-gray-400">
            Terms and condition
          </Link>
          <li>
            <Link href="/protection" className="block hover:text-gray-400">
              Data terms
            </Link>
          </li>
          <li>
            <Link href="/disclaimer" className="block hover:text-gray-400">
              Disclaimer
            </Link>
          </li>

          {/* Conditional Links */}
          {session || firebaseUser ? (
            <>
              <p className="text-gray-300">
                Welcome,{" "}
                {session?.user?.name || firebaseUser?.displayName || "User"}
              </p>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block hover:text-gray-400">
                Login
              </Link>
              <Link href="/signup" className="block hover:text-gray-400">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
