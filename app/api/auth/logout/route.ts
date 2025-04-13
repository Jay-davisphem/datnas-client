import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  const cook = await cookies();

  cook.delete("accessToken");
  cook.delete("refreshToken");

  return NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });
}
