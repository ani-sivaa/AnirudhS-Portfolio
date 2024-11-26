import React from 'react';
import { motion } from 'framer-motion';

type ExperienceCardProps = {
  jobTitle: string;
  company: string;
  duration: string;
  description: string[];
  technologies: string[];
  imageSrc: string;
};

const ExperienceCard = ({
  jobTitle,
  company,
  duration,
  description,
  technologies,
  imageSrc,
}: ExperienceCardProps) => {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] 
    snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
      {/* Animated Image */}
      <motion.img
        src={imageSrc}
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        alt="Company Logo"
        className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-top"
      />

      {/* Content */}
      <div className="px-0 md:px-10 text-center md:text-left">
        {/* Job Title */}
        <h4 className="text-2xl font-bold mt-1">{jobTitle}</h4>
        <p className="text-lg text-gray-400">{company}</p>

        {/* Technologies Used */}
        <div className="flex space-x-2 my-4 justify-center md:justify-start">
          {technologies.map((tech, index) => (
            <img
              key={index}
              src={tech}
              alt={`Technology ${index}`}
              className="h-10 w-10 rounded-full"
            />
          ))}
        </div>

        {/* Duration */}
        <p className="uppercase py-5 text-gray-300">{duration}</p>

        {/* Bullet Points */}
        <ul className="list-disc space-y-4 ml-5 text-lg">
          {description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ExperienceCard;
