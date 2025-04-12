import axios, {
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getStoredAccessToken, refreshAccessToken } from "./authServices";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROOT_API_URL || process.env.ROOT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const authAxiosInstance = axiosInstance;

// Request Interceptor: Attach access token from cookies (not login function)
authAxiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const token = getStoredAccessToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Refresh token on 401 and retry request
authAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    console.log(error.response?.data, "checking it");
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken && originalRequest.headers) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return authAxiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
