"use client";
import SubmitBtn from "@/app/ui/auth/SubmitBtn";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { passwordResetAction } from "@/app/lib/actions/authActions";

const FormInput = dynamic(() => import("@/app/ui/auth/FormInput"), {
  ssr: false,
});

const initialState = {
  error: "",
  message: "",
  success: false,
};

export default function ForgotPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = searchParams.get("user");
  const key = searchParams.get("key");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, formAction, pending] = useActionState(
    (prevState: any, formData: FormData) => {
      if (!user || !key) return { ...prevState, error: "Invalid reset link." };
      return passwordResetAction(prevState, formData, user, key);
    },
    initialState,
  );
  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  useEffect(() => {
    if (state.success && state.message) {
      router.push(`/password-reset-success?success=true`);
    } else if (!user || !key) {
      router.push(`/password-reset-success?success=false`);
    }
  }, [state, router]);

  return (
    <>
      <div className="flex flex-col gap-2 mb-10 md:mb-20">
        <h2 className="md:text-2xl font-bold text-xl">Password Reset</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-6 md:gap-8">
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
        />
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {!state.error && state.message && (
          <p className={`text-${state.success ? "green" : "red"}-500 text-sm`}>
            {state.message}
          </p>
        )}
        <SubmitBtn
          text={`${pending ? "Resetting..." : "Reset Password"}`}
          pending={pending}
        />
      </form>
    </>
  );
}
