import { PortafolioCard } from "./PortafolioCard";
import { useValidProjects } from "../../hooks/useValidProjects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "../ui/Carousel";

export const PortafolioGrid = () => {
  const validProjects = useValidProjects();

  const items = validProjects.map((project, displayIndex) => ({
    id: String(displayIndex),
    index: displayIndex,
    name: project.text,
    description: project.longDescription,
    primaryImage: project.resolvedImage,
  }));

  return (
    <div className="w-full pt-16 pb-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="gap-4 sm:gap-6 px-[1.05rem] sm:px-[1.575rem] lg:px-[2.1rem]">
          {items.map((p) => (
            <CarouselItem
              key={p.id}
              className="basis-[93.5%] sm:basis-[440px] md:basis-[581px]"
            >
              <div className="h-[calc(93.5vw*1.67)] sm:h-[734px] md:h-[968px]">
                <PortafolioCard
                  id={p.id}
                  index={p.index}
                  name={p.name}
                  description={p.description}
                  primaryImage={p.primaryImage!}
                  className="h-full w-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>

      {items.length === 0 && (
        <div className="text-center text-sm opacity-70 mt-10 px-[1.05rem]">
          No se han podido resolver imágenes. Revisa{" "}
          <code>src/components/portafolio/projects.ts</code> y que existan los
          assets.
        </div>
      )}
    </div>
  );
};

export default PortafolioGrid;
