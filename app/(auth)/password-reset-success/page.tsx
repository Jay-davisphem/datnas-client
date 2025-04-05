'use client'
import { openSans } from "@/app/ui/fonts";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function EmailVerificationSuccess() {
    const sParams = useSearchParams();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false); // Add a mounted state
    const success = sParams.get('success')?.toLocaleLowerCase() === 'true';
    let color = 'text-red-500';
    let heading = 'Email Verification Failed';
    let text = 'Sorry, we could not verify your email. Please try again.';
    let retry = 'Try Again';
    const isExternalLink = typeof window !== 'undefined' && document.referrer;
    const emailReferrers = [
        'mail.google.com',
        'outlook.live.com',
        'outlook.office.com',
        'yahoo.com',
        'mail.aol.com',
        'icloud.com',
        'yandex.com',
        'zoho.com',
        'protonmail.com',
        'fastmail.com',
        'sbcglobal.net',
        'verizon.net',
        'bellsouth.net'
    ];

    const isFromEmail = isExternalLink && emailReferrers.some(ref => document.referrer.includes(ref));


    if (success) {
        color = 'text-green-500';
        heading = 'Email Verified Successfully!';
        text = 'Your email has been verified. You can now proceed to login.';
        retry = 'Go to Login';
    }

    // useEffect(() => {
    //     if (!isFromEmail) {
    //         router.push('/');
    //     }
    //     setIsMounted(true); 
    // }, [isFromEmail, router]);

    // if (!isFromEmail || !isMounted) {
    //     return null;
    // }

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,      
                ease: "easeInOut", 
                delay: 0.2,  
            },
        },
    };

    const headingVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.4 } },
    };

    const textVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.6 } },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                delay: 0.8,
                type: "spring",       
                stiffness: 120,    
                damping: 20,
            },
        },
        hover: { scale: 1.05 },    
        tap: { scale: 0.95 },     
    };


    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center"
        >
            <div className="flex flex-col gap-3 text-center">
                <motion.h2
                    variants={headingVariants}
                    className={`md:text-2xl font-bold text-xl ${color}`}
                >
                    {heading}
                </motion.h2>
                <motion.p
                    variants={textVariants}
                    className={`md:text-base text-sm ${openSans.className}`}
                >
                    {text}
                </motion.p>
            </div>
            <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="mt-8"
            >
                <Link
                    href={success ? '/sign-in' : '/sign-up'}
                    className="bg-[#001A50] hover:opacity-80 focus:opacity-80 text-white font-bold py-2 px-4 rounded text-xl"
                >
                    {retry}
                </Link>
            </motion.div>
        </motion.div>
    );
}
