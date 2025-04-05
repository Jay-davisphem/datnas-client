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
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col bg-white">
        <div className="w-fit py-3 md:py-6 px-6 md:px-16 lg:px-32">
            <Logo />
        </div>
        <main className="h-screen flex justify-center items-center p-3 backdrop-blur-md bg-white/90">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                key={pathname}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="py-20 md:py-16 px-3 md:px-16 rounded-md shadow-lg shadow-[#00000040] w-full md:max-w-xl"
                >
                {children}
                </motion.div>
            </AnimatePresence>
        </main>
    </div>
  );
}
