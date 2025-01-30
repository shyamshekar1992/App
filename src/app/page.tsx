"use client";

import React from "react";
import Image from "next/image";
import tripsData from "./json/trips.json"; // ✅ Ensure the JSON file is in the correct path
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useLocale } from './context/localeContext';

// Define TypeScript type for trip data
type Trip = {
  title: string;
  slug: string;
  description: string;
  images: string[];
  startCity: string;
};

const Homepage = () => {
  const { t } = useLocale();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center p-8 bg-gradient-to-r from-blue-100 to-blue-300">
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t.welcome}          
          </h1>
          <p className="text-lg text-gray-800">
            Explore the most vibrant cities, breathtaking landscapes, and unforgettable experiences.
          </p>
          <a
            href="#trips"
            className="mt-6 inline-block bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-800 transition-all"
          >
          {t.explore}          
          </a>
        </div>
        <div className="flex-1">
          <Image
          priority
            src="/images/spain.jpeg"
            alt="Europe Travel"
            width={1000}
            height={500}
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Trips Section */}
      <section id="trips" className="p-12 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">Our Best Trips</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {tripsData.trips.map((trip: Trip, index) => (
            <SwiperSlide key={index} className="p-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="w-full h-64 relative">
                  <Image
                  priority
                    src={trip.images[0]}
                    alt={trip.title}
                    fill                    objectFit="cover"
                    className="rounded-t-xl"
                  />
                </div>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p className="text-lg">© 2025 Europe Travel Agency. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
