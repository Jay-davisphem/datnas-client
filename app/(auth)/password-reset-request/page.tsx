"use client";
import SubmitBtn from "@/app/ui/auth/SubmitBtn";
import { openSans } from "@/app/ui/fonts";
import dynamic from "next/dynamic";
import { useActionState, useState } from "react";
import { passwordResetRequestAction } from "@/app/lib/actions/authActions";

const FormInput = dynamic(() => import("@/app/ui/auth/FormInput"), {
  ssr: false,
});

const initialState = {
  error: "",
  message: "",
  success: false,
};

export default function RequestPasswordReset() {
  const [state, formAction, pending] = useActionState(
    passwordResetRequestAction,
    initialState
  );

  const [email, setEmail] = useState("");

  const handleInputChange = (e: { target: { value: any } }) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-2 mb-10 md:mb-20">
        <h2 className="md:text-2xl font-bold text-xl">Forgot Password</h2>
        <p className={`md:text-base text-sm ${openSans.className}`}>
          Please provide the email address you use when registered with this
          platform
        </p>
      </div>
      <form action={formAction} className="flex flex-col gap-6 md:gap-8">
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {!state.error && state.message && <p className={`text-${state.success ? 'green' : 'red'}-500 text-sm`}>{state.message}</p>}
        <SubmitBtn text={`${pending ? "Sending..." : "Send Reset Link"}`} pending={pending} />
      </form>
    </>
  );
}