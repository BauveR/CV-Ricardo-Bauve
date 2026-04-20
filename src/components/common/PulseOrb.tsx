import { motion } from "framer-motion";

type Props = {
  size?: number;
  color?: string;
};

export const PulseOrb = ({ size = 120, color = "#FF9925" }: Props) => {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, ${color}00 65%)`,
      }}
      animate={{
        scale: [0.88, 1.08, 0.88],
        opacity: [0.85, 1, 0.85],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
