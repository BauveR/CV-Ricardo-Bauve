import { useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PortafolioDetailPage } from "./PortafolioDetailPage";
import { GlassCard } from "../ui/GlassCard";
import { useValidProjects } from "../../hooks/useValidProjects";

type PortafolioItemState = {
  index: number;
  name: string;
  description?: string;
  primaryImage: string;
  link?: string;
};

const ArrowIcon = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
    {dir === "left"
      ? <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />}
  </svg>
);

export function PortafolioModal() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const validProjects = useValidProjects();
  const itemFromState = state as PortafolioItemState | undefined;
  const currentIndex = itemFromState?.index ?? 0;

  const onClose = useCallback(() => {
    navigate("/", { replace: true });
    setTimeout(() => { window.location.hash = "#portafolio"; }, 100);
  }, [navigate]);

  const goPrev = useCallback(() => {
    const idx = (currentIndex - 1 + validProjects.length) % validProjects.length;
    const p = validProjects[idx];
    navigate(`/portafolio/${idx}`, { state: { index: idx, name: p?.text, primaryImage: p?.resolvedImage, description: p?.longDescription, link: p?.link } });
  }, [currentIndex, validProjects, navigate]);

  const goNext = useCallback(() => {
    const idx = (currentIndex + 1) % validProjects.length;
    const p = validProjects[idx];
    navigate(`/portafolio/${idx}`, { state: { index: idx, name: p?.text, primaryImage: p?.resolvedImage, description: p?.longDescription, link: p?.link } });
  }, [currentIndex, validProjects, navigate]);

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
        className="relative max-w-[1100px] w-full"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Flechas fijas respecto al modal, fuera del glass card */}
        <button
          type="button"
          onClick={goPrev}
          className="absolute top-1/2 -translate-y-1/2 -left-14 p-2.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm transition-all duration-200 z-50 text-white"
          aria-label="Anterior"
        >
          <ArrowIcon dir="left" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute top-1/2 -translate-y-1/2 -right-14 p-2.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm transition-all duration-200 z-50 text-white"
          aria-label="Siguiente"
        >
          <ArrowIcon dir="right" />
        </button>

        <GlassCard glowEffect={true}>
          <PortafolioDetailPage onClose={onClose} />
        </GlassCard>
      </motion.div>
    </motion.aside>
  );
}
