import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiVite,
  SiNodedotjs,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobeindesign,
  SiWordpress,
  SiApple,
  SiOpenai,
} from "react-icons/si";

export const Skills = () => {
  const iconMap: Record<string, JSX.Element> = {
    "Photoshop CC": <SiAdobephotoshop className="text-blue-500 w-5 h-5" />,
    "Illustrator CC": <SiAdobeillustrator className="text-orange-500 w-5 h-5" />,
    "Final Cut": <SiApple className="text-gray-400 w-5 h-5" />, 
    "InDesign CC": <SiAdobeindesign className="text-pink-600 w-5 h-5" />,
    "Wix y Wordpress": <SiWordpress className="text-blue-700 w-5 h-5" />,
    "Midjourney AI": <SiOpenai className="text-indigo-500 w-5 h-5" />, 
    HTML: <SiHtml5 className="text-orange-500 w-5 h-5" />,
    CSS: <SiCss3 className="text-blue-500 w-5 h-5" />,
    JavaScript: <SiJavascript className="text-yellow-400 w-5 h-5" />,
    TypeScript: <SiTypescript className="text-blue-600 w-5 h-5" />,
    React: <SiReact className="text-cyan-400 w-5 h-5" />,
    "Tailwind CSS": <SiTailwindcss className="text-sky-400 w-5 h-5" />,
    Vite: <SiVite className="text-purple-400 w-5 h-5" />,
    "Node.js": <SiNodedotjs className="text-green-600 w-5 h-5" />,
  };

  return (
    <motion.div
      className="rounded-[4.5rem] p-10 mt-3 bg-white/30 backdrop-blur-md shadow-xl border border-white/30"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 1.4,
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <motion.h2
        className="text-3xl font-bold text-gray-500 mb-6"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Skills
      </motion.h2>

    <div className="ms-8 mt-8 mb-8 grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-8 text-sm">

        {[
          {
            title: "Programas",
            items: [
              "Photoshop CC",
              "Illustrator CC",
              "Final Cut",
              "InDesign CC",
              "Wix y Wordpress",
              "Midjourney AI",
            ],
          },
          {
            title: "Habilidades",
            items: [
              "Liderazgo",
              "Gestión de Personal",
              "Implementación de estrategias",
              "Manejo de crisis internas",
              "Coordinación de eventos",
              "Creatividad",
            ],
          },
          {
            title: "IT Skills",
            items: [
              "HTML",
              "CSS",
              "JavaScript",
              "TypeScript",
              "React",
              "Tailwind CSS",
              "Vite",
              "Node.js",
            ],
          },
          {
            title: "Programas extra",
            items: [
              "Slack, Asana, Zendesk",
              "Google Suite Avanzado",
              "Microsoft 365",
              "Revelado y edición fotográfica",
              "Bases de datos",
            ],
          },
          {
            title: "Idiomas",
            items: ["Español: Nativo", "Inglés: Intermedio", "Catalán: Básico 2"],
          },
        ].map((section, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3 className="font-bold text-pink-600 mb-1">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-gray-700">
                  {iconMap[item] && <span className="w-5 h-5">{iconMap[item]}</span>}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
