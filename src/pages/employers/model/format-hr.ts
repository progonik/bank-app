import type { HrApi } from "@shared/api/hrs";

/**
 * Formats created_at to "HH:MM" (time) and "DD.MM.YYYY" (date) for REG. DATE column.
 * Design spec: time bold on top, date below, #334155.
 */
export function formatHrRegDate(createdAt: string | undefined): {
  time: string;
  date: string;
} {
  if (!createdAt?.trim()) {
    return { time: "—", date: "—" };
  }
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return { time: "—", date: "—" };
  }
  const time = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const dateStr = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return { time, date: dateStr };
}

/**
 * Builds full name from first_name, patronymic, last_name.
 */
export function getHrFullName(hr: HrApi): string {
  const parts = [hr.first_name, hr.patronymic, hr.last_name].filter(Boolean);
  return parts.join(" ").trim() || "—";
}
