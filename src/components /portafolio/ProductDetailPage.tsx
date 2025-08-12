// src/components/portafolio/ProductDetailPage.tsx
import React, { useMemo, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "./projects";

type ProductState = {
  id: string;
  name: string;
  description?: string;
  primaryImage: string;
};

type GlobModule = { default: string };

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const productFromState = state as ProductState | undefined;

  const initialIndex = Math.max(0, (Number(id) || 1) - 1);
  const [index, setIndex] = useState(initialIndex);

  // Mapa filename -> URL (Vite)
  const urlMap = useMemo(() => {
    const mods = import.meta.glob("/src/assets/bauve-*.png", { eager: true }) as Record<
      string,
      GlobModule
    >;
    const map: Record<string, string> = {};
    Object.entries(mods).forEach(([abs, mod]) => {
      const rel = abs.replace(/^.*\/src\/assets\//, "src/assets/");
      map[rel] = mod.default;
    });
    return map;
  }, []);

  const project = projects[index] || projects[0];
  const data: ProductState = {
    id: String(index + 1),
    name: project?.text ?? productFromState?.name ?? "Proyecto",
    description: project?.longDescription ?? productFromState?.description,
    primaryImage:
      (project && (urlMap[project.src] ?? project.src)) ||
      productFromState?.primaryImage ||
      "",
  };

  const goPrev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const goNext = () => setIndex((i) => (i + 1) % projects.length);

  return (
    <main className="relative mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 pt-20 md:pt-24 pb-10">
      {/* Migas */}
      <nav className="text-xs text-stone-500 mb-4">
        <a href="/" className="hover:underline">Inicio</a> / <span>{data.name}</span>
      </nav>

      {/* Botón cerrar (misma posición/estilo que acordamos) */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 md:top-8 right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md z-20"
        aria-label="Cerrar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M6 6l12 12M18 6l-12 12" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Flechas fuera de la imagen */}
      <button
        onClick={goPrev}
        className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-[-16px] lg:left-[-50px] p-2 rounded-full bg-white/80 hover:bg-white shadow-md z-20"
        aria-label="Anterior"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M15 18l-6-6 6-6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <button
        onClick={goNext}
        className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-[-16px] lg:right-[-50px] p-2 rounded-full bg-white/80 hover:bg-white shadow-md z-20"
        aria-label="Siguiente"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M9 6l6 6-6 6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Layout: imagen + texto. La imagen usa la MISMA proporción que el grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
        {/* Cambia 'aspect-[4/3]' por la que estés usando en ProductCard si es distinta */}
        <div className="relative w-full overflow-hidden rounded-xl bg-stone-100 aspect-[4/3]">
          <motion.img
            key={data.primaryImage + index}
            src={data.primaryImage}
            alt={data.name}
            className="h-full w-full object-cover"
            initial={{ opacity: 0.5, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>

        {/* Texto a la derecha */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-medium">{data.name}</h1>
          {data.description && (
            <p className="mt-4 text-lg leading-relaxed text-stone-700">
              {data.description}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
