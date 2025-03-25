'use client'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsSticky(window.scrollY > 2000);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      layout
      transition={{ layout: { duration: 2, ease: "easeInOut" } }}
      className={`${isSticky ? 'fixed opacity-100' : ''} top-0 left-0 w-full transition-opacity duration-1000 ease-in-out bg-white md:bg-[#F3F3F3] z-50`}
    >
      <Navbar />
    </motion.header>
  );
}
