import React from 'react'
import {motion} from "framer-motion"


function BackgroundCircles() {
  return (
    <motion.div 
    initial={{
        opacity:0,
    }}
    animate={{
        scale:[1,2,2,3,1],
        opacity:[0.1,0.2,0.4,0.8,0.1,1.0],
        borderRadius:["20%","20%","60%","80","40%"]
    }}
    transition={{
        duration: 2.5,
    }}
    
    className='relative flex justify-center items-center'>
        <div className='  absolute border border-[#dbd9aa] rounded-full h-[600px] w-[600px] mt-52 animate-pulse opacity-65 '/>
        <div className='absolute border border-[#c4c0c0] h-[400px]w=[400px] absolute mt-52 ' />
        <div className='rounded-full border border-[#333333] h-[600px]w=[600px] absolute mt-52'/>
        <div className='rounded-full border border-[#f93232] opacity-20 h-[400px]w=[400[x] absolute mt-52 animate-pulse'/>

        
    </motion.div>
  )
}

export default BackgroundCircles