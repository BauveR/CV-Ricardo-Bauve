import { RefObject } from "react";
import { MainContent } from "../cv/MainContent";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function CVSection({ sectionRef }: Props) {
  return (
    <section
      id="cv"
      ref={sectionRef}
      className="min-h-screen px-0 scroll-mt-24 relative"
    >
      <div className="w-full relative">
        <MainContent />
      </div>
    </section>
  );
}
