import { motion } from "framer-motion";

type HeaderProfileProps = {
  fullName: string;
  firstNameClassName?: string;
  lastNameClassName?: string;
  imageUrl: string;
};

export const HeaderProfile = ({
  fullName,
  imageUrl,
  firstNameClassName = "text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-700 to-purple-800 bg-clip-text text-transparent",
  lastNameClassName = "text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-800 bg-clip-text text-transparent",
}: HeaderProfileProps) => {
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ");

  return (
    <motion.div
      className="flex justify-start items-start gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-4">
        <motion.img
          src={imageUrl}
          alt={fullName}
          className="w-32 h-32 rounded-full object-cover"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <motion.h1
          className="leading-tight"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.span
            className={firstNameClassName}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {firstName}
          </motion.span>
          <br />
          <motion.span
            className={lastNameClassName}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {lastName}
          </motion.span>
        </motion.h1>
      </div>
    </motion.div>
  );
};
