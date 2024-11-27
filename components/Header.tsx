import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { motion } from "framer-motion";


export default function Header() {
  return (
  <header   className="sticky top-0 z-50 p-10 flex items-start justify-between max-w-7xl mx-auto xl:items-center">

    {/* THIS IS WHERE I IMPLEMENT FRAMER MOTION for the header file animation */}
    < motion.div 
    /*Intitial setup of the animation*/
    initial={{
        x: -500,
        opacity: 0,
        scale:0.5
    }}
    /* final animation (resets the objects to its original position hence x:0 ) */
    animate={{
        x:0,
        opacity:1,
        scale:1
    }}
    /*this code makes it that the social icons on the top left header dont just fly into the screen too quick duration is in seconds I believe*/
    transition={{
        duration: 1,
    }}
    >
    
    
    <div className="flex flex-row items-center space-x-9 ">
      {/* Social Icons */}
      <SocialIcon url="https://github.com/ani-sivaa"  
      
      />
      <SocialIcon url="https://www.linkedin.com/in/anisiva/" 
      
      />
      <SocialIcon url="https://devpost.com/anisiva213?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"

      />
    </div>
    </motion.div>


    <motion.div 
    
    initial={{
        x:500,
        opacity:0,
        scale:0.5,
    }}
    animate={{
        x:0,
        opacity:1,
        scale:1.5,
    }}
    transition={{
        duration:1,
    }}
    
    
    className="flex flex-row items-center text-gray-300 cursor-pointer">
 <div className="flex items-center">
    <SocialIcon
        className="cursor_pointer"
        network="email"
        fgColor="gray"
        bgColor="transparent"
        url="#contact" // Use this to set the anchor link directly
    />
    <p
        onClick={() => (window.location.href = "#contact")} // Optional: handle navigation here
        className="uppercase hidden md:inline-flex text-sm text-gray-400 ml-2 cursor-pointer"
    >
        Get In Touch
    </p>
</div>


    </motion.div>
    
  </header>
  ); 
  
}
