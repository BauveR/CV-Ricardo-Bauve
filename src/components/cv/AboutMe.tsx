import GlassPanel from "./ui/GlassPanel";
import SectionHeader from "./ui/SectionHeader";

export function AboutMe() {
  return (
    <GlassPanel className="h-full !py-[4.5rem]">
      <SectionHeader>Sobre mí</SectionHeader>
      <div className="ms-4 sm:ms-8 mt-4 space-y-4 text-sm text-slate-400">
        <p className="text-gray-400 text-sm">
          Con más de 10 años de experiencia en diseño, gestión de productos y recién graduado del bootcamp de frontend developer en la IT Academy de Barcelona, me he dedicado a la coordinación de equipos de desarrollo y optimización de plataformas, así como a diseñar materiales fijos, vídeo, webs y ejecutar estrategias digitales. Tengo experiencia como Chief Digital Officer en el sector p2p, realizando campañas de Facebook, Google Ads y TikTok y como Art Manager encargado de festivales, exposiciones y eventos.
        </p>
        <p className="text-gray-400 text-sm">
          He colaborado en entornos ágiles en proyectos de comunicación y digitales complejos, coordinando y diseñando campañas digitales y analizando su impacto mediante KPIs y métricas de producto. Mi enfoque en entregas iterativas y MVP me ha permitido optimizar procesos y resolver incidencias de manera asertiva y rápida.
        </p>
        <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
          <p className="font-bold text-gray-500 text-sm">Stack: React, JavaScript, HTML5, CSS3, Git</p>
          <p className="text-sm" style={{ color: "oklch(64.8% 0.2 131.684)" }}>📍 Barcelona</p>
          <p className="text-slate-400 text-sm">
            🔍 <span className="font-bold text-gray-500">Busco:</span> Frontend Developer Junior, Product Owner Junior, Digital Project Manager o Business Analyst donde mi expertise en diseño de productos, visión de negocio y conocimientos técnicos generen valor real.
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}
