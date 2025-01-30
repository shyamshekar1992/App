"use client";

import React, { useState } from "react";
import Image from "next/image";
import tripsData from "../json/trips.json"; // ✅ Ensure the JSON file is in the correct path
import Link from "next/link";



// Extract unique cities for filtering
const uniqueCities = Array.from(new Set(tripsData.trips.map((trip) => trip.startCity)));

const TripsPage = () => {
  const [selectedCity, setSelectedCity] = useState("");

  // Filter trips based on selected city
  const filteredTrips = selectedCity
    ? tripsData.trips.filter((trip) => trip.startCity === selectedCity)
    : tripsData.trips;

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-5xl font-bold text-gray-900">Explore Our Best Trips</h1>
        <p className="text-lg text-gray-600 mt-2">Find your next adventure with us.</p>
      </header>

      {/* Filter Section */}
      <div className="mt-8 flex justify-center">
        <select
          className="px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">All Starting Locations</option>
          {uniqueCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Trips Grid */}
      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTrips.map((trip, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Image */}
            <div className="relative h-64">
              <Image
                priority
                src={trip.images[0]}
                alt={trip.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>

            {/* Trip Content */}
            <div className="p-6 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900">{trip.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{trip.description}</p>
              <span className="mt-2 text-sm text-gray-500">Departure from: {trip.startCity}</span>
              <Link href={`/trips/${trip.slug}`} className="mt-4">
                <button className="w-full px-4 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  View Trip Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-gray-700">
        <p>© 2025 Bavaria Travels. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TripsPage;
