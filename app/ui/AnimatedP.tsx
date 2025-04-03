'use client';
import { motion, MotionProps, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScaleUpParagraphProps extends MotionProps {
  children: ReactNode;
  [key: string]: any;
}

function ScaleUpParagraph({ children, ...rest }: ScaleUpParagraphProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <motion.p
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      {...rest}
    >
      {children}
    </motion.p>
  );
}

export default ScaleUpParagraph;