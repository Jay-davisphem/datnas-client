import axios from 'axios';
import Cookies from 'js-cookie';

let accessToken: string | null = null;

interface TokenData {
  access: {
    jwt: string;
    expiredAt: string; // Format: ISO string or timestamp
  };
  refresh: {
    jwt: string;
    expiredAt: string;
  };
}

const setRefreshToken = async (refreshToken: string | undefined): Promise<void> => {
  try {
    await axios.post(
      '/api/auth/set-refresh-token',
      { refreshToken },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error('Error setting refresh token:', error);
  }
};

export const getAccessToken = async (data: { email: string; password: string }): Promise<string | null> => {
  console.log('checking...')
  console.log(process.env.NEXT_PUBLIC_ROOT_API_URL, 'process.env.NEXT_PUBLIC_ROOT_API_URL')
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ROOT_API_URL}/auth/login`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.data, 'res.data')
    const tokenData: TokenData = res.data?.data;
    const newAccessToken = tokenData?.access?.jwt;
    const refreshToken = tokenData?.refresh?.jwt;
    const expiresAt = tokenData?.access?.expiredAt;

    if (newAccessToken) {
      accessToken = newAccessToken;

      // Convert expiresAt to a Date object (assuming expiredAt is an ISO string)
      const expiresInSeconds = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000);
      const expiresInDays = expiresInSeconds / (60 * 60 * 24);

      // Store access token in cookies
      Cookies.set('accessToken', newAccessToken, { expires: expiresInDays, secure: true });

      // Store refresh token via API
      await setRefreshToken(refreshToken);
    }

    return newAccessToken || null;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const getStoredAccessToken = (): string | null => {
  return Cookies.get('accessToken') || null;
};

export const  refreshAccessToken = async (): Promise<string | null> => {
  try {
    const res = await axios.post('/api/auth/refresh', {}, { withCredentials: true });

    const tokenData = res.data?.data;
    const newAccessToken = tokenData?.access?.jwt;
    const expiresAt = tokenData?.access?.expiredAt;

    if (newAccessToken) {
      accessToken = newAccessToken;

      // Convert expiresAt to expiration time for cookies
      const expiresInSeconds = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000);
      const expiresInDays = expiresInSeconds / (60 * 60 * 24);

      Cookies.set('accessToken', newAccessToken, { expires: expiresInDays, secure: true });

      return newAccessToken;
    }

    return null;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};
