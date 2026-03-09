import { Education } from "../Education";
import { Skills } from "../Skills";
import { studies } from "../data/cvData";

export function LeftColumn() {
  return (
    <div className="flex flex-col gap-4 md:gap-8 mt-0 md:mt-32">
      {/* Wrapper para Education y Skills - mismo alto que Sobre mí + Experiencia */}
      <div className="flex flex-col gap-4 flex-1 md:mt-4">
        <div className="flex-1">
          <Education studies={studies} />
        </div>
        <div className="flex-1">
          <Skills />
        </div>
      </div>
    </div>
  );
}
