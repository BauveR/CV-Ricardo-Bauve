import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useIsTablet } from "../../hooks/useIsTablet";
import { useIsMobile } from "../../hooks/useIsMobile";

export const Welcome = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();
  const isDesktop = !isMobile && !isTablet;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rawX1 = useTransform(scrollYProgress, [0, 1], ["0vw", "-120vw"]);
  const rawX2 = useTransform(scrollYProgress, [0, 1], ["0vw", "120vw"]);
  const rawImgX = useTransform(scrollYProgress, [0, 1], ["0vw", "-50vw"]);

  const x1 = useSpring(rawX1, { stiffness: 60, damping: 20, mass: 0.5 });
  const x2 = useSpring(rawX2, { stiffness: 60, damping: 20, mass: 0.5 });
  const imgX = useSpring(rawImgX, { stiffness: 60, damping: 20, mass: 0.5 });

  const mouseRawX = useMotionValue(0);
  const mouseX = useSpring(mouseRawX, { stiffness: 80, damping: 25, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const centerX = window.innerWidth / 2;
    const offset = ((e.clientX - centerX) / centerX) * 18;
    mouseRawX.set(offset);
  };

  const handleMouseLeave = () => {
    mouseRawX.set(0);
  };

  const entranceTransition = {
    opacity: { duration: 1.4, ease: "easeOut" as const },
    filter: { duration: 1.4, ease: "easeOut" as const },
    x: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const },
  };

  // Estilos por breakpoint — una sola fuente de verdad por elemento
  const pngStyle = {
    top: isTablet ? "23%" : "17%",
    height: isTablet ? "50%" : "70%",
  };

  const contentStyle = isDesktop
    ? { width: "63%", paddingRight: "2.5rem", marginLeft: "auto" }
    : isTablet
    ? { width: "100%", padding: "0 2rem" }
    : { width: "100%", padding: "0 1.5rem" };

  const svg1WrapperStyle = isTablet
    ? { marginTop: "-30rem", marginLeft: "0rem" }
    : undefined;

  const svg2WrapperStyle = isTablet
    ? { marginLeft: "0rem" }
    : undefined;

  const svgWidth = isTablet ? "62%" : "80%";

  const textGridStyle = isTablet
    ? { position: "absolute" as const, bottom: "-32rem", left: "8%", width: "90vw", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }
    : isDesktop
    ? { width: "80%", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3rem" }
    : { display: "grid", gridTemplateColumns: "1fr", gap: "0.75rem" };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] flex items-center"
      style={{ overflow: isMobile ? "visible" : "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fondo */}
      <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(to top, #5249FF, #E3FFD9)" }} />
      {/* Buffer móvil: extiende el color base para absorber el salto de Safari */}
      {isMobile && (
        <div
          className="absolute z-0"
          style={{
            left: 0, right: 0,
            bottom: "calc(-4rem - env(safe-area-inset-bottom))",
            height: "calc(4rem + env(safe-area-inset-bottom))",
            background: "#5249FF",
          }}
        />
      )}

      {/* PNG — desktop & tablet, absoluto respecto a la sección */}
      {!isMobile && (
        <motion.div
          className="absolute h-full pointer-events-none z-20"
          style={{ left: "-10%", top: pngStyle.top }}
          initial={{ x: "-100vw", opacity: 0, filter: "blur(20px)" }}
          animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          transition={entranceTransition}
        >
          <motion.img
            src="https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_700/v1773766079/cute_bauve3_koppbd.png"
            alt="Ricardo Bauve ilustración"
            className="w-auto object-contain"
            style={{ x: imgX, translateX: mouseX, height: pngStyle.height }}
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>
      )}

      {/* Contenido principal */}
      <div className="relative z-20 flex flex-col items-start gap-8" style={contentStyle}>

        {/* PNG — solo mobile */}
        {isMobile && (
          <motion.div
            className="w-full flex justify-start"
            initial={{ x: "-100vw", opacity: 0, filter: "blur(20px)" }}
            animate={{ x: "-30vw", opacity: 1, filter: "blur(0px)" }}
            transition={entranceTransition}
          >
            <img
              src="https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_400/v1773766079/cute_bauve3_koppbd.png"
              alt="Ricardo Bauve ilustración"
              className="h-24 w-auto object-contain mx-auto mt-16"
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>
        )}

        {/* SVG 1 — entra desde derecha, scroll hacia izquierda */}
        <motion.div
          className="w-full"
          style={svg1WrapperStyle}
          initial={{ x: "100vw", opacity: 0, filter: "blur(20px)" }}
          animate={{ x: 0, opacity: 0.85, filter: "blur(0px)" }}
          transition={entranceTransition}
        >
          <motion.img
            src="https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto/v1773017009/Ricardo_bauve_2026-03_gy4g97.svg"
            alt="Ricardo Bauve"
            style={{ x: x1, width: svgWidth }}
          />
        </motion.div>

        {/* SVG 2 — entra desde izquierda, scroll hacia derecha */}
        <motion.div
          className="w-full"
          style={svg2WrapperStyle}
          initial={{ x: "-100vw", opacity: 0, filter: "blur(20px)" }}
          animate={{ x: 0, opacity: 0.85, filter: "blur(0px)" }}
          transition={entranceTransition}
        >
          <motion.img
            src="https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto/v1773017005/Ricardo_bauve_2026-02_q1vtri.svg"
            alt="Ricardo Bauve"
            style={{ x: x2, width: svgWidth }}
          />
        </motion.div>

        {/* Grid de texto — 2 columnas en desktop/tablet, 1 en mobile */}
        <div className="relative z-10" style={textGridStyle}>
          <p
            className="tracking-[0.05em] text-white font-sans font-bold leading-relaxed"
            style={{ fontSize: isDesktop ? "0.875rem" : isTablet ? "1.14rem" : "1.0625rem", letterSpacing: isDesktop ? "0.15em" : undefined }}
          >
            Diseñador y comunicador visual<br />
            Product owner jr.<br />
            Frontend Developer
          </p>
          <div className="flex flex-col gap-4">
            <ScrollReveal
              textClassName="text-xs md:text-sm text-white font-sans font-medium"
              staggerDelay={0.02}
              blurStrength={4}
              threshold={0.05}
              baseRotation={2}
            >
              Coleccionista, reparador, constructor. Me muevo entre objetos que tienen algo que decir: piezas que acumulan tiempo en su superficie, que guardan en su materia una forma de conocimiento que el ojo solo aprende tocando. Me pregunto por qué ciertos productos permanecen, por qué conectan con tantos a través de las décadas, cómo una marca puede reinventarse y seguir siendo, en el fondo, ella misma. En un mundo donde los límites entre lo humano, lo material y lo tecnológico se disuelven y rehacen sin descanso, creo que la autenticidad no es un origen fijo sino un gesto que se repite, que se hereda y se transforma.
            </ScrollReveal>
            <ScrollReveal
              textClassName="text-xs md:text-sm text-white/70 font-sans font-medium italic"
              staggerDelay={0.05}
              blurStrength={6}
              threshold={0.3}
              baseRotation={0}
            >
              "Las tecnologías que usamos nos modelan constantemente, igual que nosotros las modelamos a ellas." — N. Katherine Hayles
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
