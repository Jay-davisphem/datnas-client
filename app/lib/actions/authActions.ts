"use server";
import { redirect } from "next/navigation";
import { axiosInstance } from "../axiosInstance";
import { extractErrorMessage } from "../utils/errorUtils";
import { cookies } from "next/headers";
import { getOrigin } from "../utils/getOrigin";

export async function signUpAction(prevState: any, formData: FormData) {
  try {
    if (formData.get("password") !== formData.get("confirmPassword")) {
      console.log("Passwords do not match.");
      return { error: "Passwords do not match." };
    }

    const body = {
      fullName: formData.get("fullName")?.toString(),
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
    };

    const params = { url: `${getOrigin()}/verify-account` };

    await axiosInstance.post("/auth/register", body, { params });

    return { email: body.email };
  } catch (err: any) {
    return {
      error: extractErrorMessage(err),
      message: "Registration failed.",
    };
  }
}

export async function resendVerification(email: string, key: string) {
  try {
    const res = await axiosInstance.post("/auth/activate-user", { email, key });
    return { success: true, data: res.data };
  } catch (error: any) {
    return {
      success: false,
      error: extractErrorMessage(error),
    };
  }
}

export async function signInAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return {
        ...prevState,
        error: "Email and password are required.",
        message: "Sign in failed.",
      };
    }

    const res = await axiosInstance.post("/auth/login", { email, password });

    const accessToken = res.data?.data?.access?.jwt;
    const accessTokenExpires = new Date(res.data?.data?.access?.expiredAt);
    const refreshToken = res.data?.data?.refresh?.jwt;
    const refreshTokenExpires = new Date(res.data?.data?.refresh?.expiredAt);

    if (!accessToken || !refreshToken) {
      return {
        ...prevState,
        error: "Tokens not found in response.",
        message: "Sign in failed.",
      };
    }

    const cook = await cookies();

    await cook.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: accessTokenExpires,
    });

    await cook.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: refreshTokenExpires,
    });

    // Return the tokens for the client-side context update
    return {
      ...prevState,
      accessToken,
      refreshToken,
      success: true,
    };
  } catch (error: any) {
    return {
      ...prevState,
      error: extractErrorMessage(error),
      message: "Sign in failed.",
    };
  }
}


export async function passwordResetRequestAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email")?.toString();

    if (!email) {
      return {
        ...prevState,
        error: "Email is required.",
        message: "Password reset request failed.",
      };
    }

    const params = { url: `${getOrigin()}/password-reset` };
    await axiosInstance.post("/auth/request-password-reset", { email }, { params });

    return {
      ...prevState,
      success: true,
      message: "Password reset link sent to your email.",
    };
  } catch (error: any) {
    return {
      ...prevState,
      error: extractErrorMessage(error),
      message: "Password reset request failed.",
    };
  }
}

export async function passwordResetAction(
  prevState: any,
  formData: FormData,
  user: string,
  token: string
) {
  const cook = await cookies()
  try {
    const newPassword = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    if (!newPassword || !confirmPassword) {
      return {
        ...prevState,
        error: "Password and confirm password are required.",
        message: "Password reset failed.",
        success: false,
      };
    }

    if (newPassword !== confirmPassword) {
      return {
        ...prevState,
        error: "Passwords do not match.",
        message: "Password reset failed.",
        success: false,
      };
    }

    await axiosInstance.post("/auth/verify-reset-password", {
      email: user,
      token,
      newPassword,
    });
    cook.set("passwordResetSuccess", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60, // cookie expires in 60 seconds.
    });

    return {
      ...prevState,
      success: true,
      message: "Password reset successful.",
    };
  } catch (error: any) {
    cook.set("passwordResetSuccess", "false", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60, // cookie expires in 60 seconds.
    });

    return {
      ...prevState,
      error: extractErrorMessage(error),
      message: "Password reset failed.",
      success: false,
    };
  }
}