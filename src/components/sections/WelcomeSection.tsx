import { RefObject } from "react";
import { Welcome } from "../welcome/Welcome";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function WelcomeSection({ sectionRef }: Props) {
  return (
    <section
      id="welcome"
      ref={sectionRef}
      className="h-screen min-h-screen overflow-hidden p-0"
    >
      <Welcome />
    </section>
  );
}
