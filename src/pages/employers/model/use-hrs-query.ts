"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { getHrs } from "@shared/api/hrs";
import type { HrsListParams, HrApi } from "@shared/api/hrs";

export const hrsQueryKeys = {
  all: ["hrs"] as const,
  list: (params: HrsListParams) => ["hrs", "list", params] as const,
} as const;

export interface UseHrsQueryParams {
  page: number;
  pageSize: number;
  search?: string;
  category?: string;
  country?: string;
  region?: string;
  status?: string;
}

interface UseHrsQueryResult {
  hrs: HrApi[];
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

export function useHrsQuery(
  params: UseHrsQueryParams,
  options?: Omit<
    UseQueryOptions<{ hrs: HrApi[]; total: number }>,
    "queryKey" | "queryFn"
  >
): UseHrsQueryResult {
  const {
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    search,
    category,
    country,
    region,
    status,
  } = params;

  const queryParams: HrsListParams = useMemo(
    () => ({
      page,
      page_size: pageSize,
      ...(search?.trim() && { search: search.trim() }),
      ...(category && category !== "all" && { category }),
      ...(country && country !== "all" && { country }),
      ...(region && region !== "all" && { region }),
      ...(status && status !== "all" && { status }),
    }),
    [page, pageSize, search, category, country, region, status]
  );

  const queryKey = hrsQueryKeys.list(queryParams);

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const data = await getHrs(queryParams);
      return {
        hrs: (data.hrs ?? []) as HrApi[],
        total: data.total ?? 0,
      };
    },
    ...options,
  });

  const totalPages = Math.max(1, Math.ceil((query.data?.total ?? 0) / pageSize));

  return {
    hrs: query.data?.hrs ?? [],
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
