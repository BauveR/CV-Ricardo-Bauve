import { useEffect, useState, RefObject } from "react";

export type SectionId = string;

interface UseScrollSectionsOptions<T extends SectionId> {
  sectionIds: readonly T[];
  sectionRefs: Record<T, RefObject<HTMLElement | null>>;
  rootMargin?: string;
}

/**
 * Hook para detectar qué sección está visible en el viewport
 * Usa scroll position para mobile y IntersectionObserver para desktop
 * @param options - Configuración de secciones y refs
 * @returns ID de la sección activa actualmente
 */
export function useScrollSections<T extends SectionId>({
  sectionIds,
  sectionRefs,
  rootMargin = "0px 0px -40% 0px",
}: UseScrollSectionsOptions<T>) {
  const [activeSection, setActiveSection] = useState<T>(sectionIds[0]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const triggerPoint = scrollY + windowHeight * 0.3;

          const sections = sectionIds
            .map(id => ({ id, element: sectionRefs[id].current }))
            .filter((s): s is { id: T; element: HTMLElement } => s.element !== null)
            .map(s => ({ id: s.id, top: s.element.offsetTop }));

          let newActive = sectionIds[0];
          for (let i = sections.length - 1; i >= 0; i--) {
            if (triggerPoint >= sections[i].top) {
              newActive = sections[i].id;
              break;
            }
          }

          setActiveSection(newActive);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, sectionRefs]);

  return activeSection;
}
