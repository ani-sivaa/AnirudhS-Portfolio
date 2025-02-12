import { motion } from "framer-motion";

type Props = {
  image: string;
  title: string;
  proficiency: string;
};

function Skill({ image, title, proficiency }: Props) {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        initial={{ x: 150 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        src={image}
        alt={title}
        className="rounded-full border border-gray-500 object-cover w-28 h-28 xl:w-32 xl:h-32 filter group-hover:grayscale transition duration-300 ease-in-out"
      />
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white w-28 h-28 xl:w-32 xl:h-32 rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-lg font-bold text-black">{proficiency}</p>
        </div>
      </div>
    </div>
  );
}

export default Skill;
