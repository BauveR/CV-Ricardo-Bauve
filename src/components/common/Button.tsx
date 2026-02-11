import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type ButtonVariant = 'glass' | 'blue' | 'default';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
}

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  glass: `
    bg-white/30
    backdrop-blur-2xl
    shadow-xl shadow-gray-200/20
    border border-gray-200
    ring-1 ring-gray-100
    text-gray-400
    hover:bg-white/40
    hover:border-gray-300
    duration-500
  `,
  blue: `
    bg-gray-300
    text-gray-400
    shadow-md
    hover:bg-gray-400
    hover:text-gray-500
    duration-300
  `,
  default: `
    bg-gray-200
    text-gray-400
    shadow
    hover:bg-gray-300
    duration-200
  `,
};

/**
 * Componente de botón unificado con múltiples variantes
 * @param variant - Estilo del botón (glass, blue, default)
 */
export function Button({
  children,
  onClick,
  className = '',
  type = 'button',
  variant = 'default',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        // Estilos base
        'mt-0 font-semibold py-2 px-5 rounded-2xl transition-all whitespace-nowrap',
        // Variante específica
        BUTTON_VARIANTS[variant],
        // Clases personalizadas
        className
      )}
    >
      {children}
    </button>
  );
}

// Re-exports con nombres legacy para compatibilidad
export const GlassButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button {...props} variant="glass" />
);

export const BlueButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button {...props} variant="blue" />
);
