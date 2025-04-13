"use server";

import { safeRequest } from "../axiosInstance";
import { cookies } from "next/headers";
import { getOrigin } from "../utils/getOrigin";

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

function responseError(prevState: any, message: string, error?: string) {
  return {
    ...prevState,
    success: false,
    message,
    error,
  };
}

// --- Actions ---

export async function signUpAction(prevState: any, formData: FormData) {
  try {
    const password = getFormField(formData, "password");
    const confirmPassword = getFormField(formData, "confirmPassword");

    if (password !== confirmPassword) {
      return responseError(prevState, "Passwords do not match.");
    }

    const fullName = getFormField(formData, "fullName");
    const email = getFormField(formData, "email");

    const body = { fullName, email, password };
    const params = { url: `${getOrigin()}/verify-account` };

    await safeRequest({
      method: "post",
      url: "/auth/register",
      data: body,
      params: params,
    });

    return { email };
  } catch (err: any) {
    return responseError(prevState, "Registration failed.", err);
  }
}

export async function resendVerification(email: string, key: string) {
  try {
    const response = await safeRequest({
      method: "post",
      url: "/auth/activate-user",
      data: { email, key },
    });

    return response; // Already structured with { success, data }
  } catch (error: any) {
    return {
      success: false,
      error,
    };
  }
}

export async function signInAction(prevState: any, formData: FormData) {
  const cook = await cookies();
  try {
    const email = getFormField(formData, "email");
    const password = getFormField(formData, "password");

    if (!email || !password) {
      return responseError(
        prevState,
        "Sign in failed.",
        "Email and password are required.",
      );
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
      return responseError(prevState, "Sign in failed.", res.error);
    }

    cook.set("accessToken", accessToken, {
      ...cookieOptions,
      expires: accessTokenExpires,
    });

    cook.set("refreshToken", refreshToken, {
      ...cookieOptions,
      expires: refreshTokenExpires,
    });

    return {
      ...prevState,
      success: true,
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    return responseError(prevState, "Sign in failed.", error);
  }
}

export async function passwordResetRequestAction(
  prevState: any,
  formData: FormData,
) {
  try {
    const email = getFormField(formData, "email");

    if (!email) {
      return responseError(
        prevState,
        "Password reset request failed.",
        "Email is required.",
      );
    }

    const params = { url: `${getOrigin()}/password-reset` };
    await safeRequest({
      method: "post",
      url: "/auth/request-password-reset",
      data: { email },
      params: params,
    });

    return {
      ...prevState,
      success: true,
      message: "Password reset link sent to your email.",
    };
  } catch (error: any) {
    return responseError(prevState, "Password reset request failed.", error);
  }
}

export async function passwordResetAction(
  prevState: any,
  formData: FormData,
  user: string,
  token: string,
) {
  const cook = await cookies();
  try {
    const newPassword = getFormField(formData, "password");
    const confirmPassword = getFormField(formData, "confirmPassword");

    if (!newPassword || !confirmPassword) {
      return responseError(
        prevState,
        "Password reset failed.",
        "Password and confirm password are required.",
      );
    }

    if (newPassword !== confirmPassword) {
      return responseError(
        prevState,
        "Password reset failed.",
        "Passwords do not match.",
      );
    }

    await safeRequest({
      method: "post",
      url: "/auth/verify-reset-password",
      data: { email: user, token, newPassword },
    });

    cook.set("passwordResetSuccess", "true", {
      ...cookieOptions,
      maxAge: 60,
    });

    return {
      ...prevState,
      success: true,
      message: "Password reset successful.",
    };
  } catch (error: any) {
    cook.set("passwordResetSuccess", "false", {
      ...cookieOptions,
      maxAge: 60,
    });

    return responseError(prevState, "Password reset failed.", error);
  }
}
