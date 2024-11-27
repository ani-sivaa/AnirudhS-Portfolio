import { motion } from "framer-motion";
import Skill from "../components/Skill";



function Skills() {
  const skills = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png",
      title: "Python",
      proficiency: "Intermediate",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      title: "JavaScript",
      proficiency: "Intermediate",
    },
    {
      image: "https://devonblog.com/wp-content/uploads/2022/06/tailwind-thumb.jpg",
      title: "TailWindCSS",
      proficiency: "Intermediate",
    },
    {
      image: "https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F096baapsqqt9fks0us99.png",
      title: "React",
      proficiency: "Beginner",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png",
      title: "TypeScript",
      proficiency: "Beginner",
    },
    {
      image: "https://images.ctfassets.net/23aumh6u8s0i/6pjUKboBuFLvCKkE3esaFA/5f2101d6d2add5c615db5e98a553fc44/nextjs.jpeg",
      title: "Next.js",
      proficiency: "Beginner",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Skills
      </h3>
      <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skill for current proficiency
      </h3>
      <div className="grid grid-cols-4 gap-5">
        {skills.map((skill, index) => (
          <Skill
            key={index}
            image={skill.image}
            title={skill.title}
            proficiency={skill.proficiency}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default Skills;
