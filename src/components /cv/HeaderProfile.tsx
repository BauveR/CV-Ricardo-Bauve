import { motion } from "framer-motion";

type HeaderProfileProps = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
};

export const HeaderProfile = ({
  title,
  subtitle,
}: HeaderProfileProps) => {
  return (
    <motion.div
      className="flex justify-start items-center gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="ms-9 flex items-center gap-4 flex-wrap">
        {/* Títulos */}
        <div className="flex flex-row items-center justify-start flex-wrap gap-2 mt-0">
          {title}
          {subtitle}
        </div>
      </div>
    </motion.div>
  );
};
