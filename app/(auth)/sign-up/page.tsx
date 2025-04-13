"use client";
import InAndUp from "@/app/ui/auth/InAndUp";
import OtherAuth from "@/app/ui/auth/OtherAuth";
import SubmitBtn from "@/app/ui/auth/SubmitBtn";
import dynamic from "next/dynamic";
import Link from "next/link";
import { signUpAction } from "@/app/lib/actions/authActions";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { safeRequest } from "@/app/lib/axiosInstance";
import { useTempData } from "@/app/lib/contexts/tempData.context";
import { redirect } from "next/navigation";
import { extractErrorMessage } from "@/app/lib/utils/errorUtils";
import { getOrigin } from "@/app/lib/utils/getOrigin";

const FormInput = dynamic(() => import("@/app/ui/auth/FormInput"), {
  ssr: false,
});

const initialState = {
  error: "",
  success: undefined,
  message: undefined,
};

const params = { url: `${getOrigin()}/verify-account`, resend: "true" };

export default function SignUp() {
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialState,
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    courseOfStudy: "",
    password: "",
    confirmPassword: "",
  });

  const [resendState, setResendState] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  const { setEmail } = useTempData(); // Use context

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResendVerification = async () => {
    setResendState({ loading: true, success: false, error: null });
    try {
      const res = await safeRequest({
        url: "/auth/register",
        data: { email: formData.email },
        params: params,
      });
      console.log(res.data, "new res.data");
      setResendState({ loading: false, success: true, error: res.error! });
      setEmail(formData.email); // Set email in context
    } catch (error: any) {
      setResendState({
        loading: false,
        success: false,
        error: extractErrorMessage(error),
      });
    }
  };
  useEffect(() => {
    if (state && state.email) {
      setEmail(state.email);
      redirect("/inform-or-rerequest");
    }
  }, [state, setEmail]);

  return (
    <form action={formAction}>
      <InAndUp />

      <div className="flex flex-col gap-6 md:gap-8 mt-12">
        <FormInput
          label="Fullname"
          name="fullName"
          value={formData.fullName}
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
        {state.error && (
          <span className="text-red-500 text-sm">
            {state.error}
            {state.error?.includes("inactive") && (
              <Button
                onClick={handleResendVerification}
                className="w-fit text-sm cursor-pointer ml-1 text-red-500"
                disabled={resendState.loading}
              >
                or{" "}
                {resendState.loading ? (
                  <span>Resending...</span>
                ) : (
                  <span className="underline hover:opacity-75 focus:opacity-75">
                    Resend verification?
                  </span>
                )}
              </Button>
            )}
            {resendState.success && (
              <span className="text-green-500 ml-1">
                Verification email resent!
              </span>
            )}
            {resendState.error && (
              <span className="text-red-500 ml-1">{resendState.error}</span>
            )}
          </span>
        )}

        <Link
          href="/password-reset-request"
          className="text-[10px] md:text-xs hover:underline focus:underline w-fit"
        >
          Forgot Password?
        </Link>

        <SubmitBtn
          pending={pending}
          text={`${pending ? "Signing up..." : "Sign Up"}`}
        />

        <OtherAuth />
      </div>
    </form>
  );
}
