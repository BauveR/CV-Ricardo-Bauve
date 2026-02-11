import GlassPanel from "./ui/GlassPanel";
import SectionHeader from "./ui/SectionHeader";
import { experienceList } from "./data/cvData";

export function Experience() {
  return (
    <GlassPanel className="h-full flex flex-col">
      <SectionHeader>Experiencia</SectionHeader>
      <div className="ms-4 sm:ms-8 mt-6 mb-8 space-y-6 text-sm text-slate-400">
        {experienceList.map((exp, i) => (
          <div key={i} className="space-y-1">
            <p className="font-bold text-slate-400 text-base md:text-sm">{exp.title}</p>
            {exp.place && <p className="font-bold text-gray-500 text-sm md:text-base">{exp.place}</p>}
            {exp.desc && <p className="text-gray-400">{exp.desc}</p>}

            {exp.extra && (
              <p
                className="mt-6 text-xl sm:text-lg md:text-3xl font-bold
                  bg-gradient-to-r from-[oklch(64.8%_0.2_131.684)] to-blue-300
                  hover:from-blue-200 hover:to-[oklch(64.8%_0.2_131.684)]
                  bg-clip-text text-transparent transition-all duration-500"
              >
                {exp.extra}
              </p>
            )}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
