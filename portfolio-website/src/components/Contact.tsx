'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ContactItem {
  name: string;
  value: string;
  link?: string;
  icon: string;
}

const contactItems: ContactItem[] = [
  {
    name: "Email",
    value: "anisiva213@gmail.com",
    link: "mailto:anisiva213@gmail.com",
    icon: "/icons/email.svg"
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/anisiva",
    link: "https://www.linkedin.com/in/anisiva",
    icon: "/icons/linkedin.svg"
  },
  {
    name: "Phone",
    value: "(925) 548-0122",
    link: "tel:+19255480122",
    icon: "/icons/phone.svg"
  },
  {
    name: "Github",
    value: "github.com/ani-sivaa",
    link: "https://github.com/ani-sivaa",
    icon: "/icons/github.svg"
  }
];

export default function Contact() {
  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 neon-text"
        >
          Contact
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-4 p-6 bg-[#555555]/10 rounded-lg transition-colors hover:bg-[#555555]/20"
            >
              <div className="w-12 h-12 relative flex items-center justify-center bg-[#0FF0FC]/10 rounded-full">
                <Image
                  src={item.icon}
                  alt={`${item.name} icon`}
                  width={24}
                  height={24}
                  className="text-[#0FF0FC]"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0FF0FC]">{item.name}</h3>
                <p className="text-[#E0E0E0]/80">{item.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
