import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./ui/motion";
import { contactItems } from "./data/cvData";
import { GlassButton } from "../buttons/Button";

type Props = { email: string; phone: string; linkedin: string; web: string; };

export function Contact({ email, phone, linkedin, web }: Props) {
  const items = contactItems(email, phone, linkedin, web);

  return (
    <motion.div
      className="ms-2 flex flex-col sm:flex-row flex-wrap justify-start gap-2 mt-0 text-sm"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {items.map((it, i) => (
        <motion.a
          key={i}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ y: -2, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-full sm:w-auto"
        >
          <GlassButton className="w-full sm:w-auto flex justify-center sm:justify-start items-center gap-2 text-sm px-4 py-2">
            <span className="font-semibold">{it.label}</span>
            <span>{it.value}</span>
          </GlassButton>
        </motion.a>
      ))}
    </motion.div>
  );
}
