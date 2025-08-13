import { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const GlassButton = ({
  children,
  onClick,
  className = '',
  type = 'button',
}: GlassButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mt-0
        bg-slate-900/70
        backdrop-blur-xl
        shadow-lg
        border border-white/20
        ring-1 ring-white/10
        text-stone-100
        font-semibold 
        py-2 px-5 
        rounded-2xl
        hover:bg-slate-900/80 
        hover:backdrop-blur-2xl 
        transition-all
        duration-500
        whitespace-nowrap
        ${className}
      `}
      
    >
      {children}
    </button>
  );
};
