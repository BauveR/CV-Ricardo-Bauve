import { motion } from "framer-motion";
import { BackgroundBlobs } from "../background/BackgroundBlobs";
// import { TitleMov } from "../titleRicardo/TitleMov";
// import { TitleBauve } from "../titleBauve/TitleBauve";
import TextPressure from "../textPressure/TextPressure";

export const Welcome = () => {

  return (
    <section className="relative w-full max-w-full h-[100svh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden isolate">
      {/* Blobs dentro de esta sección y detrás del contenido */}
      <BackgroundBlobs />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center w-full"
      >
        {/* SVG Titles - Commented but kept for future use */}
        {/* <TitleMov /> */}
        {/* <TitleBauve /> */}

        {/* New TextPressure Effect */}
        <div className="w-full max-w-7xl px-4 flex flex-col items-center gap-1">
          <div className="w-full" style={{ position: 'relative', height: '120px' }}>
            <TextPressure
              text="RICARDO"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={false}
              textColor="#F17313"
              strokeColor="#ff0000"
              minFontSize={40}
            />
          </div>
          <div className="w-full" style={{ position: 'relative', height: '120px' }}>
            <TextPressure
              text="BAUVE"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={false}
              textColor="#93A1EF"
              strokeColor="#ff0000"
              minFontSize={40}
            />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm sm:text-base md:text-xl tracking-[0.15em] sm:tracking-[0.2em] text-blue-400 mb-8 sm:mb-10 font-sans font-medium mt-6 sm:mt-8 text-center px-4"
        >
          DISEÑADOR SR. | FRONTEND DEVELOPER JR.
        </motion.p>

        {/* no navegación programática: dejamos que el App haga el scroll suave */}
        <a href="/#cv" className="relative z-10">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="px-6 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white backdrop-blur-md tracking-wide"
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