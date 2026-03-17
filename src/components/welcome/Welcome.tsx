import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

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
      className="relative w-full h-[100svh] overflow-hidden isolate flex items-center"
      style={{ background: "linear-gradient(to top, #5249FF, #E3FFD9)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* PNG grande izquierda — desborda el borde izquierdo */}
      <motion.div
        className="absolute top-[17%] h-full pointer-events-none z-0"
        style={{ left: "-10%" }}
        initial={{ x: "-100vw", opacity: 0, filter: "blur(20px)" }}
        animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={entranceTransition}
      >
        <motion.img
          src="https://res.cloudinary.com/dmweipuof/image/upload/v1773766079/cute_bauve3_koppbd.png"
          alt="Ricardo Bauve ilustración"
          className="h-[70%] w-auto object-contain"
          style={{ x: imgX, translateX: mouseX }}
        />
      </motion.div>

      {/* Contenido derecho */}
      <div className="ml-auto w-[63%] pr-10 flex flex-col items-start gap-8 relative z-10">

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
        <div className="w-[80%] grid grid-cols-2 gap-12 relative z-10">
          <p className="text-xs md:text-sm tracking-[0.15em] text-white font-sans font-bold leading-relaxed">
            Diseñador y comunicador visual<br />
            Product owner jr.<br />
            Frontend Developer
          </p>
          <p className="text-xs md:text-sm text-white font-sans font-medium leading-relaxed">
            Amante del arte, el mobiliario y los objetos únicos, coleccionista, reparador y constructor, me gusta analizar por que estos productos tienen permanencia en los referentes y conectan con muchos y como se nutren de nuevas ideas para reinventarse, sumar valor a su propuesta alineada con la forma mas auténtica de la marca.
          </p>
        </div>
      </div>
    </section>
  );
};
