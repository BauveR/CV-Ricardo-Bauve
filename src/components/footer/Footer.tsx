import { PROFILE_DATA } from "../../constants/profileData";

export const Footer = () => {
  const { contact } = PROFILE_DATA;

  return (
    <footer
      className="relative z-40 w-full min-h-[70px] md:min-h-[80px] bg-gradient-to-t from-slate-900/90 to-slate-900/30 backdrop-blur-md"
      role="contentinfo"
    >
      <div className="w-full px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
          {/* Columna izquierda: Email */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Email</span>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-stone-200 hover:text-white transition-colors duration-300"
            >
              {contact.email}
            </a>
          </div>

          {/* Columna central: Teléfono */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Teléfono</span>
            <a
              href={`tel:${contact.phone}`}
              className="text-sm text-stone-200 hover:text-white transition-colors duration-300"
            >
              {contact.phone}
            </a>
          </div>

          {/* Columna derecha: LinkedIn */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">LinkedIn</span>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-200 hover:text-white transition-colors duration-300"
            >
              {contact.linkedin.replace('https://', '')}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Ricardo Bauve. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
