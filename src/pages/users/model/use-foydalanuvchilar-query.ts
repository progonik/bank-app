import { useQuery } from "@tanstack/react-query";
import {
  getFoydalanuvchilar,
  type FoydalanuvchilarListParams,
} from "@shared/api/foydalanuvchilar";
import type { FoydalanuvchiRow } from "./types";

export const foydalanuvchilarQueryKeys = {
  all: ["foydalanuvchilar"] as const,
  list: (params: FoydalanuvchilarListParams) =>
    [...foydalanuvchilarQueryKeys.all, "list", params] as const,
};

export interface UseFoydalanuvchilarQueryParams {
  readonly page: number;
  readonly pageSize: number;
  readonly search?: string;
}

function mapToRow(
  api: { id: string; full_name: string; login: string; role: string; status: boolean; created_at: string }
): FoydalanuvchiRow {
  return {
    id: api.id,
    fullName: api.full_name,
    role: api.role,
    login: api.login,
    createdAt: api.created_at,
    status: api.status,
  };
}

export function useFoydalanuvchilarQuery(params: UseFoydalanuvchilarQueryParams) {
  const offset = (params.page - 1) * params.pageSize;

  const apiParams: FoydalanuvchilarListParams = {
    limit: params.pageSize,
    offset,
    ...(params.search?.trim() ? { full_name: params.search.trim() } : {}),
  };

  const query = useQuery({
    queryKey: foydalanuvchilarQueryKeys.list(apiParams),
    queryFn: () => getFoydalanuvchilar(apiParams),
  });

  const rows: FoydalanuvchiRow[] = query.data?.users?.map(mapToRow) ?? [];
  const total = query.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / params.pageSize));

  return {
    rows,
    total,
    totalPages,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
