import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useUserStore } from "../stores/userStore.ts";

// Extend the InternalAxiosRequestConfig to include _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

const getUserStore = (): {
  state: {
    token: { accessToken: string, refreshToken: string },
    user: { id: number, email: string, authorities: string },
    isAuthenticated: boolean
  },
  version: number
} | null => {
  const stateString = localStorage.getItem("user store");
  if (stateString) {
    try {
      return JSON.parse(stateString);
    } catch (error) {
      console.error("Error parsing state from local storage", error);
      return null;
    }
  }
  return null;
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const userStore = getUserStore();
    console.log(userStore);
    if (userStore.state.isAuthenticated) {
      config.headers["Authorization"] = `Bearer ${userStore.state.token.accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError) => {
    const userStore = useUserStore();
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosInstance.post("/auth/refreshToken", {
          refreshToken: userStore.token.refreshToken
        });

        const newAccessToken = refreshResponse.data.accessToken;
        userStore.addToken({
          accessToken: newAccessToken,
          refreshToken: userStore.token.refreshToken
        });

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        userStore.removeUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
