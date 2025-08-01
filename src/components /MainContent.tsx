import { HeaderProfile } from "./HeaderProfile";
import { Contact } from "./Contact";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Experience } from "./Experience";

export const MainContent = () => (
  <div className="w-full max-w-[900px] mx-auto px-6 flex flex-col gap-6 mt-8">
    {/* Header con datos */}
    <HeaderProfile
      fullName="Ricardo Bautista Velázquez"
      imageUrl="src/assets/IMG_6919.png"
      badge="✅ Documentación en regla y permiso de trabajo"
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
    <Experience />
  </div>
);
