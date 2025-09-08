// Variants y helpers compartidos para animaciones
import type { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.10,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
