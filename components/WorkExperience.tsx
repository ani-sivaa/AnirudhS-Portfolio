import React from 'react';
import ExperienceCard from '../components/ExperienceCard';

type Props = {};

function WorkExperience({}: Props) {
  return (
    <div className="h-screen flex flex-col items-center text-left max-w-full px-10 justify-start mx-auto">
      {/* Header */}
      <h3 className="mt-10 uppercase tracking-[20px] text-gray-500 text-2xl">
        Experience
      </h3>

      {/* Cards Container */}
      <div className="mt-10 w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory">
        <div className="flex items-center space-x-5">
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
          
        </div>
      </div>
    </div>
  );
}

export default WorkExperience;
