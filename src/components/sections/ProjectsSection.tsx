import { RefObject } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ScrollOrb } from "../common/ScrollOrb";
import { LogoRow } from "../projects/LogoRow";
import { PortafolioGrid } from "../portafolio/PortafolioGrid";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useIsTablet } from "../../hooks/useIsTablet";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
  cvRef: RefObject<HTMLElement | null>;
};

export function ProjectsSection({ sectionRef, triggerRef, cvRef }: Props) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 150%", "end start"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], ["80vw", "-120vw"]);
  const x = useSpring(rawX, { stiffness: 40, damping: 20 });

  const rawImgX = useTransform(scrollYProgress, [0, 0.2], ["-120vw", "0vw"]);
  const imgScrollX = useSpring(rawImgX, { stiffness: 80, damping: 20, mass: 0.3 });

  const rawTitleX = useTransform(scrollYProgress, [0, 0.2], ["120vw", "0vw"]);
  const titleScrollX = useSpring(rawTitleX, { stiffness: 80, damping: 20, mass: 0.3 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full"
      style={{ background: "linear-gradient(to bottom, #5249FF, #ffffff)", minHeight: "80vh" }}
    >
      <ScrollOrb triggerRef={triggerRef} sectionRef={sectionRef} cvRef={cvRef} />

      {/* Logos */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: isMobile ? "2%" : "3%", width: isMobile ? "90vw" : "56%", zIndex: 20, pointerEvents: "none", overflow: "visible" }}>
        <LogoRow />
      </div>

      {/* Imagen decorativa — entra desde la izquierda, parallax scroll hacia izquierda */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none"
        style={{ top: "18%", zIndex: 20 }}
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{
          opacity: { duration: 1.4, ease: "easeOut" },
          filter: { duration: 1.4, ease: "easeOut" },
        }}
      >
        <motion.img
          src="https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_300/v1773766074/cute_bauve4_puoexc.png"
          alt=""
          style={{ x: imgScrollX, width: "clamp(120px, 18vw, 240px)" }}
        />
      </motion.div>

      {/* Título — entra desde la derecha, parallax scroll hacia derecha */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: "28%", zIndex: 20 }}
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{
          opacity: { duration: 1.4, ease: "easeOut" },
          filter: { duration: 1.4, ease: "easeOut" },
        }}
      >
        <motion.p
          className="text-white select-none"
          style={{
            x: titleScrollX,
            fontFamily: "'Boldonse', sans-serif",
            fontSize: "clamp(1.305rem, 2.94vw, 3.27rem)",
            whiteSpace: "nowrap",
          }}
        >
          Proyectos
        </motion.p>
      </motion.div>

      {/* Grid de portafolio con entrada y parallax */}
      <div style={{ paddingTop: isMobile ? "48vh" : isTablet ? "65%" : "38%", position: "relative", zIndex: 20, marginBottom: isMobile ? 0 : "-40vh" }}>
        <div style={{ overflow: "visible" }}>

          {/* Wrapper entrada: desliza desde derecha con blur */}
          <motion.div
            style={{ marginLeft: isMobile ? 0 : "20%", width: isMobile ? "100%" : "500%", pointerEvents: "none" }}
            initial={{ x: "100vw", opacity: 0, filter: "blur(20px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              x: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 1.4, ease: "easeOut" },
              filter: { duration: 1.4, ease: "easeOut" },
            }}
          >
            {/* Wrapper parallax scroll: se mueve hacia la izquierda */}
            <motion.div style={{ x: isMobile ? 0 : x, pointerEvents: "none" }}>
              <div style={{ transform: isMobile ? "none" : "scale(0.558)", transformOrigin: "top left", pointerEvents: "auto" }}>
                <PortafolioGrid />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
