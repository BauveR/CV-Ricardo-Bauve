import { HeaderProfile } from "./HeaderProfile";
import { Contact } from "./Contact";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { BackgroundBlobsLight } from "../components /background/BackgroundBlobsLight"; // <- CORREGIDO

export const MainContent = () => (
  <div className="w-full py-8 relative overflow-hidden">
    <BackgroundBlobsLight />

    <div className="flex flex-col md:grid md:grid-cols-[900px_950px] justify-center gap-2 md:gap-6 w-full max-w-[1400px] mx-auto relative z-10">
      <div className="flex flex-col gap-2">
        <HeaderProfile
          fullName="Ricardo Bautista Velázquez"
          imageUrl="src/assets/IMG_6919.png"
        />
        <Contact
          email="rick.bauve@gmail.com"
          phone="602 673 251"
          linkedin="linkedin.com/in/ricardo-bauve"
          web="bauve.tumblr.com"
        />
        <Education
          studies={[
            {
              title: "Diseño y Comunicación Visual Facultad de Artes y Diseño",
              place: "Universidad Nacional Autónoma De México",
              year: "2009 - 2013",
            },
            {
              title: "Master en Chief Digital Officer",
              place: "Gray Matter",
              year: "2019",
            },
            {
              title: "MidJourney Inteligencia artificial generativa",
              place: "S.O.D.A",
              year: "2023",
            },
            {
              title: "BootCamp IT Academy Cibernarium",
              place: "Barcelona",
              year: "2024 - Actualidad",
            },
          ]}
        />
        <Skills />
      </div>
      <div className="flex flex-col gap-2 md:mt-50">
        <Experience />
      </div>
    </div>
  </div>
);
