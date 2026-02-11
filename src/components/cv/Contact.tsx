import { contactItems } from "./data/cvData";
import { GlassButton } from "../buttons/Button";

type Props = { email: string; phone: string; linkedin: string; github: string; web: string; };

export function Contact({ email, phone, linkedin, github, web }: Props) {
  const items = contactItems(email, phone, linkedin, github, web);

  return (
    <div className="ms-0 flex flex-col gap-2 mt-0">
      {/* Primera fila: LinkedIn, GitHub, Web */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-2">
        {items.slice(0, 3).map((it, i) => (
          <a
            key={i}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105"
          >
            <GlassButton className="w-full sm:w-auto flex justify-center sm:justify-start items-center gap-3 text-base md:text-lg px-8 py-2 md:px-11 md:py-6 rounded-3xl">
              <span className="font-semibold text-xl md:text-2xl">{it.label}</span>
              <span>{it.value}</span>
            </GlassButton>
          </a>
        ))}
      </div>

      {/* Segunda fila: Teléfono, Email, Descargar CV */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-2">
        {items.slice(3).map((it, i) => (
          <a
            key={i + 3}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105"
          >
            <GlassButton className="w-full sm:w-auto flex justify-center sm:justify-start items-center gap-3 text-base md:text-lg px-8 py-2 md:px-11 md:py-6 rounded-3xl">
              <span className="font-semibold text-xl md:text-2xl">{it.label}</span>
              <span>{it.value}</span>
            </GlassButton>
          </a>
        ))}
        <a
          href="https://drive.google.com/file/d/1WuUdmdsPKmKT1Gh0kngnyjo9FTJTUr_5/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105"
        >
          <GlassButton className="w-full sm:w-auto flex justify-center sm:justify-start items-center gap-3 text-base md:text-lg px-8 py-2 md:px-11 md:py-6 rounded-3xl">
            <span className="font-semibold text-xl md:text-2xl">📄</span>
            <span>Descargar CV</span>
          </GlassButton>
        </a>
      </div>
    </div>
  );
}
