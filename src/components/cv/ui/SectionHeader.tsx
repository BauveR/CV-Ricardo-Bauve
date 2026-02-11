type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionHeader({ children, className = "" }: Props) {
  return (
    <h2
      className={["ms-8 text-3xl font-bold text-blue-600", className].join(" ")}
    >
      {children}
    </h2>
  );
}
