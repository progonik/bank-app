"use client";

import { cn } from "@shared/lib/utils";
import { SectionHeader } from "@shared/ui";
import type { UserProfileEducation } from "@shared/api/users";

const TEXT_COLOR = "#1E293B";

/** Base text: Inter 400, 14px, 20px line-height, -0.6% */
const TEXT_BASE = "text-[14px] leading-5 tracking-[-0.006em]";
const INSTITUTION_CLASS =
  "font-semibold text-[14px] leading-5 tracking-[-0.006em] text-[#1E293B]";
const SPECIALIZATION_CLASS =
  "font-normal text-[14px] leading-5 tracking-[-0.006em] text-[#1E293B]";

export type TranslateFn = (key: string) => string;

export interface EducationBlockProps {
  readonly education: readonly UserProfileEducation[];
  readonly t: TranslateFn;
}

function isPresentEndDate(end: string | undefined): boolean {
  const v = end?.trim().toLowerCase();
  return !v || v === "present";
}

function formatYear(iso: string): string {
  if (!iso?.trim()) return "—";
  try {
    const d = new Date(iso);
    return String(d.getFullYear());
  } catch {
    return iso;
  }
}

function getDisplayYear(edu: UserProfileEducation, t: TranslateFn): string {
  if (isPresentEndDate(edu.end_date)) return t("workerDetail.present");
  const endYear = formatYear(edu.end_date);
  if (endYear !== "—") return endYear;
  return formatYear(edu.start_date);
}

function getSpecialization(edu: UserProfileEducation): string {
  const parts = [edu.field_of_study, edu.description]
    .filter(Boolean)
    .map((s) => s.trim());
  return parts.length > 0 ? parts.join(", ") : "—";
}

export function EducationBlock({ education, t }: EducationBlockProps) {
  if (!education?.length) return null;

  return (
    <div className="flex flex-col gap-8 rounded-[16px] bg-white px-10 py-8">
      <SectionHeader title={t("workerDetail.education")} />
      <div className="flex flex-col">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className={cn(
              index > 0 && "border-t border-[#F1F5F9] pt-8 pb-8",
              index === 0 && "pb-8"
            )}
          >
            <div className="flex gap-8">
              <div className="flex w-[184px] shrink-0 flex-col gap-1">
                <span
                  className={cn(TEXT_BASE, "font-normal")}
                  style={{ color: TEXT_COLOR }}
                >
                  {getDisplayYear(edu, t)}
                </span>
                <span
                  className={cn(TEXT_BASE, "font-normal")}
                  style={{ color: TEXT_COLOR }}
                >
                  {edu.degree || "—"}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <span className={INSTITUTION_CLASS}>
                  {edu.institution || "—"}
                </span>
                <span className={SPECIALIZATION_CLASS}>
                  {getSpecialization(edu)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
