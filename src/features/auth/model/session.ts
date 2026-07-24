import { setRoleInStorage } from "@entities/user";
import type { AuthUserData } from "./types";

function setAuthCookies(accessToken: string, refreshToken: string): void {
  document.cookie = `accessToken=${accessToken}; path=/;`;
  document.cookie = `refreshToken=${refreshToken}; path=/;`;
}

function clearAuthCookies(): void {
  document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function persistAuthSession(data: AuthUserData): void {
  localStorage.setItem("accessToken", data.access_token);
  localStorage.setItem("refreshToken", data.refresh_token);
  localStorage.setItem("userData", JSON.stringify(data));
  setAuthCookies(data.access_token, data.refresh_token);
}

export function persistRole(roleData: unknown): void {
  const response = roleData as { status?: string; data?: unknown };
  if (response?.status === "OK" && response?.data) {
    setRoleInStorage(response.data as Parameters<typeof setRoleInStorage>[0]);
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userData");
  localStorage.removeItem("userRole");
  clearAuthCookies();
}
