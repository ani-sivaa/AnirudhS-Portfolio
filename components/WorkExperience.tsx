import React from 'react'
import ExperienceCard from "../components/ExperienceCard"
type Props = {}

function WorkExperience({}: Props) {
  return (
  <div className='h-screen flex relative overflow-hidden flex-col text-lft md:flex-row max-w-full px-10 justify-evenly mx-auto items-center scroll-smooth'>
    <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
            Experience
    </h3>
    <div>
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />

    </div>
    </div>
  );
}

export default WorkExperience;