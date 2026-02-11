export type Study = { title: string; place: string; year: string };
export const studies: Study[] = [
  { title: "Diseño y Comunicación Visual Facultad de Artes y Diseño", place: "UNAM", year: "2009 - 2013" },
  { title: "Master en Chief Digital Officer", place: "Gray Matter", year: "2019" },
  { title: "MidJourney IA generativa", place: "S.O.D.A", year: "2023" },
  { title: "BootCamp IT Academy Cibernarium", place: "Barcelona", year: "2024 - Actualidad" },
];

export type ExperienceItem = {
  title: string;
  place?: string;
  desc?: string;
  extra?: string;
};

export const experienceList: ExperienceItem[] = [
  { title: "2026  Website & design experience", place: "Corpus Colonia de la Universidad de Lleiden, Universidad de la laguna", desc: "" },
  { title: "2023 - 2025  Freelance Graphic design", place: "Wow PR, Beeok, CreAI, Galgos Group, Prüne Chile y Guatemala", desc: "" },
  { title: "2017 - 2023  Product owner Jr.", place: "noox /t PIXKA SAPI de CV", desc: "CRM Development" },
  { title: "2015 - 2017  Chief Digital officer & designer", place: "noox, Ticopó, kankabal, Mühlberg Schloss", desc: "" },
  { title: "2013 - 2022  Art manager", place: "Grupo MYPSA SA DE CV", desc: "Pop-Up's Manager CDMX, Yucatán, Superfine (NYC, Berlín, Miami, Madrid, Chicago). 180 eventos realizados.", extra: "BARCELONA 2025 / Documentacion y permisos en regla " },
];

export const contactItems = (email: string, phone: string, linkedin: string, github: string, web: string) => ([
  { href: `https://${linkedin}`, label: "in", value: linkedin },
  { href: github, label: "🐙", value: github.replace('https://', '') },
  { href: `https://${web}`, label: "🌐", value: web },
  { href: `tel:${phone}`, label: "📞", value: phone },
  { href: `mailto:${email}`, label: "✉️", value: email },
]);



export type SkillSection = { title: string; items: string[] };

export const skillsSections: SkillSection[] = [
  {
    title: "Programas",
    items: ["Photoshop CC","Illustrator CC","Final Cut","InDesign CC","Wix y Wordpress","Midjourney AI"],
  },
  {
    title: "Habilidades",
    items: [
      "Liderazgo","Gestión de Personal","Implementación de estrategias",
      "Manejo de crisis internas","Coordinación de eventos","Creatividad",
    ],
  },
  {
    title: "IT Skills",
    items: ["HTML","CSS","JavaScript","TypeScript","React","Tailwind CSS","Vite","Node.js"],
  },
  {
    title: "Programas extra",
    items: ["Slack, Asana, Zendesk","Google Suite Avanzado","Microsoft 365","Revelado y edición fotográfica","Bases de datos"],
  },
  {
    title: "Idiomas",
    items: ["Español: Nativo","Inglés: Intermedio","Catalán: Elemental 2"],
  },
];