import { useMemo } from "react";
import { PortafolioCard } from "./PortafolioCard";
import { projects } from "./projects";
import { useAssetMap } from "../../hooks/useAssetMap";
import { resolveAssetUrl } from "../../utils/assetResolver";

export const PortafolioGrid = () => {
  const urlMap = useAssetMap();

  const items = useMemo(() => {
    const list = projects.map((p, i) => {
      const img = resolveAssetUrl(p.src, urlMap);
      if (!img) console.warn("[PortafolioGrid] No se pudo resolver imagen:", p.src);
      return { id: String(i + 1), name: p.text, description: p.longDescription, primaryImage: img };
    });
    return list.filter((p) => !!p.primaryImage);
  }, [urlMap]);

  return (
    <div className="w-full pt-16 pb-12 px-[1.05rem] sm:px-[1.575rem] lg:px-[2.1rem]">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <PortafolioCard
            key={p.id}
            id={p.id}
            name={p.name}
            description={p.description}
            primaryImage={p.primaryImage!}
          />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center text-sm opacity-70 mt-10">
          No se han podido resolver imágenes. Revisa <code>src/components/portafolio/projects.ts</code> y que existan los assets.
        </div>
      )}
    </div>
  );
};

export default PortafolioGrid;
