"use client";

import InAndUp from "@/app/ui/auth/InAndUp";
import OtherAuth from "@/app/ui/auth/OtherAuth";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { signInAction } from "@/app/lib/actions/authActions";
import SubmitBtn from "@/app/ui/auth/SubmitBtn";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/contexts/AuthContext";

const FormInput = dynamic(() => import("@/app/ui/auth/FormInput"), {
  ssr: false,
});

const initialState = {
  error: "",
  message: "",
  success: false,
};

export default function SignIn() {
  const router = useRouter();
  const { signIn  } = useAuth();
  const [state, formAction, pending] = useActionState(
    signInAction,
    initialState
  );

  const handleSignIn = (formData: FormData) => {
    formAction(formData);
  };

  useEffect(() => {
    if (state.success && state.accessToken && state.refreshToken) {
      signIn(state.accessToken, state.refreshToken);
      router.push("/");
    }
  }, [state, signIn, router]);

  return (
    <form action={handleSignIn}>
      <InAndUp />
      <div className="flex flex-col gap-6 md:gap-8 mt-12">
        <FormInput label="Email Address" type="email" name="email" />
        <FormInput label="Password" type="password" name="password" />
      </div>
      <div className="mt-3 flex flex-col gap-8">
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <Link
          href="/password-reset-request"
          className="text-[10px] md:text-xs hover:underline focus:underline"
        >
          Forgot Password?
        </Link>
        <SubmitBtn text={`${pending ? "Signing in..." : "Sign In"}`} pending={pending} />
        <OtherAuth status="in" />
      </div>
    </form>
  );
}