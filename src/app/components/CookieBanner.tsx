/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cookieConsent = Cookies.get("cookie_consent");
    if (cookieConsent) {
      setIsVisible(false);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-lg text-center">
        <h2 className="text-xl font-bold">Cookie Consent Required</h2>
        <p className="mt-3 text-gray-600">
          This website uses cookies to enhance your experience. By clicking
          "Accept" you agree to our use of cookies as per our{" "}
          <a href="/privacy-policy" className="underline text-blue-500">
            Privacy Policy
          </a>
          .
        </p>
        <button
          onClick={acceptCookies}
          className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
