"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { getVacancies } from "@shared/api/vacancies";
import type {
  VacanciesListParams,
  VacancyApi,
} from "@shared/api/vacancies";

export const vacanciesQueryKeys = {
  all: ["vacancies"] as const,
  list: (params: VacanciesListParams) =>
    ["vacancies", "list", params] as const,
} as const;

export interface UseVacanciesQueryParams {
  page: number;
  pageSize: number;
  companyId?: string;
}

interface UseVacanciesQueryResult {
  vacancies: VacancyApi[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  refetch: () => void;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 25;

export function useVacanciesQuery(
  params: UseVacanciesQueryParams,
  options?: Omit<
    UseQueryOptions<{ vacancies: VacancyApi[]; total: number }>,
    "queryKey" | "queryFn"
  >
): UseVacanciesQueryResult {
  const {
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    companyId,
  } = params;

  const queryParams: VacanciesListParams = useMemo(
    () => ({
      page,
      page_size: pageSize,
      ...(companyId?.trim() && { company_id: companyId.trim() }),
    }),
    [page, pageSize, companyId]
  );

  const queryKey = vacanciesQueryKeys.list(queryParams);

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const data = await getVacancies(queryParams);
      return {
        vacancies: data.vacancies ?? [],
        total: data.total ?? 0,
      };
    },
    ...options,
  });

  const totalPages = Math.max(1, Math.ceil((query.data?.total ?? 0) / pageSize));

  return {
    vacancies: query.data?.vacancies ?? [],
    total: query.data?.total ?? 0,
    page,
    pageSize,
    totalPages,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error instanceof Error ? query.error : null,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}
