// src/components/portafolio/ProductCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export type ProductCardProps = {
  id: string;
  name: string;
  primaryImage: string;
  secondaryImage?: string;
  description?: string;
  className?: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  primaryImage,
  secondaryImage,
  description,
  className = "",
}) => {
  const navigate = useNavigate();
  const hoverImage = secondaryImage || primaryImage;

  const goDetail = () => {
    navigate(`/product/${id}`, {
      state: {
        id,
        name,
        primaryImage,
        description,
      },
    });
  };

  return (
    <div
      className={[
        "group relative flex flex-col cursor-pointer w-full overflow-hidden",
        "text-stone-300",
        className,
      ].join(" ")}
      role="link"
      tabIndex={0}
      onClick={goDetail}
      onKeyDown={(e) => (e.key === "Enter" ? goDetail() : null)}
    >
      {/* Imagen horizontal */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100/70">
        {/* Imagen principal */}
        <motion.img
          src={primaryImage}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 1, scale: 1 }}
          whileHover={{ opacity: secondaryImage ? 0 : 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          draggable={false}
        />

        {/* Imagen hover (si existe) */}
        {secondaryImage && (
          <motion.img
            src={hoverImage}
            alt={`${name} – alternativa`}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.02 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            draggable={false}
          />
        )}

        {/* Botón View (solo en hover) */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            goDetail();
          }}
          className="pointer-events-none absolute inset-x-3 bottom-3 z-20 hidden h-10 items-center justify-center bg-orange-500 text-white text-md tracking-wide uppercase  group-hover:flex group-hover:pointer-events-auto rounded-2xl shadow-xl
  bg-gradient-to-r from-orange-500 to-orange-700
  shadow-orange-300/50
  hover:shadow-orange-500/70
  transition duration-300 ease-in-out
"
          whileTap={{ scale: 0.98 }}
        >
          View
        </motion.button>
      </div>

      {/* Título + descripción breve */}
      <div className="mt-3">
        <h3 className="text-sm tracking-wide">
          <span className="line-clamp-2">{name}</span>
        </h3>
        {description && (
          <p className="mt-1 text-sm text-white leading-snug line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
