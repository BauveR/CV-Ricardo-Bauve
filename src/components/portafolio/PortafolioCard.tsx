import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GlassCard, GlassCardContent, GlassCardFooter } from "../ui/GlassCard";
import { GlassButton } from "../ui/GlassButton";

export type PortafolioCardProps = {
  id: string;
  index: number;
  name: string;
  primaryImage: string;
  secondaryImage?: string;
  description?: string;
  link?: string;
  className?: string;
};

export const PortafolioCard = ({
  id,
  index,
  name,
  primaryImage,
  secondaryImage,
  description,
  link,
  className = "",
}: PortafolioCardProps) => {
  const navigate = useNavigate();
  const hoverImage = secondaryImage || primaryImage;

  const goDetail = () => {
    navigate(`/portafolio/${id}`, {
      state: { index, name, primaryImage, description, link },
    });
  };

  return (
    <div
      className={["group relative flex flex-col cursor-pointer w-full h-full", className].join(" ")}
      role="link"
      tabIndex={0}
      onClick={goDetail}
      onKeyDown={(e) => (e.key === "Enter" ? goDetail() : null)}
    >
      <GlassCard glowEffect={false} className="rounded-3xl">
        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-t-3xl aspect-[3/4] flex-shrink-0 p-3">
          <motion.img
            src={primaryImage}
            alt={name}
            className="absolute inset-0 h-full w-full object-contain"
            initial={{ opacity: 1, scale: 1 }}
            whileHover={{ opacity: secondaryImage ? 0 : 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            draggable={false}
          />
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
        </div>

        {/* Content */}
        <GlassCardContent className="border-t border-white/20 px-4 pt-6 pb-3">
          <h3 className="text-2xl tracking-wide font-medium text-white leading-tight line-clamp-1">
            {name}
          </h3>
          {description && (
            <p className="mt-2 text-lg text-white/60 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </GlassCardContent>

        {/* Footer */}
        <GlassCardFooter className="border-t border-white/20 px-4 pb-4 justify-center">
          <GlassButton
            variant="primary"
            size="full"
            onClick={(e) => { e.stopPropagation(); goDetail(); }}
          >
            Ver proyecto
          </GlassButton>
        </GlassCardFooter>
      </GlassCard>
    </div>
  );
};
