import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Contact } from "./Contact";
import { ScrollReveal } from "../ui/ScrollReveal";
import { PROFILE_DATA } from "../../constants/profileData";
import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { OrbitingSkills } from "./OrbitingSkills";
import { experienceList } from "./data/cvData";

const ALIGNMENTS: ("left" | "right" | "both")[] = ["both", "both", "both", "right", "right", "left"];

const ITEM_EXTRAS: Record<number, { iconUrl?: string; href?: string; noIcon?: boolean; right?: object }> = {
  0: {
    iconUrl: "https://res.cloudinary.com/dmweipuof/image/upload/v1773087621/logo_1_litytg.png",
    href: "https://www.barcelonactiva.cat/es/itacademy",
    right: {
      year: "2026",
      title: "Website & design experience",
      subtitle: "Corpus Colonia de la Universidad de Lleiden, Universidad de la laguna",
      description: "",
      iconUrls: [
        "https://res.cloudinary.com/dmweipuof/image/upload/v1773088478/marca-universidad-de-la-laguna-original_n71civ.svg",
        "https://res.cloudinary.com/dmweipuof/image/upload/v1773088485/UniversiteitLeidenLogo_lwaolc.svg",
      ],
    },
  },
  1: {
    noIcon: true,
    href: "https://spectacularoffice.co/",
    right: {
      year: "2023 - 2025",
      title: "Freelance Graphic design",
      subtitle: "Wow PR, Beeok, CreAI, Galgos Group, Prüne Chile y Guatemala",
      description: "",
      noIcon: true,
    },
  },
  2: {
    noIcon: true,
    right: {
      year: "2017 - 2023",
      title: "Product owner Jr.",
      subtitle: "noox /t PIXKA SAPI de CV",
      description: "CRM Development",
      noIcon: true,
    },
  },
  3: { noIcon: true },
  4: { noIcon: true },
};

const timelineEvents = experienceList.map((exp, i) => ({
  year: exp.title.match(/^\d{4}(?:\s*[-–]\s*\d{4})?/)?.[0].trim() ?? exp.title.split("  ")[0],
  title: exp.title.replace(/^\d{4}[\s–-]*\d{0,4}\s*/, "").trim(),
  subtitle: exp.place,
  description: exp.desc ?? "",
  alignment: ALIGNMENTS[i],
  ...ITEM_EXTRAS[i],
}));

export const MainContent = () => {
  const { contact } = PROFILE_DATA;
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.1 });

  return (
    <section className="relative w-full min-h-[100svh] overflow-x-hidden" style={{ background: "linear-gradient(to bottom, transparent, #A7F689)" }}>
      {/* separador por el menú fijo del App */}
      <div className="h-4 md:h-0" />

      {/* Timeline de experiencia */}
      <div className="relative z-20 w-full max-w-4xl mx-auto mt-12">
        <ScrollTimeline
          events={timelineEvents}
          leftTitle="Estudios"
          rightTitle="Experiencia"
          cardAlignment="alternating"
          revealAnimation="fade"
          cardVariant="outlined"
          cardEffect="none"
          connectorStyle="line"
          parallaxIntensity={0}
          progressIndicator
        />
      </div>

      {/* Barra de contacto centrada sobre el grid */}
      <div className="relative z-20 w-full mt-32 px-4">
        <h2
          className="text-center text-white mb-4"
          style={{ fontFamily: "'Boldonse', sans-serif", fontSize: "clamp(0.87rem, 1.96vw, 2.18rem)" }}
        >
          Contacto
        </h2>
        <div className="flex justify-center py-3">
          <Contact {...contact} />
        </div>
      </div>

      {/* Loop de skills */}
      <div className="relative z-20 w-full mt-36 px-4">
        <h2
          className="text-center text-white mb-8"
          style={{ fontFamily: "'Boldonse', sans-serif", fontSize: "clamp(0.87rem, 1.96vw, 2.18rem)" }}
        >
          Tecnologías y programas
        </h2>
        <OrbitingSkills />
      </div>

      {/* Skills + Sobre mí */}
      <div className="relative z-20 w-[90vw] md:w-[60vw] mx-auto pb-20 mt-28 grid grid-cols-1 md:grid-cols-2 gap-x-[5vw] gap-y-12">

        {/* Columna izquierda: Skills */}
        <div className="flex flex-col items-start text-left md:items-end md:text-right">
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Boldonse', sans-serif",
              fontSize: "clamp(0.87rem, 1.96vw, 2.18rem)",
              background: "linear-gradient(135deg, #22c55e, #ffffff, #a855f7, #22c55e)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              animation: "aurora-text 5s ease infinite",
            }}
          >
            Habilidades
          </h2>
          <div ref={skillsRef} />
          <ul className="space-y-1.5 text-white/80 leading-relaxed" style={{ fontFamily: "'Boldonse', sans-serif", fontSize: "calc(0.875rem * 1.2)" }}>
            {[
              "Liderazgo de equipos creativos y tecnológicos",
              "Gestión de personal multidisciplinario",
              "Implementación de estrategias digitales",
              "Manejo de crisis internas",
              "Coordinación de eventos y proyectos",
              "Gestión de producto digital y roadmapping",
              "Definición de backlog, épicas e historias de usuario",
              "Metodologías ágiles: Scrum, Kanban",
              "Gestión de stakeholders",
              "Integración de IA con herramientas creativas en tiempo real",
              "Prompting y uso estratégico de IA",
              "Integración de APIs de IA en flujos de trabajo",
              "Frontend development: React, Javascript, Typescript",
              "Creatividad y dirección de arte digital",
              "UX/UI Design y prototipado",
              "Diseño generativo con IA",
              "Visualización de datos y motion graphics",
              "Gestión de proyectos digitales",
              "Storytelling con datos y tecnología",
            ].map((skill, i) => (
              <motion.li
                key={i}
                animate={skillsInView ? { x: 0, opacity: 1 } : { x: "-100vw", opacity: 0 }}
                initial={{ x: "-100vw", opacity: 0 }}
                transition={{
                  x: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.18 },
                  opacity: { duration: 0.6, delay: i * 0.18 },
                }}
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Columna derecha: Sobre mí */}
        <div className="flex flex-col items-start text-left">
          <h2
            className="mb-6 text-white"
            style={{ fontFamily: "'Boldonse', sans-serif", fontSize: "clamp(0.87rem, 1.96vw, 2.18rem)" }}
          >
            Sobre mí
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed font-bold" style={{ fontSize: "calc(0.875rem * 1.1)" }}>
            <p>
              Con más de 10 años de experiencia en diseño, gestión de productos y recién graduado del bootcamp de frontend developer en la IT Academy de Barcelona, me he dedicado a la coordinación de equipos de desarrollo y optimización de plataformas, así como a diseñar materiales fijos, vídeo, webs y ejecutar estrategias digitales. Tengo experiencia como Chief Digital Officer en el sector p2p, realizando campañas de Facebook, Google Ads y TikTok y como Art Manager encargado de festivales, exposiciones y eventos.
            </p>
            <p>
              He colaborado en entornos ágiles en proyectos de comunicación y digitales complejos, coordinando y diseñando campañas digitales y analizando su impacto mediante KPIs y métricas de producto. Mi enfoque en entregas iterativas y MVP me ha permitido optimizar procesos y resolver incidencias de manera asertiva y rápida.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
