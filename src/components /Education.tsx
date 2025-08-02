import { motion } from "framer-motion";

type Study = {
  title: string;
  place: string;
  year: string;
};

type EducationProps = {
  studies: Study[];
};

export const Education = ({ studies }: EducationProps) => (
  <motion.div
    className="rounded-[4.5rem] p-10 mt-3 bg-white/30 backdrop-blur-md shadow-xl border border-white/30"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          delayChildren: 1.2,
          staggerChildren: 0.15,
        },
      },
    }}
  >
    <motion.h2
      className="text-3xl font-bold text-gray-700 mb-2"
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      Educación
    </motion.h2>

    <ul className="ms-8 grid gap-1 mt-4 text-sm">
      {studies.map((study, index) => (
        <motion.li
          key={index}
          className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-3"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div>
            <p className="font-medium text-gray-800">{study.title}</p>
            <p className="text-gray-500">{study.place}</p>
          </div>
          <div>
            <p className="text-gray-500">{study.year}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);
