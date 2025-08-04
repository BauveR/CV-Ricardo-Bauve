import React, { useEffect, useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  images: string[];
  index: number;
  hoverText: string;
  className?: string;
};

export const LiquidGlassCardJelly: React.FC<Props> = ({
  images,
  index,
  hoverText,
  className,
}) => {
  const [current, setCurrent] = useState<number | null>(null);

  const open = () => setCurrent(index);
  const close = () => setCurrent(null);

  const goNext = () =>
    setCurrent((prev) => (prev !== null ? (prev + 1) % images.length : prev));
  const goPrev = () =>
    setCurrent((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : prev
    );

  // teclado: flechas y Escape
  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent | KeyboardEventInit | any) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  // clic en zonas izquierda/derecha del overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const w = window.innerWidth;
    if (x > w / 2) goNext();
    else goPrev();
  };

  const onKeyCard = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <>
      {/* Tarjeta */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Abrir imagen"
        onKeyDown={onKeyCard}
        onClick={open}
        className={[
          "relative cursor-pointer overflow-hidden",
          "rounded-3xl bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
          "backdrop-blur-xl border border-white/20",
          className ?? "w-[340px] h-[260px]",
        ].join(" ")}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileTap={{ scaleX: 0.98, scaleY: 0.96 }}
      >
        {/* Blob líquido de fondo */}
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
          src={images[index]}
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

      {/* Modal con navegación */}
<AnimatePresence>
  {current !== null && (
    <motion.div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      role="dialog"
    >
      {/* ZONA IZQUIERDA (anterior) */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full w-1/2 z-30 pointer-events-auto cursor-[w-resize]"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
      />

      {/* ZONA DERECHA (siguiente) */}
      <div
        aria-hidden
        className="absolute right-0 top-0 h-full w-1/2 z-30 pointer-events-auto cursor-[e-resize]"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
      />

      {/* IMAGEN GRANDE */}
      <motion.img
        src={images[current]}
        alt=""
        initial={{ scale: 0.9, y: 8, opacity: 0 }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 260, damping: 18 },
        }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="z-40 pointer-events-auto w-[96vw] h-[92vh] max-w-none object-contain rounded-2xl shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      />

      {/* BOTÓN CERRAR (por encima de todo) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        className="absolute top-4 right-6 z-50 pointer-events-auto text-white text-4xl font-bold"
        aria-label="Cerrar"
      >
        ×
      </button>

      {/* FLECHAS VISUALES (opcionales) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Anterior"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 pointer-events-auto
                   text-white/90 text-3xl md:text-5xl select-none"
      >
        ‹
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Siguiente"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 pointer-events-auto
                   text-white/90 text-3xl md:text-5xl select-none"
      >
        ›
      </button>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
};
