"use client";
import { openSans } from "@/app/ui/fonts";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@headlessui/react";
import { resendVerification } from "@/app/lib/actions/authActions";

export default function EmailVerificationSuccess() {
  const sParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [verificationStatus, setVerificationStatus] = useState<{
    success: boolean | null;
    error: string | null;
  }>({
    success: null,
    error: null,
  });

  const email = sParams.get("user");
  const key = sParams.get("key");

  useEffect(() => {
    if (email && key) {
      startTransition(async () => {
        const result = await resendVerification(email, key);
        if (result.success) {
          setVerificationStatus({ success: true, error: null });
        } else {
          setVerificationStatus({ success: false, error: result.error! });
        }
      });
    } else {
      setVerificationStatus({
        success: false,
        error: "Email or key not found in URL.",
      });
    }
  }, [email, key]);

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

  let heading = "Verifying...";
  let text = "Please wait while we verify your key.";
  let color = "text-gray-500"; // Default color

  if (verificationStatus.success === true) {
    heading = "Key Verified Successfully!";
    text = "Your key has been verified.";
    color = "text-green-500";
  } else if (verificationStatus.success === false) {
    heading = "Key Verification Failed";
    text = "";
    color = "text-red-500";
  }

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
        {verificationStatus.success === false && (
          <>
            {verificationStatus.error && (
              <p className="text-red-500 text-sm">{verificationStatus.error}</p>
            )}
          </>
        )}
      </div>
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="mt-8"
      >
        <Link
          href="/sign-in"
          className="bg-[#001A50] hover:opacity-80 focus:opacity-80 text-white font-bold py-2 px-4 rounded text-xl"
        >
          Go to Login
        </Link>
      </motion.div>
    </motion.div>
  );
}
