import { httpClient } from "@shared/api/http-client";
import type { UserApi, UsersListParams, UsersListResponse } from "./types";

const USERS_ENDPOINT = "/users";

/**
 * Fetches paginated list of users.
 * @param params - page, page_size, lang; optional filters (search, category, country, region, status)
 */
export async function getUsers(params: UsersListParams): Promise<UsersListResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page));
  searchParams.set("page_size", String(params.page_size));
  searchParams.set("lang", params.lang);

  if (params.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }
  if (params.category && params.category !== "all") {
    searchParams.set("category", params.category);
  }
  if (params.country && params.country !== "all") {
    searchParams.set("country", params.country);
  }
  if (params.region && params.region !== "all") {
    searchParams.set("region", params.region);
  }
  if (params.status && params.status !== "all") {
    searchParams.set("status", params.status);
  }

  const query = searchParams.toString();
  const url = query ? `${USERS_ENDPOINT}?${query}` : USERS_ENDPOINT;

  const response = await httpClient.get<UsersListResponse>(url);
  return response as UsersListResponse;
}

export interface GetUserByIdParams {
  readonly id: string;
  readonly lang: string;
}

/**
 * Fetches a single user by ID with full profile.
 */
export async function getUserById(params: GetUserByIdParams): Promise<UserApi> {
  const { id, lang } = params;
  const searchParams = new URLSearchParams();
  searchParams.set("lang", lang);
  const query = searchParams.toString();
  const url = `/users/${id}${query ? `?${query}` : ""}`;
  const response = await httpClient.get<UserApi>(url);
  return response as UserApi;
}
