import * as React from "react";
import { cn } from "../../utils/cn";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowEffect?: boolean;
  children: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glowEffect = true, children, ...props }, ref) => {
    return (
      <div className="relative w-full h-full">
        {glowEffect && (
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-xl opacity-70" />
        )}
        <div
          ref={ref}
          className={cn(
            "relative rounded-2xl border border-white/20",
            "bg-white/10 backdrop-blur-xl",
            "shadow-[0_8px_32px_rgba(0,0,0,0.37)]",
            "before:absolute before:inset-0 before:rounded-2xl",
            "before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none",
            "after:absolute after:inset-px after:rounded-[calc(1rem-1px)]",
            "after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] after:pointer-events-none",
            "w-full h-full",
            className,
          )}
          {...props}
        >
          <div className="relative z-10 w-full h-full flex flex-col">{children}</div>
        </div>
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

const GlassCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 pt-0 flex-1 flex flex-col justify-center items-center text-center", className)} {...props} />
  )
);
GlassCardContent.displayName = "GlassCardContent";

const GlassCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-4 pt-0", className)} {...props} />
  )
);
GlassCardFooter.displayName = "GlassCardFooter";

export { GlassCard, GlassCardContent, GlassCardFooter };
