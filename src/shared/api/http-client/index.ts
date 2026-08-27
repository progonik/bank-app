import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ddd.hijack.uz/api/v1";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((p) => {
    if (token) p.resolve(token);
    else p.reject(error);
  });
  failedQueue = [];
}

function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
}

function persistTokens(accessToken: string, refreshToken: string, deviceId?: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  if (deviceId) {
    localStorage.setItem("deviceId", deviceId);
  }
  document.cookie = `accessToken=${accessToken}; path=/;`;
  document.cookie = `refreshToken=${refreshToken}; path=/;`;
}

function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("deviceId");
  localStorage.removeItem("userData");
  localStorage.removeItem("userRole");
  document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

const createHttpClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 100_000,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token && config.headers) {
          (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    async (error) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status !== 401 || typeof window === "undefined") {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        clearTokens();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        clearTokens();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              (originalRequest.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
              resolve(client(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${BASE_URL}/users/refresh`, {
          device_id: getDeviceId(),
          refresh_token: refreshToken,
        });

        const data = response.data;
        const newAccessToken = data.access_token ?? data.data?.access_token;
        const newRefreshToken = data.refresh_token ?? data.data?.refresh_token ?? refreshToken;
        const newDeviceId = data.device_id ?? data.data?.device_id;

        if (!newAccessToken) {
          throw new Error("No access token in refresh response");
        }

        persistTokens(newAccessToken, newRefreshToken, newDeviceId);
        processQueue(null, newAccessToken);

        (originalRequest.headers as Record<string, string>)["Authorization"] = `Bearer ${newAccessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );

  return client;
};

export const httpClient = createHttpClient();
export { BASE_URL };
