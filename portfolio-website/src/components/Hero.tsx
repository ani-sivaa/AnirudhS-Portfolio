'use client';

import { motion } from 'framer-motion';
import { SiPython, SiTypescript, SiReact, SiJavascript, SiCplusplus } from 'react-icons/si';
import Image from 'next/image';
// Removed ChatWindow import and useLanguage hook
// Tech stack now updated for Anirudh
const techStack = [
  { icon: SiPython, name: 'Python' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiJavascript, name: 'JavaScript' },
  { icon: SiCplusplus, name: 'C++' },
  { icon: SiReact, name: 'React' }
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I&apos;m Anirudh Sivakumar
            </h1>
            <p className="text-lg md:text-xl mb-6 text-[#E0E0E0]/80">
              B.S. in Computer Science @ UC Santa Cruz (GPA: 4.0). Coursework: LLMs, ML, Data Structures, C/Python.
            </p>
            {/* Optionally, you could add a resume button if a new resume is provided */}
            {/* Tech Stack */}
            <div className="mt-12">
              <p className="text-sm text-[#E0E0E0]/60 mb-4">Tech Stack</p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {techStack.map(({ icon: Icon, name }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#555555]/20 hover:bg-[#555555]/30 transition-colors"
                  >
                    <Icon className="text-[#0FF0FC] text-xl" />
                    <span className="text-sm">{name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <div className="order-first md:order-last relative h-[500px] w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-[#0FF0FC]/5 blur-[100px] rounded-full" />
            <motion.div
              className="absolute w-[280px] h-[380px] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(15,240,252,0.3)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ zIndex: 30 }}
            >
              <div className="relative w-full h-full group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0FF0FC]/20 via-transparent to-[#5856D6]/20 z-10 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-xl z-20">
                  <div className="absolute inset-0 rounded-xl border border-[#0FF0FC]/30 shadow-[inset_0_0_15px_rgba(15,240,252,0.2)] transition-all duration-300" />
                </div>
                <Image
                  src="/images/face/image1.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
