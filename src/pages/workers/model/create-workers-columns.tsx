"use client";

import type { DataTableColumn } from "@shared/ui";
import type { Worker } from "@entities/worker";
import { AVATAR_FALLBACK } from "./constants";
import Link from "next/link";

export type TranslateFn = (key: string) => string;

interface CreateWorkersColumnsParams {
  t: TranslateFn;
  translateRole: (key: string) => string;
  translateCategory: (key: string) => string;
  translateCountry: (key: string) => string;
  translateRegion: (key: string) => string;
}

function UserCell({ worker, translateRole }: { worker: Worker; translateRole: (k: string) => string }) {
  return (
    <Link href={`/ishchilar/${worker.id}`} className="flex items-center gap-3 hover:text-[#3B82F6] group transition-colors duration-300">
      <img
        src={worker.profile_pic_url || AVATAR_FALLBACK}
        alt=""
        className="avatar-table"
        onError={(e) => { e.currentTarget.src = AVATAR_FALLBACK; }}
      />
      <div>
        <div className="table-cell-primary group-hover:text-[#3B82F6]! transition-colors duration-300">{worker.fullName}</div>
        <div className="table-cell-role group-hover:text-[#3B82F6]! transition-colors duration-300">{worker.role}</div>
      </div>
    </Link>
  );
}

function PhoneTelegramCell({ worker }: { worker: Worker }) {
  return (
    <div>
      <div className="table-cell-phone">{worker.phone}</div>
      <div className="table-cell-muted">{worker.telegram}</div>
    </div>
  );
}

function CategoryCell({
  worker,
  translateCategory,
  undefinedLabel,
}: {
  worker: Worker;
  translateCategory: (k: string) => string;
  undefinedLabel: string;
}) {
  if (worker.categories.length === 0) {
    return <span className="table-cell-muted">{undefinedLabel}</span>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {worker.categories.map((cat) => (
        <span key={cat} className="badge-category">
          {cat}
        </span>
      ))}
    </div>
  );
}

function SalaryCell({ worker, undefinedLabel }: { worker: Worker; undefinedLabel: string }) {
  const display = worker.salary === "undefined" ? undefinedLabel : worker.salary;
  const className = display === undefinedLabel ? "table-cell-muted" : "table-cell-primary";
  return <span className={className}>{display}</span>;
}

function TariffCell({ worker, t }: { worker: Worker; t: TranslateFn }) {
  const isVip = worker.tariff === "vip";
  const className = `badge-tariff ${isVip ? "bg-[#EEF2FF] text-[#4338CA]" : "bg-[#F1F5F9] text-[#94A3B8]"}`;
  return <span className={className}>{t(`common.${worker.tariff}`)}</span>;
}

function StatusCell({ worker, t }: { worker: Worker; t: TranslateFn }) {
  const isActive = worker.status === "active";
  const className = isActive ? "badge-status-active" : "badge-status-block";
  const label = isActive ? t("common.active") : t("common.block");
  return <span className={className}>{label}</span>;
}

export function createWorkersColumns(params: CreateWorkersColumnsParams): DataTableColumn<Worker>[] {
  const { t, translateRole, translateCategory, translateCountry, translateRegion } = params;
  const undefinedLabel = t("common.undefined");

  return [
    {
      key: "user",
      title: t("workers.columns.user"),
      fixed: "left",
      width: 250,
      render: (w) => <UserCell worker={w} translateRole={translateRole} />,
    },
    {
      key: "phoneTelegram",
      title: t("workers.columns.phoneTelegram"),
      render: (w) => <PhoneTelegramCell worker={w} />,
    },
    {
      key: "category",
      title: t("workers.columns.category"),
      render: (w) => (
        <CategoryCell
          worker={w}
          translateCategory={translateCategory}
          undefinedLabel={undefinedLabel}
        />
      ),
    },
    {
      key: "salary",
      title: t("workers.columns.salary"),
      render: (w) => <SalaryCell worker={w} undefinedLabel={undefinedLabel} />,
    },
    {
      key: "tariff",
      title: t("workers.columns.tariff"),
      render: (w) => <TariffCell worker={w} t={t} />,
    },
    {
      key: "country",
      title: t("workers.columns.country"),
      render: (w) => (
        <span className="table-cell-secondary">{w.country}</span>
      ),
    },
    {
      key: "region",
      title: t("workers.columns.region"),
      render: (w) => (
        <span className="table-cell-secondary">{w.region}</span>
      ),
    },
    {
      key: "registration",
      title: t("workers.columns.registration"),
      render: (w) => (
        <span className="table-cell-secondary">{w.registrationDate}</span>
      ),
    },
    {
      key: "status",
      title: t("workers.columns.status"),
      render: (w) => <StatusCell worker={w} t={t} />,
    },
  ];
}
