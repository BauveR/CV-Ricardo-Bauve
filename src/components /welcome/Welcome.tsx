import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TitleMov } from '../titleRicardo/TitleMov';
import { TitleBauve } from '../titleBauve/TitleBauve';
import { GlassButton } from '../Button';
import { BackgroundBlobs } from '../background/BackgroundBlobs'; 

export const Welcome = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/presupuesto');
    }, 800);
  };

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 min-h-screen bg-gradient-to-br
           from-slate-600 to-slate-800 flex flex-col items-center
            justify-center p-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BackgroundBlobs />

          <TitleMov />
          <TitleBauve />

          <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 1 }}
  className="text-2xl sm:text-xl tracking-[0.2em] text-blue-400 mb-10 font-sans mx-auto font-medium whitespace-nowrap overflow-hidden text-ellipsis mt-8"
>
DISEÑADOR SR.  |  FRONTEND DEVELOPER JR.
</motion.p>


          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
          >
            <GlassButton>CV</GlassButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
