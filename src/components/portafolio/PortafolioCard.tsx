import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export type PortafolioCardProps = {
  id: string;
  index: number;
  name: string;
  primaryImage: string;
  secondaryImage?: string;
  description?: string;
  className?: string;
};

export const PortafolioCard = ({
  id,
  index,
  name,
  primaryImage,
  secondaryImage,
  description,
  className = "",
}: PortafolioCardProps) => {
  const navigate = useNavigate();
  const hoverImage = secondaryImage || primaryImage;

  const goDetail = () => {
    navigate(`/portafolio/${id}`, {
      state: {
        index,
        name,
        primaryImage,
        description,
      },
    });
  };

  return (
    <div
      className={[
        "group relative flex flex-col cursor-pointer w-full h-full overflow-hidden rounded-3xl",
        "bg-white/30 backdrop-blur-2xl",
        "shadow-xl shadow-gray-200/20",
        "border border-gray-200",
        "ring-1 ring-gray-100",
        "hover:bg-white/40 hover:border-gray-300",
        "transition-all duration-500",
        "text-gray-400",
        "p-3",
        className,
      ].join(" ")}
      role="link"
      tabIndex={0}
      onClick={goDetail}
      onKeyDown={(e) => (e.key === "Enter" ? goDetail() : null)}
    >
      {/* Imagen con proporción vertical - ocupa la mayor parte del espacio */}
      <div className="relative w-full flex-1 overflow-hidden rounded-2xl bg-gray-100/50">
        {/* Imagen principal */}
        <motion.img
          src={primaryImage}
          alt={name}
          className="absolute inset-0 h-full w-full object-contain"
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
            className="absolute inset-0 h-full w-full object-contain"
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
          className="pointer-events-none absolute inset-x-4 bottom-4 z-20 hidden h-10 items-center justify-center bg-orange-500 text-white text-md tracking-wide uppercase group-hover:flex group-hover:pointer-events-auto rounded-2xl shadow-xl
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

      {/* Título + descripción breve - en la parte inferior */}
      <div className="mt-3 px-1 flex-shrink-0">
        <h3 className="text-base tracking-wide font-medium">
          <span className="line-clamp-1">{name}</span>
        </h3>
        {description && (
          <p className="mt-1 text-sm text-gray-400 leading-snug line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
