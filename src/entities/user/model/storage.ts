import type { UserData, UserRoleData } from "./types";

const STORAGE_KEYS = {
  USER_DATA: "userData",
  USER_ROLE: "userRole",
} as const;

export function getUserDataFromStorage(): UserData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return raw ? (JSON.parse(raw) as UserData) : null;
  } catch {
    return null;
  }
}

export function getRoleFromStorage(): UserRoleData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return raw ? (JSON.parse(raw) as UserRoleData) : null;
  } catch {
    return null;
  }
}

export function setRoleInStorage(role: UserRoleData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, JSON.stringify(role));
  }
}

export function clearAuthStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
}
