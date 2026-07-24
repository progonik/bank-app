import { httpClient } from "@shared/api/http-client";
import type {
  EntrepreneurApi,
  EntrepreneurPostData,
  EntrepreneursListParams,
  EntrepreneursListResponse,
} from "./types";

const ENTREPRENEURS_ENDPOINT = "/entrepreneurs";

export async function getEntrepreneurs(
  params: EntrepreneursListParams
): Promise<EntrepreneursListResponse> {
  const searchParams = new URLSearchParams();

  if (params.legal_name?.trim()) {
    searchParams.set("legal_name", params.legal_name.trim());
  }
  if (params.inn_name?.trim()) {
    searchParams.set("inn_name", params.inn_name.trim());
  }
  if (params.activity_status !== undefined) {
    searchParams.set("activity_status", String(params.activity_status));
  }
  if (params.director_name?.trim()) {
    searchParams.set("director_name", params.director_name.trim());
  }
  if (params.date_from?.trim()) {
    searchParams.set("date_from", params.date_from.trim());
  }
  if (params.date_to?.trim()) {
    searchParams.set("date_to", params.date_to.trim());
  }
  if (params.limit != null) {
    searchParams.set("limit", String(params.limit));
  }
  if (params.offset != null) {
    searchParams.set("offset", String(params.offset));
  }

  const query = searchParams.toString();
  const url = query ? `${ENTREPRENEURS_ENDPOINT}?${query}` : ENTREPRENEURS_ENDPOINT;

  const response = await httpClient.get<EntrepreneursListResponse>(url);
  return response as EntrepreneursListResponse;
}

export async function getEntrepreneurById(
  id: string
): Promise<EntrepreneurApi> {
  const response = await httpClient.get<EntrepreneurApi>(
    `${ENTREPRENEURS_ENDPOINT}/${id}`
  );
  return response as EntrepreneurApi;
}

export async function createEntrepreneur(
  data: EntrepreneurPostData
): Promise<EntrepreneurApi> {
  const response = await httpClient.post<EntrepreneurApi>(
    ENTREPRENEURS_ENDPOINT,
    data
  );
  return response as EntrepreneurApi;
}

export async function updateEntrepreneur(
  id: string,
  data: Partial<EntrepreneurPostData>
): Promise<EntrepreneurApi> {
  const response = await httpClient.put<EntrepreneurApi>(
    `${ENTREPRENEURS_ENDPOINT}/${id}`,
    data
  );
  return response as EntrepreneurApi;
}

export async function deleteEntrepreneur(id: string): Promise<void> {
  await httpClient.delete(`${ENTREPRENEURS_ENDPOINT}/${id}`);
}
