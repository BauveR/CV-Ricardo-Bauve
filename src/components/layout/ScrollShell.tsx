import { useCallback, useMemo, useRef } from "react";
import { useMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import NavbarSections from "../navbar/NavBarSections";
import { Footer } from "../footer/Footer";
import { WelcomeSection } from "../sections/WelcomeSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { CVSection } from "../sections/CVSection";
import { PortafolioModal } from "../portafolio/PortafolioModal";
import { useScrollSections } from "../../hooks/useScrollSections";
import { useScrollNavigation } from "../../hooks/useScrollNavigation";
import { useScrollRestoration } from "../../hooks/useScrollRestoration";
import { useInitialNavigation } from "../../hooks/useInitialNavigation";

type AppSectionId = "welcome" | "projects" | "cv";
const SECTION_IDS: AppSectionId[] = ["welcome", "projects", "cv"];

export function ScrollShell() {
  const welcomeRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const cvRef = useRef<HTMLElement | null>(null);

  const refs = useMemo(
    () => ({ welcome: welcomeRef, projects: projectsRef, cv: cvRef }) as const,
    []
  );

  const activeSection = useScrollSections({ sectionIds: SECTION_IDS, sectionRefs: refs });
  const { scrollTo } = useScrollNavigation({ sectionIds: SECTION_IDS, sectionRefs: refs });
  useScrollRestoration();

  useInitialNavigation(
    useCallback((section: string) => {
      scrollTo(section as AppSectionId, true);
    }, [scrollTo])
  );

  const portafolioMatch = useMatch("/portafolio/:id");

  return (
    <div className="relative min-h-screen bg-white max-w-full overflow-x-hidden">
      <NavbarSections active={activeSection} onGo={(id) => scrollTo(id as AppSectionId)} />

      <WelcomeSection sectionRef={welcomeRef} />

      <ProjectsSection sectionRef={projectsRef} triggerRef={welcomeRef} cvRef={cvRef} />

      <CVSection sectionRef={cvRef} />

      <Footer />

      <AnimatePresence>
        {portafolioMatch && (
          <PortafolioModal key={`portafolio-${portafolioMatch.params?.id ?? "modal"}`} />
        )}
      </AnimatePresence>
    </div>
  );
}
