"use client";
import { openSans } from "@/app/ui/fonts";
import { useState } from "react";
import { safeRequest } from "@/app/lib/axiosInstance";
import { Button } from "@headlessui/react";
import { useTempData } from "@/app/lib/contexts/tempData.context";
import { extractErrorMessage } from "@/app/lib/utils/errorUtils";
import { getOrigin } from "@/app/lib/utils/getOrigin";

export default function EmailVerification() {
  const [resendState, setResendState] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  const { email } = useTempData();

  const handleResend = async () => {
    setResendState({ loading: true, success: false, error: null });
    try {
      const params = {
        url: `${getOrigin()}/verify-account`,
        resend: "true",
      };

      if (!email) {
        throw new Error("Email not found.");
      }

      const res = await safeRequest({
        method: "post",
        url: "/auth/register",
        data: { email },
        params: params,
      });
      console.log(res.data, "resend response");
      setResendState({ loading: false, success: true, error: res.error! });
    } catch (error: any) {
      setResendState({
        loading: false,
        success: false,
        error: extractErrorMessage(error),
      });
    }
  };

  const co1 = "bg-[#001A50] text-white";
  const coh1 = "hover:opacity-80 focus:opacity-80";

  return (
    <>
      <div className="flex flex-col gap-3">
        <h2 className="md:text-2xl font-bold text-xl">Email Verification</h2>
        <p className={`md:text-base text-sm ${openSans.className}`}>
          A link has been sent to your mail, kindly check your mail and click
          the link to activate your account
        </p>
        <p className="text-[#D60000] text-xs md:text-sm">Didn't get a mail?</p>
        {resendState.error && (
          <p className="text-red-500 text-sm">{resendState.error}</p>
        )}
        {resendState.success && (
          <p className="text-green-500 text-sm">Verification email resent!</p>
        )}
      </div>
      <div className="mt-8 flex flex-col gap-8">
        <Button
          onClick={handleResend}
          disabled={resendState.loading}
          className={`
            ${resendState.loading ? "cursor-wait" : "cursor-pointer"}
            disabled:bg-gray-500 disabled:opacity-100 rounded-lg text-sm flex justify-center
            ${co1 + " " + coh1} py-5 w-full h-auto
          `}
        >
          {resendState.loading ? "Resending..." : "Resend"}
        </Button>
      </div>
    </>
  );
}
