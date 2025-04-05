'use client'
import SubmitBtn from "@/app/ui/auth/SubmitBtn";
import { openSans } from "@/app/ui/fonts";
import dynamic from "next/dynamic";

const FormInput = dynamic(() => import("@/app/ui/auth/FormInput"), { ssr: false });


export default function RequestPasswordReset() {
  return (
    <>
    <div className="flex flex-col gap-2 mb-10 md:mb-20">
        <h2 className="md:text-2xl font-bold text-xl">Forgot Password</h2>
        <p className={`md:text-base text-sm ${openSans.className}`}>Please provide the email address you use when registered with this platform</p>
    </div>
    <div className="flex flex-col gap-6 md:gap-8">
        <FormInput label="Email Address" type="email" name="email"/>
    </div>
    <div className="mt-3 flex flex-col gap-8">
        <SubmitBtn />   
    </div>
    </>
  )
}
