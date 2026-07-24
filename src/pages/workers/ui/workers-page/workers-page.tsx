"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createTranslator } from "@shared/lib/i18n";
import { useI18nStore } from "@shared/lib/i18n";
import { Button, ColumnVisibilityFilter, DataTable, PageTableHeader } from "@shared/ui";
import type { Worker } from "@entities/worker";
import { WorkersFiltersBar } from "../workers-filters-bar";
import { WorkersRowActions } from "../workers-row-actions";
import {
  useUsersQuery,
  createWorkersColumns,
  FILTER_ALL,
  PAGE_SIZES,
  DEFAULT_PAGE_SIZE,
} from "../../model";

export function WorkersPage() {
  const language = useI18nStore((s) => s.language);
  const t = createTranslator(language);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>(FILTER_ALL);
  const [countryFilter, setCountryFilter] = useState<string>(FILTER_ALL);
  const [regionFilter, setRegionFilter] = useState<string>(FILTER_ALL);
  const [statusFilter, setStatusFilter] = useState<string>(FILTER_ALL);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() =>
    new Set(["user", "phoneTelegram", "category", "salary", "tariff", "country", "region", "registration", "status"])
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    workers,
    total,
    totalPages,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useUsersQuery({
    page,
    pageSize,
    lang: language,
    search,
    category: categoryFilter,
    country: countryFilter,
    region: regionFilter,
    status: statusFilter,
  });

  const handleDocumentUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setIsUploading(true);
      // TODO: implement Excel upload
      setTimeout(() => {
        setIsUploading(false);
        e.target.value = "";
      }, 1500);
    },
    []
  );

  const leftSideActions = useMemo(
    () => (
      <>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          onClick={handleDocumentUpload}
          disabled={isUploading}
          className="w-[44px] h-[44px] p-0 border-[#E2E8F0] bg-[#F8FAFC]"
          variant="outline"
          title={t("workers.uploadExcelFile")}
        >
          {isUploading ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <Image
              src="/icons/FileText.svg"
              alt="document"
              width={20}
              height={20}
            />
          )}
        </Button>
      </>
    ),
    [t, isUploading, handleDocumentUpload, handleFileChange]
  );

  const translateRole = useCallback(
    (key: string) => t(`workers.roles.${key}`) || key,
    [t]
  );
  const translateCategory = useCallback(
    (key: string) => t(`workers.categories.${key}`) || key,
    [t]
  );
  const translateCountry = useCallback(
    (key: string) => t(`workers.countries.${key}`) || key,
    [t]
  );
  const translateRegion = useCallback(
    (key: string) => t(`workers.regions.${key}`) || key,
    [t]
  );

  const allColumns = useMemo(
    () =>
      createWorkersColumns({
        t,
        translateRole,
        translateCategory,
        translateCountry,
        translateRegion,
      }),
    [t, translateRole, translateCategory, translateCountry, translateRegion]
  );

  const columns = useMemo(
    () => allColumns.filter((col) => visibleColumns.has(col.key)),
    [allColumns, visibleColumns]
  );

  const rightSideActions = useMemo(
    () => (
      <ColumnVisibilityFilter<Worker>
        columns={allColumns}
        visibleColumns={visibleColumns}
        onVisibilityChange={setVisibleColumns}
        label={t("workers.columnVisibility")}
        getColumnLabel={(col) => t(`workers.columns.${col.key}`)}
      />
    ),
    [allColumns, visibleColumns, t]
  );

  const renderActions = useCallback((worker: Worker) => (
    <WorkersRowActions worker={worker} />
  ), []);

  const handlePageChange = useCallback(
    (newPage: number) => setPage(Math.max(1, Math.min(totalPages, newPage))),
    [totalPages]
  );

  const handleLimitChange = useCallback((limit: number) => {
    setPageSize(limit);
    setPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setCountryFilter(FILTER_ALL);
    setRegionFilter(FILTER_ALL);
    setStatusFilter(FILTER_ALL);
    setPage(1);
  }, []);

  if (isError) {
    return (
      <div className="p-8 flex flex-col gap-4">
        <PageTableHeader title={t("workers.title")} />
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="font-medium">{t("common.error")}</p>
          <p className="text-sm mt-1">{error?.message ?? "Unknown error"}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => refetch()}
          >
            {t("common.retry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col gap-6">
      <PageTableHeader title={t("workers.title")} />

      <WorkersFiltersBar
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        category={categoryFilter}
        onCategoryChange={(v) => {
          setCategoryFilter(v);
          setPage(1);
        }}
        country={countryFilter}
        onCountryChange={(v) => {
          setCountryFilter(v);
          setPage(1);
        }}
        region={regionFilter}
        onRegionChange={(v) => {
          setRegionFilter(v);
          setPage(1);
        }}
        status={statusFilter}
        onStatusChange={(v) => {
          setStatusFilter(v);
          setPage(1);
        }}
        t={t}
        leftSideActions={leftSideActions}
        rightSideActions={rightSideActions}
        onClear={handleClearFilters}
      />

      <div className="relative">
        {(isLoading || isFetching) && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center rounded-[12px] bg-white/80"
            aria-label="Loading"
          >
            <svg
              className="h-8 w-8 animate-spin text-[#3B82F6]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        <DataTable<Worker>
          data={workers}
          columns={columns}
          getRowKey={(w) => w.id}
          showIndex
          renderActions={renderActions}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          pageSizes={PAGE_SIZES as unknown as number[]}
          scrollHeight={900}
          resultsLabel={t("common.results")}
          ofLabel={t("common.of")}
          previousLabel={t("common.previous")}
          nextLabel={t("common.next")}
          className="min-h-[calc(100vh-200px)]"
        />
      </div>
    </div>
  );
}
