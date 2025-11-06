import { RefObject } from "react";
import { AnimatedSection } from "../common/AnimatedSection";
import { MainContent } from "../cv/MainContent";

type Props = {
  sectionRef: RefObject<HTMLElement>;
};

export function CVSection({ sectionRef }: Props) {
  return (
    <AnimatedSection
      id="presupuesto"
      ref={sectionRef}
      viewportAmount={0.01}
    >
      <div className="w-full">
        <MainContent />
      </div>
    </AnimatedSection>
  );
}
