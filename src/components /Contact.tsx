import { GlassButton } from "./Button";

type ContactProps = {
    email: string;
    phone: string;
    linkedin: string;
    web: string;
  };
  
  export const Contact = ({ email, phone, linkedin, web }: ContactProps) => (
    <div className="flex flex-wrap gap-1 text-s">
      <a
        href={`https://${linkedin}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GlassButton className="flex items-center gap-2 text-sm px-4 py-2">
          <span className="font-semibold">in</span>
          <span>{linkedin}</span>
        </GlassButton>
      </a>
  
      <a
        href={`https://${web}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GlassButton className="flex items-center gap-2 text-sm px-4 py-2">
          <span className="font-semibold">🌐</span>
          <span>{web}</span>
        </GlassButton>
      </a>
  
      <a href={`tel:${phone}`}>
        <GlassButton className="flex items-center gap-2 text-sm px-4 py-2">
          <span className="font-semibold">📞</span>
          <span>{phone}</span>
        </GlassButton>
      </a>
  
      <a href={`mailto:${email}`}>
        <GlassButton className="flex items-center gap-2 text-sm px-4 py-2">
          <span className="font-semibold">✉️</span>
          <span>{email}</span>
        </GlassButton>
      </a>
    </div>
  );
  