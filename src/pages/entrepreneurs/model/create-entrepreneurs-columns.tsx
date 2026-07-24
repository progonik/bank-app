"use client";

import type { DataTableColumn } from "@shared/ui";
import type { EntrepreneurApi } from "@shared/api/entrepreneurs";
import { LEGAL_FORM_OPTIONS, REGISTRATION_AUTHORITY_OPTIONS } from "./form-options";

export type TranslateFn = (key: string) => string;

function formatDate(dateStr: string | undefined): string {
  if (!dateStr?.trim()) return "—";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function createEntrepreneursColumns(
  t: TranslateFn
): DataTableColumn<EntrepreneurApi>[] {
  return [
    
    {
      key: "createdAt",
      title: t("entrepreneurs.columns.createdAt"),
      width: 120,
      minWidth: 100,
      render: (e) => (
        <span className="table-cell-secondary">
          {formatDate(e.created_at)}
        </span>
      ),
    },
    {
      key: "inn",
      title: t("entrepreneurs.columns.inn"),
      width: 120,
      minWidth: 100,
      render: (e) => (
        <span className="table-cell-primary">{e.inn_name || e.inn_id || "—"}</span>
      ),
    },
    {
      key: "legalName",
      title: t("entrepreneurs.columns.legalName"),
      width: 280,
      minWidth: 200,
      render: (e) => (
        <span className="table-cell-secondary">{e.legal_name?.trim() || "—"}</span>
      ),
    },
    {
      key: "registrationAuthority",
      title: t("entrepreneurs.columns.registrationAuthority"),
      width: 180,
      minWidth: 140,
      className: "break-words! whitespace-normal!",
      render: (e) => (
        <span className="table-cell-secondary">
          {REGISTRATION_AUTHORITY_OPTIONS.find((o) => o.value === e.registration_authority)?.label || "—"}
        </span>
      ),
    },
    {
      key: "registrationDate",
      title: t("entrepreneurs.columns.registrationDate"),
      width: 150,
      minWidth: 100,
      className: "break-words! whitespace-normal!",
      render: (e) => (
        <span className="table-cell-secondary">
          {formatDate(e.registration_date)}
        </span>
      ),
    },
    {
      key: "registrationNumber",
      title: t("entrepreneurs.columns.registrationNumber"),
      width: 150,
      minWidth: 110,
      className: "break-words! whitespace-normal!",
      render: (e) => (
        <span className="table-cell-secondary">
          {e.registration_number?.trim() || "—"}
        </span>
      ),
    },
    {
      key: "legalForm",
      title: t("entrepreneurs.columns.legalForm"),
      width: 120,
      minWidth: 100,
      className: "break-words! whitespace-normal!",
      render: (e) => (
        <span className="table-cell-secondary">{LEGAL_FORM_OPTIONS.find((o) => o.value === e.legal_form)?.label || "—"}</span>
      ),
    },
    {
      key: "ifutCode",
      title: t("entrepreneurs.columns.ifutCode"),
      width: 200,
      minWidth: 120,
      className: "break-words! whitespace-normal!",
      render: (e) => (
        <span className="table-cell-secondary">
          {e.ifut_code_name != null ? String(e.ifut_code_name) : "—"}
        </span>
      ),
    },
    {
      key: "dbibtCode",
      title: t("entrepreneurs.columns.dbibtCode"),
      width: 120,
      minWidth: 110,
      className: "break-words! whitespace-normal!",
      render: (e) => (
        <span className="table-cell-secondary">
          {e.dbibt_code != null ? String(e.dbibt_code) : "—"}
        </span>
      ),
    },
    {
      key: "activityStatus",
      title: t("entrepreneurs.columns.activityStatus"),
      width: 120,
      minWidth: 90,
      render: (e) => (
        <span className="table-cell-secondary">
          {e.activity_status ? t("common.active") : t("common.block")}
        </span>
      ),
    },
    {
      key: "charterFund",
      title: t("entrepreneurs.columns.charterFund"),
      width: 120,
      minWidth: 90,
      render: (e) => (
        <span className="table-cell-secondary">
          {e.charter_fund != null
            ? `${e.charter_fund.toLocaleString()} so'm`
            : "—"}
        </span>
      ),
    },
    {
      key: "founders",
      title: t("entrepreneurs.columns.founders"),
      width: 150,
      minWidth: 100,
      render: (e) => (
        <span className="table-cell-secondary">{e.founders?.trim() || "—"}</span>
      ),
    },
    {
      key: "email",
      title: t("entrepreneurs.columns.email"),
      width: 160,
      minWidth: 120,
      render: (e) => (
        <span className="table-cell-secondary">{e.email?.trim() || "—"}</span>
      ),
    },
    {
      key: "phone",
      title: t("entrepreneurs.columns.phone"),
      width: 130,
      minWidth: 100,
      render: (e) => (
        <span className="table-cell-secondary">{e.phone?.trim() || "—"}</span>
      ),
    },
    {
      key: "mhobtCode",
      title: t("entrepreneurs.columns.mhobtCode"),
      width: 110,
      minWidth: 90,
      render: (e) => (
        <span className="table-cell-secondary">
          {e.mhobt_code?.trim() || "—"}
        </span>
      ),
    },
    {
      key: "address",
      title: t("entrepreneurs.columns.address"),
      width: 180,
      minWidth: 140,
      render: (e) => (
        <span className="table-cell-secondary">{e.address?.trim() || "—"}</span>
      ),
    },
    {
      key: "directorName",
      title: t("entrepreneurs.columns.directorName"),
      width: 160,
      minWidth: 120,
      render: (e) => (
        <span className="table-cell-secondary">
          {e.director_name?.trim() || "—"}
        </span>
      ),
    },
  ];
}
