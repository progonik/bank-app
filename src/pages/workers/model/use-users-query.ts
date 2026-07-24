"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { getUsers } from "@shared/api/users";
import type { UsersListParams } from "@shared/api/users";
import { mapApiUserToWorker } from "@entities/worker";
import type { Worker } from "@entities/worker";
import type { Language } from "@shared/lib/i18n";

export const usersQueryKeys = {
  all: ["users"] as const,
  list: (params: UsersListParams) =>
    ["users", "list", params] as const,
} as const;

export interface UseUsersQueryParams {
  page: number;
  pageSize: number;
  lang: Language;
  search?: string;
  category?: string;
  country?: string;
  region?: string;
  status?: string;
}

interface UseUsersQueryResult {
  workers: Worker[];
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
const DEFAULT_PAGE_SIZE = 20;

export function useUsersQuery(
  params: UseUsersQueryParams,
  options?: Omit<
    UseQueryOptions<{ workers: Worker[]; total: number }>,
    "queryKey" | "queryFn"
  >
): UseUsersQueryResult {
  const {
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    lang,
    search = "",
    category,
    country,
    region,
    status,
  } = params;

  const queryParams: UsersListParams = useMemo(
    () => ({
      page,
      page_size: pageSize,
      lang,
      ...(search?.trim() && { search: search.trim() }),
      ...(category && category !== "all" && { category }),
      ...(country && country !== "all" && { country }),
      ...(region && region !== "all" && { region }),
      ...(status && status !== "all" && { status }),
    }),
    [page, pageSize, lang, search, category, country, region, status]
  );

  const queryKey = usersQueryKeys.list(queryParams);

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const data = await getUsers(queryParams);
      const workers: Worker[] = (data.users ?? []).map(mapApiUserToWorker);
      return {
        workers,
        total: data.total ?? 0,
      };
    },
    ...options,
  });

  const totalPages = Math.max(1, Math.ceil((query.data?.total ?? 0) / pageSize));

  return {
    workers: query?.users ?? [],
    total: query?.total ?? 0,
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
