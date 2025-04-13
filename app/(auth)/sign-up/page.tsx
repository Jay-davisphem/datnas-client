"use client";
import InAndUp from "@/app/ui/auth/InAndUp";
import OtherAuth from "@/app/ui/auth/OtherAuth";
import SubmitBtn from "@/app/ui/auth/SubmitBtn";
import dynamic from "next/dynamic";
import Link from "next/link";
import { axiosInstance } from "@/app/lib/axiosInstance";
import { useState } from "react";
import { Button } from "@headlessui/react";
import { useTempData } from "@/app/lib/contexts/tempData.context";
import { redirect } from "next/navigation";
import { extractErrorMessage } from "@/app/lib/utils/errorUtils";
import { getOrigin } from "@/app/lib/utils/getOrigin";

const FormInput = dynamic(() => import("@/app/ui/auth/FormInput"), {
  ssr: false,
});

const params = { url: `${getOrigin()}/verify-account`, resend: "true" };

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    courseOfStudy: "",
    password: "",
    confirmPassword: "",
  });

  const [signupState, setSignupState] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
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

  const { setEmail } = useTempData();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupState({ loading: true, success: false, error: null });

    try {
      if (formData.password !== formData.confirmPassword) {
        setSignupState({
          loading: false,
          success: false,
          error: "Passwords do not match.",
        });
        return;
      }
      const data = {
        password: formData.password,
        email: formData.email,
        fullName: formData.fullName,
      };
      const res = await axiosInstance.post("/auth/register", data, { params });
      console.log("Signup success:", res.data);
      setSignupState({ loading: false, success: true, error: null });
      setEmail(formData.email);
      redirect("/inform-or-rerequest");
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      console.error("Signup error:", error);
      setSignupState({ loading: false, success: false, error: errorMessage });
    }
  };

  const handleResendVerification = async () => {
    setResendState({ loading: true, success: false, error: null });
    try {
      const res = await axiosInstance.post(
        "/auth/register",
        { email: formData.email },
        { params },
      );
      console.log("Resend verification success:", res.data);
      setResendState({ loading: false, success: true, error: null });
      setEmail(formData.email);
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      console.error("Resend verification error:", error);
      setResendState({
        loading: false,
        success: false,
        error: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSignUp}>
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
        {signupState.error && (
          <span className="text-red-500 text-sm">
            {signupState.error}
            {signupState.error?.includes("inactive") && (
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
          pending={signupState.loading}
          text={`${signupState.loading ? "Signing up..." : "Sign Up"}`}
        />

        <OtherAuth />
      </div>
    </form>
  );
}