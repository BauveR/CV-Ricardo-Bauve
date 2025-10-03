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
    bg-slate-900/70
    backdrop-blur-xl
    shadow-lg
    border border-white/20
    ring-1 ring-white/10
    text-stone-100
    hover:bg-slate-900/80
    hover:backdrop-blur-2xl
    duration-500
  `,
  blue: `
    bg-slate-500
    text-white
    shadow-md
    hover:bg-slate-400
    duration-300
  `,
  default: `
    bg-gray-600
    text-white
    shadow
    hover:bg-gray-500
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
