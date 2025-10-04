import { motion } from "framer-motion";
import GlassPanel from "./ui/GlassPanel";
import { containerVariants, itemVariants } from "./ui/motion";
import { skillsSections } from "./data/cvData";
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiTailwindcss,
  SiVite, SiNodedotjs, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign,
  SiWordpress, SiApple, SiOpenai
} from "react-icons/si";
import type { JSX } from "react";

const iconMap: Record<string, JSX.Element> = {
  "Photoshop CC": <SiAdobephotoshop className="text-blue-500 w-4 h-4" />,
  "Illustrator CC": <SiAdobeillustrator className="text-orange-500 w-4 h-4" />,
  "Final Cut": <SiApple className="text-gray-400 w-4 h-4" />,
  "InDesign CC": <SiAdobeindesign className="text-pink-600 w-4 h-4" />,
  "Wix y Wordpress": <SiWordpress className="text-blue-700 w-4 h-4" />,
  "Midjourney AI": <SiOpenai className="text-indigo-500 w-4 h-4" />,
  HTML: <SiHtml5 className="text-orange-500 w-4 h-4" />,
  CSS: <SiCss3 className="text-blue-500 w-4 h-4" />,
  JavaScript: <SiJavascript className="text-yellow-400 w-4 h-4" />,
  TypeScript: <SiTypescript className="text-blue-600 w-4 h-4" />,
  React: <SiReact className="text-cyan-400 w-4 h-4" />,
  "Tailwind CSS": <SiTailwindcss className="text-sky-400 w-4 h-4" />,
  Vite: <SiVite className="text-purple-400 w-4 h-4" />,
  "Node.js": <SiNodedotjs className="text-green-600 w-4 h-4" />,
};

export function Skills() {
  return (
    <GlassPanel variants={containerVariants} viewportAmount={0.3}>
      <motion.h2
        className="ms-6 text-2xl font-bold text-stone-400"
        variants={itemVariants}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Skills
      </motion.h2>

      <div className="ms-6 mt-4 mb-2 grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-6 text-sm">
        {skillsSections.map((section, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3 className="font-bold text-slate-400 mb-2 text-sm">{section.title}</h3>
            <ul className="space-y-1.5">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-stone-50 text-sm">
                  {iconMap[item] && <span className="w-4 h-4">{iconMap[item]}</span>}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
