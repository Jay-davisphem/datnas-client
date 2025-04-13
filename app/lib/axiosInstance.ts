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

// Request Interceptor: Attach the access token to the request headers
authAxiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const res = await axios.get("/api/auth/tokens", { withCredentials: true });

    const { accessToken } = res.data;

    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
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
    
    // If the response status is 401 (Unauthorized) and the request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        await axios.post("/api/auth/refresh", {}, { withCredentials: true });

        // If refresh is successful, get new tokens
        const res = await axios.get("/api/auth/tokens", { withCredentials: true });
        const { accessToken } = res.data;

        if (accessToken && originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return authAxiosInstance(originalRequest); // Retry the original request with the new access token
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        await axios.delete("/api/auth/logout");

        
        window.location.href = '/sign-in';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // If it's not a 401 or the refresh failed
  }
);
