import Autoplay from "embla-carousel-autoplay";
import { PortafolioCard } from "./PortafolioCard";
import { useValidProjects } from "../../hooks/useValidProjects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/Carousel";

type Props = {
  autoplay?: boolean;
};

export const PortafolioGrid = ({ autoplay = false }: Props) => {
  const validProjects = useValidProjects();

  const items = validProjects.map((project, displayIndex) => ({
    id: String(displayIndex),
    index: displayIndex,
    name: project.text,
    description: project.longDescription,
    primaryImage: project.resolvedImage,
    link: project.link,
  }));

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
          slidesToScroll: 1,
        }}
        plugins={autoplay ? [Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })] : []}
        className="w-full"
      >
        <CarouselContent className="gap-4 sm:gap-6 px-[1.05rem] sm:px-[1.575rem] lg:px-[2.1rem] pb-10 pt-4">
          {items.map((p) => (
            <CarouselItem
              key={p.id}
              className="basis-[93.5%] sm:basis-[440px] md:basis-[581px]"
            >
              <PortafolioCard
                id={p.id}
                index={p.index}
                name={p.name}
                description={p.description}
                primaryImage={p.primaryImage!}
                link={p.link}
                className="w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
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
