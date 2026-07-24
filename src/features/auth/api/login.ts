import { httpClient } from "@shared/api/http-client";
import type { LoginApiResponse } from "../model/types";

function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
}

export async function loginWithCredentials(
  login: string,
  password: string
): Promise<LoginApiResponse> {
  return httpClient.post<LoginApiResponse>("/users/login", {
    login,
    password,
    device_id: getDeviceId(),
  });
}

export async function fetchUserRole(): Promise<unknown> {
  return httpClient.get("/auth/my-role");
}
