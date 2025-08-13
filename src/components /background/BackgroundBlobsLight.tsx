// src/components/background/BackgroundBlobsLight.tsx
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

function rand(range: number) {
  return Math.floor(Math.random() * range * 2) - range;
}

function useFloat(rx: number, ry: number) {
  const controls = useAnimation();
  useEffect(() => {
    let on = true;
    (async () => {
      while (on) {
        await controls.start({
          x: rand(rx),
          y: rand(ry),
          scale: 1 + Math.random() * 0.25,
          transition: { duration: 1 + Math.random() * 1.2, ease: "easeInOut" },
        });
      }
    })();
    return () => { on = false; };
  }, [controls, rx, ry]);
  return controls;
}

export const BackgroundBlobsLight = () => {
  const a = useFloat(120, 120);
  const b = useFloat(100, 100);
  const c = useFloat(140, 140);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-visible">
      {/* Capa de base muy sutil (evita “blancos puros” con blur) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />
      {/* Blobs */}
      <motion.div
        className="absolute w-[560px] h-[560px] rounded-full bg-white/[0.08] blur-3xl"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={a}
        style={{ top: "8%", left: "18%" }}
      />
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full bg-blue-300/[0.12] blur-2xl"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={b}
        style={{ top: "30%", left: "56%" }}
      />
      <motion.div
        className="absolute w-[320px] h-[320px] rounded-full bg-cyan-300/[0.10] blur-3xl"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={c}
        style={{ top: "55%", left: "34%" }}
      />
    </div>
  );
};
