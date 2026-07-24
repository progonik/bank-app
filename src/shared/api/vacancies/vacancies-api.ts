import { httpClient } from "@shared/api/http-client";
import type {
  VacanciesListParams,
  VacanciesListResponse,
} from "./types";

const VACANCIES_ENDPOINT = "/vacancies";

/**
 * Fetches paginated list of vacancies.
 * @param params - page, page_size; optional company_id filter
 */
export async function getVacancies(
  params: VacanciesListParams
): Promise<VacanciesListResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page));
  searchParams.set("page_size", String(params.page_size));

  if (params.company_id?.trim()) {
    searchParams.set("company_id", params.company_id.trim());
  }

  const query = searchParams.toString();
  const url = query ? `${VACANCIES_ENDPOINT}?${query}` : VACANCIES_ENDPOINT;

  const response = await httpClient.get<VacanciesListResponse>(url);
  return response as VacanciesListResponse;
}
