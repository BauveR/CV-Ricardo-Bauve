import { motion } from "framer-motion";
import GlassPanel from "./ui/GlassPanel";
import SectionHeader from "./ui/SectionHeader";
import { containerVariants, itemVariants } from "./ui/motion";
import { experienceList } from "./data/cvData";

export function Experience() {
  return (
    <GlassPanel variants={containerVariants}>
      <SectionHeader>Experiencia</SectionHeader>
      <div className="ms-6 mt-4 mb-6 space-y-4 text-sm text-slate-400">
        {experienceList.map((exp, i) => (
          <motion.div key={i} className="space-y-1" variants={itemVariants}>
            <p className="font-bold text-slate-400 text-sm">{exp.title}</p>
            {exp.place && <p className="font-bold text-stone-50 text-sm">{exp.place}</p>}
            {exp.desc && <p className="text-stone-300 text-sm">{exp.desc}</p>}

            {exp.extra && (
              <motion.p
                style={{ originX: 0.5, originY: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="mt-4 text-lg sm:text-base md:text-2xl font-bold
                  bg-gradient-to-r from-orange-500 to-blue-300
                  hover:from-blue-200 hover:to-orange-500
                  bg-clip-text text-transparent transition-all duration-500
                  motion-reduce:transform-none"
              >
                {exp.extra}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
