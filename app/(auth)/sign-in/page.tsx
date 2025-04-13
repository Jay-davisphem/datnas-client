"use client";
import InAndUp from "@/app/ui/auth/InAndUp";
import OtherAuth from "@/app/ui/auth/OtherAuth";
import SubmitBtn from "@/app/ui/auth/SubmitBtn";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { signInAction } from "@/app/lib/actions/authActions";
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
  const { signIn } = useAuth();
  const [state, formAction, pending] = useActionState(
    signInAction,
    initialState,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (state.success && state.accessToken && state.refreshToken) {
      signIn(state.accessToken, state.refreshToken);
      router.push("/");
    }
  }, [state, signIn, router]);

  return (
    <form action={formAction}>
      <InAndUp />
      <div className="flex flex-col gap-6 md:gap-8 mt-12">
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-3 flex flex-col gap-8">
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <Link
          href="/password-reset-request"
          className="text-[10px] md:text-xs hover:underline focus:underline"
        >
          Forgot Password?
        </Link>
        <SubmitBtn
          text={`${pending ? "Signing in..." : "Sign In"}`}
          pending={pending}
        />
        <OtherAuth status="in" />
      </div>
    </form>
  );
}
