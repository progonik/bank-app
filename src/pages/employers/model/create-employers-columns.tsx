"use client";

import type { DataTableColumn } from "@shared/ui";
import type { HrApi } from "@shared/api/hrs";
import { formatHrRegDate, getHrFullName } from "./format-hr";
import { AVATAR_FALLBACK } from "./constants";

export type TranslateFn = (key: string) => string;

interface CreateEmployersColumnsParams {
  t: TranslateFn;
}

function EmployerCell({ hr }: { hr: HrApi }) {
  const fullName = getHrFullName(hr);
  return (
    <div className="flex items-center gap-3">
      <img
        src={AVATAR_FALLBACK}
        alt=""
        className="avatar-table"
        onError={(e) => {
          e.currentTarget.src = AVATAR_FALLBACK;
        }}
      />
      <div className="flex flex-col">
        <span className="table-cell-primary">{fullName}</span>
        <span className="table-cell-muted">ID: {hr.id}</span>
      </div>
    </div>
  );
}

function PhoneTelegramCell({ hr }: { hr: HrApi }) {
  const phone = hr.phone?.trim() || "—";
  const telegram = hr.telegram?.trim()
    ? (hr.telegram.startsWith("@") ? hr.telegram : `@${hr.telegram}`)
    : "—";
  return (
    <div className="flex flex-col">
      <span className="table-cell-phone">{phone}</span>
      <span className="table-cell-muted">{telegram}</span>
    </div>
  );
}

function TariffCell({ hr, t }: { hr: HrApi; t: TranslateFn }) {
  const statusKey = hr.status?.toLowerCase() ?? "standart";
  const label =
    statusKey === "standart" || statusKey === "standard" ? "Standart" : hr.status ?? "—";
       hr.status ?? "—";
  return <span className="badge-status-active">{label}</span>;
}

function RegDateCell({ hr }: { hr: HrApi }) {
  const { time, date } = formatHrRegDate(hr.created_at);
  return (
    <div className="flex flex-col">
      <span
        className="font-medium"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
          lineHeight: "20px",
          letterSpacing: "-0.006em",
          color: "#000000",
        }}
      >
        {time}
      </span>
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: 14,
          lineHeight: "20px",
          letterSpacing: "-0.006em",
          color: "#334155",
        }}
      >
        {date}
      </span>
    </div>
  );
}

export function createEmployersColumns(
  params: CreateEmployersColumnsParams
): DataTableColumn<HrApi>[] {
  const { t } = params;

  return [
    {
      key: "employer",
      title: t("employers.columns.employer"),
      fixed: "left",
      width: 250,
      minWidth: 200,
      render: (hr) => <EmployerCell hr={hr} />,
    },
    {
      key: "phoneTelegram",
      title: t("employers.columns.phoneTelegram"),
      width: 153,
      minWidth: 120,
      render: (hr) => <PhoneTelegramCell hr={hr} />,
    },
    {
      key: "tariff",
      title: t("employers.columns.tariff"),
      width: 100,
      minWidth: 80,
      render: (hr) => <TariffCell hr={hr} t={t} />,
    },
    {
      key: "brand",
      title: t("employers.columns.brand"),
      width: 150,
      minWidth: 100,
      render: (hr) => (
        <span className="table-cell-secondary">
          {hr.company_id?.trim() || "—"}
        </span>
      ),
    },
    {
      key: "vacancies",
      title: t("employers.columns.vacancies"),
      width: 100,
      minWidth: 80,
      render: () => (
        <span className="table-cell-secondary">0</span>
      ),
    },
    {
      key: "country",
      title: t("employers.columns.country"),
      width: 112,
      minWidth: 90,
      render: () => (
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "20px",
            letterSpacing: "-0.006em",
            color: "#334155",
          }}
        >
          {t("employers.countries.uzbekistan")}
        </span>
      ),
    },
    {
      key: "regDate",
      title: t("employers.columns.regDate"),
      width: 109,
      minWidth: 109,
      render: (hr) => <RegDateCell hr={hr} />,
    },
  ];
}
