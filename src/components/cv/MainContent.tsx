import { LeftColumn } from "./layout/LeftColumn";
import { RightColumn } from "./layout/RightColumn";
import { Contact } from "./Contact";
import { PROFILE_DATA } from "../../constants/profileData";
import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { experienceList } from "./data/cvData";

const ALIGNMENTS: ("left" | "right" | "both")[] = ["both", "both", "both", "right", "right", "left"];

const timelineEvents = experienceList.map((exp, i) => ({
  year: exp.title.match(/^\d{4}/)?.[0] ?? exp.title.split("  ")[0],
  title: exp.title.replace(/^\d{4}[\s–-]*\d{0,4}\s*/, "").trim(),
  subtitle: exp.place,
  description: exp.desc ?? "",
  alignment: ALIGNMENTS[i],
}));

export const MainContent = () => {
  const { contact } = PROFILE_DATA;

  return (
    <section className="relative isolate w-full min-h-[100svh] overflow-x-hidden" style={{ background: "linear-gradient(to bottom, transparent, #A7F689)" }}>
      {/* separador por el menú fijo del App */}
      <div className="h-4 md:h-0" />

      {/* Barra de contacto centrada sobre el grid */}
      <div className="relative z-10 w-full flex justify-center px-4 py-3 mt-8">
        <Contact {...contact} />
      </div>

      {/* Timeline de experiencia */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <ScrollTimeline
          events={timelineEvents}
          title="Experiencia"
          subtitle=""
          cardAlignment="alternating"
          revealAnimation="fade"
          cardVariant="outlined"
          cardEffect="none"
          connectorStyle="line"
          parallaxIntensity={0}
          progressIndicator
        />
      </div>

      {/* Contenido a pantalla completa */}
      <div className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 pb-12 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 sm:gap-6 lg:gap-10 lg:items-start max-w-full">
          <LeftColumn />
          <RightColumn />
        </div>
      </div>
    </section>
  );
};
