import { NextResponse } from "next/server";
import { serialize } from "cookie";

interface RefreshTokenRequest {
  refreshToken: string;
  expires?: any;
}

export async function POST(req: Request): Promise<Response> {
  const { refreshToken, expires } = (await req.json()) as RefreshTokenRequest;
  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token provided" },
      { status: 400 },
    );
  }
  const cookie = serialize("refreshToken", refreshToken, {
    expires: new Date(expires),
    secure: true,
    path: "/",
  });
  const response = NextResponse.json({ message: "Refresh token stored" });
  response.headers.set("Set-Cookie", cookie);
  return response;
}
