'use client'
import { motion } from "framer-motion";
import { JSX, useRef } from "react";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
}

export function Carousel<T>({ items, renderItem }: CarouselProps<T>) {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        ref={carouselRef}
        className="flex gap-6 flex-nowrap cursor-grab"
        drag="x"
        dragConstraints={{ left: -(carouselRef.current?.scrollWidth || 0), right: 0 }}
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
