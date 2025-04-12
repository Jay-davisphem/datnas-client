import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(): Promise<Response> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token found" },
      { status: 401 },
    );
  }

  try {
    const response = await axios.post(
      `${process.env.ROOT_API_URL}/auth/refresh-token`,
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const newAccessToken = response.data?.data?.access;
    const newRefreshToken = response.data?.data?.refresh;
    return NextResponse.json({
      access: newAccessToken,
      refresh: newRefreshToken,
    });
  } catch (error: unknown) {
    console.error("Failed to refresh token:", error);
    return NextResponse.json(
      { error: "Token refresh failed" },
      { status: 401 },
    );
  }
}
