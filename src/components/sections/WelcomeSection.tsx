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
      className="!h-screen !min-h-screen overflow-hidden !p-0"
    >
      <Welcome />
    </AnimatedSection>
  );
}
