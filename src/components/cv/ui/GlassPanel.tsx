type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GlassPanel({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={[
        "rounded-[3rem] p-4 sm:p-8 mt-3",
        "bg-white/70",
        "backdrop-blur-xl",
        "shadow-lg",
        "border border-gray-200",
        "ring-1 ring-gray-100",
        "hover:bg-white/80",
        "transition-colors duration-500",
        "max-w-full overflow-x-hidden",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
