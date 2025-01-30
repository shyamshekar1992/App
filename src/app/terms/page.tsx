"use client";

import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">Terms & Conditions</h1>
        <p className="text-center text-gray-600 mt-2">Effective Date: September 11, 2017</p>

        {/* Introduction */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p className="text-gray-600 mt-2">
            These terms and conditions apply to all services and sales offered by pm2am GmbH & Co. KG. 
            By making a booking with us, you confirm your acceptance of these terms. 
            This agreement is between you, the customer, and pm2am GmbH & Co. KG.
          </p>
        </div>

        {/* Booking & Payment */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Booking & Payment</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-600">
            <li>Full payment is required at the time of booking.</li>
            <li>All prices are quoted in Euro (€), and we are not liable for currency conversion fees.</li>
            <li>Once payment is received, a confirmation booking ID will be issued.</li>
          </ul>
        </div>

        {/* Tour Inclusions & Amendments */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Tour Inclusions & Amendments</h2>
          <p className="text-gray-600 mt-2">
            Unless otherwise stated, our tours include round-trip transportation and shared accommodation.
            We reserve the right to modify trips due to unforeseen circumstances.
          </p>
        </div>

        {/* Passenger Responsibilities */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Passenger Responsibilities</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-600">
            <li>It is your responsibility to carry valid travel documents.</li>
            <li>You must comply with the laws of the countries visited.</li>
            <li>We are not liable for any lost or stolen belongings.</li>
          </ul>
        </div>

        {/* Extra Activities & Excursions */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Extra Activities & Excursions</h2>
          <p className="text-gray-600 mt-2">
            Optional activities, excursions, and merchandise purchases are not included in the trip price. 
            They are subject to availability and third-party terms.
          </p>
        </div>

        {/* Insurance */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Insurance</h2>
          <p className="text-gray-600 mt-2">
            We do not provide travel insurance. We highly recommend you purchase comprehensive insurance before traveling.
          </p>
        </div>

        {/* Cancellations & Refunds */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Cancellations & Refunds</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-600">
            <li>All bookings are non-refundable unless canceled by pm2am.</li>
            <li>Voucher refunds are available under specific conditions.</li>
            <li>Refunds are processed within 14 business days.</li>
          </ul>
        </div>

        {/* Baggage Allowance */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Baggage Allowance</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-600">
            <li>Hand luggage: Max. 5 kg, size 40cm x 30cm x 10cm.</li>
            <li>Checked-in luggage: Max. 15 kg, size 50cm x 40cm x 20cm.</li>
            <li>Larger luggage requires an additional fee.</li>
          </ul>
        </div>

        {/* Final Section */}
        <div className="text-center mt-8">
          <p className="text-gray-700">
            By booking a trip with pm2am, you acknowledge that you have read, understood, and agree to these terms.
          </p>
       
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
