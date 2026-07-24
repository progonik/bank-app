"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { createTranslator } from "@shared/lib/i18n";
import { useI18nStore } from "@shared/lib/i18n";
import {
  Button,
  CustomDialog,
  CustomDialogContent,
  DataTable,
  PageTableHeader,
} from "@shared/ui";
import {
  useFoydalanuvchilarQuery,
  createUsersColumns,
  useUserForm,
  PAGE_SIZES,
  DEFAULT_PAGE_SIZE,
} from "../model";
import type { FoydalanuvchiRow } from "../model";
import { UsersFiltersBar } from "./users-filters-bar";
import { UsersRowActions } from "./users-row-actions";
import { AddUserDialog } from "./add-user-dialog";

export function UsersPage() {
  const language = useI18nStore((s) => s.language);
  const t = createTranslator(language);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { rows, total, totalPages, isLoading, isFetching, isError, error, refetch } =
    useFoydalanuvchilarQuery({ page, pageSize, search });

  const {
    form,
    updateField,
    resetForm,
    initializeForEdit,
    submitForm,
    isSubmitting,
    isEditMode,
  } = useUserForm(t);

  /* ── Add dialog ── */
  const handleAddDialogChange = useCallback(
    (open: boolean) => {
      setAddDialogOpen(open);
      if (!open) resetForm();
    },
    [resetForm]
  );

  const handleAddSubmit = useCallback(() => {
    submitForm(() => setAddDialogOpen(false));
  }, [submitForm]);

  const handleAddCancel = useCallback(() => {
    resetForm();
    setAddDialogOpen(false);
  }, [resetForm]);

  /* ── Edit dialog ── */
  const handleEditUser = useCallback(
    (user: FoydalanuvchiRow) => {
      initializeForEdit(user);
      setEditDialogOpen(true);
    },
    [initializeForEdit]
  );

  const handleEditDialogChange = useCallback(
    (open: boolean) => {
      setEditDialogOpen(open);
      if (!open) resetForm();
    },
    [resetForm]
  );

  const handleEditSubmit = useCallback(() => {
    submitForm(() => setEditDialogOpen(false));
  }, [submitForm]);

  const handleEditCancel = useCallback(() => {
    resetForm();
    setEditDialogOpen(false);
  }, [resetForm]);

  /* ── Columns ── */
  const columns = useMemo(() => createUsersColumns({ t }), [t]);

  /* ── Toolbar actions ── */
  const leftSideActions = useMemo(
    () => (
      <>
        <Button
          variant="outline"
          className="w-[44px] h-[44px] p-0 border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] shrink-0 cursor-pointer"
          onClick={() => setAddDialogOpen(true)}
          title={t("foydalanuvchilar.add")}
        >
          <Image src="/icons/plus-gray.svg" alt="" width={20} height={20} />
        </Button>
        <Button
          variant="outline"
          className="w-[44px] h-[44px] p-0 border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] shrink-0 cursor-pointer"
          onClick={() => refetch()}
          title={t("common.synchronize")}
        >
          <Image src="/icons/reset.svg" alt="" width={20} height={20} />
        </Button>
      </>
    ),
    [t, refetch]
  );

  const rightSideActions = useMemo(
    () => (
      <>
        <Button
          variant="outline"
          className="w-[44px] h-[44px] p-0 border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] shrink-0 cursor-pointer"
          title={t("common.filter")}
        >
          <Image src="/icons/filter.svg" alt="" width={20} height={20} />
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

  /* ── Row actions ── */
  const renderActions = useCallback(
    (user: FoydalanuvchiRow) => (
      <UsersRowActions user={user} onEdit={handleEditUser} />
    ),
    [handleEditUser]
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

  /* ── Add dialog content ── */
  const addDialogContent = useMemo(
    () => (
      <AddUserDialog
        form={form}
        onFieldChange={updateField}
        onSubmit={handleAddSubmit}
        onCancel={handleAddCancel}
        isSubmitting={isSubmitting}
        t={t}
      />
    ),
    [form, updateField, handleAddSubmit, handleAddCancel, isSubmitting, t]
  );

  /* ── Error state ── */
  if (isError) {
    return (
      <div className="p-8 flex flex-col gap-4">
        <PageTableHeader title={t("foydalanuvchilar.title")} />
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
      <PageTableHeader
        title={t("foydalanuvchilar.title")}
        action={{
          label: t("foydalanuvchilar.add"),
          open: addDialogOpen,
          onOpenChange: handleAddDialogChange,
          dialogContent: addDialogContent,
          dialogClassName: "w-[575px] min-w-[575px] max-w-[575px]",
        }}
      />

      <UsersFiltersBar
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        t={t}
        leftSideActions={leftSideActions}
        rightSideActions={rightSideActions}
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
        <DataTable<FoydalanuvchiRow>
          data={rows}
          columns={columns}
          getRowKey={(r) => r.id}
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
          <AddUserDialog
            form={form}
            onFieldChange={updateField}
            onSubmit={handleEditSubmit}
            onCancel={handleEditCancel}
            isSubmitting={isSubmitting}
            isEditMode
            t={t}
          />
        </CustomDialogContent>
      </CustomDialog>
    </div>
  );
}
