import axios from "axios";
import Cookies from "js-cookie";

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

const setRefreshToken = async (
  refreshToken: string | undefined,
  expires?: any,
): Promise<void> => {
  try {
    await axios.post(
      "/api/auth/set-refresh-token",
      { refreshToken, expires },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );
  } catch (error) {
    console.error("Error setting refresh token:", error);
  }
};

export const getAccessToken = async (data: {
  email: string;
  password: string;
}): Promise<string | null> => {
  console.log("checking...");
  console.log(
    process.env.NEXT_PUBLIC_ROOT_API_URL,
    "process.env.NEXT_PUBLIC_ROOT_API_URL",
  );
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_ROOT_API_URL}/auth/login`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    console.log(res.data, "res.data");
    const tokenData: TokenData = res.data?.data;
    const newAccessToken = tokenData?.access?.jwt;
    const refreshToken = tokenData?.refresh?.jwt;
    const expiresAt = tokenData?.access?.expiredAt;
    const refrehTokenExpires = tokenData?.refresh.expiredAt;

    if (newAccessToken) {
      accessToken = newAccessToken;

      const expiresDate = new Date(expiresAt);

      // Check if the conversion was successful
      if (isNaN(expiresDate.getTime())) {
        console.error("Invalid expiresAt date string:", expiresAt);
        return newAccessToken; // or null, you can handle the error
      }

      // Store access token in cookies with the correct expiry Date
      Cookies.set("accessToken", newAccessToken, {
        expires: expiresDate,
        secure: true,
      });

      // Store refresh token via API
      await setRefreshToken(refreshToken, refrehTokenExpires);
    }

    return newAccessToken || null;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

export const getStoredAccessToken = (): string | null => {
  return Cookies.get("accessToken") || null;
};

export const getStoredRefreshToken = (): string | null => {
  return Cookies.get("refrehToken") || null;
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const res = await axios.post(
      "/api/auth/refresh",
      {},
      { withCredentials: true },
    );

    const tokenData = res?.data;
    const newAccessToken = tokenData?.access?.jwt;
    const newRefreshToken = tokenData?.refresh?.jwt;
    const expiresAt = tokenData?.access?.expiredAt;

    if (newAccessToken) {
      accessToken = newAccessToken;

      const expiresDate = new Date(expiresAt);

      if (isNaN(expiresDate.getTime())) {
        console.error("Invalid expiresAt date string:", expiresAt);
        return newAccessToken;
      }

      Cookies.set("accessToken", newAccessToken, {
        expires: expiresDate,
        secure: true,
      });

      await setRefreshToken(newRefreshToken, tokenData?.refresh?.jwt);
      return newAccessToken;
    }

    return null;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};
