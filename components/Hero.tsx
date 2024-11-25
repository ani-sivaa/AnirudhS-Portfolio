import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import BackgroundCircles from "../components/BackgroundCircles"
import Link from 'next/link'
type Props = {}

export default function Hero({}: Props) {
  const[text,count] = useTypewriter({
    words:[
        "Hi, my name is Anirudh Sivakumar",
        "I-love-to-eat-good-food.tsx",
        "<ButILoveToCodeMore/>",
    ],
    loop: true,
    delaySpeed:2000,

  });
  
  return (
    <div className='h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden'>
        <BackgroundCircles/>
        <img
         className='relative rounded-full h-32 w-32 mx-auto object-cover'
         src="data:image/jpeg;base64,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"
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
            <Link href='Experience'>
                <button className='heroButton'>Experience</button>
            </Link>
            <Link href='Skills'>
                <button className='heroButton'>Skills</button>
            </Link>
            <Link href = 'Projects'>
                <button className='heroButton'>Projects</button>
            </Link>

            
            

        </div>
        </div>
    </div>
  );
}

