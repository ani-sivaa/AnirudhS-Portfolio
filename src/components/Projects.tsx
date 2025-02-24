'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTrophy } from 'react-icons/fa';

interface ProjectItem {
  name: string;
  demo: string;
  description: string;
  period: string;
  role: string;
  stack: string[];
  achievements: string[];
  links: { github: string; linkedin: string; };
  isAward?: boolean;
  devpost?: string;
}

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      name: "GauchoCourse / SB HACKS Best AI Award",
      demo: "/videos/GAUCHOCLASS__product_demo.gif",
      description: "RateMyProfessor & University published grade distribution metrics via FOIA laws with a RAG AI chatbot(Oviya) using Anthropic API and a Pincecone Vector Database that also allows students to upload their student transcript for context aware course reccomendations.",
      period: "Jan 2025",
      role: "Full Stack Developer",
      stack: ["TypeScript", "Next.js", "React"],
      achievements: [
        "60% faster search via Pinecone",
        "Cerebras Inference for ultra fast results"
      ],
      links: {
        github: "https://devpost.com/software/gauchocourse",
        linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7287267709644353536/"
      },
      isAward: true,
      devpost: "https://devpost.com/software/gauchocourse"
    },
    {
      name: "TalktoaHuman.ai / CAL HACKS 11.0 VAPI(YC 21) Virality Award",
      demo: "/images/ProjectImages/talktoahuman.jpg",
      description: "Tired of redundant customer service call menus? We deployed a voice agent to handle the call menu navigation for you and then forward the customer service call back to you when a real customer service agent is on the line!",
      period: "2023",
      role: "Backend Developer",
      stack: ["VAPI API", "groq"],
      achievements: [
        "Reduced voice agent latency by 80% using groq inference",
        "Fine tuned the voice agent "
      ],
      links: {
        github: "https://github.com/ConnectAI-CalHacks/Letmetalktoahuman-AI",
        linkedin: "https://www.linkedin.com/in/anisiva"
      },
      isAward: true,
      devpost: "https://devpost.com/software/letmetalktohuman-ai"
    },
    
    
    {
      name: "Portfolio Website",
      demo: "/videos/personal-website.gif",
      description: "Next.js/TS site scoring 95+ Lighthouse, 30% faster load times with headless CMS.",
      period: "2023",
      role: "Full Stack Developer",
      stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
      achievements: [
        "95+ Lighthouse score.",
        "30% faster load times."
      ],
      links: {
        github: "https://github.com/anisiva/portfolio-website",
        linkedin: "https://www.linkedin.com/in/anisiva"
      }
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-3xl font-bold mb-12 neon-text"
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              onClick={() => project.devpost && window.open(project.devpost, '_blank')}
              className={`relative group rounded-xl ${project.isAward ? 'bg-gradient-to-br from-[#1A1A1A]/40 to-[#FFD700]/5' : 'bg-[#1A1A1A]/40'} backdrop-blur-sm border ${project.isAward ? 'border-[#FFD700]/30' : 'border-[#333333]'} hover:border-[#0FF0FC]/30 p-4 transition-all duration-300 ${project.devpost ? 'cursor-pointer' : ''}`}
            >
              <div className="flex flex-col h-full">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-start gap-2">
                          <h3 className="text-lg font-bold leading-tight pr-2">{project.name}</h3>
                          {project.isAward && (
                            <FaTrophy className="text-[#FFD700] animate-pulse flex-shrink-0 mt-1" size={16} />
                          )}
                        </div>
                        <p className="text-[#E0E0E0]/60 text-xs">{project.period}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E0E0E0]/40 hover:text-[#0FF0FC] transition-colors z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub size={20} />
                    </a>
                    <a 
                      href={project.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E0E0E0]/40 hover:text-[#0FF0FC] transition-colors z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative w-full h-48 mb-4">
                  <motion.div 
                    className="relative h-full rounded-lg overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.isAward ? 'from-[#FFD700]/20' : 'from-[#5856D6]/20'} to-transparent z-10`} />
                    <div className={`absolute inset-0 border ${project.isAward ? 'border-[#FFD700]/20' : 'border-[#0FF0FC]/20'} rounded-lg z-20 shadow-[0_0_15px_rgba(15,240,252,0.2)] transition-all duration-300`} />
                    <Image
                      src={project.demo}
                      alt={`${project.name} Demo`}
                      fill
                      className="object-cover"
                      onError={(e: any) => {
                        e.target.src = '/images/placeholder.png';
                      }}
                    />
                  </motion.div>
                </div>

                {/* Project Details */}
                <div>
                  <div className="px-2 py-0.5 text-xs rounded-full bg-[#0FF0FC]/5 border border-[#0FF0FC]/20 text-[#0FF0FC]/70 inline-block mb-3">
                    {project.role}
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.stack.map((tech) => (
                      <div
                        key={tech}
                        className="px-2 py-1 rounded-full bg-[#5856D6]/10 border border-[#5856D6]/20"
                      >
                        <span className="text-xs text-[#E0E0E0]/80">{tech}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[#E0E0E0]/80 text-sm mb-3">{project.description}</p>

                  <ul className="space-y-1.5">
                    {project.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="text-[#E0E0E0]/60 text-xs pl-3 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-[#0FF0FC]/30 before:rounded-full"
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Hover Effect Background */}
              <div className={`absolute inset-0 -z-10 bg-gradient-to-r ${project.isAward ? 'from-[#FFD700]/0 via-[#FFD700]/5 to-[#FFD700]/0' : 'from-[#5856D6]/0 via-[#5856D6]/5 to-[#5856D6]/0'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}