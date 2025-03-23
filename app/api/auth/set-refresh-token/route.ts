import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

interface RefreshTokenRequest {
  refreshToken: string;
}

export async function POST(req: Request): Promise<Response> {
  const { refreshToken } = (await req.json()) as RefreshTokenRequest;
  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token provided' }, { status: 400 });
  }
  const cookie = serialize('refreshToken', refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    path: '/',
  });
  const response = NextResponse.json({ message: 'Refresh token stored' });
  response.headers.set('Set-Cookie', cookie);
  return response;
}
