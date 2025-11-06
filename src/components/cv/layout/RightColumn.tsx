import { AboutMe } from "../AboutMe";
import { Experience } from "../Experience";

export function RightColumn() {
  return (
    <div className="flex flex-col gap-4">
      {/* Wrapper para Sobre mí y Experiencia */}
      <div className="flex flex-col gap-4 flex-1 mt-12 md:mt-16">
        <div className="flex-1">
          <AboutMe />
        </div>

        <div className="flex-1">
          <Experience />
        </div>
      </div>
    </div>
  );
}
