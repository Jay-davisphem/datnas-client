"use server";
import { redirect } from "next/navigation";
import { axiosInstance } from "../axiosInstance";
import { extractErrorMessage } from "../utils/errorUtils";
import { cookies } from "next/headers";

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

    const params = { url: "http://localhost:3000/verify-account" };

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
    // redirect('/')
  }
}