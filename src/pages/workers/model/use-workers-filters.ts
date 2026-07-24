"use client";

import { useMemo } from "react";
import { MOCK_WORKERS } from "@entities/worker";
import type { Worker } from "@entities/worker";
import { FILTER_ALL } from "./constants";

export interface WorkersFilters {
  search: string;
  category: string;
  country: string;
  region: string;
  status: string;
}

interface UseWorkersFiltersParams {
  search: string;
  categoryFilter: string;
  countryFilter: string;
  regionFilter: string;
  statusFilter: string;
}


function matchesSearch(worker: Worker, search: string): boolean {
  if (!search.trim()) return true;
  const q = search.toLowerCase();
  return (
    worker.fullName.toLowerCase().includes(q) ||
    worker.phone.includes(search) ||
    worker.telegram.toLowerCase().includes(q)
  );
}

export function useWorkersFilters(
  params: UseWorkersFiltersParams
): Worker[] {
  const { search, categoryFilter, countryFilter, regionFilter, statusFilter } = params;

  return useMemo(() => {
    return MOCK_WORKERS.filter((worker) => {
      if (!matchesSearch(worker, search)) return false;
      if (categoryFilter !== FILTER_ALL && !worker.categories.includes(categoryFilter)) return false;
      if (countryFilter !== FILTER_ALL && worker.country !== countryFilter) return false;
      if (regionFilter !== FILTER_ALL && worker.region !== regionFilter) return false;
      if (statusFilter !== FILTER_ALL && worker.status !== statusFilter) return false;
      return true;
    });
  }, [search, categoryFilter, countryFilter, regionFilter, statusFilter]);
}
