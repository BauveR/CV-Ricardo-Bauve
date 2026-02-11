import { RefObject } from "react";
import { PortafolioGrid } from "../portafolio/PortafolioGrid";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
  showPortfolio: boolean;
  onViewportEnter: () => void;
};

export function PortfolioSection({ sectionRef }: Props) {
  return (
    <section
      id="portafolio"
      ref={sectionRef}
      className="min-h-screen px-0 scroll-mt-24"
    >
      <div className="w-full">
        <PortafolioGrid />
      </div>
    </section>
  );
}
