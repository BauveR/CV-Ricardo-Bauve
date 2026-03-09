import { motion } from "framer-motion";

type Props = {
  size?: number;
  color?: string;
};

export const PulseOrb = ({ size = 120, color = "#FF9925" }: Props) => {
  return (
    <motion.div
      style={{ width: size, height: size, borderRadius: "50%" }}
      animate={{
        background: [
          `radial-gradient(circle, ${color} 0%, ${color}00 55%)`,
          `radial-gradient(circle, ${color} 25%, ${color}00 75%)`,
          `radial-gradient(circle, ${color} 0%, ${color}00 55%)`,
        ],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
