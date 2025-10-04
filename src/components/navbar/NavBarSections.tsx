import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TitleMovCv } from "../titleRicardo/TitleMovCv";
import { TitleBauveCv } from "../titleBauve/TitleBauveCv";

type SectionId = "welcome" | "presupuesto" | "portafolio";

type Props = {
  active: SectionId;
  onGo: (id: SectionId) => void;
};

const routes: { id: SectionId; label: string }[] = [
  { id: "welcome", label: "Inicio" },
  { id: "presupuesto", label: "CV" },
  { id: "portafolio", label: "Portafolio" },
];

export default function NavbarSections({ active, onGo }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Cambia estilo al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll cuando está abierto el drawer
  useEffect(() => {
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = mobileOpen ? "hidden" : prev;
    return () => {
      body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const linkBase =
    "relative px-2 py-1 text-sm md:text-[15px] tracking-wide transition-all duration-300";
  const linkActive =
    "text-white font-bold blur-none";
  const linkInactive =
    "text-stone-300 blur-[0.8px] hover:text-white hover:blur-none font-normal";

  const go = (id: SectionId) => {
    setMobileOpen(false);
    onGo(id);
  };

  return (
    <>
      <header
  className={[
    "sticky top-0 z-50 transition-colors",
    scrolled
      ? "bg-gradient-to-b from-slate-900/90 to-slate-900/30 backdrop-blur-md "
      : "bg-gradient-to-b from-slate-900/60 to-slate-900/0 backdrop-blur-md ",
  ].join(" ")}
  role="banner"
>


        <nav className="w-full px-10">
          <div className="grid grid-cols-3 items-center h-14 md:h-16">
            {/* LEFT: Burger (móvil) */}
            <div className="flex items-center gap-3">
              {/* Burger */}
              <button
                className="lg:hidden p-2 rounded-md hover:bg-white/10"
                aria-label="Abrir menú"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* CENTER: logo / marca o títulos CV */}
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                {active === "presupuesto" && (
                  <motion.div
                    key="cv-titles"
                    className="flex items-center gap-2 flex-wrap justify-center scale-[0.7] origin-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 0.7 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <TitleMovCv />
                    <TitleBauveCv />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT: Links (desktop) */}
            <div className="flex items-center justify-end pr-16">
              {/* Links desktop */}
              <div className="hidden lg:flex items-start gap-4">
                {routes.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => go(r.id)}
                    className={[
                      linkBase,
                      active === r.id ? linkActive : linkInactive,
                    ].join(" ")}
                    aria-current={active === r.id ? "page" : undefined}
                  >
                    <span className="relative">
                      {r.label}
                      <span
                        className="
                          absolute left-0 -bottom-0.5 w-full h-[2px] bg-white
                          origin-left scale-x-0
                          lg:group-hover:scale-x-100
                          transition-transform duration-300 ease-out
                        "
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Drawer móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 z-50 h-screen w-[86vw] max-w-[270px] bg-stone-500/50 text-stone-200 shadow-xl p-4"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ type: "tween", duration: 0.25 }}
              role="dialog"
              aria-label="Menú"
            >
              <div className="flex items-center justify-between h-12">
                <span className="text-lg tracking-wide"></span>
                <button
                  className="p-2 rounded-md hover:bg-white/10"
                  aria-label="Cerrar menú"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path d="M6 6l12 12M18 6l-12 12" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="mt-3 flex flex-col">
                {routes.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => go(r.id)}
                    className={[
                      "py-3 text-base border-b border-white/10 text-left transition-all duration-300",
                      active === r.id
                        ? "text-white font-bold blur-none"
                        : "text-stone-300 hover:text-white blur-[0.8px] hover:blur-none font-normal",
                    ].join(" ")}
                    aria-current={active === r.id ? "page" : undefined}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
