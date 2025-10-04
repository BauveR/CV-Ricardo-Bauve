import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "./projects";
import { useAssetMap } from "../../hooks/useAssetMap";
import { resolveAssetUrl } from "../../utils/assetResolver";

type PortafolioItemState = {
  id: string;
  name: string;
  description?: string;
  primaryImage: string;
};

type Props = {
  onClose?: () => void;
};

export const PortafolioDetailPage = ({ onClose }: Props) => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const itemFromState = state as PortafolioItemState | undefined;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/", { replace: true });
      setTimeout(() => {
        window.location.hash = "#portafolio";
      }, 100);
    }
  };

  const initialIndex = Math.max(0, (Number(id) || 1) - 1);
  const [index, setIndex] = useState(initialIndex);

  const urlMap = useAssetMap();

  const project = projects[index] || projects[0];
  const primaryImage =
    resolveAssetUrl(project?.src, urlMap) ??
    itemFromState?.primaryImage ??
    "";

  const data: PortafolioItemState = {
    id: String(index + 1),
    name: project?.text ?? itemFromState?.name ?? "Proyecto",
    description: project?.longDescription ?? itemFromState?.description,
    primaryImage,
  };

  const goPrev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const goNext = () => setIndex((i) => (i + 1) % projects.length);

  return (
    <main className="relative mx-auto max-w-[1550px] px-8 md:px-12 lg:px-16 pt-8 pb-12">
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-6 right-6 p-1.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 z-50 text-stone-300 hover:text-white"
        aria-label="Cerrar"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
          <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={goPrev}
        className="absolute top-1/2 -translate-y-1/2 left-6 p-1.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 z-20 text-stone-300 hover:text-white"
        aria-label="Anterior"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={goNext}
        className="absolute top-1/2 -translate-y-1/2 right-6 p-1.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 z-20 text-stone-300 hover:text-white"
        aria-label="Siguiente"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[2.1fr_0.71fr] gap-12 lg:gap-16 items-start mt-16"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full overflow-hidden rounded-2xl bg-slate-800/30 aspect-[4/3]">
          <motion.img
            key={data.primaryImage + index}
            src={data.primaryImage}
            alt={data.name}
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <motion.div
          className="flex flex-col justify-start pt-4 lg:pt-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-xl lg:text-2xl font-medium text-stone-200 leading-tight">{data.name}</h1>
          {data.description && (
            <p className="mt-6 text-sm lg:text-base leading-relaxed text-stone-300">
              {data.description}
            </p>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
};

export default PortafolioDetailPage;
