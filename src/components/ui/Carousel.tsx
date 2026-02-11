import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  forwardRef,
  type ComponentProps,
} from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { cn } from "../../utils/cn";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within <Carousel>");
  return context;
}

/* ───────────── Root ───────────── */

type CarouselProps = ComponentProps<"div"> & {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      { axis: orientation === "horizontal" ? "x" : "y", ...opts },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback((embla: NonNullable<CarouselApi>) => {
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
      setSelectedIndex(embla.selectedScrollSnap());
    }, []);

    useEffect(() => {
      if (!api) return;
      setApi?.(api);
      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api.off("select", onSelect);
        api.off("reInit", onSelect);
      };
    }, [api, setApi, onSelect]);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          scrollSnaps,
        }}
      >
        <div
          ref={ref}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

/* ───────────── Content ───────────── */

const CarouselContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    const { carouselRef } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div ref={ref} className={cn("flex", className)} {...props} />
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

/* ───────────── Item ───────────── */

const CarouselItem = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0", className)}
      {...props}
    />
  )
);
CarouselItem.displayName = "CarouselItem";

/* ───────────── Navigation buttons ───────────── */

const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      ref={ref}
      className={cn(
        "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10",
        "p-2 sm:p-3 rounded-full",
        "bg-gray-100 hover:bg-gray-200 backdrop-blur-sm",
        "transition-all duration-200 text-gray-400 shadow-lg",
        "disabled:opacity-30 disabled:pointer-events-none",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Anterior"
      {...props}
    >
      <svg
        width="20"
        height="20"
        className="sm:w-6 sm:h-6"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
      >
        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel();
    return (
      <button
        ref={ref}
        className={cn(
          "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10",
          "p-2 sm:p-3 rounded-full",
          "bg-gray-100 hover:bg-gray-200 backdrop-blur-sm",
          "transition-all duration-200 text-gray-400 shadow-lg",
          "disabled:opacity-30 disabled:pointer-events-none",
          className
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Siguiente"
        {...props}
      >
        <svg
          width="20"
          height="20"
          className="sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
        >
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

/* ───────────── Dots ───────────── */

function CarouselDots({ className }: { className?: string }) {
  const { scrollSnaps, selectedIndex, api } = useCarousel();
  if (scrollSnaps.length <= 1) return null;
  return (
    <div className={cn("flex justify-center gap-2 mt-6", className)}>
      {scrollSnaps.map((_, i) => (
        <button
          key={i}
          className={cn(
            "w-2.5 h-2.5 rounded-full transition-all duration-300",
            i === selectedIndex
              ? "bg-gray-400 scale-110"
              : "bg-gray-200 hover:bg-gray-300"
          )}
          onClick={() => api?.scrollTo(i)}
          aria-label={`Ir a slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
  type CarouselApi,
};
