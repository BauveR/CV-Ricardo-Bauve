import { RefObject } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ScrollOrb } from "../common/ScrollOrb";
import { LogoRow } from "../projects/LogoRow";
import { PortafolioGrid } from "../portafolio/PortafolioGrid";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
};

export function ProjectsSection({ sectionRef, triggerRef }: Props) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], ["80vw", "-120vw"]);
  const x = useSpring(rawX, { stiffness: 40, damping: 20 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full"
      style={{ background: "linear-gradient(to bottom, #5249FF, #ffffff)", minHeight: "80vh" }}
    >
      <ScrollOrb triggerRef={triggerRef} sectionRef={sectionRef} />

      {/* Logos */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "10%", width: "28%", zIndex: 20 }}>
        <LogoRow />
      </div>

      {/* Título */}
      <p
        className="absolute left-1/2 -translate-x-1/2 text-white select-none"
        style={{
          top: "25%",
          zIndex: 20,
          fontFamily: "'Boldonse', sans-serif",
          fontSize: "clamp(0.67rem, 1.51vw, 1.68rem)",
          whiteSpace: "nowrap",
        }}
      >
        proyectos
      </p>

      {/* Grid de portafolio con entrada y parallax */}
      <div style={{ paddingTop: "39%", position: "relative", zIndex: 2, marginBottom: "-40vh" }}>
        <div style={{ overflow: "visible" }}>

          {/* Wrapper entrada: desliza desde derecha con blur */}
          <motion.div
            style={{ marginLeft: "20%", width: "500%", pointerEvents: "none" }}
            initial={{ x: "100vw", opacity: 0, filter: "blur(20px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              x: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 1.4, ease: "easeOut" },
              filter: { duration: 1.4, ease: "easeOut" },
            }}
          >
            {/* Wrapper parallax scroll: se mueve hacia la izquierda */}
            <motion.div style={{ x, pointerEvents: "none" }}>
              <div style={{ transform: "scale(0.581)", transformOrigin: "top left", pointerEvents: "auto" }}>
                <PortafolioGrid />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
