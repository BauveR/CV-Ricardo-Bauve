import React, { useMemo } from "react";
import { ProductCard } from "./ProductCard"; // ajusta la ruta si tu estructura cambia
import { projects } from "./projects";
import { NavbarSimple } from "../navbar/Navbar";

type GlobModule = { default: string };

export const ProductGrid: React.FC = () => {
  // Mapa de filename -> URL empaquetada por Vite
  const urlMap = useMemo(() => {
    const mods = import.meta.glob("/src/assets/bauve-*.png", { eager: true }) as Record<
      string,
      GlobModule
    >;

    const map: Record<string, string> = {};
    Object.entries(mods).forEach(([abs, mod]) => {
      const rel = abs.replace(/^.*\/src\/assets\//, "src/assets/");
      map[rel] = mod.default;
    });
    return map;
  }, []);

  // Normalizamos los proyectos
  const items = useMemo(
    () =>
      projects
        .map((p, i) => ({
          id: String(i + 1),
          name: p.text,
          description: p.longDescription,
          primaryImage: urlMap[p.src] ?? p.src,
        }))
        .filter((p) => !!p.primaryImage),
    [projects, urlMap]
  );

  return (
    <>
      {/* Navbar en la parte superior */}
      <NavbarSimple />

      {/* Contenedor principal */}
      <div className="px-5 py-10">
        <div
          className="
            mx-auto max-w-[1600px]
            grid gap-10
            grid-cols-1
            sm:grid-cols-[repeat(auto-fit,minmax(340px,1fr))]
            lg:grid-cols-[repeat(auto-fit,minmax(500px,1fr))]
            place-items-stretch
          "
        >
          {items.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              description={p.description}
              primaryImage={p.primaryImage}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
