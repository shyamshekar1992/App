/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Destination images (with .jpeg format) stored in /public/images/
const destinations = [
  { name: 'Paris, France', img: '/images/paris.jpeg' },
  { name: 'Rome, Italy', img: '/images/italy.jpeg' },
  { name: 'Swiss Alps, Switzerland', img: '/images/switzerland.jpeg' },
  { name: 'Amsterdam, Netherlands', img: '/images/amsterdam.jpeg' },
  // { name: 'Santorini, Greece', img: '/images/greece.jpeg' },
  // { name: 'Sofia, Bulgaria', img: '/images/bulgaria.jpeg' },
  { name: 'Dubrovnik, Croatia', img: '/images/croatia.jpeg' },
  // { name: 'Lisbon, Portugal', img: '/images/portugal.jpeg' },
  { name: 'Barcelona, Spain', img: '/images/spain.jpeg' },
  { name: 'Vienna, Austria', img: '/images/austria.jpeg' },
];

const About: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center">
      <Image
  priority
  src="/images/europe1.jpeg" // Public folder image in .jpeg
  alt="Exploring Europe"
  fill 
  style={{ objectFit: "cover" }} // ✅ Replaces `objectFit="cover"`
  className="brightness-75"
/>

        <div className="absolute text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
            Explore Europe with <span className="text-yellow-400">Luxury & Affordability</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Discover breathtaking European destinations, from the romantic streets of Paris to the picturesque Swiss Alps. Travel in style without breaking the bank.
          </p>
        </div>
      </div>

      {/* About Content Section */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-yellow-400">Who We Are</h2>
          <p className="mt-6 text-lg text-gray-300">
            We specialize in **affordable luxury travel** across Europe. Our mission is to provide unforgettable experiences blending comfort and adventure.
          </p>
        </div>
      </section>

      {/* Destination Highlights */}
      <section className="py-16 px-6 md:px-16 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-yellow-400">Explore Our Destinations</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
            {destinations.map((dest, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <Image
  priority
  src={dest.img}
  alt={dest.name}
  width={500} 
  height={300} 
  style={{ objectFit: "cover" }} 

  className="w-full h-[300px] rounded-lg group-hover:scale-105 transition-transform duration-300"
/>

                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl font-semibold">{dest.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-400">Start Your Journey Today</h2>
        <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
          Whether it's a romantic getaway in Paris or an adventure in the Swiss Alps, we make travel dreams come true. Experience **affordable luxury travel** like never before.
        </p>
        <Link href="/contact">
  <button className="mt-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition duration-300">
    Get in Touch
  </button>
</Link>

      </section>
    </div>
  );
};

export default About;
