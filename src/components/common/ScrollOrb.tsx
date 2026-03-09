import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PulseOrb } from "./PulseOrb";

type Props = {
  sectionRef?: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
};

const ORB_SIZE = 480;

export const ScrollOrb = ({ triggerRef, sectionRef }: Props) => {
  const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Fase 1 & 2: animación ligada al scroll de la sección welcome
  const { scrollYProgress: welcomeProgress } = useScroll({
    target: triggerRef,
    offset: ["0.6 start", "end start"],
  });

  // Fase 3: crecimiento ligado al scroll de la sección projects
  const { scrollYProgress: projectsProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Posición:
  //  - welcome 0→0.1 : baja hasta dims.h * 0.5
  //  - projects 0→1  : sigue bajando dims.h más hasta el inicio de la siguiente sección
  const rawX = useTransform(welcomeProgress, [0, 0.1], [0, 0]);
  const rawY = useTransform(
    [welcomeProgress, projectsProgress] as const,
    ([wp, pp]: readonly number[]) => {
      const phase1 = Math.min(wp / 0.1, 1) * (dims.h * 0.5);
      // Empieza a moverse en pp=0.25, termina en pp=0.60 y se queda en destino
      const ppNorm = Math.min(Math.max((pp - 0.25) / 0.35, 0), 1);
      const phase3 = ppNorm * dims.h * 1.1;
      return phase1 + phase3;
    }
  );

  // Blur durante el movimiento
  const rawBlur = useTransform(welcomeProgress, [0, 0.05, 0.1], [0, 45, 18]);
  const filter  = useTransform(rawBlur, (v) => `blur(${v}px)`);

  // Escala:
  //  - welcome 0→0.1 : 1 → 0.65  (se achica al llegar)
  //  - welcome 0.1→0.2: se mantiene en 0.65 (mientras cambia de color)
  //  - projects 0→1  : 0.65 → 1.04 (crece un 60% más)
  const rawScale = useTransform(
    [welcomeProgress, projectsProgress] as const,
    ([wp, pp]: readonly number[]) => {
      if (wp < 0.1) return 1 - (wp / 0.1) * 0.35;        // 1 → 0.65
      // Crece durante el movimiento, luego +20% extra al llegar (pp 0.60→0.80)
      const base  = 0.65 * (1 + Math.min(pp, 0.6) * 0.6);
      const burst = Math.min(Math.max((pp - 0.6) / 0.2, 0), 1);
      return base * (1 + burst * 2.0);
    }
  );

  // Cross-fade de color: naranja → amarillo (welcome 0.1 → 0.2)
  const orangeOpacity = useTransform(welcomeProgress, [0.1, 0.2], [1, 0]);
  const yellowOpacity = useTransform(welcomeProgress, [0.1, 0.2], [0, 1]);

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
        zIndex: 1,
      }}
    >
      <motion.div
        style={{ x, y, scale, filter, width: ORB_SIZE, height: ORB_SIZE, position: "relative" }}
      >
        {/* Orb naranja (color original) — se desvanece al cambiar */}
        <motion.div style={{ opacity: orangeOpacity, position: "absolute", inset: 0 }}>
          <PulseOrb size={ORB_SIZE} color="#FF9925" />
        </motion.div>
        {/* Orb amarillo — aparece suavemente */}
        <motion.div style={{ opacity: yellowOpacity, position: "absolute", inset: 0 }}>
          <PulseOrb size={ORB_SIZE} color="#FFCE25" />
        </motion.div>
      </motion.div>
    </div>
  );
};
