"use client";

import React from "react";

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Cookies Policy
        </h1>

        {/* Introduction */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
            What Are Cookies?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Cookies are small text files stored on your device (computer, tablet,
            smartphone) when you visit a website. They help improve website
            functionality and provide a better user experience.
          </p>
        </section>

        {/* Types of Cookies */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
            Types of Cookies We Use
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-3">
            <li>
              <strong>Essential Cookies:</strong> Necessary for website functionality, such as logging in or saving preferences.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how users interact with our website (e.g., Google Analytics).
            </li>
            <li>
              <strong>Functional Cookies:</strong> Enhance personalization by remembering choices like language settings.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant ads.
            </li>
          </ul>
        </section>

        {/* Cookie Control */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
            Managing Your Cookie Preferences
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You can control and delete cookies through your browser settings. Below are links to manage cookies in common browsers:
          </p>
          <ul className="list-disc pl-6 text-blue-600 mt-4 space-y-2">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Manage Cookies in Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Manage Cookies in Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/en-us/HT201265"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Manage Cookies in Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Manage Cookies in Edge
              </a>
            </li>
          </ul>
        </section>

        {/* GDPR Compliance */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
            GDPR & Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Under the **General Data Protection Regulation (GDPR)**, you have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-3 mt-4">
            <li>Access the data we collect about you.</li>
            <li>Request deletion of your personal data.</li>
            <li>Withdraw consent for cookie tracking.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            To request data deletion or exercise your rights, contact us at:
            <span className="font-medium text-blue-600">
              {" "}
              travelagent@pm2amtrips.com
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiesPage;
