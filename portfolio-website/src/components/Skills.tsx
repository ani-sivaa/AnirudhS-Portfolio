'use client';

import { motion } from 'framer-motion';
import {
  SiPython, SiTypescript, SiJavascript, SiCplusplus, SiReact, SiNextdotjs, SiTailwindcss, SiDocker, SiTensorflow, SiKubernetes
} from 'react-icons/si';
import { FaAws, FaTools } from 'react-icons/fa';

interface Skill {
  name: string;
  icon: React.ElementType;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const mainSkills: Skill[] = [
  { name: "Python", icon: SiPython },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "C++", icon: SiCplusplus }
];

const skillCategories: SkillCategory[] = [
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: FaAws },
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes }
    ]
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss }
    ]
  },
  {
    name: "ML & Data",
    skills: [
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "Pandas", icon: SiPython }
    ]
  },
  {
    name: "Other",
    skills: [
      { name: "Palantir AIP/Foundry", icon: FaTools }
    ]
  }
];

export default function Skills() {
  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 neon-text"
        >
          Tech Stack
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mainSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-8 bg-[#555555]/10 rounded-2xl transition-all group hover:shadow-[0_0_15px_rgba(15,240,252,0.3)]"
              >
                <skill.icon className="text-6xl text-[#0FF0FC] mb-4 transition-transform group-hover:scale-110" />
                <span className="text-lg font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#555555]/10 p-6 rounded-xl transition-colors hover:bg-[#555555]/20"
            >
              <h3 className="text-xl font-bold mb-4 text-[#0FF0FC]">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (i * 0.05) }}
                    className="flex items-center gap-2 px-3 py-2 bg-[#555555]/20 rounded-lg transition-colors group hover:bg-[#555555]/30"
                  >
                    <skill.icon className="text-[#0FF0FC] text-xl group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
