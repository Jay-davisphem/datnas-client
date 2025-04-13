import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const successFlag = cookieStore.get("passwordResetSuccess");

  if (successFlag) {
    const success = successFlag.value === "true";
    cookieStore.delete("passwordResetSuccess");

    return NextResponse.json({ success });
  } else {
    return NextResponse.json({ success: null }, { status: 400 });
  }
}
