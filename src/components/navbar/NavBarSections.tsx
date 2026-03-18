import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const navLogo = "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto/v1773016274/Ricardo_bauve_2026-02_br99sv.svg";

type SectionId = "welcome" | "projects" | "cv";

type Props = {
  active: SectionId;
  onGo: (id: SectionId) => void;
};

const routes: { id: SectionId; label: string }[] = [
  { id: "welcome", label: "Inicio" },
  { id: "projects", label: "Proyectos" },
  { id: "cv", label: "CV" },
];

export default function NavbarSections({ active, onGo }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTitles, setShowTitles] = useState(false);

  // Estabilizar el estado de los títulos con debounce e hysteresis
  useEffect(() => {
    const shouldShow = active !== "welcome";

    // Si vamos a mostrar, hacerlo más rápido (100ms)
    // Si vamos a ocultar, hacerlo más lento (400ms) para evitar parpadeos
    const delay = shouldShow ? 100 : 400;

    const timer = setTimeout(() => {
      setShowTitles(shouldShow);
    }, delay);

    return () => clearTimeout(timer);
  }, [active]);

  // Cambia estilo al hacer scroll
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
    "text-gray-400 font-bold blur-none";
  const linkInactive =
    "text-gray-300 blur-[0.8px] hover:text-gray-400 hover:blur-none font-normal";

  const go = (id: SectionId) => {
    setMobileOpen(false);
    onGo(id);
  };

  return (
    <>
      <header
  className="fixed top-0 left-0 right-0 z-50"
  role="banner"
>
  {/* Fondo difuminado con gradiente vertical */}
  <div
    className="absolute inset-0 backdrop-blur-md pointer-events-none"
    style={{
      WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
      maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
    }}
  />


        <nav className="w-full px-10">
          <div className="grid grid-cols-3 items-center h-14 md:h-16">
            {/* LEFT: Burger (móvil) */}
            <div className="flex items-center gap-3">
              {/* Burger */}
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                aria-label="Abrir menú"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* CENTER: logo centrado absolutamente en el header */}
            <div />

            <motion.div
              className="absolute left-1/2 -translate-x-1/2 flex items-center"
              style={{ top: 0, bottom: 0, pointerEvents: showTitles ? "auto" : "none" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showTitles ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={navLogo}
                alt="Ricardo Bautista Velázquez"
                className="h-[36px] md:h-[43px] w-auto object-contain"
                style={{ opacity: 0.6 }}
              />
            </motion.div>

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
                          absolute left-0 -bottom-0.5 w-full h-[2px] bg-gray-400
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
              className="fixed left-0 top-0 z-50 h-screen w-[86vw] max-w-[270px] shadow-xl p-4"
              style={{ background: "linear-gradient(to right, #5249FF, rgba(82,73,255,0.5))", color: "white" }}
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
                  className="p-2 rounded-md hover:bg-white/20"
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
                      "py-3 text-base border-b border-white/20 text-left transition-all duration-300",
                      active === r.id
                        ? "text-white font-bold"
                        : "text-white/70 hover:text-white font-normal",
                    ].join(" ")}
                    aria-current={active === r.id ? "page" : undefined}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <img
                src="https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_240/v1773765020/cute_bauve_tblam7.png"
                alt=""
                className="absolute left-0 w-full object-contain pointer-events-none"
                style={{ bottom: "4rem" }}
                loading="lazy"
                decoding="async"
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
