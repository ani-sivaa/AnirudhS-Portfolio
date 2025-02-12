'use client';

import { motion } from 'framer-motion';
import { Sprout, Gamepad } from 'lucide-react';
import Image from 'next/image';
import { PiBooks } from 'react-icons/pi'; 

interface HobbyItem {
  name: string;
  description: string;
  icon: React.ElementType;
}

const hobbies: HobbyItem[] = [
  {
    name: "Reading",
    description: "Passionate about technical books and staying current with the latest in software engineering and AI.",
    icon: PiBooks
  },
  {
    name: "Open Source",
    description: "Active contributor to open source projects, particularly in the ML and data engineering space.",
    icon: Sprout
  },
  {
    name: "Gaming",
    description: "Enjoy strategy games and occasionally building game mods using Python and C++.",
    icon: Gamepad
  }
];

export default function Hobbies() {
  return (
    <section id="hobbies" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Hobbies
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#2B2B2B]/50 backdrop-blur-sm rounded-xl p-4
                border border-[#0FF0FC]/20 group
                hover:shadow-[0_0_30px_rgba(15,240,252,0.2)]
                transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#0FF0FC]/10 
                  flex items-center justify-center mb-3
                  group-hover:shadow-[0_0_20px_rgba(15,240,252,0.3)]
                  transition-all duration-300"
                >
                  <hobby.icon className="w-6 h-6 text-[#0FF0FC]" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-center group-hover:text-[#0FF0FC] transition-colors">
                  {hobby.name}
                </h3>
                <p className="text-sm text-center text-[#E0E0E0]/80">
                  {hobby.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}