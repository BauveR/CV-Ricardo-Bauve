import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, useLocation, useMatch, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ⚠️ Sin espacios en las rutas
import { Welcome } from "./components /welcome/Welcome";
import { MainContent } from "./components /cv/MainContent";
import { ProductGrid } from "./components /portafolio/ProductGrid";
import { ProductDetailPage } from "./components /portafolio/ProductDetailPage";
import NavbarSections from "./components /navbar/NavBarSections";

type SectionId = "welcome" | "presupuesto" | "portafolio";
const SECTION_IDS: SectionId[] = ["welcome", "presupuesto", "portafolio"];

function ScrollShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const welcomeRef = useRef<HTMLElement | null>(null);
  const presupuestoRef = useRef<HTMLElement | null>(null);
  const portafolioRef = useRef<HTMLElement | null>(null);

  const refs = useMemo(
    () => ({ welcome: welcomeRef, presupuesto: presupuestoRef, portafolio: portafolioRef }) as const,
    []
  );

  const [active, setActive] = useState<SectionId>("welcome");
  const [showPortfolio, setShowPortfolio] = useState(false);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = (vis?.target as HTMLElement | undefined)?.id as SectionId | undefined;
        if (id && SECTION_IDS.includes(id)) setActive(id);
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    const nodes = [welcomeRef.current, presupuestoRef.current, portafolioRef.current].filter(Boolean) as HTMLElement[];
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  const scrollTo = useCallback((id: SectionId, replace?: boolean) => {
    const el = refs[id].current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    const url = `/#${id}`;
    if (replace) window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
  }, [refs]);

  useEffect(() => {
    if (!firstLoadRef.current) return;
    firstLoadRef.current = false;

    const path = location.pathname;
    if (/\/product\//.test(path)) return;

    if (path.includes("presupuesto")) { scrollTo("presupuesto", true); return; }
    if (path.includes("portafolio")) { scrollTo("portafolio", true); setShowPortfolio(true); return; }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.history.replaceState(null, "", "/#welcome");
  }, [location.pathname, scrollTo]);

  useEffect(() => {
    const onPop = () => {
      const h = window.location.hash.slice(1) as SectionId | undefined;
      if (h && (SECTION_IDS as readonly string[]).includes(h)) {
        const el = refs[h as SectionId].current;
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [refs]);

  const productMatch = useMatch("/product/:id");

  return (
    <div className="relative min-h-screen bg-slate-700">
      {/* Menú con burger en móvil */}
      <NavbarSections active={active} onGo={scrollTo} />

      {/* WELCOME */}
      <motion.section
        id="welcome"
        ref={(el) => (welcomeRef.current = el)}
        className="min-h-screen flex items-center justify-center px-0 scroll-mt-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full"><Welcome /></div>
      </motion.section>

      <Divider />

      {/* PRESUPUESTO / CV */}
      <motion.section
        id="presupuesto"
        ref={(el) => (presupuestoRef.current = el)}
        className="min-h-screen px-0 scroll-mt-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full"><MainContent /></div>
      </motion.section>

      <Divider />

      {/* PORTAFOLIO */}
      <motion.section
        id="portafolio"
        ref={(el) => (portafolioRef.current = el)}
        className="min-h-screen px-0 scroll-mt-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25, margin: "0px 0px -15% 0px" }}
        onViewportEnter={() => setShowPortfolio(true)}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
      </motion.section>

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
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    return () => { body.style.overflow = prev; };
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
      <div className="h-px w-64 bg-gradient-to-r from-transparent via-white/0 to-transparent" />
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
