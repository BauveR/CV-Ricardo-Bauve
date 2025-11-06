import { Contact } from "../Contact";
import { Education } from "../Education";
import { Skills } from "../Skills";
import { studies } from "../data/cvData";
import { PROFILE_DATA } from "../../../constants/profileData";

export function LeftColumn() {
  const { contact } = PROFILE_DATA;

  return (
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
  );
}
