import React from 'react';
import{motion} from 'framer-motion'

type Props = {};

export default function About({}: Props) {
  return (
    <div className='flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly items-center'> 
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
            About
        </h3>

        <motion.img 
            initial={{
                x:-200,
                opacity:0,
            }}
            transition={{
                duration: 1.2,
            }}
            whileInView={{x:0}}
            src="https://media.licdn.com/dms/image/v2/D5603AQHGL5oyMrU93A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719017215194?e=1738195200&v=beta&t=NtR12aADb45Y9lT3uIph5GRFKKPIZgrdv8-EenmqUJY"
            className='-mb-20 md:mb-0 flex-shrink-0 w56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]'
            />
            <div className='space-y-10 px-0 md:px-10'>
                <h4 className='text-4xl font-semibold'>
                    Here is a{" "}
                     <span className='="underline decoratin-[#F7AB0A]/50'> little</span>{" "} 
                     Background
                </h4>
                <p className='text-sm'>
                Hi, I'm Anirudh Sivakumar, an undergraduate student pursuing a Computer Science B.S. degree. I'm passionate about Machine Learning and Full-Stack Development, which is reflected in the labs and hands-on experience I've gained over the years.

                With a strong foundation in both theoretical and practical aspects of software engineering, I have explored various projects and roles, from embedded systems to machine learning applications. I continue to expand my knowledge and skills in these areas as I work towards my career goals.
                </p>
            </div>

        </div>
  );
}
