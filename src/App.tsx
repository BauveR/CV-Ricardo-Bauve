import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, useMatch, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { Welcome } from "./components/welcome/Welcome";
import { MainContent } from "./components/cv/MainContent";
import { PortafolioGrid } from "./components/portafolio/PortafolioGrid";
import { PortafolioDetailPage } from "./components/portafolio/PortafolioDetailPage";
import NavbarSections from "./components/navbar/NavBarSections";
import { AnimatedSection } from "./components/common/AnimatedSection";
import { Footer } from "./components/footer/Footer";
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

      {/* WELCOME */}
      <AnimatedSection
        id="welcome"
        ref={welcomeRef}
        viewportAmount={0.45}
        className="flex items-center justify-center"
      >
        <div className="w-full"><Welcome /></div>
      </AnimatedSection>

      <Divider height="h-[67px]" />

      {/* PRESUPUESTO / CV */}
      <AnimatedSection
        id="presupuesto"
        ref={presupuestoRef}
        viewportAmount={0.01}
      >
        <div className="w-full"><MainContent /></div>
      </AnimatedSection>

      <Divider height="h-12" />

      {/* PORTAFOLIO */}
      <AnimatedSection
        id="portafolio"
        ref={portafolioRef}
        viewportAmount={0.25}
        onViewportEnter={() => setShowPortfolio(true)}
      >
        <div className="w-full">
          {showPortfolio ? (
            <PortafolioGrid />
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* FOOTER */}
      <Footer />

      {/* MODAL PORTAFOLIO */}
      <AnimatePresence>
        {portafolioMatch && (
          <PortafolioModal key={`portafolio-${portafolioMatch.params?.id ?? "modal"}`} />
        )}
      </AnimatePresence>
    </div>
  );
}

function PortafolioModal() {
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    // Cerrar modal y volver a la sección de portafolio
    navigate("/", { replace: true });
    setTimeout(() => {
      window.location.hash = "#portafolio";
    }, 100);
  }, [navigate]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.aside
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-modal
      role="dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="relative max-w-[1640px] w-full max-h-[90vh] overflow-auto rounded-3xl bg-slate-900/30 backdrop-blur-2xl border border-white/10 shadow-xl shadow-black/20 ring-1 ring-white/5"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <PortafolioDetailPage onClose={onClose} />
      </motion.div>
    </motion.aside>
  );
}

function Divider({ height = "h-24" }: { height?: string }) {
  return (
    <div className={`relative ${height} flex items-center justify-center`}>
      <div className="h-px w-64 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
