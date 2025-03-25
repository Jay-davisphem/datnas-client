'use client'
import { motion } from "framer-motion";
import { JSX, useRef, useState, useEffect } from "react";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
}

export function Carousel<T>({ items, renderItem }: CarouselProps<T>) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [constraint, setConstraint] = useState(0);

  // Calculate drag constraints after the component mounts and items change
  useEffect(() => {
    if (carouselRef.current) {
      setConstraint(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [items]);

  return (
    <div className="overflow-hidden w-full" ref={carouselRef}>
      <motion.div
        className="flex gap-6 flex-nowrap cursor-grab"
        drag="x"
        dragConstraints={{ right: 0, left: -constraint }}
        dragElastic={0.2} // Lower elasticity for a firmer feel
        whileTap={{ cursor: "grabbing" }}
      >
        {items.map((item, index) => (
          <motion.div 
            key={index}
            className="flex-[0_0_100%] md:flex-[0_0_calc(100%/2)] lg:flex-[0_0_calc(100%/4)] px-4"
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
