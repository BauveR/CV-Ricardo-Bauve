import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PulseOrb } from "./PulseOrb";

type Props = {
  sectionRef?: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
};

export const ScrollOrb = ({ triggerRef }: Props) => {
  const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["0.6 start", "end start"],
  });

  // Al 10% del scroll: se mueve a esquina inferior izquierda y se achica
  const rawX     = useTransform(scrollYProgress, [0, 0.1], [0, 0]);
  const rawY     = useTransform(scrollYProgress, [0, 0.1], [0, dims.h * 0.5]);
  const rawScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.65]);

  // Blur que sube en mitad del trayecto y baja al llegar (trayectoria difuminada)
  const rawBlur  = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 45, 18]);
  const filter   = useTransform(rawBlur, (v) => `blur(${v}px)`);

  const x     = useSpring(rawX,     { stiffness: 35, damping: 18 });
  const y     = useSpring(rawY,     { stiffness: 35, damping: 18 });
  const scale = useSpring(rawScale, { stiffness: 35, damping: 18 });

  return (
    <div
      style={{
        position: "absolute",
        top: -240,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <motion.div style={{ x, y, scale, filter }}>
        <PulseOrb size={480} />
      </motion.div>
    </div>
  );
};
