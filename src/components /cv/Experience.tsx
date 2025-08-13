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

export const Experience = () => (
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
      className="ms-8 text-3xl font-bold text-stone-400"
      variants={item}
    >
      Experiencia
    </motion.h2>

    <div className="ms-8 mt-6 mb-8 space-y-6 text-sm text-slate-400">
      {[
        { title: "2013 - 2022 Dirección y curaduría de arte", place: "Grupo MYPSA SA DE CV", desc: "Pop-Up’s de arte con creadores..." },
        { title: "2016 - 2023 Chief Digital Officer, Jefe de adopción digital", place: "Ecova Green SA de CV / PIXKA SAPI de CV", desc: "Desarrollo de marcas y automatización..." },
        { title: "2019 - 2020 Voluntariado Proyecto 2020", place: "Fundación Sophia (Madrid, México)", desc: "" },
        { title: "2017 - 2023 Chief Sales Officer, Jefe de ventas", place: "", desc: "Ventas directas..." },
        { title: "2023 - 2025 Freelance", place: "", desc: "Varios proyectos...", extra: "Barcelona 2025" },
      ].map((exp, i) => (
        <motion.div key={i} className="space-y-1" variants={item}>
          <p className="font-bold text-slate-400 text-base md:text-sm">{exp.title}</p>
          {exp.place && <p className="font-bold text-stone-50 text-sm md:text-base">{exp.place}</p>}
          {exp.desc && <p className="text-stone-300">{exp.desc}</p>}
          {exp.extra && (
            <p className="mt-6 text-xl sm:text-lg md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-blue-200 bg-clip-text text-transparent">
              {exp.extra}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
);
