"use client";

import { useCallback, useMemo, useState } from "react";
import { createTranslator } from "@shared/lib/i18n";
import { useI18nStore } from "@shared/lib/i18n";
import { useQueryClient } from "@tanstack/react-query";
import {
  useEntrepreneursQuery,
  createEntrepreneursColumns,
  entrepreneursQueryKeys,
  useEntrepreneursPageState,
} from "../../model";
import {
  FILTER_BAR_BG,
  PAGE_SIZES,
  SCROLL_HEIGHT,
  TABLE_MIN_WIDTH_PX,
} from "../../model/constants";
import type { EntrepreneurApi } from "@shared/api/entrepreneurs";
import {
  Button,
  ColumnVisibilityFilter,
  DataTable,
  PageTableHeader,
} from "@shared/ui";
import {
  Dialog,
  DialogContent,
} from "@shared/ui/dialog";
import {
  deleteEntrepreneur,
  downloadEntrepreneursExcel,
} from "@shared/api/entrepreneurs";
import { successToast, errorToast } from "@shared/lib/toast";
import { EntrepreneursRowActions } from "../entrepreneurs-row-actions";
import { AddEntrepreneurDialog } from "../add-entrepreneur-dialog";
import { EntrepreneursTableToolbar } from "../entrepreneurs-table-toolbar";
import { EntrepreneursFiltersBar } from "../entrepreneurs-filters-bar";
import { LoadingOverlay } from "../shared/loading-overlay";

