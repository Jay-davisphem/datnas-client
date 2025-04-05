'use client'
import SubmitBtn from "@/app/ui/auth/SubmitBtn";
import dynamic from "next/dynamic";

const FormInput = dynamic(() => import("@/app/ui/auth/FormInput"), { ssr: false });


export default function ForgotPassword() {
  return (
    <>
    <div className="flex flex-col gap-2 mb-10 md:mb-20">
        <h2 className="md:text-2xl font-bold text-xl">Password Reset</h2>
    </div>
    <div className="flex flex-col gap-6 md:gap-8">
        <FormInput label="Password" type="password" name="password" />
        <FormInput label="Confirm Password" type="password" name="confirmPassword" />
    </div>
    <div className="mt-3 flex flex-col gap-8">
        <SubmitBtn />   
    </div>
    </>
  )
}
