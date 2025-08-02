import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Title } from './Title';
import { GlassButton } from '../Button';
import { BackgroundBlobs } from '../background/BackgroundBlobs'; // ajusta si tu ruta es distinta

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
           from-pink-600 to-indigo-900 flex flex-col items-center
            justify-center p-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BackgroundBlobs />

          <Title />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg tracking-widest text-white mb-10 font-sans mx-auto font-light"
          >
            <span>Diseñador Sr.</span>
            <span className="ml-8">Front End Developer Jr.</span>
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
