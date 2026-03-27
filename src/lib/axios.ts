import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://productionyetzuapi.yetzu.com";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export const api = axios.create({
  baseURL: BASE_URL,
  headers: DEFAULT_HEADERS,
});

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: DEFAULT_HEADERS,
});

type RefreshResponse = {
  data?: {
    access_token?: string;
    refresh_token?: string;
  };
};

const clearAuthCookies = () => {
  Cookies.remove("jwtToken");
  Cookies.remove("refreshToken");
  Cookies.remove("isUserLoggedIn");
  Cookies.remove("userId");
};

export const fetchAndSetUserProfile = async () => {
  try {
    const { data } = await authApi.get("/api/identityapi/v1/auth/me");

    if (data?.user?.id) {
      Cookies.set("userId", data.user.id, {
        secure: true,
        sameSite: "strict",
      });
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    throw error;
  }
};

authApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const jwtToken = Cookies.get("jwtToken");
    const userId = Cookies.get("userId");

    config.headers = config.headers ?? new AxiosHeaders();

    if (jwtToken) {
      config.headers.set("Authorization", `Bearer ${jwtToken}`);
    }

    if (userId) {
      config.headers.set("x-user-id", userId);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response?.status === 401;
    const isRefreshCall =
      originalRequest.url?.includes("/identityapi/v1/auth/refresh") ||
      originalRequest.url?.includes("/api/identityapi/v1/auth/refresh");

    if (isUnauthorized && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");

      try {
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const { data } = await api.post<RefreshResponse>(
          "/api/identityapi/v1/auth/refresh",
          {
            refreshToken,
          }
        );

        const newAccessToken = data?.data?.access_token;
        const newRefreshToken = data?.data?.refresh_token;

        if (!newAccessToken) {
          throw new Error("No new access token received");
        }

        Cookies.set("jwtToken", newAccessToken, {
          secure: true,
          sameSite: "strict",
        });

        if (newRefreshToken) {
          Cookies.set("refreshToken", newRefreshToken, {
            secure: true,
            sameSite: "strict",
          });
        }

        Cookies.set("isUserLoggedIn", "true", {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });

        originalRequest.headers = originalRequest.headers ?? new AxiosHeaders();
        originalRequest.headers.set(
          "Authorization",
          `Bearer ${newAccessToken}`
        );

        return authApi(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed → redirecting to login", refreshError);

        clearAuthCookies();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
