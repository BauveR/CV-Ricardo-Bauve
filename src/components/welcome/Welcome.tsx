import { motion } from "framer-motion";
import { BackgroundBlobs } from "../background/BackgroundBlobs";
import { TitleMov } from "../titleRicardo/TitleMov";
import { TitleBauve } from "../titleBauve/TitleBauve";
import CircularGallery from "../gallery/CircularGallery";
import { useValidProjects } from "../../hooks/useValidProjects";
import { useMemo } from "react";

export const Welcome = () => {
  const validProjects = useValidProjects();

  const galleryItems = useMemo(() => {
    return validProjects.map((project) => ({
      image: project.resolvedImage,
      text: project.text
    }));
  }, [validProjects]);

  return (
    <section className="relative w-full max-w-full min-h-[100svh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-x-hidden isolate">
      {/* Blobs dentro de esta sección y detrás del contenido */}
      <BackgroundBlobs />

      {/* Galería circular - por encima de los blobs, debajo de los títulos */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="w-full h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <TitleMov />
        <TitleBauve />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-base sm:text-xl tracking-[0.2em] text-blue-400 mb-10 font-sans font-medium mt-8 text-center"
        >
          DISEÑADOR SR. | FRONTEND DEVELOPER JR.
        </motion.p>

        {/* no navegación programática: dejamos que el App haga el scroll suave */}
        <a href="/#cv" className="relative z-10">
          <motion.button
            className="px-6 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-white backdrop-blur-md tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Ver CV
          </motion.button>
        </a>
      </motion.div>
    </section>
  );
};