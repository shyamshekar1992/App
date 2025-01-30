"use client";

import React from "react";

const DataProtection = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">Data Protection & Privacy Policy</h1>
        <p className="text-center text-gray-600 mt-2">Effective Date: September 11, 2017</p>

        {/* Privacy Statement */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Privacy Statement</h2>
          <p className="text-gray-600 mt-2">
            Your personal data (e.g. name, address, email, phone number, bank details) are processed only in accordance with German data privacy laws.
            This privacy policy applies only to our web pages. If links route you to other pages, please inquire there about how your data is handled.
          </p>
        </div>

        {/* Inventory Data */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Inventory Data</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-600">
            <li>Your personal data is only used to fulfill the contract.</li>
            <li>Data will not be shared with third parties without consent.</li>
            <li>After contract completion, your data is blocked and later deleted as per tax and commercial regulations.</li>
          </ul>
        </div>

        {/* Web Analysis with Google Analytics */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Web Analysis with Google Analytics</h2>
          <p className="text-gray-600 mt-2">
            This website uses Google Analytics. You can prevent Google from collecting data related to your use of the website by installing a browser plugin from:
            <a href="http://tools.google.com/dlpage/gaoptout?hl=en" className="text-blue-600 underline"> Google Opt-out</a>.
          </p>
        </div>

        {/* Social Plugins from Facebook */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Social Plugins from Facebook</h2>
          <p className="text-gray-600 mt-2">
            Our website uses social plugins from Facebook. If you do not want Facebook to collect data about you via our website, you must log out of Facebook before visiting our pages.
          </p>
        </div>

        {/* Customer Data Protection */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Customer Data Protection</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-600">
            <li>Personal data is collected to facilitate travel arrangements.</li>
            <li>Higher-risk data (bank details, passport numbers) are NOT stored in our database.</li>
            <li>Data is stored securely and deleted after the trip.</li>
          </ul>
        </div>

        {/* Travellers Rights */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Travellers Rights</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-600">
            <li>You have the right to request all data we hold about you.</li>
            <li>You can ask us to delete your personal data right to be forgotten.</li>
            <li>You can track your purchase history and receive a copy upon request.</li>
          </ul>
        </div>

        {/* Contact Possibility */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Contact via Website</h2>
          <p className="text-gray-600 mt-2">
            Our website allows direct contact with us via email or forms. Any voluntarily submitted personal data is securely stored and not shared with third parties.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Privacy Notice</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-600">
            <li>We collect only the data you voluntarily provide.</li>
            <li>Your data is not shared with third parties unless required to fulfill your request.</li>
            <li>You may opt out of future communications at any time.</li>
          </ul>
        </div>

        {/* Security Measures */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Security</h2>
          <p className="text-gray-600 mt-2">
            We take precautions to protect your information both online and offline. Sensitive data (e.g. credit card details) is encrypted and securely transmitted.
          </p>
        </div>

        {/* Cookies */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Cookies</h2>
          <p className="text-gray-600 mt-2">
            This website uses cookies to enhance user experience. Cookies are not linked to any personally identifiable information.
          </p>
        </div>

        {/* Sharing Policy */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Sharing of Data</h2>
          <p className="text-gray-600 mt-2">
            We may share necessary demographic data with our partners (e.g. hostels, transport providers) to ensure trip arrangements. Third parties are prohibited from using your data for other purposes.
          </p>
        </div>

        {/* Disclosure */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Disclosure Rights</h2>
          <p className="text-gray-600 mt-2">
            Under the Federal Data Protection Act, you have the right to request access, correction, or deletion of your stored data. Contact us via email at:  
            <a href="mailto:travelagent@pm2amtrips.com" className="text-blue-600 underline"> travelagent@pm2amtrips.com</a>.
          </p>
        </div>        
      </div>
    </div>
  );
};

export default DataProtection;
