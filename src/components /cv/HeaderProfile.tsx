import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./ui/motion";

type Props = { title: React.ReactNode; subtitle: React.ReactNode; };

export function HeaderProfile({ title, subtitle }: Props) {
  return (
    <motion.div
      className="flex justify-start items-center gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <div className="ms-9 flex items-center gap-4 flex-wrap">
        <div className="flex flex-row items-center justify-start flex-wrap gap-2 mt-0">
          <motion.span variants={itemVariants}>{title}</motion.span>
          <motion.span variants={itemVariants}>{subtitle}</motion.span>
        </div>
      </div>
    </motion.div>
  );
}
