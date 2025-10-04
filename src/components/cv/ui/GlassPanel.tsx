import { motion, type Variants } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  viewportAmount?: number; // ajuste fino del disparo
};

export default function GlassPanel({
  children,
  className = "",
  variants,
  viewportAmount = 0.35,
}: Props) {
  return (
    <motion.div
      className={[
        // 👇 liquid glass effect
        "rounded-[3rem] p-6 mt-3",
        "bg-slate-900/30",
        "backdrop-blur-2xl",
        "shadow-xl shadow-black/20",
        "border border-white/10",
        "ring-1 ring-white/5",
        "hover:bg-slate-900/40",
        "hover:border-white/15",
        "transition-all duration-500",
        className,
      ].join(" ")}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  );
}
