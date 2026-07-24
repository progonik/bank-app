"use client";

import type { DataTableColumn } from "@shared/ui";
import type { VacancyApi } from "@shared/api/vacancies";
import {
  formatSalary,
  formatVacancyDate,
  getVacancyTitle,
} from "./format-vacancy";

export type TranslateFn = (key: string) => string;

interface CreateVacanciesColumnsParams {
  t: TranslateFn;
}

function StatusCell({ vacancy, t }: { vacancy: VacancyApi; t: TranslateFn }) {
  const isActive =
    vacancy.status?.toLowerCase() === "active" ||
    vacancy.status?.toLowerCase() === "aktiv";
  const className = isActive ? "badge-status-active" : "badge-status-block";
  const label = isActive ? t("common.active") : t("common.block");
  return <span className={className}>{label}</span>;
}

function CreatedByCell({ vacancy }: { vacancy: VacancyApi }) {
  const companyId = vacancy.company_id?.trim();
  if (!companyId) {
    return <span className="table-cell-muted">—</span>;
  }
  const displayName = companyId.length > 20 ? `${companyId.slice(0, 17)}...` : companyId;
  return (
    <div className="flex flex-col">
      <span className="table-cell-primary">{displayName}</span>
      <span className="table-cell-muted">ID: {companyId}</span>
    </div>
  );
}

export function createVacanciesColumns(
  params: CreateVacanciesColumnsParams
): DataTableColumn<VacancyApi>[] {
  const { t } = params;

  return [
    {
      key: "name",
      title: t("vacancies.columns.name"),
      width: 426,
      minWidth: 200,
      render: (v) => (
        <span className="table-cell-primary">{getVacancyTitle(v)}</span>
      ),
    },
    {
      key: "salary",
      title: t("vacancies.columns.salary"),
      width: 220,
      minWidth: 173,
      render: (v) => (
        <span className="table-cell-secondary">{formatSalary(v)}</span>
      ),
    },
    {
      key: "country",
      title: t("vacancies.columns.country"),
      width: 153,
      minWidth: 120,
      render: (v) => (
        <span className="table-cell-secondary">
          {v.address?.trim() || "—"}
        </span>
      ),
    },
    {
      key: "candidates",
      title: t("vacancies.columns.candidates"),
      width: 100,
      minWidth: 80,
      render: () => (
        <span className="table-cell-secondary">—</span>
      ),
    },
    {
      key: "status",
      title: t("vacancies.columns.status"),
      width: 100,
      minWidth: 80,
      render: (v) => <StatusCell vacancy={v} t={t} />,
    },
    {
      key: "date",
      title: t("vacancies.columns.date"),
      width: 130,
      minWidth: 109,
      render: (v) => (
        <span className="table-cell-secondary">
          {formatVacancyDate(v.created_at)}
        </span>
      ),
    },
    {
      key: "createdBy",
      title: t("vacancies.columns.createdBy"),
      width: 173,
      minWidth: 140,
      fixed: "right",
      render: (v) => <CreatedByCell vacancy={v} />,
    },
  ];
}
