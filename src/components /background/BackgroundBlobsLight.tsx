import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

function getRandomPosition(range: number) {
  return Math.floor(Math.random() * range * 2) - range;
}

function useRandomAnimation(rangeX: number, rangeY: number) {
  const controls = useAnimation();

  useEffect(() => {
    let isActive = true;

    const animate = async () => {
      while (isActive) {
        const x = getRandomPosition(rangeX);
        const y = getRandomPosition(rangeY);
        const scale = Math.random() > 0.5 ? 1.4 : 1;

        await controls.start({
          x,
          y,
          scale,
          transition: {
            duration: Math.random() * 2 + 1.5,
            ease: "easeInOut",
          },
        });
      }
    };

    animate();
    return () => {
      isActive = false;
    };
  }, [controls, rangeX, rangeY]);

  return controls;
}

export const BackgroundBlobsLight = () => {
  // Rango amplio para cubrir toda la pantalla (aprox. 50vw / 50vh)
  const blob1 = useRandomAnimation(700, 500); // más grande y amplio
  const blob2 = useRandomAnimation(600, 600);
  const blob3 = useRandomAnimation(700, 600);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Blob muy grande */}
      <motion.div
        className="absolute w-[1200px] h-[1200px] bg-stone-400 rounded-full blur-3xl opacity-40"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob1}
        style={{ top: "0%", left: "5%" }}
      />

      {/* Blob mediano */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-lime-400 rounded-full blur-3xl opacity-40"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob2}
        style={{ top: "40%", left: "60%" }}
      />

      {/* Blob pequeño */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-slate-400 rounded-full blur-3xl opacity-40"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob3}
        style={{ top: "70%", left: "30%" }}
      />
    </div>
  );
};
