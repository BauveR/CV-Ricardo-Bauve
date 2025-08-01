import { motion } from 'framer-motion';

export const Title = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
    className="mb-2 mx-auto text-center"
    style={{
      fontFamily: "'Lexend', sans-serif",
      background: 'linear-gradient(to right, white, #bae6fd)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      fontSize: 'clamp(1rem, 9vw, 3.5rem)',
      letterSpacing: '0.3em',
      lineHeight: '1.2',
      padding: '0.5em 0',
      wordBreak: 'break-word',
    }}
  >
    <span style={{ fontSize: '150%' }}>RICARDO</span>
    <br />
    <span style={{ fontSize: '80%' }}>BAUVE</span>
  </motion.div>
);
