import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useValidProjects } from "../../hooks/useValidProjects";

type PortafolioItemState = {
  index: number;
  name: string;
  description?: string;
  primaryImage: string;
  link?: string;
};

type Props = {
  onClose?: () => void;
};

export const PortafolioDetailPage = ({ onClose }: Props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const validProjects = useValidProjects();

  const itemFromState = state as PortafolioItemState | undefined;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/", { replace: true });
      setTimeout(() => { window.location.hash = "#portafolio"; }, 100);
    }
  };

  const currentIndex = itemFromState?.index ?? 0;
  const project = validProjects[currentIndex];

  const data: PortafolioItemState = {
    index: currentIndex,
    name: itemFromState?.name ?? project?.text ?? "Proyecto",
    description: itemFromState?.description ?? project?.longDescription,
    primaryImage: itemFromState?.primaryImage ?? project?.resolvedImage ?? "",
    link: itemFromState?.link ?? project?.link,
  };

  const total = validProjects.length;
  const displayIndex = String(currentIndex + 1).padStart(2, "0");
  const displayTotal = String(total).padStart(2, "0");

  return (
    <main className="relative mx-auto max-w-[1550px] px-6 sm:px-10 md:px-14 lg:px-16 pt-10 pb-14">

      {/* Header: contador + botón cerrar */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <span
          className="text-xs tracking-[0.2em] text-white/40 font-mono select-none"
          style={{ fontFamily: "monospace" }}
        >
          {displayIndex} <span className="text-white/20">/ {displayTotal}</span>
        </span>
        <button
          type="button"
          onClick={handleClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 transition-all duration-200 text-white/50 hover:text-white text-xs tracking-widest"
          aria-label="Cerrar"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ESC
        </button>
      </div>

      {/* Layout imagen + texto */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 max-w-[1200px] mx-auto">
        {/* Imagen */}
        <div
          className="relative w-full lg:w-[560px] lg:flex-shrink-0 rounded-2xl overflow-hidden flex items-center justify-center"
          style={{ height: "380px" }}
        >
          {/* Glow detrás de la imagen */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
          <motion.img
            key={data.primaryImage + currentIndex}
            src={data.primaryImage}
            alt={data.name}
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>

        {/* Texto */}
        <motion.div
          className="flex flex-col justify-center lg:flex-1 w-full lg:pr-[8%] gap-5"
          key={currentIndex}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Línea decorativa */}
          <div className="w-10 h-px bg-gradient-to-r from-violet-400 to-cyan-400 opacity-70" />

          <h1
            className="text-sm sm:text-base lg:text-xl font-bold text-white leading-loose"
            style={{ fontFamily: "'Boldonse', sans-serif" }}
          >
            {data.name}
          </h1>

          {data.description && (
            <p className="text-xs lg:text-sm leading-relaxed text-white/60">
              {data.description}
            </p>
          )}

          {data.link && (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 self-start inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium tracking-wide transition-all duration-300 group"
            >
              Ver proyecto
              <svg
                width="13" height="13"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default PortafolioDetailPage;
