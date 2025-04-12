"use server";

import { axiosInstance } from "../axiosInstance";

export async function signUpAction(prevState: any, formData: FormData) {

  try {
    if (formData.get("password") !== formData.get("confirmPassword")) {
        console.log("Passwords do not match.")
        return { error: "Passwords do not match." };
    }

    const body = {
      fullName: formData.get("fullName")?.toString(),

      email: formData.get("email")?.toString(),

      password: formData.get("password")?.toString(),
    };

    const params = { url: "http://localhost:3000/verify-acccount" };

    const res = await axiosInstance.post("/auth/register", body, { params });

    console.log(res, "my res");

    return { success: res.data, message: "Registration successful." };
  } catch (err: any) {
    return {
      error: err.response?.data?.error?.message || err.response?.data?.error?.details || err.message,
      message: "Registration failed.",
    };
  }
}
