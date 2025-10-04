import { Contact } from "./Contact";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { BackgroundBlobsLight } from "../background/BackgroundBlobsLight";
import { studies } from "./data/cvData";
import { PROFILE_DATA } from "../../constants/profileData";

export const MainContent = () => {
  const { contact } = PROFILE_DATA;

  return (
    <section className="relative isolate w-full min-h-[100svh] overflow-visible bg-transparent">
      {/* separador por el menú fijo del App */}
      <div className="h-14 md:h-0" />

      {/* blobs absolute */}
      <BackgroundBlobsLight />

      {/* Contenido a pantalla completa */}
      <div className="relative z-10 w-full px-[1.05rem] sm:px-[1.575rem] lg:px-[2.1rem] pb-12 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10">
          {/* Izquierda */}
          <div className="flex flex-col gap-4">
            <Contact {...contact} />
            <Education studies={studies} />
            <Skills />
          </div>

          {/* Derecha */}
          <div className="flex flex-col gap-4">
            <Experience />
          </div>
        </div>
      </div>
    </section>
  );
};
