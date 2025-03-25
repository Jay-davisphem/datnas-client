'use client'
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Header() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;
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
        <header className={`${isSticky ? 'fixed opacity-100' : ''} top-0 left-0 w-full transition-opacity duration-1000 ease-in-out bg-white md:bg-[#F3F3F3] z-50`}>
            <Navbar />
        </header>
    )
}