// src/pages/PortafolioGrid.tsx
import { LiquidGlassCardJelly } from "./Card";
import { useMemo } from "react";

const images = [
  // Puedes reemplazar estas imágenes con las tuyas
  "src/assets/IMG_6919.png",
  "https://source.unsplash.com/random/800x600?sig=2",
  "https://source.unsplash.com/random/800x600?sig=3",
  "https://source.unsplash.com/random/800x600?sig=4",
  "https://source.unsplash.com/random/800x600?sig=5",
  "https://source.unsplash.com/random/800x600?sig=6",
  "https://source.unsplash.com/random/800x600?sig=7",
  "https://source.unsplash.com/random/800x600?sig=8",
  "https://source.unsplash.com/random/800x600?sig=9",
  "https://source.unsplash.com/random/800x600?sig=10",
  "https://source.unsplash.com/random/800x600?sig=11",
  "https://source.unsplash.com/random/800x600?sig=12",
  "https://source.unsplash.com/random/800x600?sig=13",
  "https://source.unsplash.com/random/800x600?sig=14",
  "https://source.unsplash.com/random/800x600?sig=15",
  "https://source.unsplash.com/random/800x600?sig=16",
  "https://source.unsplash.com/random/800x600?sig=17",
  "https://source.unsplash.com/random/800x600?sig=18",
  "https://source.unsplash.com/random/800x600?sig=19",
  "https://source.unsplash.com/random/800x600?sig=20"
];

export const PortafolioGrid = () => {
  const cards = useMemo(
    () =>
      images.map((src, idx) => (
        <LiquidGlassCardJelly
          key={idx}
          imageSrc={src}
          hoverText={`Proyecto ${idx + 1}`}
        />
      )),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 px-6 py-10">
      <h1 className="text-4xl text-white font-bold text-center mb-10">
        Mi Portafolio
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-[1400px] mx-auto">
        {cards}
      </div>
    </div>
  );
};