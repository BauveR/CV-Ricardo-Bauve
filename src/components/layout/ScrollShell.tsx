import { useCallback, useMemo, useRef, useState } from "react";
import { useMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import NavbarSections from "../navbar/NavBarSections";
import { Footer } from "../footer/Footer";
import { Divider } from "../common/Divider";
import { WelcomeSection } from "../sections/WelcomeSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { CVSection } from "../sections/CVSection";
import { PortfolioSection } from "../sections/PortfolioSection";
import { PortafolioModal } from "../portafolio/PortafolioModal";
import { useScrollSections } from "../../hooks/useScrollSections";
import { useScrollNavigation } from "../../hooks/useScrollNavigation";
import { useScrollRestoration } from "../../hooks/useScrollRestoration";
import { useInitialNavigation } from "../../hooks/useInitialNavigation";

type AppSectionId = "welcome" | "projects" | "cv" | "portafolio";
const SECTION_IDS: AppSectionId[] = ["welcome", "projects", "cv", "portafolio"];

export function ScrollShell() {
  const welcomeRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const cvRef = useRef<HTMLElement | null>(null);
  const portafolioRef = useRef<HTMLElement | null>(null);

  const refs = useMemo(
    () => ({ welcome: welcomeRef, projects: projectsRef, cv: cvRef, portafolio: portafolioRef }) as const,
    []
  );

  const [showPortfolio, setShowPortfolio] = useState(false);

  const activeSection = useScrollSections({ sectionIds: SECTION_IDS, sectionRefs: refs });
  const { scrollTo } = useScrollNavigation({ sectionIds: SECTION_IDS, sectionRefs: refs });
  useScrollRestoration();

  useInitialNavigation(
    useCallback((section: string, shouldShowPortfolio?: boolean) => {
      if (shouldShowPortfolio) setShowPortfolio(true);
      scrollTo(section as AppSectionId, true);
    }, [scrollTo])
  );

  const portafolioMatch = useMatch("/portafolio/:id");

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden max-w-full">
      <NavbarSections active={activeSection} onGo={scrollTo} />

      <WelcomeSection sectionRef={welcomeRef} />

      <ProjectsSection sectionRef={projectsRef} triggerRef={welcomeRef} />

      <CVSection sectionRef={cvRef} />
      <Divider height="h-4 md:h-12" />

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
