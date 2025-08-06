import { HeaderProfile } from "./HeaderProfile";
import { Contact } from "./Contact";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { BackgroundBlobsLight } from "../components /background/BackgroundBlobsLight";
import { GlassButton } from "../components /Button";
import { Link } from "react-router-dom";

export const MainContent = () => (
    <div className="w-full py-8 relative overflow-hidden lg:min-h-screen">


      <BackgroundBlobsLight />
  
      {/* Contenido principal */}
      <div className="w-full max-w-[1900px] mx-auto relative z-10 overflow-x-hidden px-4">
        <div className="flex flex-col gap-2 md:gap-4 lg:grid lg:grid-cols-[900px_950px] lg:gap-6 justify-center">
          {/* Columna izquierda */}
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
  
          {/* Columna derecha */}
          <div className="flex flex-col gap-2 mt-50 ">
            <Experience />
          </div>
        </div>
      </div>
  
      {/* Botones flotantes en esquina inferior derecha */}
      <div className="fixed bottom-6 right-6 flex flex-row gap-4 z-50">
        <Link to="/">
          <GlassButton>Inicio</GlassButton>
        </Link>
        <Link to="/portafolio">
          <GlassButton>Portafolio</GlassButton>
        </Link>
      </div>
  
      {/* Botón flotante superior derecho con badge */}
      <div className="fixed top-6 right-6 z-50">
        <GlassButton className="text-sm font-bold">
          🇪🇸 Documentación y permiso de trabajo
        </GlassButton>
      </div>
    </div>
  );
  
