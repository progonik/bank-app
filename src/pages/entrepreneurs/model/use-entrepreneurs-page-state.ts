"use client";

import { useCallback, useState } from "react";
import { getEntrepreneurById } from "@shared/api/entrepreneurs";
import type { EntrepreneurApi } from "@shared/api/entrepreneurs";
import { errorToast } from "@shared/lib/toast";
import { DEFAULT_PAGE_SIZE } from "./constants";
import {
  loadVisibleColumns,
  saveVisibleColumns,
} from "./visible-columns-storage";

export function useEntrepreneursPageState() {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [ifutCode, setIfutCode] = useState("");
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [entrepreneurToEdit, setEntrepreneurToEdit] =
    useState<EntrepreneurApi | null>(null);
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);
  const [visibleColumns, setVisibleColumnsState] = useState<Set<string>>(
    loadVisibleColumns
  );

  const setVisibleColumns = useCallback(
    (value: Set<string> | ((prev: Set<string>) => Set<string>)) => {
      setVisibleColumnsState((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        saveVisibleColumns(next);
        return next;
      });
    },
    []
  );

  const resetToFirstPage = useCallback(() => setPage(1), []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleDateFromChange = useCallback((value: string) => {
    setDateFrom(value);
    setPage(1);
  }, []);

  const handleDateToChange = useCallback((value: string) => {
    setDateTo(value);
    setPage(1);
  }, []);

  const handleIfutCodeChange = useCallback((value: string) => {
    setIfutCode(value);
    setPage(1);
  }, []);

  const handleCityChange = useCallback((value: string) => {
    setCity(value);
    setPage(1);
  }, []);

  const handleLimitChange = useCallback((limit: number) => {
    setPageSize(limit);
    setPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setDateFrom("");
    setDateTo("");
    setIfutCode("");
    setCity("");
    setSearch("");
    setPage(1);
  }, []);

  const handleAddSuccess = useCallback(() => {
    setAddDialogOpen(false);
  }, []);

  const handleCloseAddDialog = useCallback(() => {
    setAddDialogOpen(false);
  }, []);

  const [isEditLoading, setIsEditLoading] = useState(false);

  const handleOpenEditDialog = useCallback(async (entrepreneur: EntrepreneurApi) => {
    setIsEditLoading(true);
    try {
      const fresh = await getEntrepreneurById(entrepreneur.id);
      setEntrepreneurToEdit(fresh);
      setEditDialogOpen(true);
    } catch {
      errorToast("Error");
    } finally {
      setIsEditLoading(false);
    }
  }, []);

  const handleCloseEditDialog = useCallback(() => {
    setEditDialogOpen(false);
    setEntrepreneurToEdit(null);
  }, []);

  return {
    search,
    dateFrom,
    dateTo,
    ifutCode,
    city,
    page,
    pageSize,
    addDialogOpen,
    visibleColumns,
    setSearch,
    setDateFrom,
    setDateTo,
    setIfutCode,
    setCity,
    setPage,
    setPageSize,
    setAddDialogOpen,
    editDialogOpen,
    setEditDialogOpen,
    entrepreneurToEdit,
    isEditLoading,
    handleOpenEditDialog,
    handleCloseEditDialog,
    filterPopoverOpen,
    setFilterPopoverOpen,
    setVisibleColumns,
    resetToFirstPage,
    handleSearchChange,
    handleDateFromChange,
    handleDateToChange,
    handleIfutCodeChange,
    handleCityChange,
    handleLimitChange,
    handleClearFilters,
    handleAddSuccess,
    handleCloseAddDialog,
  };
}
