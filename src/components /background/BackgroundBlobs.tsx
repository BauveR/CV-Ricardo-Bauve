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
        const scale = Math.random() > 0.5 ? 1.5 : 1; // alterna el crecimiento

        await controls.start({
          x,
          y,
          scale,
          transition: {
            duration: Math.random() * 1.5 + 0.8, // 0.8s - 2.3s
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

export const BackgroundBlobs = () => {
  // Similar rango de movimiento para simular "colisión"
  const blob1 = useRandomAnimation(150, 150);
  const blob2 = useRandomAnimation(130, 130);
  const blob3 = useRandomAnimation(150, 150);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Blob grande */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-stone-300 rounded-full blur-3xl opacity-10"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob1}
        style={{ top: "20%", left: "25%" }}
      />

      {/* Blob mediano */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-blue-400 rounded-full blur-2xl opacity-20"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob2}
        style={{ top: "25%", left: "45%" }}
      />

      {/* Blob pequeño */}
      <motion.div
        className="absolute w-[300px] h-[300px] bg-blue-300 rounded-full blur-3xl opacity-30"
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={blob3}
        style={{ top: "30%", left: "35%" }}
      />
    </div>
  );
};
