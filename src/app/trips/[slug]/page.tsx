/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import tripsData from "../../json/trips.json";
import BookingModal from "@/app/components/BookingModal";
// Define TypeScript type for trip data
type Trip = {
  title: string;
  slug: string;
  description: string;
  images: string[];
  startCity: string;
  ppp: string;
  itinerary: { day: string; title: string; details: string }[];
  included: string[];
  optional: { name: string; price: string }[];
};

const TripDetail = () => {
  const params = useParams();
  const { slug } = params;
  const trip: Trip | undefined = tripsData.trips.find((t) => t.slug === slug);

  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!trip) {
    return <p className="text-center text-gray-600 mt-10">Trip not found.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Image */}
      <div className="relative w-full h-[50vh]">
        <Image
          priority
          src={trip.images[0]}
          alt={trip.title}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold">{trip.title}</h1>
        </div>
      </div>

      {/* Trip Details */}
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side - Trip Description & Itinerary */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Overview</h2>
            <p className="text-lg text-gray-600 mt-4">{trip.description}</p>

            {/* Itinerary Section */}
            <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800">Trip Itinerary</h2>
              {trip.itinerary.map((item, index) => (
                <div key={index} className="mt-4 border-b pb-4 last:border-none">
                  <h3 className="text-lg font-bold">{item.day}: {item.title}</h3>
                  <p className="text-gray-600">{item.details}</p>
                </div>
              ))}
            </div>

            {/* Included Section */}
            <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800">What's Included?</h2>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                {trip.included.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Images & Pricing */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Gallery</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {trip.images.map((image, index) => (
                <Image
                  key={index}
                  priority
                  src={image}
                  alt={trip.title}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              ))}
            </div>

            {/* Optional Activities */}
            {trip.optional.length > 0 && (
              <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800">Optional Activities</h2>
                {trip.optional.map((extra, index) => (
                  <p key={index} className="text-gray-600 mt-2">
                    {extra.name} - <span className="text-blue-600">{extra.price}</span>
                  </p>
                ))}
              </div>
            )}

            {/* Pricing & Book Now */}
            <div className="bg-white p-6 mt-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-800">Price Per Person</h2>
              <p className="text-3xl font-bold text-blue-600 mt-2">€{trip.ppp}</p>
              <button
                onClick={() => setShowBookingModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mt-4"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
        trip={trip} 
      />
      )}
    </div>
  );
};

export default TripDetail;
