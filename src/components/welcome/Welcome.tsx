import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useIsTablet } from "../../hooks/useIsTablet";
import { useIsMobile } from "../../hooks/useIsMobile";
import ProfileCard from "./ProfileCard";
import BlurText from "./BlurText";
import Particles from "./Particles";

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

  const contentStyle = isDesktop
    ? { width: "63%", paddingRight: "2.5rem", marginLeft: "auto" }
    : isTablet
    ? { width: "100%", padding: "0 2rem" }
    : { width: "100%", padding: "0 2.5rem" };

  const svg1WrapperStyle = isTablet
    ? { marginTop: "-30rem", marginLeft: "0rem" }
    : isMobile
    ? { marginTop: "-3.25rem" }
    : undefined;

  const svg2WrapperStyle = isTablet
    ? { marginLeft: "0rem" }
    : isMobile
    ? { marginTop: "-2rem" }
    : undefined;

  const svgWidth = isTablet ? "62%" : "80%";
  const fontSize = isMobile ? "clamp(2rem, 10vw, 3.5rem)" : "clamp(1.5rem, 4.33vw, 4.67rem)";

  const textGridStyle = isTablet
    ? { position: "absolute" as const, bottom: "-32rem", left: "8%", width: "90vw", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }
    : isDesktop
    ? { width: "80%", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "3rem" }
    : { display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full flex items-center ${isMobile ? "min-h-[120svh]" : "min-h-[100svh]"}`}
      style={{ overflow: isMobile ? "visible" : "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fondo sólido — full width */}
      <div className="absolute inset-0 z-0" style={{ background: "#0f172a" }} />
      {/* Partículas — full width */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles
          particleColors={["#5249FF"]}
          particleCount={180}
          particleSpread={8}
          speed={0.08}
          particleBaseSize={160}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      {/* Buffer móvil */}
      {isMobile && (
        <div
          className="absolute z-0"
          style={{
            left: 0, right: 0,
            bottom: "calc(-4rem - env(safe-area-inset-bottom))",
            height: "calc(4rem + env(safe-area-inset-bottom) + 2px)",
            background: "#0f172a",
          }}
        />
      )}

      {/* Contenedor de contenido — limitado a max-w-screen-2xl */}
      <div className={`relative z-20 w-full max-w-screen-2xl mx-auto flex items-center ${isMobile ? "min-h-[120svh]" : "min-h-[100svh]"}`}>

        {/* ProfileCard — desktop & tablet */}
        {!isMobile && (
          <div
            className="absolute"
            style={{
              left: isTablet ? "6%" : "10%",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <motion.div
              initial={{ x: "-100vw", opacity: 0, filter: "blur(20px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={entranceTransition}
            >
              <motion.div style={{ x: imgX, translateX: mouseX }}>
                <ProfileCard
                  name="Ricardo Bauve"
                  title="Frontend Developer"
                  handle="r_bauve"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="https://res.cloudinary.com/dmweipuof/image/upload/v1777127500/Gemini_Generated_Image_9zc15y9zc15y9zc1_1_fedwtl.png"
                  showUserInfo={true}
                  showDetails={false}
                  enableTilt={true}
                  enableMobileTilt={false}
                  linkedinUrl="https://www.linkedin.com/in/ricardobauve/"
                  behindGlowColor="rgba(125, 190, 255, 0.67)"
                  behindGlowEnabled={true}
                  innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                />
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Contenido principal */}
        <div className={`relative flex flex-col items-start ${isMobile ? "gap-14" : "gap-8"}`} style={contentStyle}>

          {/* ProfileCard — solo mobile */}
          {isMobile && (
            <motion.div
              className="w-full flex justify-center"
              initial={{ x: "-100vw", opacity: 0, filter: "blur(20px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={entranceTransition}
              style={{ marginTop: "0.5rem", justifyContent: "flex-start", marginLeft: "1rem", marginBottom: "-7rem" }}
            >
              <div style={{ transform: "scale(0.72)", transformOrigin: "top left" }}>
                <ProfileCard
                  name="Ricardo Bauve"
                  title="Frontend Developer"
                  handle="r_bauve"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="https://res.cloudinary.com/dmweipuof/image/upload/v1777127500/Gemini_Generated_Image_9zc15y9zc15y9zc1_1_fedwtl.png"
                  showUserInfo={false}
                  showDetails={false}
                  enableTilt={false}
                  enableMobileTilt={false}
                  behindGlowColor="rgba(125, 190, 255, 0.67)"
                  behindGlowEnabled={true}
                  innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                />
              </div>
            </motion.div>
          )}

          {/* TEXTO 1 — RICARDO */}
          <motion.div
            className="w-full"
            style={svg1WrapperStyle}
            initial={{ x: "100vw", opacity: 0, filter: "blur(20px)" }}
            animate={{ x: 0, opacity: 0.85, filter: "blur(0px)" }}
            transition={entranceTransition}
          >
            <motion.span
              style={{
                x: x1,
                display: "block",
                fontFamily: "'Boldonse', sans-serif",
                fontSize: fontSize,
                color: "#e4e4e7",
                lineHeight: 1,
                width: svgWidth,
              }}
            >
              <BlurText
                text="RICARDO"
                animateBy="letters"
                direction="top"
                delay={80}
                stepDuration={0.4}
              />
            </motion.span>
          </motion.div>

          {/* TEXTO 2 — BAUVE */}
          <motion.div
            className="w-full"
            style={svg2WrapperStyle}
            initial={{ x: "-100vw", opacity: 0, filter: "blur(20px)" }}
            animate={{ x: 0, opacity: 0.85, filter: "blur(0px)" }}
            transition={entranceTransition}
          >
            <motion.span
              style={{
                x: x2,
                display: "block",
                fontFamily: "'Boldonse', sans-serif",
                fontSize: fontSize,
                color: "#e4e4e7",
                lineHeight: 1,
                width: svgWidth,
              }}
            >
              <BlurText
                text="BAUVE"
                animateBy="letters"
                direction="top"
                delay={80}
                stepDuration={0.4}
              />
            </motion.span>
          </motion.div>

          {/* Grid de texto */}
          <div className="relative z-10" style={textGridStyle}>
            <p
              className="tracking-[0.05em] text-zinc-200 font-sans font-bold leading-relaxed"
              style={{ fontSize: isDesktop ? "0.875rem" : isTablet ? "1.14rem" : "1.0625rem", letterSpacing: isDesktop ? "0.15em" : undefined }}
            >
              Diseñador y comunicador visual<br />
              Product owner jr.<br />
              Frontend Developer
            </p>
            <div className="flex flex-col gap-4">
              <ScrollReveal
                textClassName="text-sm md:text-sm text-zinc-200 font-sans font-normal"
                staggerDelay={0.02}
                blurStrength={4}
                threshold={0.05}
                baseRotation={2}
              >
                Coleccionista, reparador, constructor. Me muevo entre objetos que tienen algo que decir, piezas que acumulan tiempo en su superficie, que guardan en su materia una forma de conocimiento que el ojo solo aprende tocando. ¿Por qué ciertos productos permanecen? ¿Por qué conectan con tantos a través de las décadas? ¿Cómo una marca puede reinventarse y mantener su esencia?
              </ScrollReveal>
              <ScrollReveal
                textClassName="text-sm md:text-sm text-zinc-200 font-sans font-normal"
                staggerDelay={0.02}
                blurStrength={4}
                threshold={0.05}
                baseRotation={2}
              >
                En un mundo donde los límites entre lo humano, lo material y lo tecnológico se disuelven y rehacen sin descanso, creo que la autenticidad no es un origen fijo sino un gesto que se repite, que se hereda y se transforma.
              </ScrollReveal>
              <ScrollReveal
                textClassName="text-sm md:text-sm text-zinc-200/70 font-sans font-normal italic"
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
      </div>
    </section>
  );
};
