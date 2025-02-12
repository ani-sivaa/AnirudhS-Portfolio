'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface ImageSliderProps {
  images: string[];
  interval?: number;
}

export default function ImageSlider({ images, interval = 3000 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[200px] rounded-lg overflow-hidden group">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`Experience image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handlePrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <IoChevronBackOutline size={24} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <IoChevronForwardOutline size={24} />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-[#0FF0FC]' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 