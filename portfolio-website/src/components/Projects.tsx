'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiReact, SiTailwindcss, SiExpress, SiNodedotjs } from 'react-icons/si';

interface ProjectItem {
  name: string;
  logo: string;
  demo: string;
  description: string;
  period: string;
  role: string;
  stack: Array<{ name: string; icon: React.ElementType; }>;
  achievements: string[];
  links: { github: string; linkedin: string; };
}

export default function Projects() {

  const projects: ProjectItem[] = [
    {
      name: "GauchoCourse (SB Hacks Winner)",
      logo: "/icons/gauchocourse.svg",
      demo: "/videos/gauchocourse_demo.gif",
      description: "AI chatbot with 95% accuracy using Anthropic API; 60% faster search via Pinecone.",
      period: "2023",
      role: "Full Stack Developer",
      stack: [
        { name: "TypeScript", icon: SiTypescript },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "React", icon: SiReact }
      ],
      achievements: [
        "Achieved 95% accuracy.",
        "Improved search speed by 60%."
      ],
      links: {
        github: "https://devpost.com/software/gauchocourse",
        linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7287267709644353536/"
      }
    },
    {
      name: "TalktoaHuman.ai (CAL Hacks Winner)",
      logo: "/icons/talktohuman.svg",
      demo: "/videos/talktohuman_demo.gif",
      description: "MERN app reducing wait times by 85% with Docker & Groq’s engine.",
      period: "2023",
      role: "Backend Developer",
      stack: [
        { name: "Express", icon: SiExpress },
        { name: "React", icon: SiReact },
        { name: "Node.js", icon: SiNodedotjs }
      ],
      achievements: [
        "Reduced wait times by 85%."
      ],
      links: {
        github: "https://github.com/anisiva/talktohuman",
        linkedin: "https://www.linkedin.com/in/anisiva"
      }
    },
    {
      name: "Plant Hydration System",
      logo: "/icons/plant_hydration.svg",
      demo: "/videos/plant_hydration_demo.gif",
      description: "92% prediction accuracy with Arduino/Random Forest, cutting water use by 40%.",
      period: "2022",
      role: "IoT Developer",
      stack: [
        { name: "Arduino", icon: SiReact },
        { name: "Random Forest", icon: SiTypescript }
      ],
      achievements: [
        "92% prediction accuracy.",
        "Reduced water use by 40%."
      ],
      links: {
        github: "https://github.com/anisiva/plant-hydration",
        linkedin: "https://www.linkedin.com/in/anisiva"
      }
    },
    {
      name: "Portfolio Website",
      logo: "/icons/portfolio.svg",
      demo: "/videos/portfolio_demo.gif",
      description: "Next.js/TS site scoring 95+ Lighthouse, 30% faster load times with headless CMS.",
      period: "2023",
      role: "Full Stack Developer",
      stack: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "TypeScript", icon: SiTypescript },
        { name: "React", icon: SiReact },
        { name: "Tailwind CSS", icon: SiTailwindcss }
      ],
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
        <div className="space-y-16">
          {projects.map((project, index) => {
            const demoSize = {
              width: 400,
              height: 800,
              containerClass: "md:w-[400px]"
            };
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.2 }}
                className="relative group rounded-xl bg-[#1A1A1A]/40 backdrop-blur-sm border border-[#333333] hover:border-[#0FF0FC]/30 p-6 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-6">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                          <Image
                            src={project.logo}
                            alt={project.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-4 whitespace-nowrap">
                            <h3 className="text-2xl font-bold">
                              {project.name}
                            </h3>
                            <div className="px-2.5 py-0.5 text-xs rounded-full bg-[#0FF0FC]/5 border border-[#0FF0FC]/20 text-[#0FF0FC]/70 shadow-[0_0_5px_rgba(15,240,252,0.15)] transition-all duration-300">
                              {project.role}
                            </div>
                          </div>
                          <p className="text-[#E0E0E0]/60 text-sm mt-1">{project.period}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <a 
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E0E0E0]/40 hover:text-[#0FF0FC] transition-colors"
                        >
                          <FaGithub size={24} />
                        </a>
                        <a 
                          href={project.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E0E0E0]/40 hover:text-[#0FF0FC] transition-colors"
                        >
                          <FaLinkedin size={24} />
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tech) => (
                        <div
                          key={tech.name}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5856D6]/10 border border-[#5856D6]/20"
                        >
                          <tech.icon className="text-[#0FF0FC] text-sm" />
                          <span className="text-sm text-[#E0E0E0]/80">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[#E0E0E0]/80 mb-4">{project.description}</p>
                    <ul className="space-y-2">
                      {project.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="text-[#E0E0E0]/60 text-sm pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#0FF0FC]/30 before:rounded-full"
                        >
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className={demoSize.containerClass}>
                    <motion.div 
                      className="relative rounded-xl overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#5856D6]/20 to-transparent z-10" />
                      <div className="absolute inset-0 border border-[#0FF0FC]/20 rounded-xl z-20 shadow-[0_0_15px_rgba(15,240,252,0.2)] transition-all duration-300" />
                      <Image
                        src={project.demo}
                        alt={`${project.name} Demo`}
                        width={demoSize.width}
                        height={demoSize.height}
                        className="w-full h-auto object-cover rounded-xl"
                        onError={(e: any) => {
                          e.target.src = '/images/placeholder.png';
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#5856D6]/0 via-[#5856D6]/5 to-[#5856D6]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
