import { ReactNode } from 'react';

interface OrangeButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const OrangeButton = ({
  children,
  onClick,
  className = '',
  type = 'button',
}: OrangeButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        mt-0
        bg-orange-500
        text-white
        font-semibold 
        py-2 px-5 
        rounded-2xl
        shadow-md
        hover:bg-orange-600
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
