import { motion } from "framer-motion";
import { GlassButton } from "./Button";

type ContactProps = {
  email: string;
  phone: string;
  linkedin: string;
  web: string;
};

export const Contact = ({ email, phone, linkedin, web }: ContactProps) => {
  const items = [
    {
      href: `https://${linkedin}`,
      label: "in",
      value: linkedin,
    },
    {
      href: `https://${web}`,
      label: "🌐",
      value: web,
    },
    {
      href: `tel:${phone}`,
      label: "📞",
      value: phone,
    },
    {
      href: `mailto:${email}`,
      label: "✉️",
      value: email,
    },
  ];

  return (
    <motion.div
      className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 mt-4 text-s"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.6,
          },
        },
      }}
    >
      {items.map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="w-full sm:w-auto" // 🔥 full width on mobile
        >
          <GlassButton className="w-full sm:w-auto flex justify-center sm:justify-start items-center gap-2 text-sm px-4 py-2">
            <span className="font-semibold">{item.label}</span>
            <span>{item.value}</span>
          </GlassButton>
        </motion.a>
      ))}
    </motion.div>
  );
};
