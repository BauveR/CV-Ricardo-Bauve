import { contactItems } from "./data/cvData";
import { GlassButton } from "../buttons/Button";
import { FaLinkedin } from "react-icons/fa";

type Props = { email: string; phone: string; linkedin: string; github: string; web: string; };

const SHORT_LABELS: Record<number, string> = {
  0: "linkedin",
  1: "github",
};

export function Contact({ email, phone, linkedin, github, web }: Props) {
  const items = contactItems(email, phone, linkedin, github, web);

  return (
    <div className="mt-0">
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {items.map((it, i) => (
          <a
            key={i}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105"
          >
            <GlassButton className="flex items-center gap-1 text-sm px-3 py-1 md:px-4 md:py-2 rounded-3xl whitespace-nowrap">
              <span className="font-semibold text-base md:text-lg">
                {i === 0 ? <FaLinkedin className="text-base md:text-xl" /> : it.label}
              </span>
              <span>{SHORT_LABELS[i] ?? it.value}</span>
            </GlassButton>
          </a>
        ))}
        <a
          href="https://drive.google.com/file/d/1WuUdmdsPKmKT1Gh0kngnyjo9FTJTUr_5/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105"
        >
          <GlassButton className="flex items-center gap-1 text-sm px-3 py-1 md:px-4 md:py-2 rounded-3xl whitespace-nowrap">
            <span className="font-semibold text-base md:text-lg">📄</span>
            <span>Descargar CV</span>
          </GlassButton>
        </a>
      </div>
    </div>
  );
}
