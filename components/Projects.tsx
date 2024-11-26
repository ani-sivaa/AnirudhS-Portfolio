import React from 'react';
import { motion } from 'framer-motion';

type Props = {};

function Projects({}: Props) {
  // Define your projects with more detailed information
  const projects = [
    
    {
      title: "Letmetalktoahuman.ai",
      description:
        "CalHacks2024 Winner (VAPI Virality Track)- Integrated VAPI for a hyper realistic voice agent that gets past automated customer support menus and then forwards the call to a user once a REAL representative is on the line. Utilized GROQ for AI Inference, VAPI for the Voice Agent, and React for the frontend.",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LceDUwCcZm6APQWnkRhh6ohiJ8h5Il6h4g&s",
    },
    {
      title: "NLP Search + Churn Prediction Model",
      description:
        "AI solutions for e-commerce websites presented for GDXinc. I was chosen out of 300 applicants to present my NLP Search and churn prediction model solution.",
      imageSrc: "https://i.ibb.co/NK0wwBL/IMG-7653.jpg",
    },
    
  ];

  return (
    <div className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0">
      {/* Header */}
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      {/* Projects Section */}
      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20">
        {projects.map((project, i) => (
          <div
            key={i}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen"
          >
            {/* Project Image */}
            <motion.img
              initial={{
                y: -300,
                opacity: 0,
              }}
              transition={{ duration: 1.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={project.imageSrc}
              alt={`Project ${i + 1}`}
              className="relative rounded-full h-48 w-48 mx-auto object-cover "
            />

            {/* Project Description */}
            <div className="text-center max-w-4xl">
              <h4 className="text-4xl font-semibold text-center">
                <span className="underline decoration-[#FFFDD0]">
                  Project {i + 1} of {projects.length}:{" "}
                </span>
                {project.title}
              </h4>
              <p className="mt-2 text-lg text-center md:text-left">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Background Design */}
      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12" />
      
      {/* Bouncing Arrow */}
      <motion.img
        src="https://www.freeiconspng.com/thumbs/white-arrow-png/right-white-arrow-png-20.png"
        alt="Scroll Right"
        className="absolute right-10 bottom-50 h-10 w-10 cursor-pointer"
        animate={{
          y: [0, -10, 0], // Keyframes for bouncing
        }}
        transition={{
          duration: 1, // Animation duration
          repeat: Infinity, // Infinite loop
        }}
      />
    </div>
  );
}

export default Projects;
