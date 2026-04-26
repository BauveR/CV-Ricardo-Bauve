import { RefObject } from "react";
import { motion, useScroll, useTransform, useSpring, type Transition } from "framer-motion";
import { ScrollOrb } from "../common/ScrollOrb";
import RotatingText from "../common/RotatingText";
import { LogoRow } from "../projects/LogoRow";
import { PortafolioGrid } from "../portafolio/PortafolioGrid";
import { OctopusCanvas } from "./OctopusCanvas";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useIsTablet } from "../../hooks/useIsTablet";

const OCTOPUS_URL = "https://res.cloudinary.com/dmweipuof/image/upload/v1777226778/octopus_draco_v6zfka.glb";
const VIDEO_URL   = "https://res.cloudinary.com/dmweipuof/video/upload/v1777228943/09A370A6-45A5-47FC-86D7-DDB4C4F95636_vvrwhu.mp4";
const COSMOS_URL  = "https://www.cosmos.so/bauve";

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
  const x = useSpring(rawX, { stiffness: 40, damping: 20, restDelta: 2, restSpeed: 2 });

  const rawTitleX = useTransform(scrollYProgress, [0, 0.2], ["120vw", "0vw"]);
  const titleScrollX = useSpring(rawTitleX, { stiffness: 80, damping: 20, mass: 0.3, restDelta: 2, restSpeed: 2 });

  const decorativeHeight = isMobile ? 300 : isTablet ? 520 : 680;
  const carouselHeight   = isMobile ? 420 : isTablet ? 500 : 560;

  const fadeIn = {
    initial: { opacity: 0, filter: "blur(20px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    transition: { duration: 1.4, ease: "easeOut" } as Transition,
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full"
      style={{ background: "linear-gradient(to bottom, #0f172a 0%, #5249FF 40%)", overflowX: "clip" }}
    >
      <ScrollOrb triggerRef={triggerRef} sectionRef={sectionRef} cvRef={cvRef} />

      {/* ── Capa decorativa ── */}
      <div className="relative w-full" style={{ minHeight: decorativeHeight, zIndex: 20 }}>

        {isMobile ? (
          /* ── Mobile: columna única ── */
          <div className="flex flex-col items-center gap-4 py-8 px-4">
            <motion.div style={{ x: titleScrollX }} {...fadeIn}>
              <ProjectTitle size="clamp(0.87rem, 5vw, 1.4rem)" />
            </motion.div>
            <div style={{ maxWidth: "90vw", pointerEvents: "none", marginTop: "0.5rem" }}>
              <LogoRow />
            </div>
            <motion.div {...fadeIn}>
              <OctopusCanvas url={OCTOPUS_URL} />
            </motion.div>
            <motion.a
              href={COSMOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              {...fadeIn}
              style={{ borderRadius: "0.75rem", overflow: "hidden", display: "block", width: "100%", maxWidth: 280 }}
            >
              <video
                autoPlay muted loop playsInline
                style={{ width: "100%", borderRadius: "0.75rem", display: "block" }}
              >
                <source src={VIDEO_URL} type="video/mp4" />
              </video>
              <CosmosLabel />
            </motion.a>
          </div>
        ) : (
          /* ── Tablet / Desktop: 3 columnas ── */
          <div
            className="grid w-full max-w-screen-2xl mx-auto px-6"
            style={{
              gridTemplateColumns: "1fr 1fr 1fr",
              minHeight: decorativeHeight,
              alignItems: "center",
            }}
          >
            {/* Col 1 — Octopus */}
            <div className="flex justify-center items-center">
              <motion.div {...fadeIn}>
                <OctopusCanvas url={OCTOPUS_URL} />
              </motion.div>
            </div>

            {/* Col 2 — Título + Logos */}
            <div className="flex flex-col items-center justify-between" style={{ height: decorativeHeight, paddingTop: "3rem", paddingBottom: "17rem" }}>
              <motion.div style={{ x: titleScrollX }} {...fadeIn}>
                <ProjectTitle size="clamp(0.87rem, 1.96vw, 2.18rem)" />
              </motion.div>
              <div style={{ width: "100%", pointerEvents: "none" }}>
                <LogoRow />
              </div>
            </div>

            {/* Col 3 — Video + Cosmos */}
            <div className="flex flex-col items-center justify-center gap-4">
              <motion.a
                href={COSMOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeIn}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}
              >
                <div style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
                  maxHeight: isTablet ? 440 : 620,
                  aspectRatio: "9/16",
                }}>
                  <video
                    autoPlay muted loop playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  >
                    <source src={VIDEO_URL} type="video/mp4" />
                  </video>
                </div>
                <CosmosLabel />
              </motion.a>
            </div>
          </div>
        )}
      </div>

      {/* ── Carousel ── */}
      <div
        className="relative w-full"
        style={{
          height: carouselHeight,
          overflow: "hidden",
          zIndex: 10,
          marginTop: 0,
          marginBottom: isMobile ? "3rem" : "6rem",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 14%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 14%)",
        }}
      >
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
          <motion.div style={{ x: isMobile ? 0 : x, pointerEvents: "none" }}>
            <div style={{ transform: isMobile ? "none" : "scale(0.558)", transformOrigin: "top left", pointerEvents: "auto" }}>
              <PortafolioGrid />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const ROTATING_WORDS = ["Branding", "Coding", "Strategy", "Agiles", "Uniques"];

function ProjectTitle({ size }: { size: string }) {
  return (
    <div
      className="select-none"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4em",
        fontFamily: "'Boldonse', sans-serif",
        fontSize: size,
        color: "#e4e4e7",
        whiteSpace: "nowrap",
      }}
    >
      <span>Projects</span>
      <RotatingText
        texts={ROTATING_WORDS}
        rotationInterval={2200}
        splitBy="characters"
        staggerFrom="last"
        staggerDuration={0.03}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-120%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        mainClassName="text-white bg-slate-900 px-8 py-2 rounded-md overflow-hidden"
        splitLevelClassName="overflow-hidden pb-1"
      />
    </div>
  );
}

function CosmosLabel() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      color: "#e2e8f0",
      fontSize: "0.85rem",
      fontFamily: "sans-serif",
      letterSpacing: "0.05em",
      opacity: 0.8,
    }}>
      <span>cosmos.so/bauve</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.7 }}>
        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
