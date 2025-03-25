import { ReactNode, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface CarouselProps {
  children: ReactNode;
  autoScroll?: boolean;
  interval?: number;
  slidesToScroll?: number; // New prop for controlling how many items scroll
}

export default function Carousel({ children, autoScroll = true, interval = 4000, slidesToScroll = 1 }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll, // Moves the specified number of slides at a time
  });

  useEffect(() => {
    if (!autoScroll || !emblaApi) return;
    const scrollInterval = setInterval(() => emblaApi.scrollNext(), interval);
    return () => clearInterval(scrollInterval);
  }, [autoScroll, emblaApi, interval]);

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex gap-6 flex-nowrap">{children}</div>
    </div>
  );
}
