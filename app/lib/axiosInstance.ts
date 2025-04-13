import axios, {
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROOT_API_URL || process.env.ROOT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROOT_API_URL || process.env.ROOT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Replace axios calls to /api/auth/* with fetch
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
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    // If it's an /api/auth/* route, attach token
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
  }
);
