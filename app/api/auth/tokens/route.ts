import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cook = await cookies();
    const accessToken = cook.get("accessToken")?.value;
    const refreshToken = cook.get("refreshToken")?.value;

    if (!accessToken) {
      return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json({ accessToken, refreshToken });
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
