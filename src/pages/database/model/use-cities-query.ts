"use client";

import { useQuery } from "@tanstack/react-query";
import { getCities, type CitiesListParams } from "@shared/api/cities";

export const citiesQueryKeys = {
  all: ["cities"] as const,
  list: (params: CitiesListParams) =>
    [...citiesQueryKeys.all, "list", params] as const,
};

export interface UseCitiesQueryParams {
  readonly page: number;
  readonly pageSize: number;
  readonly search?: string;
}

export function useCitiesQuery(params: UseCitiesQueryParams) {
  const offset = (params.page - 1) * params.pageSize;

  const apiParams: CitiesListParams = {
    limit: params.pageSize,
    offset,
    ...(params.search?.trim() ? { name: params.search.trim() } : {}),
  };

  const query = useQuery({
    queryKey: citiesQueryKeys.list(apiParams),
    queryFn: () => getCities(apiParams),
  });

  const cities = query.data?.cities ?? [];
  const total = query.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / params.pageSize));

  return {
    cities,
    total,
    totalPages,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
