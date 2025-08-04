import React, { useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LiquidGlassCardJellyProps = {
  imageSrc: string;
  hoverText: string;
  className?: string;
  /** Llamado cuando se abre/cierra el modal (opcional) */
  onExpandChange?: (expanded: boolean) => void;
};

export const LiquidGlassCardJelly: React.FC<LiquidGlassCardJellyProps> = ({
  imageSrc,
  hoverText,
  className,
  onExpandChange,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const open = () => {
    setIsExpanded(true);
    onExpandChange?.(true);
  };

  const close = () => {
    setIsExpanded(false);
    onExpandChange?.(false);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <>
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Abrir imagen"
        onKeyDown={onKey}
        onClick={open}
        className={[
          "relative w-80 h-56 cursor-pointer overflow-hidden",
          "rounded-3xl bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
          "backdrop-blur-xl border border-white/20",
          className ?? "",
        ].join(" ")}
        // “Jelly” al hover (keyframes + ligera rotación)
        whileHover={{
          scale: [1, 1.05, 0.98, 1.02, 0.995, 1],
          rotate: [0, 0.4, -0.25, 0.15, -0.05, 0],
        }}
        transition={{
          duration: 0.65,
          ease: [0.2, 0.8, 0.2, 1],
          times: [0, 0.25, 0.45, 0.65, 0.85, 1],
        }}
        // “Squish” al presionar
        whileTap={{ scaleX: 0.98, scaleY: 0.96 }}
      >
        {/* Blob líquido animado de fondo */}
        <motion.div
          aria-hidden
          className="absolute -inset-24 blur-3xl"
          initial={{ opacity: 0.35 }}
          animate={{
            borderRadius: [
              "40% 60% 60% 40% / 40% 40% 60% 60%",
              "60% 40% 40% 60% / 60% 60% 40% 40%",
              "45% 55% 50% 50% / 55% 45% 55% 45%",
              "40% 60% 60% 40% / 40% 40% 60% 60%",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.18), rgba(255,255,255,0) 70%), linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))",
          }}
        />

        {/* Imagen */}
        <img
          src={imageSrc}
          alt=""
          className="relative z-10 w-full h-full object-cover object-center"
          draggable={false}
        />

        {/* Overlay de texto al hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 z-20 bg-black/45 text-white flex items-center justify-center p-4 text-center"
        >
          <p className="text-lg font-semibold drop-shadow-lg">{hoverText}</p>
        </motion.div>

        {/* Brillo diagonal sutil */}
        <div className="pointer-events-none absolute -left-1/3 -top-1/3 w-2/3 h-2/3 rotate-45 bg-white/15 blur-xl" />
      </motion.div>

      {/* Modal de zoom con muelle elástico */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-modal="true"
            role="dialog"
          >
            <motion.img
              src={imageSrc}
              alt=""
              initial={{ scale: 0.86, y: 10, opacity: 0 }}
              animate={{
                scale: 1,
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 260, damping: 18 },
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
