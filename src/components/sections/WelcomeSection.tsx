import { RefObject } from "react";
import { AnimatedSection } from "../common/AnimatedSection";
import { Welcome } from "../welcome/Welcome";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function WelcomeSection({ sectionRef }: Props) {
  return (
    <AnimatedSection
      id="welcome"
      ref={sectionRef}
      viewportAmount={0.45}
      className="flex items-center justify-center"
    >
      <div className="w-full">
        <Welcome />
      </div>
    </AnimatedSection>
  );
}
