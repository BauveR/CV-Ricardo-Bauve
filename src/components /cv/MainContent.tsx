// src/components/cv/MainContent.tsx
import { HeaderProfile } from "./HeaderProfile";
import { Contact } from "./Contact";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { BackgroundBlobsLight } from "../background/BackgroundBlobsLight";
import { TitleMovCv } from "../titleRicardo/TitleMovCv";
import { TitleBauveCv } from "../titleBauve/TitleBauveCv";

export const MainContent = () => (
  <section className="relative isolate w-full min-h-[100svh] overflow-visible bg-transparent">
    {/* separador por el menú fijo del App */}
    <div className="h-14 md:h-16" />

    {/* Los blobs van ABSOLUTE dentro de esta sección */}
    <BackgroundBlobsLight />

    {/* Contenido a pantalla completa */}
    <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10">
        {/* Izquierda */}
        <div className="flex flex-col gap-4">
          <HeaderProfile title={<TitleMovCv />} subtitle={<TitleBauveCv />} />
          <Contact
            email="rick.bauve@gmail.com"
            phone="602 673 251"
            linkedin="linkedin.com/in/ricardo-bauve"
            web="bauve.tumblr.com"
          />
          <Education
            studies={[
              { title: "Diseño y Comunicación Visual Facultad de Artes y Diseño", place: "UNAM", year: "2009 - 2013" },
              { title: "Master en Chief Digital Officer", place: "Gray Matter", year: "2019" },
              { title: "MidJourney IA generativa", place: "S.O.D.A", year: "2023" },
              { title: "BootCamp IT Academy Cibernarium", place: "Barcelona", year: "2024 - Actualidad" },
            ]}
          />
          <Skills />
        </div>

        {/* Derecha */}
        <div className="flex flex-col gap-4 mt-0">
          <Experience />
        </div>
      </div>
    </div>
  </section>
);
