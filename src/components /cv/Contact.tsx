import { motion, Variants } from "framer-motion";
import { GlassButton } from "../buttons/Button";

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

type ContactProps = { email: string; phone: string; linkedin: string; web: string; };

export const Contact = ({ email, phone, linkedin, web }: ContactProps) => {
  const items = [
    { href: `https://${linkedin}`, label: "in", value: linkedin },
    { href: `https://${web}`, label: "🌐", value: web },
    { href: `tel:${phone}`, label: "📞", value: phone },
    { href: `mailto:${email}`, label: "✉️", value: email },
  ];

  return (
    <motion.div
      className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 mt-2 text-s"
      variants={container}
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
          variants={item}
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
};
