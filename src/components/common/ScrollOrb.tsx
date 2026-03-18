import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PulseOrb } from "./PulseOrb";

type Props = {
  sectionRef?: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
  cvRef?: React.RefObject<HTMLElement | null>;
};

const ORB_SIZE_DESKTOP = 480;
const ORB_SIZE_MOBILE  = 260;

export const ScrollOrb = ({ triggerRef, sectionRef, cvRef }: Props) => {
  const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = dims.w < 768;
  const isTablet = dims.w >= 768 && dims.w < 1024;
  const ORB_SIZE = isMobile ? ORB_SIZE_MOBILE : ORB_SIZE_DESKTOP;
  // En mobile: centra el orb verticalmente en la sección welcome
  // El orb vive en ProjectsSection (que empieza en dims.h desde el top de la página)
  // Para que el centro del orb quede en dims.h * 0.5 (centro del welcome):
  //   top_relativo_a_projects = dims.h * 0.5 - dims.h - ORB_SIZE / 2
  const orbTop = isMobile ? -(dims.h * 0.1 + ORB_SIZE / 2) : -240;

  const { scrollYProgress: welcomeProgress } = useScroll({
    target: triggerRef,
    offset: ["0.6 start", "end start"],
  });

  const { scrollYProgress: projectsProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: cvProgress } = useScroll({
    target: cvRef,
    offset: ["start start", "end start"],
  });

  // Suaviza transiciones eliminando la velocidad brusca en los extremos
  const smoothstep = (x: number) => x * x * (3 - 2 * x);
  const norm = (v: number, min: number, max: number) =>
    smoothstep(Math.min(Math.max((v - min) / (max - min), 0), 1));
  // Interpolación lineal — sin derivada cero en extremos, ida y vuelta simétricas
  const lerp = (v: number, min: number, max: number) =>
    Math.min(Math.max((v - min) / (max - min), 0), 1);

  const rawY = useTransform(
    [welcomeProgress, projectsProgress, cvProgress] as const,
    ([wp, pp, cp]: readonly number[]) => {
      const phase1 = norm(wp, 0, 0.1) * (isMobile ? dims.h * 0.5 : isTablet ? dims.h * 0.3 : dims.h * 0.5);
      const phase3 = norm(pp, 0.25, 0.60) * (isMobile ? dims.h * 1.1 : isTablet ? dims.h * 0.9 : dims.h * 1.5);
      // Fase 4: baja hasta cp=0.5 (desktop) / cp=0.35 (mobile)
      const phase4 = (isMobile ? lerp(cp, 0, 0.35) : norm(cp, 0, 0.5)) * (isMobile ? dims.h * 2.5 : dims.h * 2.1);
      // Fase 5 — solo desktop/tablet
      const phase5 = !isMobile ? norm(cp, 0.6, 1.0) * dims.h * 1.5 : 0;
      // Fase 6 mobile: lineal para ida/vuelta simétrica
      const phase6 = isMobile ? lerp(cp, 0.35, 0.95) * dims.h * 2.7 : 0;
      return phase1 + phase3 + phase4 + phase5 + phase6;
    }
  );

  const rawBlur = useTransform(welcomeProgress, [0, 0.05, 0.1], [0, isMobile ? 20 : 45, isMobile ? 8 : 18]);
  const filter  = useTransform(rawBlur, (v) => `blur(${v}px)`);

  const rawX = useTransform(welcomeProgress, [0, 0.1], [0, 0]);

  const rawScale = useTransform(
    [welcomeProgress, projectsProgress, cvProgress] as const,
    ([wp, pp, cp]: readonly number[]) => {
      if (wp < 0.1) return 1 - (wp / 0.1) * 0.35;
      const ppNorm = Math.min(Math.max((pp - 0.15) / 0.25, 0), 1);
      const scaleAfterPhase3 = 0.65 + ppNorm * 1.85;
      // Fase 4: +20% hasta cp=0.5
      const cpNorm4 = Math.min(Math.max(cp / 0.5, 0), 1);
      const scaleAfterPhase4 = scaleAfterPhase3 + cpNorm4 * (scaleAfterPhase3 * 0.20);
      // Mobile: crece más en transición fase 4→6 (cp 0.35→0.95)
      if (isMobile) {
        const cpNorm6 = Math.min(Math.max((cp - 0.35) / 0.6, 0), 1);
        return scaleAfterPhase4 + cpNorm6 * (scaleAfterPhase4 * 0.80);
      }
      // Fase 5 (hold cp 0.5→0.6, luego +30% cp 0.6→1.0)
      const cpNorm5 = Math.min(Math.max((cp - 0.6) / 0.4, 0), 1);
      return scaleAfterPhase4 + cpNorm5 * (scaleAfterPhase4 * 0.30);
    }
  );

  // Cross-fade: naranja → amarillo (welcome 0.1→0.2)
  const orangeOpacity  = useTransform(welcomeProgress, [0.1, 0.2], [1, 0]);
  const yellowOpacity  = useTransform(welcomeProgress, [0.1, 0.2], [0, 1]);
  const yellowFadeOut  = useTransform(cvProgress, [0, 0.2], [1, 0]);

  // #5249FF aparece cv 0→0.2, se mantiene, desvanece cv 0.6→0.8
  const purpleBlueIn   = useTransform(cvProgress, [0, 0.2], [0, 1]);
  const purpleBlueFade = useTransform(cvProgress, [0.6, 0.8], [1, 0]);

  // #0000FF aparece cv 0.6→0.8
  const deepBlueOpacity = useTransform(cvProgress, [0.6, 0.8], [0, 1]);

  const x     = useSpring(rawX,     { stiffness: 35, damping: 18 });
  const y     = useSpring(rawY,     { stiffness: isMobile ? 180 : 35, damping: isMobile ? 40 : 18, restDelta: isMobile ? 0.5 : 0.01, restSpeed: isMobile ? 0.5 : 0.01 });
  const scale = useSpring(rawScale, { stiffness: 35, damping: 18 });

  return (
    <div
      style={{
        position: "absolute",
        top: orbTop,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 15,
      }}
    >
      <motion.div
        style={{ x, y, scale, filter, width: ORB_SIZE, height: ORB_SIZE, position: "relative" }}
      >
        <motion.div style={{ opacity: orangeOpacity, position: "absolute", inset: 0 }}>
          <PulseOrb size={ORB_SIZE} color="#FF9925" />
        </motion.div>
        <motion.div style={{ opacity: useTransform([yellowOpacity, yellowFadeOut] as const, ([y, f]: readonly number[]) => y * f), position: "absolute", inset: 0 }}>
          <PulseOrb size={ORB_SIZE} color="#FFCE25" />
        </motion.div>
        <motion.div style={{ opacity: useTransform([purpleBlueIn, purpleBlueFade] as const, ([a, b]: readonly number[]) => a * b), position: "absolute", inset: 0 }}>
          <PulseOrb size={ORB_SIZE} color="#5249FF" />
        </motion.div>
        <motion.div style={{ opacity: deepBlueOpacity, position: "absolute", inset: 0 }}>
          <PulseOrb size={ORB_SIZE} color="#0000FF" />
        </motion.div>
      </motion.div>
    </div>
  );
};
