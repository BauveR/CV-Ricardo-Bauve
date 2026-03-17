import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";

export const Welcome = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-auto min-h-[100svh] md:h-[100svh] overflow-visible md:overflow-hidden flex items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fondo — capa propia por debajo del orb */}
      <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(to top, #5249FF, #E3FFD9)" }} />

      {/* PNG grande izquierda — desborda el borde izquierdo */}
      <motion.div
        className="hidden md:block absolute top-[17%] h-full pointer-events-none z-20"
        style={{ left: "-40%" }}
        initial={{ x: "-100vw", opacity: 0, filter: "blur(20px)" }}
        animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={entranceTransition}
      >
        <motion.img
          src="https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_900/v1773766079/cute_bauve3_koppbd.png"
          alt="Ricardo Bauve ilustración"
          className="h-[70%] w-auto object-contain"
          style={{ x: imgX, translateX: mouseX }}
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Contenido derecho */}
      <div className="ml-auto w-full md:w-[63%] px-6 md:px-0 md:pr-10 flex flex-col items-start gap-8 relative z-20">

        {/* PNG — solo mobile, entra desde la izquierda */}
        <motion.div
          className="block md:hidden w-full flex justify-center"
          initial={{ x: "-100vw", opacity: 0, filter: "blur(20px)" }}
          animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
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

        {/* SVG 1: entrada desde derecha, scroll hacia izquierda */}
        <motion.div
          className="w-full"
          initial={{ x: "100vw", opacity: 0, filter: "blur(20px)" }}
          animate={{ x: 0, opacity: 0.85, filter: "blur(0px)" }}
          transition={entranceTransition}
        >
          <motion.img
            src="https://res.cloudinary.com/dmweipuof/image/upload/v1773017009/Ricardo_bauve_2026-03_gy4g97.svg"
            alt="Ricardo Bauve"
            className="w-[80%]"
            style={{ x: x1 }}
          />
        </motion.div>

        {/* SVG 2: entrada desde izquierda, scroll hacia derecha */}
        <motion.div
          className="w-full"
          initial={{ x: "-100vw", opacity: 0, filter: "blur(20px)" }}
          animate={{ x: 0, opacity: 0.85, filter: "blur(0px)" }}
          transition={entranceTransition}
        >
          <motion.img
            src="https://res.cloudinary.com/dmweipuof/image/upload/v1773017005/Ricardo_bauve_2026-02_q1vtri.svg"
            alt="Ricardo Bauve"
            className="w-[80%]"
            style={{ x: x2 }}
          />
        </motion.div>

        {/* 2 columnas */}
        <div className="w-full md:w-[80%] grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-12 relative z-10">
          <p className="text-[10px] md:text-sm tracking-[0.05em] md:tracking-[0.15em] text-white font-sans font-bold leading-relaxed">
            Diseñador y comunicador visual<br />
            Product owner jr.<br />
            Frontend Developer
          </p>
          <div className="flex flex-col gap-4">
            <ScrollReveal
              textClassName="text-xs md:text-sm text-white font-sans font-medium"
              staggerDelay={0.05}
              blurStrength={6}
              threshold={0.3}
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
