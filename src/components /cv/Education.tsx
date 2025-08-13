import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.10,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

type Study = { title: string; place: string; year: string; };
type EducationProps = { studies: Study[]; };

export const Education = ({ studies }: EducationProps) => (
  <motion.div
  className="rounded-[3rem] p-8 mt-3 
  bg-slate-900/70 
  backdrop-blur-xl 
  shadow-lg 
  border border-white/20 
  ring-1 ring-white/10
  hover:bg-slate-900/80 
  transition-colors duration-500"
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.35 }}
  >
    <motion.h2
      className="ms-8 text-3xl font-bold text-stone-400 mb-2"
      variants={item}
    >
      Educación
    </motion.h2>

    <ul className="ms-8 grid gap-1 mt-4 text-sm">
      {studies.map((s, idx) => (
        <motion.li
          key={idx}
          className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-3"
          variants={item}
        >
          <div>
            <p className="font-bold text-slate-400">{s.title}</p>
            <p className="text-stone-50">{s.place}</p>
          </div>
          <div>
            <p className="text-orange-400">{s.year}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);
