import { ReactNode } from 'react';

interface BlueButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const BlueButton = ({
  children,
  onClick,
  className = '',
  type = 'button',
}: BlueButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        mt-0
        bg-slate-500
        text-white
        font-semibold 
        py-2 px-10 
        rounded-2xl
        shadow-md
        hover:bg-slate-400
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
