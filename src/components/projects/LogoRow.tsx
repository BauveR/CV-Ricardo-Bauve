import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useIsTablet } from "../../hooks/useIsTablet";

const SMALL_LOGOS = new Set([
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073983/Ricardo_bauve_2026-14_hztqvh.svg",
]);

const LOGOS = [
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073260/Ricardo_bauve_2026-05_udee3u.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073261/Ricardo_bauve_2026-06_mo02cm.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073260/Ricardo_bauve_2026-04_dck7az.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073981/Ricardo_bauve_2026-08_jfzx2g.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073981/Ricardo_bauve_2026-09_n14frl.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073981/Ricardo_bauve_2026-10_zmcrea.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073982/Ricardo_bauve_2026-12_wteh07.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073982/Ricardo_bauve_2026-11_esi9nl.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073983/Ricardo_bauve_2026-13_tkdchm.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073983/Ricardo_bauve_2026-14_hztqvh.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073983/Ricardo_bauve_2026-15_aryqeg.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073983/Ricardo_bauve_2026-16_cqefcn.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073984/Ricardo_bauve_2026-19_fn5fgi.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073985/Ricardo_bauve_2026-22_mjizs6.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073983/Ricardo_bauve_2026-17_ktcuzs.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073985/Ricardo_bauve_2026-21_hqazhu.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073986/Ricardo_bauve_2026-24_ngutot.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073986/Ricardo_bauve_2026-23_w0shxr.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073984/Ricardo_bauve_2026-18_hdb8q7.svg",
  "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_150/v1773073985/Ricardo_bauve_2026-20_o8uhg4.svg",
];

// Orden de aparición: centro (1) → derecha (2) → izquierda (0)
const SLOT_DELAY = [0.4, 0, 0.2];

const pickNext = (excluded: number[]): number[] => {
  const excludedSet = new Set(excluded);
  const available = LOGOS.map((_, i) => i).filter((i) => !excludedSet.has(i));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

export const LogoRow = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const logoHeight = isMobile ? 226 : isTablet ? 150 : 72;

  const [indices, setIndices] = useState([0, 1, 2]);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) => pickNext(prev));
      setCycleKey((k) => k + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center w-full" style={{ height: logoHeight, gap: isMobile || isTablet ? "2rem" : "1rem" }}>
      {indices.map((logoIndex, slot) => (
        <div
          key={slot}
          className="relative h-full flex items-center justify-center"
          style={{ width: isMobile || isTablet ? undefined : logoHeight * 1.5 }}
        >
          <AnimatePresence mode="sync">
            <motion.img
              key={`${cycleKey}-${slot}`}
              src={LOGOS[logoIndex]}
              className="absolute h-full w-auto object-contain"
              style={SMALL_LOGOS.has(LOGOS[logoIndex]) ? { transform: "scale(0.5)" } : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut", delay: SLOT_DELAY[slot] }}
            />
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
