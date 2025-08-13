import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.10,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

type HeaderProfileProps = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
};

export const HeaderProfile = ({ title, subtitle }: HeaderProfileProps) => {
  return (
    <motion.div
      className="flex justify-start items-center gap-4"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <div className="ms-9 flex items-center gap-4 flex-wrap">
        <div className="flex flex-row items-center justify-start flex-wrap gap-2 mt-0">
          <motion.span variants={item}>{title}</motion.span>
          <motion.span variants={item}>{subtitle}</motion.span>
        </div>
      </div>
    </motion.div>
  );
};
