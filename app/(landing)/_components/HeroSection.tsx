// components/HeroSection.tsx
"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

const images = [
  'https://res.cloudinary.com/djrrvcvyl/image/upload/v1728316988/bb1_vi2poh.jpg',
  'https://res.cloudinary.com/djrrvcvyl/image/upload/v1728316977/bb2_zo9hdb.jpg',
  'https://res.cloudinary.com/djrrvcvyl/image/upload/v1727692318/DSC02986_1_aiqmqn.jpg',
  'https://res.cloudinary.com/djrrvcvyl/image/upload/v1721638565/samples/ecommerce/accessories-bag.jpg',
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false); // Track zoom state

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleImageChange = () => {
    setIsZooming(true); // Start zoom animation
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsZooming(false); // End zoom animation after slight delay
    }, 500); // Adjust delay as needed for animation duration
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }
          ${isZooming ? 'animate-zoom' : ''}
          `}
          style={{ backgroundImage: `url(${image})` }}
          // Apply zoom styles conditionally based on isZooming state
         
        ></div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full ">
        <h1 className=" text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400  to-orange-400">
          BADAYA FITNESS &
        </h1>
        <h1 className="italic text-6xl font-bold  text-center bg-gradient-to-r from-pink-400  to-orange-400 inline-block text-transparent bg-clip-text">
           SPORTS ZONE FOR 
        </h1>
        <h1 className="italic text-6xl font-bold text-white text-center mr-1 ">
           CHAMPIONS
        </h1>
        <p className="text-lg text-white mt-4 text-center max-w-xl">
          A perfect platform to pursue your sporting & fitness dreams with best-class facilities
          and training by expert coaches and renowned mentors.
        </p>
        <div className="mt-8">
          <Link href="/search">
          <button className="px-6 py-3 bg-gradient-to-t from-pink-400  to-orange-400 text-white rounded-full shadow-lg mr-4">
            Explore Now
          </button>
          </Link>
          {/* <button className="px-6 py-3 bg-transparent border border-white text-white rounded-full shadow-lg">
            Watch Intro
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;