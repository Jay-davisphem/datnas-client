import axios, {
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { extractErrorMessage } from "./utils/errorUtils";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROOT_API_URL || process.env.ROOT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROOT_API_URL || process.env.ROOT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function fetchAuthToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/tokens", {
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.accessToken;
  } catch {
    return null;
  }
}
authAxiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const token = await fetchAuthToken();

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config; // 🛠️ Always return the config
  },
  (error) => Promise.reject(error),
);

// 🎯 Refresh on 401 ONLY for /api/auth/*
authAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        const newAccessToken = await fetchAuthToken();

        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return authAxiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        await fetch("/api/auth/logout", {
          method: "DELETE",
          credentials: "include",
        });

        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

async function safeRequestWithTimeout(
  axiosInstance: any,
  config: AxiosRequestConfig,
  retries: number = 1,
): Promise<{ success: boolean; data?: any; error?: string }> {
  let attempts = 0;

  while (attempts <= retries) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await axiosInstance.request({
        ...config,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return { success: true, data: response.data };
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.log(error?.request, "my error request");
      if (error?.code === "ERR_CANCELED" || error?.__CANCEL__) {
        console.log(`Request timed out (Attempt ${attempts + 1}). Retrying...`);
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
        continue;
      } else {
        return { success: false, error: extractErrorMessage(error) };
      }
    }
  }

  return {
    success: false,
    error: "Request failed after multiple retries due to timeouts.",
  };
}

async function safeRequest(config: AxiosRequestConfig) {
  return await safeRequestWithTimeout(axiosInstance, config);
}

async function safeAuthRequest(config: AxiosRequestConfig) {
  return await safeRequestWithTimeout(authAxiosInstance, config);
}

export { authAxiosInstance, axiosInstance, safeRequest, safeAuthRequest };
