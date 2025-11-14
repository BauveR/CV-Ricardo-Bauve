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
  rootMargin = "0px 0px -40% 0px",
}: UseScrollSectionsOptions<T>) {
  const [activeSection, setActiveSection] = useState<T>(sectionIds[0]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    // Detectar si es mobile
    const isMobile = window.innerWidth < 768;
    // En mobile usar threshold más bajo para detectar CV antes
    const minThreshold = isMobile ? 0.05 : 0.2;

    const observer = new IntersectionObserver(
      (entries) => {
        // Filtrar solo las entradas que están intersectando
        const intersecting = entries.filter((e) => e.isIntersecting);

        // Si no hay nada intersectando, mantener el estado actual
        if (intersecting.length === 0) return;

        // Encontrar la entrada con mayor intersectionRatio
        const mostVisible = intersecting.reduce((max, e) =>
          e.intersectionRatio > max.intersectionRatio ? e : max
        );

        const id = mostVisible.target.id as T;

        // Solo actualizar si hay un cambio significativo
        // Mobile: threshold más bajo (0.05) para detección temprana
        // Desktop: threshold más alto (0.2) para estabilidad
        if (sectionIds.includes(id) && mostVisible.intersectionRatio > minThreshold) {
          setActiveSection(id);
        }
      },
      {
        root: null,
        rootMargin,
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
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
