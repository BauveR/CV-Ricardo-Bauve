import { motion } from "framer-motion";
import GlassPanel from "./ui/GlassPanel";
import SectionHeader from "./ui/SectionHeader";
import { containerVariants, itemVariants } from "./ui/motion";
import type { Study } from "./data/cvData";

type Props = { studies: Study[] };

export function Education({ studies }: Props) {
  return (
    <GlassPanel variants={containerVariants}>
      <SectionHeader>Educación</SectionHeader>

      <ul className="ms-6 grid gap-1 mt-3 text-sm">
        {studies.map((s, idx) => (
          <motion.li
            key={idx}
            className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-2"
            variants={itemVariants}
          >
            <div>
              <p className="font-bold text-slate-400 text-sm">{s.title}</p>
              <p className="text-stone-50 text-sm">{s.place}</p>
            </div>
            <div>
              <p className="text-orange-400 text-sm">{s.year}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </GlassPanel>
  );
}
