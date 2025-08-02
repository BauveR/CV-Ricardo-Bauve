import { motion } from "framer-motion";

export const Experience = () => (
  <motion.div
    className="rounded-[4.5rem] p-10 mt-3 bg-white/20 backdrop-blur-md shadow-xl border border-white/30"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          delayChildren: 1.6,
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
      Experiencia
    </motion.h2>

    <div className="ms-8 mt-8 mb-8 space-y-6 text-sm text-gray-800">
      {[
        {
          title: "2013 - 2022 Dirección y curaduría de arte",
          place: "Grupo MYPSA SA DE CV",
          desc: "Pop-Up’s de arte con creadores de la comunidad de la CDMX, Yucatán, Superfine (NYC, Berlín, Miami, Madrid, Chicago). 180 eventos realizados.",
        },
        {
          title: "2016 - 2023 Chief Digital Officer, Jefe de adopción digital",
          place: "Ecova Green SA de CV / PIXKA SAPI de CV",
          desc: "Desarrollo de marcas y automatización tecnológica, líneas de negocio (mini oficinas y mini lofts) e inversiones en bienes raíces. Mapeo de procesos para automatizar la operación y cobro de mantenimientos en línea. Desarrollo de sistema automatizado en Drupal 8 y contratos tokenizados con blockchain.",
        },
        {
          title: "2019 - 2020 Voluntariado Proyecto 2020",
          place: "Fundación Sophia (Madrid, México)",
          desc: "",
        },
        {
          title: "2017 - 2023 Chief Sales Officer, Jefe de ventas",
          place: "",
          desc: "Ventas directas, alianzas con comunidades, inmobiliarias y emprendedores.",
        },
        {
          title: "2023 - 2025 Freelance",
          place: "",
          desc: "Varios proyectos para Wow PR, Beeok, CreAi, Galgos Group, Prûne Chile.",
          extra: "Barcelona 2025",
        },
      ].map((exp, i) => (
        <motion.div
          key={i}
          className="space-y-1"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="font-bold">{exp.title}</p>
          {exp.place && <p className="italic">{exp.place}</p>}
          {exp.desc && <p>{exp.desc}</p>}
          {exp.extra && (
            <p className=" mt-8 text-2xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-700 to-purple-800 bg-clip-text text-transparent">{exp.extra}</p>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
);
