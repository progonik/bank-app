"use client";

import { useMemo, useState, useCallback } from "react";
import { DEFAULT_PAGE_SIZE } from "./constants";

interface UseWorkersPaginationParams {
  totalItems: number;
  initialPageSize?: number;
}

export function useWorkersPagination({
  totalItems,
  initialPageSize = DEFAULT_PAGE_SIZE,
}: UseWorkersPaginationParams) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginate = useCallback(
    <T>(items: T[]): T[] => {
      const start = (currentPage - 1) * pageSize;
      return items.slice(start, start + pageSize);
    },
    [currentPage, pageSize]
  );

  const handlePageChange = useCallback(
    (newPage: number) => setPage(Math.max(1, Math.min(totalPages, newPage))),
    [totalPages]
  );

  const handleLimitChange = useCallback((newLimit: number) => {
    setPageSize(newLimit);
    setPage(1);
  }, []);

  return {
    page: currentPage,
    pageSize,
    totalPages,
    setPage: handlePageChange,
    setPageSize: handleLimitChange,
    paginate,
  };
}
