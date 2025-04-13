import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { axiosInstance } from "@/app/lib/axiosInstance";

export async function POST() {
  try {
    const cook = await cookies();
    const refreshToken = cook.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token missing" }, { status: 401 });
    }

    const res = await axiosInstance.post('/auth/refresh-token', {
      refreshToken: refreshToken,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { access, refresh } = res.data?.data;

    // Set the new tokens
    cook.set("accessToken", access.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(access.expiredAt),
    });

    cook.set("refreshToken", refresh.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(refresh.expiredAt),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Token refresh failed" }, { status: 401 });
  }
}

