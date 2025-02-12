'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Hobbies', href: '#hobbies' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    element?.scrollIntoView({ behavior: 'smooth' });
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="absolute inset-0 bg-[#2B2B2B]/40 backdrop-blur-[8px] border-b border-white/[0.08]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="lg:hidden absolute left-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-[#E0E0E0] hover:bg-white/[0.08] transition-all duration-300"
            >
              <motion.span 
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {!isOpen ? (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </motion.span>
            </button>
          </div>
          <div className="hidden lg:flex items-center justify-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="relative px-4 py-2 text-sm font-medium text-[#E0E0E0]/90 transition-all duration-300 hover:cursor-pointer"
              >
                <span className="relative z-10 transition-colors duration-300">{item.name}</span>
                <div className="absolute -inset-2 rounded-lg opacity-0 hover:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0FF0FC]/20 to-[#5856D6]/20 rounded-lg blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0FF0FC]/10 to-[#5856D6]/10 rounded-lg" />
                  <div className="absolute inset-0 border border-white/10 rounded-lg" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden relative"
          >
            <div className="absolute inset-0 bg-[#2B2B2B]/60 backdrop-blur-lg" />
            <div className="relative px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="block px-3 py-2 rounded-xl text-base font-medium text-[#E0E0E0]/90 transition-all duration-300 hover:bg-white/[0.08]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
