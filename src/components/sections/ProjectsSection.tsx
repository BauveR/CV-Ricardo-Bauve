import { RefObject } from "react";
import { ScrollOrb } from "../common/ScrollOrb";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
};

export function ProjectsSection({ sectionRef, triggerRef }: Props) {
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full flex items-center justify-center"
      style={{ background: "linear-gradient(to bottom, #5249FF, #ffffff)", minHeight: "130vh" }}
    >
      <ScrollOrb triggerRef={triggerRef} />
    </section>
  );
}
