import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, useMatch, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { Welcome } from "./components/welcome/Welcome";
import { MainContent } from "./components/cv/MainContent";
import { ProductGrid } from "./components/portafolio/ProductGrid";
import { ProductDetailPage } from "./components/portafolio/ProductDetailPage";
import NavbarSections from "./components/navbar/NavBarSections";
import { AnimatedSection } from "./components/common/AnimatedSection";
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

  const productMatch = useMatch("/product/:id");

  return (
    <div className="relative min-h-screen bg-slate-700">
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

      <Divider />

      {/* PRESUPUESTO / CV */}
      <AnimatedSection
        id="presupuesto"
        ref={presupuestoRef}
        viewportAmount={0.6}
      >
        <div className="w-full"><MainContent /></div>
      </AnimatedSection>

      <Divider />

      {/* PORTAFOLIO */}
      <AnimatedSection
        id="portafolio"
        ref={portafolioRef}
        viewportAmount={0.25}
        onViewportEnter={() => setShowPortfolio(true)}
      >
        <div className="w-full">
          {showPortfolio ? (
            <ProductGrid />
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* MODAL PRODUCTO */}
      <AnimatePresence>
        {productMatch && (
          <ProductModal key={`product-${productMatch.params?.id ?? "modal"}`} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductModal() {
  const navigate = useNavigate();
  const onClose = useCallback(() => {
    if (window.history.length > 1) navigate(-1);
    else window.history.replaceState(null, "", "/#portafolio");
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
      transition={{ duration: 0.25 }}
      aria-modal
      role="dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative max-w-5xl w-full max-h-[85vh] overflow-auto rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sticky top-0 flex items-center justify-between p-3 border-b border-white/10 bg-neutral-900/80 backdrop-blur">
          <div className="text-sm opacity-70">#CreativeMind</div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 ring-1 ring-white/15"
          >
            Cerrar
          </button>
        </div>
        <div className="p-4">
          <ProductDetailPage />
        </div>
      </motion.div>
    </motion.aside>
  );
}

function Divider() {
  return (
    <div className="relative h-24 flex items-center justify-center">
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
