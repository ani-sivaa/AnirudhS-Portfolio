'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import { BsCalendarEvent, BsPersonVcard } from 'react-icons/bs';
import { FaBriefcase } from 'react-icons/fa';
import Image from 'next/image';

interface ExperienceItem {
  company: string;
  companyLogo: string;
  period: string;
  role: string;
  description: string;
  achievements: string[];
  images: string[];
  type: string;
  location: string;
  country: 'usa' | 'vietnam';
}

const experiences: ExperienceItem[] = [
  {
    company: "Palantir Technologies",
    companyLogo: "/icons/palantir.svg",
    period: "December 2024 - Present",
    role: "Software Engineer fellow",
    description: "Built Python pipelines & LLM systems in AIP/Foundry, improving accuracy by 45% and completion rates by 98%.",
    achievements: [
      "Improved system accuracy by 45%.",
      "Boosted completion rates to 98%."
    ],
    images: ["/images/ExperienceImages/palantir.jpeg","/images/ExperienceImages//Users/anisiva/Downloads/1_IbmPcspSjGSl8qknlCq9_w.jpeg"],
    type: "Full-Time",
    location: "Headquarters",
    country: 'usa'
  },
  {
    company: "Berkshire Hathaway - MedPro",
    companyLogo: "/icons/medpro.svg",
    period: "2020 - 2021",
    role: "Frontend Developer & Underwriting intern",
    description: "Developed React components achieving 40% reusability gain and ensured 98% WCAG compliance for web accessibility.",
    achievements: [
      "40% reusability gain.",
      "98% WCAG compliance."
    ],
    images: ["/images/placeholder.png"],
    type: "Contract",
    location: "Remote",
    country: 'usa'
  },
  {
    company: "UCSC AEIA Lab",
    companyLogo: "/icons/ucsc.svg",
    period: "September 2024 - February 2025",
    role: "Research Assistant",
    description: "Optimized training speed by 60% using Kubernetes and reduced errors by 40% with Prolog rule-based systems.",
    achievements: [
      "Improved training speed by 60%.",
      "Reduced errors by 40%."
    ],
    images: ["/images/placeholder.png"],
    type: "Research",
    location: "UC Santa Cruz",
    country: 'usa'
  }
];

export default function Experience() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <section id="experience" className="py-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 neon-text"
        >
          Experience
        </motion.h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-8 border-l-2 border-[#0FF0FC]/30"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0FF0FC] shadow-[0_0_8px_#0FF0FC]" />
              <div className="mb-12 relative">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-start gap-12">
                    <div className="flex-grow max-w-2xl">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/5 p-2 border border-[#0FF0FC]/20 shadow-[0_0_12px_#0FF0FC20] transition-shadow">
                            <Image
                              src={exp.companyLogo}
                              alt={exp.company}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold transition-colors">
                              {exp.company}
                            </h3>
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#0FF0FC]/10 text-[#0FF0FC] border border-[#0FF0FC]/20 shadow-[0_0_8px_#0FF0FC40]">
                              {exp.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 mb-8">
                        <div className="inline-flex items-center gap-2 text-[#0FF0FC] bg-[#0FF0FC]/5 px-4 py-2 rounded-lg border border-[#0FF0FC]/20 shadow-[0_0_12px_#0FF0FC20]">
                          <BsCalendarEvent className="text-lg" />
                          <span className="text-sm font-medium">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="inline-flex items-center gap-2 text-[#0FF0FC] bg-[#0FF0FC]/5 px-4 py-2 rounded-lg border border-[#0FF0FC]/20 shadow-[0_0_12px_#0FF0FC20]">
                            <BsPersonVcard className="text-lg" />
                            <span className="text-sm font-medium">{exp.role}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#0FF0FC]/5 p-6 rounded-lg border border-[#0FF0FC]/20 shadow-[0_0_12px_#0FF0FC20]">
                        <div className="flex items-center gap-2 mb-4">
                          <FaBriefcase className="text-[#0FF0FC] text-lg" />
                          <p className="text-[#0FF0FC] text-lg font-medium">
                            Work
                          </p>
                        </div>
                        <p className="text-[#E0E0E0] text-lg leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                    <div className="w-[280px] flex-shrink-0">
                      <ImageSlider images={exp.images} />
                    </div>
                  </div>
                  <ul className="space-y-2 pl-4">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="text-[#E0E0E0]/80 relative">
                        <span className="absolute -left-4 top-2 w-2 h-2 rounded-full bg-[#0FF0FC]/50" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
