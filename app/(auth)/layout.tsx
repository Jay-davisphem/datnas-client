"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../ui/header/Logo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const variants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1], 
      },
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      y: -15,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="flex flex-col bg-white">
        <div className="w-fit py-3 md:py-6 px-6 md:px-16 lg:px-32">
            <Logo />
        </div>
        <main className="h-screen flex justify-center items-center p-3">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                key={pathname}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="py-20 md:py-16 px-3 md:px-16 rounded-md border border-[#9747FF] md:border-none shadow-none md:shadow-lg md:shadow-[#00000040] w-full md:max-w-xl"
                >
                {children}
                </motion.div>
            </AnimatePresence>
        </main>
    </div>
  );
}
