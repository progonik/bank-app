import type { DataTableColumn } from "@shared/ui";
import type { FoydalanuvchiRow } from "./types";
import { AVATAR_FALLBACK } from "./constants";

function formatDateTime(dateStr: string): string {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "—";
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${hours}:${minutes} ${day}.${month}.${year}`;
  } catch {
    return "—";
  }
}

interface CreateColumnsParams {
  t: (key: string) => string;
}

export function createUsersColumns({
  t,
}: CreateColumnsParams): DataTableColumn<FoydalanuvchiRow>[] {
  return [
    {
      key: "fullName",
      title: t("foydalanuvchilar.columns.fullName"),
      minWidth: 260,
      fixed: "left",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={AVATAR_FALLBACK}
            alt=""
            width={36}
            height={36}
            className="rounded-full object-cover shrink-0"
            onError={(e) => {
              e.currentTarget.src = AVATAR_FALLBACK;
            }}
          />
          <span className="text-[14px] leading-[20px] font-medium text-[#000000] truncate">
            {row.fullName}
          </span>
        </div>
      ),
    },
    {
      key: "role",
      title: t("foydalanuvchilar.columns.role"),
      minWidth: 160,
      render: (row) => (
        <span className="text-[14px] leading-[20px] font-medium text-[#475569]">
          {row.role}
        </span>
      ),
    },
    {
      key: "login",
      title: t("foydalanuvchilar.columns.login"),
      minWidth: 160,
      render: (row) => (
        <span className="text-[14px] leading-[20px] text-[#000] font-medium">
          {row.login}
        </span>
      ),
    },
    {
      key: "lastLogin",
      title: t("foydalanuvchilar.columns.lastLogin"),
      minWidth: 200,
      render: (row) => (
        <span className="text-[14px] leading-[20px] text-[#475569] font-medium">
          {formatDateTime(row.createdAt)}
        </span>
      ),
    },
    {
      key: "status",
      title: t("foydalanuvchilar.columns.status"),
      minWidth: 120,
      render: (row) => (
        <span
          className={
            row.status
              ? "text-[14px] leading-[20px] font-medium text-[#16A34A] py-[4px] px-[8px] bg-[#F0FDF4] rounded-2xl"
              : "text-[14px] leading-[20px] font-medium text-[#DC2626] py-[4px] px-[8px] bg-[#FFF1F2] rounded-2xl"
          }
        >
          {row.status
            ? t("foydalanuvchilar.statusActive")
            : t("foydalanuvchilar.statusBlocked")}
        </span>
      ),
    },
  ];
}
