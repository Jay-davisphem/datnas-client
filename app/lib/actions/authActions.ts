"use server";

import { safeRequest } from "../axiosInstance";
import { cookies } from "next/headers";

// --- Shared Utilities ---
const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "strict" as const,
  path: "/",
};

function validateStringField(field: FormDataEntryValue | null): string | null {
  return typeof field === "string" ? field : null;
}

function getFormField(formData: FormData, key: string): string | null {
  return validateStringField(formData.get(key));
}

function responseError(prevState: any, error?: string) {
  return {
    ...prevState,
    success: false,
    error,
  };
}

// --- Actions ---

export async function signUpAction(prevState: any, formData: FormData) {
  const password = getFormField(formData, "password");
  const confirmPassword = getFormField(formData, "confirmPassword");

  if (password !== confirmPassword) {
    return responseError(prevState, "Passwords do not match.");
  }

  const fullName = getFormField(formData, "fullName");
  const email = getFormField(formData, "email");

  const body = { fullName, email, password };
  const params = {
    url: `${process.env.ORIGIN_URL || process.env.NEXT_PUBLIC_ORIGIN_URL}/verify-account`,
  };

  const res = await safeRequest({
    method: "post",
    url: "/auth/register",
    data: body,
    params: params,
  });
  if (!res.success) {
    return responseError(prevState, res.error);
  }
  return { email };
}

export async function resendVerification(email: string, key: string) {
  return await safeRequest({
    method: "post",
    url: "/auth/activate-user",
    data: { email, key },
  });
}

export async function signInAction(prevState: any, formData: FormData) {
  const cook = await cookies();
  const email = getFormField(formData, "email");
  const password = getFormField(formData, "password");

  if (!email || !password) {
    return responseError(prevState, "Email and password are required.");
  }

  const res = await safeRequest({
    method: "post",
    url: "/auth/login",
    data: { email, password },
  });

  const accessToken = res.data?.data?.access?.jwt;
  const accessTokenExpires = new Date(res.data?.data?.access?.expiredAt);
  const refreshToken = res.data?.data?.refresh?.jwt;
  const refreshTokenExpires = new Date(res.data?.data?.refresh?.expiredAt);

  if (!accessToken || !refreshToken) {
    return responseError(prevState, res.error);
  }

  cook.set("accessToken", accessToken, {
    ...cookieOptions,
    expires: accessTokenExpires,
  });

  cook.set("refreshToken", refreshToken, {
    ...cookieOptions,
    expires: refreshTokenExpires,
  });
  if (!res.success) {
    return responseError(prevState, res.error);
  }

  return {
    ...prevState,
    success: true,
    accessToken,
    refreshToken,
  };
}

export async function passwordResetRequestAction(
  prevState: any,
  formData: FormData,
) {
  const email = getFormField(formData, "email");

  if (!email) {
    return responseError(prevState, "Email is required.");
  }

  const params = {
    url: `${process.env.ORIGIN_URL || process.env.NEXT_PUBLIC_ORIGIN_URL}/password-reset`,
  };
  const res = await safeRequest({
    method: "post",
    url: "/auth/request-password-reset",
    data: { email },
    params: params,
  });

  if (!res.success) {
    return responseError(prevState, res.error);
  }
  return {
    success: res.success,
    message: res.data?.data?.message,
  };
}

export async function passwordResetAction(
  prevState: any,
  formData: FormData,
  user: string,
  token: string,
) {
  const cook = await cookies();
  const newPassword = getFormField(formData, "password");
  const confirmPassword = getFormField(formData, "confirmPassword");

  if (!newPassword || !confirmPassword) {
    return responseError(
      prevState,
      "Password and confirm password are required.",
    );
  }

  if (newPassword !== confirmPassword) {
    return responseError(prevState, "Passwords do not match.");
  }
  const res = await safeRequest({
    method: "post",
    url: "/auth/verify-reset-password",
    data: { email: user, token, newPassword },
  });
  if (!res.success) {
    cook.set("passwordResetSuccess", "false", {
      ...cookieOptions,
      maxAge: 60,
    });

    return responseError(prevState, res.error);
  }

  cook.set("passwordResetSuccess", "true", {
    ...cookieOptions,
    maxAge: 60,
  });
  return {
    ...prevState,
    success: true,
    message: "Password reset successful.",
  };
}
