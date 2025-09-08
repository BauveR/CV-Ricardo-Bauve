import { useMemo } from "react";
import { TitleMovCv } from "../titleRicardo/TitleMovCv";
import { TitleBauveCv } from "../titleBauve/TitleBauveCv";

const projects = [
  { src: "src/assets/bauve-01.png", text: "Identidad visual para museo" },
  { src: "src/assets/bauve-02.png", text: "Campaña gráfica otoño 2022" },
  { src: "src/assets/bauve-03.png", text: "Cartel para festival de jazz" },
  { src: "src/assets/bauve-04.png", text: "Ilustración editorial" },
  { src: "src/assets/bauve-05.png", text: "Diseño de portada de libro" },
  { src: "src/assets/bauve-06.png", text: "Tipografía experimental" },
  { src: "src/assets/bauve-07.png", text: "Campaña para redes sociales" },
  { src: "src/assets/bauve-08.png", text: "Packaging para té artesanal" },
  { src: "src/assets/bauve-09.png", text: "Ilustración digital" },
  { src: "src/assets/bauve-10.png", text: "Diseño UX/UI para app" },
  { src: "src/assets/bauve-11.png", text: "Cartel político feminista" },
  { src: "src/assets/bauve-12.png", text: "Motion Graphics para documental" },
  { src: "src/assets/bauve-13.png", text: "Diseño de logotipo institucional" },
  { src: "src/assets/bauve-14.png", text: "Mapa gráfico interactivo" },
  { src: "src/assets/bauve-15.png", text: "Diseño editorial para revista" },
  { src: "src/assets/bauve-16.png", text: "Arte visual con Midjourney" },
  { src: "src/assets/bauve-17.png", text: "Cartel de cine independiente" },
  { src: "src/assets/bauve-18.png", text: "Campaña gráfica contra el racismo" },
  { src: "src/assets/bauve-19.png", text: "Diseño de marca para cafetería" },
  { src: "src/assets/bauve-20.png", text: "Diseño tipográfico modular" },
  { src: "src/assets/bauve-21.png", text: "Infografía para proyecto social" },
  { src: "src/assets/bauve-22.png", text: "Poster festival música electrónica" },
  { src: "src/assets/bauve-23.png", text: "Diseño y arte para disco" },
  { src: "src/assets/bauve-24.png", text: "Narrativa visual para instalación" },
  { src: "src/assets/bauve-25.png", text: "Estampa digital sobre textil" },
  { src: "src/assets/bauve-26.png", text: "Animación gráfica para YouTube" },
  { src: "src/assets/bauve-27.png", text: "Diseño crítico y político" },
  { src: "src/assets/bauve-28.png", text: "Branding para proyecto feminista" },
  { src: "src/assets/bauve-29.png", text: "Diseño inclusivo para folleto" },
  { src: "src/assets/bauve-31.png", text: "Serie de ilustraciones LGTBQ+" },
  { src: "src/assets/bauve-32.png", text: "Visualización de datos urbanos" },
];

export const PortafolioGrid = () => {
  const cards = useMemo(
    () =>
      projects.map((project, idx) => (
        <LiquidGlassCardJelly
          key={idx}
          images={projects.map((p) => p.src)}
          index={idx}
          hoverText={project.text}
          className="w-[400px] h-[280px]"
        />
      )),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-200 to-stone-200 px-6 py-10">
      {/* Título animado personalizado */}
      <div className="flex justify-center items-end gap-4 mb-20 flex-wrap mt-5">
        <TitleMovCv />
        <TitleBauveCv />
      </div>

      {/* Grilla de proyectos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                      gap-10 max-w-[1600px] mx-auto place-items-center">
        {cards}
      </div>
    </div>
  );
};

export default PortafolioGrid;
