import { httpClient } from "@shared/api/http-client";
import type {
  CityApi,
  CityCreateData,
  CitiesListParams,
  CitiesListResponse,
} from "./types";

const ENDPOINT = "/cities";

export async function getCities(
  params: CitiesListParams
): Promise<CitiesListResponse> {
  const searchParams = new URLSearchParams();

  if (params.name?.trim()) {
    searchParams.set("name", params.name.trim());
  }
  if (params.limit != null) {
    searchParams.set("limit", String(params.limit));
  }
  if (params.offset != null) {
    searchParams.set("offset", String(params.offset));
  }

  const query = searchParams.toString();
  const url = query ? `${ENDPOINT}?${query}` : ENDPOINT;

  const response = await httpClient.get<CitiesListResponse>(url);
  return response as CitiesListResponse;
}

export async function getCityById(id: string): Promise<CityApi> {
  const response = await httpClient.get<CityApi>(`${ENDPOINT}/${id}`);
  return response as CityApi;
}

export async function createCity(data: CityCreateData): Promise<CityApi> {
  const response = await httpClient.post<CityApi>(ENDPOINT, data);
  return response as CityApi;
}

export async function updateCity(
  id: string,
  data: CityCreateData
): Promise<CityApi> {
  const response = await httpClient.put<CityApi>(`${ENDPOINT}/${id}`, data);
  return response as CityApi;
}

export async function deleteCity(id: string): Promise<void> {
  await httpClient.delete(`${ENDPOINT}/${id}`);
}
