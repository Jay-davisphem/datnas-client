'use client'
import InAndUp from "@/app/ui/auth/InAndUp";
import OtherAuth from "@/app/ui/auth/OtherAuth";
import SubmitBtn from "@/app/ui/auth/SubmitBtn";
import dynamic from "next/dynamic";
import Link from "next/link";

const FormInput = dynamic(() => import("@/app/ui/auth/FormInput"), { ssr: false });


export default function SignUp() {
  return (
    <>
    <InAndUp />
    <div className="flex flex-col gap-6 md:gap-8 mt-12">
        <FormInput label="Fullname" name="fullname"/>
        <FormInput label="Email Address" type="email" name="email"/>
        <FormInput label="Course of study" options={['Nursing']} name="courseOfStudy"/>
        <FormInput label="Password" type="password" name="password" />
        <FormInput label="Confirm Password" type="password" name="confirmPassword" />
    </div>
    <div className="mt-3 flex flex-col gap-8">
        <Link href='/password-reset-request' className="text-[10px] md:text-xs hover:underline focus:underline">Forgot Password?</Link>
        <SubmitBtn />   
        <OtherAuth />
    </div>
    </>
  )
}
