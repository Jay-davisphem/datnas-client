"use client";

import InAndUp from "@/app/ui/auth/InAndUp";
import OtherAuth from "@/app/ui/auth/OtherAuth";
import SubmitBtn from "@/app/ui/auth/SubmitBtn";
import dynamic from "next/dynamic";
import Link from "next/link";
import { signUpAction } from "@/app/lib/actions/authActions";
import { useActionState, useState } from "react";

const FormInput = dynamic(() => import("@/app/ui/auth/FormInput"), {
  ssr: false,
});

const initialState = {
  error: "",
  success: undefined,
  message: undefined,
};

export default function SignUp() {
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialState,
  );

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    courseOfStudy: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form action={formAction}>
      <InAndUp />

      <div className="flex flex-col gap-6 md:gap-8 mt-12">
        <FormInput
          label="Fullname"
          name="fullName"
          value={formData.fullname}
          onChange={handleInputChange}
        />

        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <FormInput
          label="Course of study"
          options={["Nursing"]}
          name="courseOfStudy"
          value={formData.courseOfStudy}
          onChange={handleInputChange}
          />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          />
      </div>

      <div className="mt-3 flex flex-col gap-8">
        {state.error && <span className="text-red-500 text-sm">{state.error}</span>}
        <Link
          href="/password-reset-request"
          className="text-[10px] md:text-xs hover:underline focus:underline w-fit"
          >
          Forgot Password?
        </Link>

        <SubmitBtn pending={pending} />

        <OtherAuth />
      </div>
    </form>
  );
}
