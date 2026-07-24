import { httpClient } from "@shared/api/http-client";
import type {
  FoydalanuvchiApi,
  FoydalanuvchiCreateData,
  FoydalanuvchiUpdateData,
  FoydalanuvchilarListParams,
  FoydalanuvchilarListResponse,
} from "./types";

const ENDPOINT = "/users";

export async function getFoydalanuvchilar(
  params: FoydalanuvchilarListParams
): Promise<FoydalanuvchilarListResponse> {
  const searchParams = new URLSearchParams();

  if (params.full_name?.trim()) {
    searchParams.set("full_name", params.full_name.trim());
  }
  if (params.role?.trim()) {
    searchParams.set("role", params.role.trim());
  }
  if (params.login?.trim()) {
    searchParams.set("login", params.login.trim());
  }
  if (params.status !== undefined) {
    searchParams.set("status", String(params.status));
  }
  if (params.created_from?.trim()) {
    searchParams.set("created_from", params.created_from.trim());
  }
  if (params.created_to?.trim()) {
    searchParams.set("created_to", params.created_to.trim());
  }
  if (params.limit != null) {
    searchParams.set("limit", String(params.limit));
  }
  if (params.offset != null) {
    searchParams.set("offset", String(params.offset));
  }

  const query = searchParams.toString();
  const url = query ? `${ENDPOINT}?${query}` : ENDPOINT;

  const response = await httpClient.get<FoydalanuvchilarListResponse>(url);
  return response as FoydalanuvchilarListResponse;
}

export async function createFoydalanuvchi(
  data: FoydalanuvchiCreateData
): Promise<FoydalanuvchiApi> {
  const response = await httpClient.post<FoydalanuvchiApi>(
    `${ENDPOINT}/register`,
    data
  );
  return response as FoydalanuvchiApi;
}

export async function updateFoydalanuvchi(
  id: string,
  data: FoydalanuvchiUpdateData
): Promise<FoydalanuvchiApi> {
  const response = await httpClient.put<FoydalanuvchiApi>(
    `${ENDPOINT}/${id}`,
    data
  );
  return response as FoydalanuvchiApi;
}
