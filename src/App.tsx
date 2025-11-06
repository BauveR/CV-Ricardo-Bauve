import { useCallback, useMemo, useRef, useState } from "react";
import { BrowserRouter, useMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import NavbarSections from "./components/navbar/NavBarSections";
import { Footer } from "./components/footer/Footer";
import { Divider } from "./components/common/Divider";
import { WelcomeSection } from "./components/sections/WelcomeSection";
import { CVSection } from "./components/sections/CVSection";
import { PortfolioSection } from "./components/sections/PortfolioSection";
import { PortafolioModal } from "./components/portafolio/PortafolioModal";
import { useScrollSections } from "./hooks/useScrollSections";
import { useScrollNavigation } from "./hooks/useScrollNavigation";
import { useScrollRestoration } from "./hooks/useScrollRestoration";
import { useInitialNavigation } from "./hooks/useInitialNavigation";

type SectionId = "welcome" | "presupuesto" | "portafolio";
const SECTION_IDS: SectionId[] = ["welcome", "presupuesto", "portafolio"];

function ScrollShell() {
  const welcomeRef = useRef<HTMLElement | null>(null);
  const presupuestoRef = useRef<HTMLElement | null>(null);
  const portafolioRef = useRef<HTMLElement | null>(null);

  const refs = useMemo(
    () => ({ welcome: welcomeRef, presupuesto: presupuestoRef, portafolio: portafolioRef }) as const,
    []
  );

  const [showPortfolio, setShowPortfolio] = useState(false);

  // Hooks personalizados para manejar scroll
  const activeSection = useScrollSections({ sectionIds: SECTION_IDS, sectionRefs: refs });
  const { scrollTo } = useScrollNavigation({ sectionIds: SECTION_IDS, sectionRefs: refs });
  useScrollRestoration();

  // Navegación inicial
  useInitialNavigation(
    useCallback((section: string, shouldShowPortfolio?: boolean) => {
      if (shouldShowPortfolio) setShowPortfolio(true);
      scrollTo(section as SectionId, true);
    }, [scrollTo])
  );

  const portafolioMatch = useMatch("/portafolio/:id");

  return (
    <div className="relative min-h-screen bg-slate-700 overflow-x-hidden max-w-full">
      <NavbarSections active={activeSection} onGo={scrollTo} />

      <WelcomeSection sectionRef={welcomeRef} />
      <Divider height="h-[67px]" />

      <CVSection sectionRef={presupuestoRef} />
      <Divider height="h-12" />

      <PortfolioSection
        sectionRef={portafolioRef}
        showPortfolio={showPortfolio}
        onViewportEnter={() => setShowPortfolio(true)}
      />

      <Footer />

      <AnimatePresence>
        {portafolioMatch && (
          <PortafolioModal key={`portafolio-${portafolioMatch.params?.id ?? "modal"}`} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollShell />
    </BrowserRouter>
  );
}
