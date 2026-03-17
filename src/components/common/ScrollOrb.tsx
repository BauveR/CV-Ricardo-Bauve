import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PulseOrb } from "./PulseOrb";

type Props = {
  sectionRef?: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
  cvRef?: React.RefObject<HTMLElement | null>;
};

const ORB_SIZE = 480;

export const ScrollOrb = ({ triggerRef, sectionRef, cvRef }: Props) => {
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

  // Fase 4: CV section (skills & sobre mí)
  const { scrollYProgress: cvProgress } = useScroll({
    target: cvRef,
    offset: ["start start", "end start"],
  });

  // Posición:
  //  - welcome 0→0.1 : baja hasta dims.h * 0.5
  //  - projects 0→1  : sigue bajando dims.h más hasta el inicio de la siguiente sección
  const rawX = useTransform(welcomeProgress, [0, 0.1], [0, 0]);
  const rawY = useTransform(
    [welcomeProgress, projectsProgress, cvProgress] as const,
    ([wp, pp, cp]: readonly number[]) => {
      const phase1 = Math.min(wp / 0.1, 1) * (dims.h * 0.5);
      const ppNorm = Math.min(Math.max((pp - 0.25) / 0.35, 0), 1);
      const phase3 = ppNorm * dims.h * 1.5;
      // Fase 4: sigue bajando hasta mitad de la sección CV (cp 0→0.5)
      const cpNorm = Math.min(Math.max(cp / 0.5, 0), 1);
      const phase4 = cpNorm * dims.h * 2.1;
      return phase1 + phase3 + phase4;
    }
  );

  // Blur durante el movimiento
  const rawBlur = useTransform(welcomeProgress, [0, 0.05, 0.1], [0, 45, 18]);
  const filter  = useTransform(rawBlur, (v) => `blur(${v}px)`);

  // Escala:
  //  - welcome 0→0.1 : 1 → 0.65  (se achica al llegar a posición 1)
  //  - projects 0.25→0.60: 0.65 → 2.0 (crece mientras baja a posición 2)
  //  - projects 0.60→1  : se mantiene en 2.0
  const rawScale = useTransform(
    [welcomeProgress, projectsProgress, cvProgress] as const,
    ([wp, pp, cp]: readonly number[]) => {
      if (wp < 0.1) return 1 - (wp / 0.1) * 0.35; // 1 → 0.65
      const ppNorm = Math.min(Math.max((pp - 0.15) / 0.25, 0), 1);
      const scaleAfterPhase3 = 0.65 + ppNorm * 1.85; // 0.65 → 2.5
      // Fase 4: crece un poco más hasta cp=0.5
      const cpNorm = Math.min(Math.max(cp / 0.5, 0), 1);
      return scaleAfterPhase3 + cpNorm * (scaleAfterPhase3 * 0.20); // +20% extra
    }
  );

  // Cross-fade: naranja → amarillo (welcome 0.1 → 0.2)
  const orangeOpacity = useTransform(welcomeProgress, [0.1, 0.2], [1, 0]);
  const yellowOpacity = useTransform(welcomeProgress, [0.1, 0.2], [0, 1]);
  // Cross-fade: amarillo → azul (cv 0 → 0.2)
  const blueOpacity = useTransform(cvProgress, [0, 0.2], [0, 1]);
  const yellowFadeOut = useTransform(cvProgress, [0, 0.2], [1, 0]);

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
        {/* Orb naranja → se desvanece al llegar a projects */}
        <motion.div style={{ opacity: orangeOpacity, position: "absolute", inset: 0 }}>
          <PulseOrb size={ORB_SIZE} color="#FF9925" />
        </motion.div>
        {/* Orb amarillo → se desvanece al llegar a CV */}
        <motion.div style={{ opacity: useTransform([yellowOpacity, yellowFadeOut] as const, ([y, f]: readonly number[]) => y * f), position: "absolute", inset: 0 }}>
          <PulseOrb size={ORB_SIZE} color="#FFCE25" />
        </motion.div>
        {/* Orb azul → aparece en la sección CV */}
        <motion.div style={{ opacity: blueOpacity, position: "absolute", inset: 0 }}>
          <PulseOrb size={ORB_SIZE} color="#0000FF" />
        </motion.div>
      </motion.div>
    </div>
  );
};
