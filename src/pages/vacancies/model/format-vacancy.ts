import type { VacancyApi } from "@shared/api/vacancies";

/** Format salary as "от X до Y {currency}" per design. */
export function formatSalary(v: VacancyApi): string {
  const min = v.salary_min ?? 0;
  const max = v.salary_max ?? 0;
  const raw = v.salary_currency?.trim() || "so'm";
  const isEur = /eur|€/i.test(raw);
  const currency = isEur ? "€" : raw;

  const formatNum = (n: number): string =>
    isEur ? String(n) : n.toLocaleString("ru-RU", { useGrouping: true });

  return `от ${formatNum(min)} до ${formatNum(max)} ${currency}`;
}

/** Format date as "HH:mm DD.MM.YYYY" per design. */
export function formatVacancyDate(isoDate: string | undefined): string {
  if (!isoDate) return "—";
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return "—";
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${h}:${m} ${day}.${month}.${year}`;
  } catch {
    return "—";
  }
}

/** Get primary title from vacancy texts (first available). */
export function getVacancyTitle(v: VacancyApi): string {
  const title = v.texts?.[0]?.title?.trim();
  return title || "—";
}
