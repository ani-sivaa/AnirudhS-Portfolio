import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import BackgroundCircles from "../components/BackgroundCircles"
import Link from 'next/link'
type Props = {}

export default function Hero({}: Props) {
  const[text] = useTypewriter({
    words:[
        "Hi, my name is Anirudh Sivakumar",
        "Take-A-Look-At-My-Portfolio.tsx",
        "<LookingFor2025Internships :)/>",
    ],
    loop: true,
    delaySpeed:1000,

  });
  
  return (
    <div className='h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden'>
        <BackgroundCircles/>
        <img
         className='relative rounded-full h-32 w-32 mx-auto object-cover'
         src='https://media.licdn.com/dms/image/v2/D5603AQHGL5oyMrU93A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718319210642?e=1738195200&v=beta&t=TX8nUs_HdgaljGTpI1k05ZCQOtNcBeT0-j4Q3yxY8Wk'
         />
         <div className='z-20'>
            <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
                Software Engineer
            </h2>
        <h1 className='text-5xl lg:text-3xl font-semibold px-10'>
            <span className='mr-3'>{text}</span>
            <Cursor cursorColor='#F7AB0A'/>
        </h1>

        <div className='pt-50'>
            <Link href='#about'>
                <button className='heroButton'>About</button>
            </Link>
            <Link href='#Experience'>
                <button className='heroButton'>Experience</button>
            </Link>
            <Link href='#Skills'>
                <button className='heroButton'>Skills</button>
            </Link>
            <Link href = '#Projects'>
                <button className='heroButton'>Projects</button>
            </Link>

            
            

        </div>
        </div>
    </div>
  );
}

