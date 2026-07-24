"use client";

import { DetailField, DetailInput, SectionHeader } from "@shared/ui";
import type { UserApi } from "@shared/api/users";

const STATUS_ACTIVE_COLOR = "#2563EB";

function formatDate(iso: string): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year} ${h}:${m}`;
  } catch {
    return iso;
  }
}

export type TranslateFn = (key: string) => string;

export interface AdditionalInfoBlockProps {
  readonly user: UserApi;
  readonly t: TranslateFn;
  readonly translateTariff: (key: string) => string;
  readonly translateStatus: (key: string) => string;
}

export function AdditionalInfoBlock({
  user,
  t,
  translateTariff,
  translateStatus,
}: AdditionalInfoBlockProps) {
  const statusColor = user.status === "active" ? STATUS_ACTIVE_COLOR : undefined;
  const statusLabel = translateStatus(user.status) || "—";
  const tariffLabel = translateTariff(user.tariff_type) || "—";

  return (
    <div className="flex flex-col gap-6 bg-white rounded-[16px] p-[32px]">
      <SectionHeader title={t("workerDetail.additionalInfo")} />
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <DetailInput
            label={t("workerDetail.id")}
            value={user.id ?? ""}
            readOnly
          />
          <DetailInput
            label={t("workerDetail.telegramId")}
            value={user.telegram_id ?? ""}
            readOnly
          />
        </div>
        <DetailField
          label={t("workerDetail.registrationDate")}
          value={formatDate(user.created_at)}
          fullWidth
        />
        <DetailField
          label={t("workerDetail.status")}
          value={statusLabel}
          valueColor={statusColor}
          fullWidth
        />
        <DetailField
          label={t("workerDetail.tariffType")}
          value={tariffLabel}
          fullWidth
        />
      </div>
    </div>
  );
}
