import React from 'react';
import ExperienceCard from '../components/ExperienceCard';

const experienceData = [
  {
    jobTitle: 'Machine Learning & Large Language Models Researcher',
    company: 'AIEA Lab',
    duration: 'September 2024 - Present',
    description: [
      'Working with SWI-Prolog to understand LLM logic-based reasoning.',
      'Utilized OpenAI API to run queries and examples in SWI-Prolog.'
    ],
    technologies: ['/images/python-logo.png', '/images/prolog-logo.png', '/images/openai-logo.png'],
    imageSrc: '/images/aiea-lab-logo.png',
  },
  {
    jobTitle: 'SWE/FOI Intern',
    company: 'Berkshire Hathaway - MedPro',
    duration: 'January 2024 - April 2024',
    description: ['Worked on responsive frontend components using React.js'],
    technologies: ['/images/react-logo.png'],
    imageSrc: '/images/berkshire-hathaway-logo.png',
  }
];

function WorkExperience() {
  return (
    <div className="h-screen flex flex-col items-center text-left max-w-full px-10 justify-start mx-auto relative">
      {/* Header */}
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Experience
      </h3>

      {/* Cards Container */}
      <div className="mt-28 w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory">
        <div className="flex items-center space-x-5">
          {/* Mapping through experienceData */}
          {experienceData.map((experience, index) => (
            <ExperienceCard
              key={index}
              jobTitle={experience.jobTitle}
              company={experience.company}
              duration={experience.duration}
              description={experience.description}
              technologies={experience.technologies}
              imageSrc={experience.imageSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkExperience;
