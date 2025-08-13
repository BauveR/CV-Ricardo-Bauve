// src/components/portafolio/ProductGrid.tsx
import React, { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { projects } from "./projects";

// Mapeo de assets: Vite te devuelve la URL directamente
function useAssetMap() {
  const mods = import.meta.glob("/src/assets/**/*.{png,jpg,jpeg,webp,svg,gif}", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  return useMemo(() => {
    const map: Record<string, string> = {};
    Object.entries(mods).forEach(([abs, url]) => {
      const relFromSrc = abs.replace(/^.*\/src\//, "src/"); // src/assets/foo.png
      const withLeadingSlash = "/" + relFromSrc;            // /src/assets/foo.png
      const noSrc = relFromSrc.replace(/^src\//, "");       // assets/foo.png
      const base = relFromSrc.split("/").pop()!;            // foo.png
      map[relFromSrc] = url;
      map[withLeadingSlash] = url;
      map[noSrc] = url;
      if (!map[base]) map[base] = url;
    });
    return map;
  }, []);
}

function resolveImg(src: string | undefined, map: Record<string, string>): string | undefined {
  if (!src) return undefined;
  return (
    map[src] ||
    map[src.replace(/^\//, "")] ||
    map["src/" + src] ||
    map["/src/" + src] ||
    map[src.replace(/^src\//, "assets/")] ||
    map[src.split("/").pop()!] ||
    undefined
  );
}

export const ProductGrid: React.FC = () => {
  const urlMap = useAssetMap();

  const items = useMemo(() => {
    const list = projects.map((p, i) => {
      const img = resolveImg(p.src, urlMap);
      if (!img) console.warn("[ProductGrid] No se pudo resolver imagen:", p.src);
      return { id: String(i + 1), name: p.text, description: p.longDescription, primaryImage: img };
    });
    return list.filter((p) => !!p.primaryImage);
  }, [urlMap]);

  return (
    <div className="w-full pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard
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
          No se han podido resolver imágenes. Revisa <code>src/data/projects.ts</code> (ej.: <code>src/assets/bauve-01.png</code>) y que existan.
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
