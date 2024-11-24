import React from 'react';
import { SocialIcon } from 'react-social-icons';

type Props = {};

export default function Header({}: Props) {
  return (
  <header className='sticky top-0 p-10 flex items-start justify-between max-w-7xl mx-auto
  xl:items-center'>
    <div className="flex flex-row items-center">
      {/* Social Icons */}
      <SocialIcon url="https://github.com/ani-sivaa" fgColor="gray" 
      
      />
      <SocialIcon url="https://github.com/ani-sivaa" fgColor="gray"
      
      />
      <SocialIcon url="https://github.com/ani-sivaa" fgColor="gray" 
      
      />
    </div>
    
    <div className="flex flex-row items-center text-gray-300 cursor-pointer">
        <SocialIcon 
            className='cursor_pointer'
            network='email'
            fgColor="gray"
            bgColor='transparent'
        />
        <p className="uppercase hidden md:inline-flex text-sm text-gray-400 "> Get In Touch</p>

    </div>
    
  </header>) 
  
}
