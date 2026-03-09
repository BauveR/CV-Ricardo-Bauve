import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const glassButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-2xl px-6 py-2.5 text-sm font-medium tracking-widest uppercase",
    "backdrop-blur-xl border transition-all duration-300",
    "before:absolute before:inset-0 before:rounded-2xl",
    "before:bg-gradient-to-b before:from-white/30 before:to-transparent before:pointer-events-none",
    "hover:scale-105 active:scale-95",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-cyan-500/80 via-blue-500/80 to-purple-500/80",
          "border-white/30 text-white",
          "shadow-[0_4px_20px_rgba(59,130,246,0.4)]",
          "hover:shadow-[0_6px_28px_rgba(59,130,246,0.6)]",
        ],
        secondary: [
          "bg-white/10",
          "border-white/25 text-white/90",
          "shadow-inner shadow-white/10",
          "hover:bg-white/20 hover:border-white/40",
        ],
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        full: "h-10 w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  asChild?: boolean;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(glassButtonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassButton, glassButtonVariants };
