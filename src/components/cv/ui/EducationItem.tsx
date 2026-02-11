import type { Study } from "../data/cvData";

type Props = { study: Study; index: number };

export function EducationItem({ study, index }: Props) {
  return (
    <li
      key={index}
      className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-3"
    >
      <div>
        <p className="font-bold text-slate-400">{study.title}</p>
        <p className="text-gray-500">{study.place}</p>
      </div>
      <div>
        <p style={{ color: "oklch(64.8% 0.2 131.684)" }}>{study.year}</p>
      </div>
    </li>
  );
}
