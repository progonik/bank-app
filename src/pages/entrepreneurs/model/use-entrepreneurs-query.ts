"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { getEntrepreneurs } from "@shared/api/entrepreneurs";
import type {
  EntrepreneurApi,
  EntrepreneursListParams,
} from "@shared/api/entrepreneurs";

export const entrepreneursQueryKeys = {
  all: ["entrepreneurs"] as const,
  list: (params: EntrepreneursListParams) =>
    ["entrepreneurs", "list", params] as const,
} as const;

export interface UseEntrepreneursQueryParams {
  page: number;
  pageSize: number;
  search?: string;
  innName?: string;
  activityStatus?: string;
  directorName?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface UseEntrepreneursQueryResult {
  entrepreneurs: EntrepreneurApi[];
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

export function useEntrepreneursQuery(
  params: UseEntrepreneursQueryParams,
  options?: Omit<
    UseQueryOptions<{ entrepreneurs: EntrepreneurApi[]; total: number }>,
    "queryKey" | "queryFn"
  >
): UseEntrepreneursQueryResult {
  const {
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search,
    innName,
    activityStatus,
    directorName,
    dateFrom,
    dateTo,
  } = params;

  const queryParams: EntrepreneursListParams = useMemo(
    () => ({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      ...(search?.trim() && { legal_name: search.trim() }),
      ...(innName?.trim() && { inn_name: innName.trim() }),
      ...(activityStatus === "true" && { activity_status: true }),
      ...(activityStatus === "false" && { activity_status: false }),
      ...(directorName?.trim() && { director_name: directorName.trim() }),
      ...(dateFrom?.trim() && { date_from: dateFrom.trim() }),
      ...(dateTo?.trim() && { date_to: dateTo.trim() }),
    }),
    [
      page,
      pageSize,
      search,
      innName,
      activityStatus,
      directorName,
      dateFrom,
      dateTo,
    ]
  );

  const queryKey = entrepreneursQueryKeys.list(queryParams);

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const data = await getEntrepreneurs(queryParams);
      return {
        entrepreneurs: (data.entrepreneurs ?? []) as EntrepreneurApi[],
        total: data.total ?? 0,
      };
    },
    ...options,
  });

  const totalPages = Math.max(
    1,
    Math.ceil((query.data?.total ?? 0) / pageSize)
  );

  return {
    entrepreneurs: query.data?.entrepreneurs ?? [],
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
