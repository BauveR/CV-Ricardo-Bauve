import { Contact } from "./Contact";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { BackgroundBlobsLight } from "../background/BackgroundBlobsLight";
import { studies } from "./data/cvData";
import { PROFILE_DATA } from "../../constants/profileData";
import GlassPanel from "./ui/GlassPanel";
import SectionHeader from "./ui/SectionHeader";
import { containerVariants } from "./ui/motion";

export const MainContent = () => {
  const { contact } = PROFILE_DATA;

  return (
    <section className="relative isolate w-full min-h-[100svh] overflow-x-hidden bg-transparent">
      {/* separador por el menú fijo del App */}
      <div className="h-14 md:h-0" />

      {/* blobs absolute */}
      <BackgroundBlobsLight />

      {/* Contenido a pantalla completa */}
      <div className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 pb-12 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 sm:gap-6 lg:gap-10 lg:items-start max-w-full">
          {/* Izquierda */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase ms-2">CV</h2>
            <Contact {...contact} />

            {/* Wrapper para Education y Skills - mismo alto que Sobre mí + Experiencia */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex-1">
                <Education studies={studies} />
              </div>
              <div className="flex-1">
                <Skills />
              </div>
            </div>
          </div>

          {/* Derecha */}
          <div className="flex flex-col gap-4">
            {/* Wrapper para Sobre mí y Experiencia */}
            <div className="flex flex-col gap-4 flex-1">
              {/* Texto descriptivo */}
              <div className="flex-1">
                <GlassPanel variants={containerVariants} className="h-full">
                <SectionHeader>Sobre mí</SectionHeader>
                <div className="ms-4 sm:ms-8 mt-4 space-y-4 text-sm text-slate-400">
                  <p className="font-bold text-slate-400 text-sm">
                    Analítico, resiliente y orientado a soluciones | Transicionando al desarrollo frontend con pasión por materializar ideas y experiencias digitales intuitivas
                  </p>
                  <p className="text-stone-300 text-sm">
                    Durante 10 años lideré proyectos en el sector inmobiliario, diseñando alternativas de inversión innovadoras. Esta experiencia me enseñó a analizar datos complejos, comunicar eficazmente y gestionar proyectos bajo presión.
                  </p>
                  <p className="text-stone-300 text-sm">
                    Actualmente en transición hacia el desarrollo frontend, especializándome en React y tecnologías web modernas. Mi background en negocios me aporta una perspectiva única: entiendo que el código debe resolver problemas reales de usuarios y el business core.
                  </p>
                  <p className="text-stone-300 text-sm">
                    Combino capacidad analítica para transformar requisitos en soluciones técnicas con mentalidad de aprendizaje continuo. Mis años en proyectos multidisciplinares me han dado habilidades de colaboración y comunicación, construyendo puentes entre equipos técnicos y de negocio.
                  </p>
                  <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                    <p className="font-bold text-stone-50 text-sm">Stack: React, JavaScript, HTML5, CSS3, Git</p>
                    <p className="text-orange-400 text-sm">📍 Barcelona</p>
                    <p className="text-slate-400 text-sm">
                      🔍 <span className="font-bold text-stone-50">Busco:</span> Frontend Developer Junior, Product Owner Junior, Digital Project Manager o Business Analyst donde mi expertise en diseño de productos, visión de negocio y conocimientos técnicos generen valor real.
                    </p>
                  </div>
                </div>
                </GlassPanel>
              </div>

              <div className="flex-1">
                <Experience />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
