import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const routes = [
  { label: "Home", to: "/" },
  { label: "CV", to: "/presupuesto" },
  { label: "Portafolio", to: "/portafolio" },
];

export const NavbarSimple: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase =
    "relative px-2 py-1 text-sm md:text-[15px] tracking-wide transition group";
  const linkActive = "text-stone-900";
  const linkInactive = "text-stone-600 hover:text-stone-900";

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-colors",
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-stone-200"
            : "bg-transparent",
        ].join(" ")}
        role="banner"
      >
        <nav className="mx-auto max-w-[1400px] px-4 md:px-6">
          <div className="grid grid-cols-3 items-center h-14 md:h-16">
            {/* LEFT: Hamburguer (mobile) + Links (desktop) */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 rounded-md hover:bg-stone-100"
                aria-label="Abrir menú"
                onClick={() => setMobileOpen(true)}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className="hidden lg:flex items-center gap-4">
                {routes.map((r) => (
                  <NavLink
                    key={r.to}
                    to={r.to}
                    end
                    className={({ isActive }) =>
                      [
                        linkBase,
                        isActive ? linkActive : linkInactive,
                      ].join(" ")
                    }
                  >
                    <span className="relative">
                      {r.label}
                      <span
                        className="
                          absolute left-0 -bottom-0.5 w-full h-[2px] bg-stone-900
                          origin-left scale-x-0 group-hover:scale-x-100
                          transition-transform duration-300 ease-out
                        "
                      />
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* CENTER: vacío */}
            <div className="flex items-center justify-center" />

            {/* RIGHT: vacío */}
            <div className="flex items-center justify-end" />
          </div>
        </nav>
      </header>

      {/* Drawer móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 z-50 h-screen w-[86vw] max-w-[360px] bg-white shadow-2xl p-4"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ type: "tween", duration: 0.25 }}
              role="dialog"
              aria-label="Menú"
            >
              <div className="flex items-center justify-between h-12">
                <span className="text-lg tracking-wide">Menú</span>
                <button
                  className="p-2 rounded-md hover:bg-stone-100"
                  aria-label="Cerrar menú"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path
                      d="M6 6l12 12M18 6l-12 12"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-3 flex flex-col">
                {routes.map((r) => (
                  <NavLink
                    key={r.to}
                    to={r.to}
                    end
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      [
                        "py-3 text-base border-b border-stone-200",
                        isActive
                          ? "text-stone-900"
                          : "text-stone-700 hover:text-stone-900",
                      ].join(" ")
                    }
                  >
                    {r.label}
                  </NavLink>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-14 md:h-16" />
    </>
  );
};
