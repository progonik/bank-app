import { httpClient } from "@shared/api/http-client";
import type { HrsListParams, HrsListResponse } from "./types";

const HRS_ENDPOINT = "/hrs";

/**
 * Fetches paginated list of company HRs.
 * @param params - page, page_size; optional filters (search, category, country, region, status)
 */
export async function getHrs(
  params: HrsListParams
): Promise<HrsListResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page));
  searchParams.set("page_size", String(params.page_size));

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
  const url = query ? `${HRS_ENDPOINT}?${query}` : HRS_ENDPOINT;

  const response = await httpClient.get<HrsListResponse>(url);
  return response as HrsListResponse;
}
