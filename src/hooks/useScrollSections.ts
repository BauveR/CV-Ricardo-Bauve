import { useEffect, useState, RefObject } from "react";

export type SectionId = string;

interface UseScrollSectionsOptions<T extends SectionId> {
  sectionIds: readonly T[];
  sectionRefs: Record<T, RefObject<HTMLElement | null>>;
  rootMargin?: string;
}

/**
 * Hook para detectar qué sección está visible en el viewport usando IntersectionObserver
 * @param options - Configuración de secciones y refs
 * @returns ID de la sección activa actualmente
 */
export function useScrollSections<T extends SectionId>({
  sectionIds,
  sectionRefs,
  rootMargin = "-30% 0px -30% 0px",
}: UseScrollSectionsOptions<T>) {
  const [activeSection, setActiveSection] = useState<T>(sectionIds[0]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Filtrar solo las entradas que están intersectando
        const intersecting = entries.filter((e) => e.isIntersecting);

        if (intersecting.length === 0) return;

        // Encontrar la entrada con mayor intersectionRatio
        const mostVisible = intersecting.reduce((max, e) =>
          e.intersectionRatio > max.intersectionRatio ? e : max
        );

        const id = mostVisible.target.id as T;
        if (sectionIds.includes(id)) {
          setActiveSection(id);
        }
      },
      { root: null, rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    // Observar todas las secciones
    const elements = sectionIds
      .map(id => sectionRefs[id].current)
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, sectionRefs, rootMargin]);

  return activeSection;
}
