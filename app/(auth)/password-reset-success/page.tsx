"use client";
import { openSans } from "@/app/ui/fonts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PasswordResetSuccess() {
  const [success, setSuccess] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkCookie() {
      try {
        const response = await fetch("/api/password-reset-success");
        const data = await response.json();

        if (data.success !== null) {
          setSuccess(data.success);
        } else {
          router.push("/password-reset-request");
        }
      } catch (error) {
        console.error("Error fetching password reset status:", error);
        router.push("/password-reset-request");
      }
    }

    checkCookie();
  }, [router]);

  let color = "text-red-500";
  let heading = "Password Reset Fail";
  let text = "Sorry, password reset fail. Please try again.";
  let retry = "Try Again";

  if (success) {
    color = "text-green-500";
    heading = "Email Verified Successfully!";
    text =
      "Your password has been reset successfully. You can now proceed to login.";
    retry = "Go to Login";
  }

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
          href={success ? "/sign-in" : "/password-reset-request"}
          className="bg-[#001A50] hover:opacity-80 focus:opacity-80 text-white font-bold py-2 px-4 rounded text-xl"
        >
          {retry}
        </Link>
      </motion.div>
    </motion.div>
  );
}
