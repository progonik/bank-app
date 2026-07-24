"use client";

import { cn } from "@shared/lib/utils";
import { SectionHeader } from "@shared/ui";
import type { UserProfileExperience } from "@shared/api/users";

const SALARY_COLOR = "#2563EB";
const DURATION_COLOR = "#71717A";
const DESCRIPTION_COLOR = "#1E293B";

/** Left column: 184px. Text: Inter 500/400, 14px, 20px line-height, -0.6% */
const TEXT_BASE = "text-[14px] leading-5 tracking-[-0.006em]";
const COMPANY_CLASS = "font-semibold text-[14px] leading-5 tracking-[-0.006em] text-[#000000]";
const TITLE_CLASS = "font-bold text-[14px] leading-5 tracking-[-0.006em] text-[#1E293B]";

export type TranslateFn = (key: string) => string;

export interface WorkExperienceBlockProps {
  readonly experiences: readonly UserProfileExperience[];
  readonly t: TranslateFn;
}

function formatMonthYear(iso: string): string {
  if (!iso?.trim()) return "";
  try {
    const d = new Date(iso);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return iso;
  }
}

function isPresentEndDate(end: string | undefined): boolean {
  const v = end?.trim().toLowerCase();
  return !v || v === "present";
}

function getDateRange(start: string, end: string, t: TranslateFn): string {
  const startStr = formatMonthYear(start);
  if (!startStr) return "";
  const endStr = isPresentEndDate(end)
    ? t("workerDetail.present")
    : formatMonthYear(end);
  return `${startStr} — ${endStr}`;
}

function getDurationMonths(start: string, end: string): number {
  try {
    const startDate = new Date(start);
    const endDate = isPresentEndDate(end) ? new Date() : new Date(end);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12
      + (endDate.getMonth() - startDate.getMonth());
    return Math.max(0, months);
  } catch {
    return 0;
  }
}

function formatDuration(years: number, months: number, t: TranslateFn): string {
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${t("workerDetail.years")}`);
  if (months > 0) parts.push(`${months} ${t("workerDetail.months")}`);
  return parts.join(" ") || "—";
}

function getTotalExperience(experiences: readonly UserProfileExperience[]): {
  years: number;
  months: number;
} {
  let totalMonths = 0;
  for (const e of experiences) {
    totalMonths += getDurationMonths(e.start_date, e.end_date);
  }
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
}

export function WorkExperienceBlock({
  experiences,
  t,
}: WorkExperienceBlockProps) {
  if (!experiences?.length) return null;

  const total = getTotalExperience(experiences);
  const headerTitle = `${t("workerDetail.workExperience")} ${total.years} ${t("workerDetail.years")} ${total.months} ${t("workerDetail.months")}`;

  return (
    <div className="flex flex-col gap-8 bg-white rounded-[16px] p-8">
      <SectionHeader title={headerTitle} />
      <div className="flex flex-col">
        {experiences.map((exp, index) => {
          const monthsTotal = getDurationMonths(exp.start_date, exp.end_date);
          const years = Math.floor(monthsTotal / 12);
          const months = monthsTotal % 12;
          const salaryDisplay = "—";

          return (
            <div
              key={exp.id}
              className={index > 0 ? "border-t border-[#F1F5F9] pt-8 pb-8" : "pb-8"}
            >
              <div className="flex gap-8">
                <div className="flex w-[184px] shrink-0 flex-col gap-3">
                  <span
                    className={cn(TEXT_BASE, "font-medium text-[#000000]")}
                  >
                    {getDateRange(exp.start_date, exp.end_date, t)}
                  </span>
                  <span
                    className={cn(TEXT_BASE, "font-normal")}
                    style={{ color: DURATION_COLOR }}
                  >
                    {formatDuration(years, months, t)}
                  </span>
                  <span
                    className={cn(TEXT_BASE, "font-medium")}
                    style={{ color: SALARY_COLOR }}
                  >
                    {salaryDisplay}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <span className={COMPANY_CLASS}>{exp.company || "—"}</span>
                  <span className={TITLE_CLASS}>{exp.position || "—"}</span>
                  <span
                    className={cn(TEXT_BASE, "font-normal")}
                    style={{ color: DESCRIPTION_COLOR }}
                  >
                    {exp.description || "—"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

