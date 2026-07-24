"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { MoreVertical, Pencil, Trash2, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { createTranslator } from "@shared/lib/i18n";
import { useI18nStore } from "@shared/lib/i18n";
import { successToast, errorToast } from "@shared/lib/toast";
import {
  Button,
  Input,
  DataTable,
  PageTableHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  CustomDialog,
  CustomDialogContent,
} from "@shared/ui";
import type { DataTableColumn } from "@shared/ui";
import type { CityApi } from "@shared/api/cities";
import { createCity, updateCity, deleteCity, getCityById } from "@shared/api/cities";
import { useCitiesQuery, citiesQueryKeys } from "../model";

const PAGE_SIZES = [10, 25, 50, 100] as const;
const DEFAULT_PAGE_SIZE = 25;

export function CitiesPage() {
  const language = useI18nStore((s) => s.language);
  const t = createTranslator(language);
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<CityApi | null>(null);
  const [formName, setFormName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  const { cities, total, totalPages, isLoading, isFetching, isError, error, refetch } =
    useCitiesQuery({ page, pageSize, search });

  /* ── Columns ── */
  const columns = useMemo<DataTableColumn<CityApi>[]>(
    () => [
      {
        key: "name",
        title: t("cities.columns.name"),
        minWidth: 400,
        render: (row) => (
          <span className="text-[14px] leading-[20px] font-medium text-[#1E293B]">
            {row.name}
          </span>
        ),
      },
    ],
    [t]
  );

  /* ── Add ── */
  const handleAddDialogChange = useCallback(
    (open: boolean) => {
      setAddDialogOpen(open);
      if (!open) setFormName("");
    },
    []
  );

  const handleAddSubmit = useCallback(async () => {
    if (!formName.trim()) return;
    setIsSubmitting(true);
    try {
      await createCity({ name: formName.trim() });
      successToast(t("common.success"));
      queryClient.invalidateQueries({ queryKey: citiesQueryKeys.all });
      setFormName("");
      setAddDialogOpen(false);
    } catch {
      errorToast(t("common.error"));
    } finally {
      setIsSubmitting(false);
    }
  }, [formName, t, queryClient]);

  /* ── Edit ── */
  const handleOpenEdit = useCallback(async (city: CityApi) => {
    setIsEditLoading(true);
    try {
      const fresh = await getCityById(city.id);
      setEditingCity(fresh);
      setFormName(fresh.name);
      setEditDialogOpen(true);
    } catch {
      errorToast(t("common.error"));
    } finally {
      setIsEditLoading(false);
    }
  }, [t]);

  const handleEditDialogChange = useCallback(
    (open: boolean) => {
      setEditDialogOpen(open);
      if (!open) {
        setEditingCity(null);
        setFormName("");
      }
    },
    []
  );

  const handleEditSubmit = useCallback(async () => {
    if (!editingCity || !formName.trim()) return;
    setIsSubmitting(true);
    try {
      await updateCity(editingCity.id, { name: formName.trim() });
      successToast(t("common.success"));
      queryClient.invalidateQueries({ queryKey: citiesQueryKeys.all });
      setFormName("");
      setEditingCity(null);
      setEditDialogOpen(false);
    } catch {
      errorToast(t("common.error"));
    } finally {
      setIsSubmitting(false);
    }
  }, [editingCity, formName, t, queryClient]);

  /* ── Delete ── */
  const handleDelete = useCallback(
    async (city: CityApi) => {
      const confirmed = window.confirm(t("cities.deleteConfirm"));
      if (!confirmed) return;
      try {
        await deleteCity(city.id);
        successToast(t("common.success"));
        queryClient.invalidateQueries({ queryKey: citiesQueryKeys.all });
      } catch {
        errorToast(t("common.error"));
      }
    },
    [t, queryClient]
  );

  /* ── Row actions ── */
  const renderActions = useCallback(
    (city: CityApi) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            aria-label="Actions"
          >
            <MoreVertical className="w-5 h-5 text-[#64748B]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[160px]">
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={() => handleOpenEdit(city)}
          >
            <Pencil className="w-4 h-4" />
            {t("cities.edit")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
            onClick={() => handleDelete(city)}
          >
            <Trash2 className="w-4 h-4" />
            {t("cities.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    [t, handleOpenEdit, handleDelete]
  );

  /* ── Toolbar ── */
  const toolbarActions = useMemo(
    () => (
      <>
        <Button
          variant="outline"
          className="w-[44px] h-[44px] p-0 border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] shrink-0 cursor-pointer"
          title={t("common.download")}
        >
          <Image src="/icons/download.svg" alt="" width={20} height={20} />
        </Button>
        <Button
          variant="outline"
          className="w-[44px] h-[44px] p-0 border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] shrink-0 cursor-pointer"
          title={t("common.settings")}
        >
          <Image src="/icons/settings.svg" alt="" width={20} height={20} />
        </Button>
      </>
    ),
    [t]
  );

  /* ── Pagination ── */
  const handlePageChange = useCallback(
    (newPage: number) => setPage(Math.max(1, Math.min(totalPages, newPage))),
    [totalPages]
  );

  const handleLimitChange = useCallback((limit: number) => {
    setPageSize(limit);
    setPage(1);
  }, []);

  /* ── Dialog form ── */
  const renderDialogForm = (isEdit: boolean, onSubmit: () => void, onCancel: () => void) => (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] leading-[24px] font-semibold text-[#0F172A]">
            {isEdit ? t("cities.edit") : t("common.add")}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>

        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px] leading-[20px] font-medium text-[#334155]">
            {t("cities.name")}
          </label>
          <Input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder={t("cities.namePlaceholder")}
            className="h-[44px] rounded-[8px] border-[#E2E8F0] text-[14px] placeholder:text-[#94A3B8]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSubmit();
              }
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="h-[44px] px-6 rounded-[8px] text-[14px] font-medium border-[#E2E8F0] text-[#475569] cursor-pointer"
        >
          {t("cities.cancel")}
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || !formName.trim()}
          className="h-[44px] px-6 rounded-[8px] text-[14px] font-medium cursor-pointer"
        >
          {t("cities.save")}
        </Button>
      </div>
    </div>
  );

  /* ── Add dialog content ── */
  const addDialogContent = renderDialogForm(false, handleAddSubmit, () => {
    setFormName("");
    setAddDialogOpen(false);
  });

  /* ── Error state ── */
  if (isError) {
    return (
      <div className="p-8 flex flex-col gap-4">
        <PageTableHeader title={t("cities.title")} />
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="font-medium">{t("common.error")}</p>
          <p className="text-sm mt-1">{error?.message ?? "Unknown error"}</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => refetch()}>
            {t("common.retry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col gap-6">
      <PageTableHeader
        title={t("cities.title")}
        toolbar={toolbarActions}
        action={{
          label: t("cities.add"),
          open: addDialogOpen,
          onOpenChange: handleAddDialogChange,
          dialogContent: addDialogContent,
          dialogClassName: "w-[575px] min-w-[575px] max-w-[575px]",
        }}
      />

      <div className="relative">
        {(isLoading || isFetching || isEditLoading) && (
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
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        <DataTable<CityApi>
          data={cities}
          columns={columns}
          getRowKey={(c) => c.id}
          showIndex
          renderActions={renderActions}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          pageSizes={PAGE_SIZES as unknown as number[]}
          resultsLabel={t("common.results")}
          ofLabel={t("common.of")}
          previousLabel={t("common.previous")}
          nextLabel={t("common.next")}
          className="min-h-[calc(100vh-300px)]"
        />
      </div>

      {/* Edit dialog */}
      <CustomDialog open={editDialogOpen} onOpenChange={handleEditDialogChange}>
        <CustomDialogContent className="w-[575px] min-w-[575px] max-w-[575px]">
          {renderDialogForm(true, handleEditSubmit, () => {
            setEditingCity(null);
            setFormName("");
            setEditDialogOpen(false);
          })}
        </CustomDialogContent>
      </CustomDialog>
    </div>
  );
}