export function EntrepreneursPage() {
  const language = useI18nStore((s) => s.language);
  const t = createTranslator(language);
  const queryClient = useQueryClient();
  const [isDownloading, setIsDownloading] = useState(false);

  const pageState = useEntrepreneursPageState();
  const {
    search,
    dateFrom,
    dateTo,
    ifutCode,
    city,
    page,
    pageSize,
    addDialogOpen,
    filterPopoverOpen,
    visibleColumns,
    setPage,
    setAddDialogOpen,
    setFilterPopoverOpen,
    setVisibleColumns,
    handleSearchChange,
    handleDateFromChange,
    handleDateToChange,
    handleIfutCodeChange,
    handleCityChange,
    handleLimitChange,
    handleClearFilters,
    handleAddSuccess,
    handleCloseAddDialog,
    editDialogOpen,
    setEditDialogOpen,
    entrepreneurToEdit,
    isEditLoading,
    handleOpenEditDialog,
    handleCloseEditDialog,
  } = pageState;

  const {
    entrepreneurs,
    total,
    totalPages,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useEntrepreneursQuery({
    page,
    pageSize,
    search,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  });

  const allColumns = useMemo(
    () => createEntrepreneursColumns(t),
    [t]
  );

  const columns = useMemo(
    () => allColumns.filter((col) => visibleColumns.has(col.key)),
    [allColumns, visibleColumns]
  );

  const handleFilterBarToggle = useCallback(() => {
    setFilterPopoverOpen((prev) => !prev);
  }, [setFilterPopoverOpen]);

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      const blob = await downloadEntrepreneursExcel({
        ...(search?.trim() && { legal_name: search.trim() }),
        ...(dateFrom?.trim() && { date_from: dateFrom.trim() }),
        ...(dateTo?.trim() && { date_to: dateTo.trim() }),
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `entrepreneurs-${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      successToast(t("common.success"));
    } catch {
      errorToast(t("common.error"));
    } finally {
      setIsDownloading(false);
    }
  }, [dateFrom, dateTo, isDownloading, search, t]);

  const toolbarActions = useMemo(
    () => (
      <EntrepreneursTableToolbar
        t={t}
        filterBarVisible={filterPopoverOpen}
        onFilterBarToggle={handleFilterBarToggle}
        onDownload={handleDownload}
      />
    ),
    [t, filterPopoverOpen, handleFilterBarToggle, handleDownload]
  );

  const rightSideActions = useMemo(
    () => (
      <ColumnVisibilityFilter<EntrepreneurApi>
        columns={allColumns}
        visibleColumns={visibleColumns}
        onVisibilityChange={setVisibleColumns}
        label={t("entrepreneurs.columnVisibility")}
        getColumnLabel={(col) => t(`entrepreneurs.columns.${col.key}`)}
      />
    ),
    [allColumns, visibleColumns, setVisibleColumns, t]
  );

  const handlePageChange = useCallback(
    (newPage: number) =>
      setPage(Math.max(1, Math.min(totalPages, newPage))),
    [totalPages, setPage]
  );

  const handleAddSuccessWithInvalidation = useCallback(() => {
    handleAddSuccess();
    queryClient.invalidateQueries({ queryKey: entrepreneursQueryKeys.all });
  }, [handleAddSuccess, queryClient]);

  const handleEditSuccessWithInvalidation = useCallback(() => {
    handleCloseEditDialog();
    queryClient.invalidateQueries({ queryKey: entrepreneursQueryKeys.all });
  }, [handleCloseEditDialog, queryClient]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleResetFilters = useCallback(() => {
    handleClearFilters();
    queryClient.invalidateQueries({ queryKey: entrepreneursQueryKeys.all });
  }, [handleClearFilters, queryClient]);

  const handleDelete = useCallback(
    async (entrepreneur: EntrepreneurApi) => {
      const confirmed = window.confirm(t("entrepreneurs.deleteConfirm"));
      if (!confirmed) return;
      try {
        await deleteEntrepreneur(entrepreneur.id);
        successToast(t("common.success"));
        queryClient.invalidateQueries({ queryKey: entrepreneursQueryKeys.all });
      } catch {
        errorToast(t("common.error"));
      }
    },
    [queryClient, t]
  );

  const handleEdit = useCallback(
    (entrepreneur: EntrepreneurApi) => {
      handleOpenEditDialog(entrepreneur);
    },
    [handleOpenEditDialog]
  );

  const renderActions = useCallback(
    (e: EntrepreneurApi) => (
      <EntrepreneursRowActions
        entrepreneur={e}
        t={t}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    ),
    [t, handleDelete, handleEdit]
  );

  const headerAction = useMemo(
    () => ({
      label: t("entrepreneurs.add"),
      open: addDialogOpen,
      onOpenChange: setAddDialogOpen,
      dialogContent: (
        <AddEntrepreneurDialog
          t={t}
          onSuccess={handleAddSuccessWithInvalidation}
          onClose={handleCloseAddDialog}
        />
      ),
      dialogClassName: "min-w-[958px] max-w-[958px] max-h-[fit-content]!",
    }),
    [t, addDialogOpen, setAddDialogOpen, handleAddSuccessWithInvalidation, handleCloseAddDialog]
  );

  if (isError) {
    return (
      <div className="p-8 flex flex-col gap-4">
        <PageTableHeader title={t("entrepreneurs.title")} />
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="font-medium">{t("common.error")}</p>
          <p className="text-sm mt-1">{error?.message ?? "Unknown error"}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={handleRetry}
          >
            {t("common.retry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 pb-0 flex flex-col gap-6">
      <PageTableHeader
        title={t("entrepreneurs.title")}
        toolbar={toolbarActions}
        action={headerAction}
      />

      {filterPopoverOpen && (
        <div
          className="p-4 rounded-[12px] w-full"
          style={{ backgroundColor: FILTER_BAR_BG }}
        >
          <EntrepreneursFiltersBar
            search={search}
            onSearchChange={handleSearchChange}
            dateFrom={dateFrom}
            onDateFromChange={handleDateFromChange}
            dateTo={dateTo}
            onDateToChange={handleDateToChange}
            ifutCode={ifutCode}
            onIfutCodeChange={handleIfutCodeChange}
            city={city}
            onCityChange={handleCityChange}
            t={t}
            rightSideActions={rightSideActions}
            onRefresh={handleResetFilters}
            onConfirm={refetch}
          />
        </div>
      )}

      <LoadingOverlay show={isLoading || isFetching || isEditLoading} />
      <DataTable<EntrepreneurApi>
        data={entrepreneurs}
        columns={columns}
        getRowKey={(e) => e.id}
        showIndex
        renderActions={renderActions}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        pageSizes={[...PAGE_SIZES]}
        scrollHeight={filterPopoverOpen ? SCROLL_HEIGHT - 100 : SCROLL_HEIGHT}
        minWidth={`${TABLE_MIN_WIDTH_PX}px`}
        resultsLabel={t("common.results")}
        ofLabel={t("common.of")}
        previousLabel={t("common.previous")}
        nextLabel={t("common.next")}
        className={`min-h-[calc(100vh-${filterPopoverOpen ? "300px" : "200px"})]!`}
      />

      <Dialog
        open={editDialogOpen}
        onOpenChange={(open: boolean) => !open && handleCloseEditDialog()}
      >
        <DialogContent className="sm:max-w-[958px] max-h-[90vh] overflow-y-auto" showCloseButton={false}>
          {entrepreneurToEdit && (
            <AddEntrepreneurDialog
              entrepreneur={entrepreneurToEdit}
              t={t}
              onSuccess={handleEditSuccessWithInvalidation}
              onClose={handleCloseEditDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
