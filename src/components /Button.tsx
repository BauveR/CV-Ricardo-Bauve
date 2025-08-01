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
      className={`
        mt-0
        bg-white/10 
        backdrop-blur-md
        border border-white/30
        text-blue-900
        font-semibold 
        py-2 px-5 
        rounded-2xl
        shadow-md
        hover:bg-white/20 
        hover:backdrop-blur-lg 
        transition-all
        duration-300
        whitespace-nowrap
        ${className}
      `}
    >
      {children}
    </button>
  );
};
