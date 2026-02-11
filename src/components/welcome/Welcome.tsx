import { motion } from "framer-motion";
import titleImage from "../../assets/title/CV 2025 harvard-07.png";
import LiquidEther from "../background/LiquidEther";

export const Welcome = () => {

  return (
    <section className="relative w-full h-[100svh] overflow-hidden isolate">
      {/* Fondo animado LiquidEther */}
      <div className="absolute inset-0 -z-10">
        <LiquidEther
          colors={['#0052f5', '#00b3ff', '#00ff59']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={false}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 h-full w-full max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16 items-center"
      >
        {/* Columna izquierda: imagen + subtítulo */}
        <div className="flex flex-col items-center md:items-start gap-0">
          <div className="w-full overflow-hidden">
            <img
              src={titleImage}
              alt="Ricardo Bautista Velázquez"
              className="w-full h-auto"
              style={{ marginTop: '-10%', marginBottom: '-10%' }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="ms-35 mt-2 text-sm sm:text-base md:text-xl tracking-[0.15em] sm:tracking-[0.2em] text-gray-500 font-sans font-bold text-center md:text-left"
          >
            Diseñador y comunicador visual<br />
            Product owner jr.<br />
            Frontend Developer
          </motion.p>
        </div>

        {/* Columna derecha: texto + botón */}
        <div className="flex flex-col items-center md:items-start gap-6 md:pt-[25%]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-gray-500 font-sans font-medium leading-relaxed text-center md:text-left"
          >
            Diseñador y comunicador visual, Frontend developer y Product Owner Junior con experiencia en gestión de proyectos digitales y coordinación de equipos multidisciplinares. Especializado en automatización de procesos y gestión de backlog con metodologías ágiles. Experiencia práctica en priorización, roadmapping y colaboración con stakeholders para maximizar el valor del producto.
          </motion.p>

          <a href="/#cv">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="px-6 py-3 rounded-3xl border border-gray-300 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-400 backdrop-blur-md tracking-wide text-xs sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver CV
            </motion.button>
          </a>
        </div>
      </motion.div>
    </section>
  );
};