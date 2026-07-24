"use client";

import { DetailField, SectionHeader, TagChip } from "@shared/ui";
import type { UserApi } from "@shared/api/users";

const JOB_STATUS_ACTIVE_COLOR = "#16A34A";
const SALARY_COLOR = "#2563EB";

function getSalaryDisplay(user: UserApi): string {
  return "—";
}

function getInterests(user: UserApi): readonly string[] {
  const profile = user.profile;
  if (!profile) return [];
  if (profile.achievements?.trim()) {
    return profile.achievements
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return profile.skills ?? [];
}

export type TranslateFn = (key: string) => string;

export interface ProfessionalInfoBlockProps {
  readonly user: UserApi;
  readonly t: TranslateFn;
  readonly translateJobStatus: (key: string) => string;
  readonly translateActivityType: (key: string) => string;
}

export function ProfessionalInfoBlock({
  user,
  t,
  translateJobStatus,
  translateActivityType,
}: ProfessionalInfoBlockProps) {
  const jobStatusLabel = translateJobStatus(user.job_status) || "—";
  const activityLabel = translateActivityType(user.activity_type) || "—";
  const salaryDisplay = getSalaryDisplay(user);
  const specializations = user.specializations ?? [];
  const interests = getInterests(user);

  const jobKey = user.job_status?.toLowerCase().replace(/\s+/g, "_");
  const isActiveStatus =
    jobKey === "actively_searching" ||
    jobKey === "open_to_offers" ||
    user.job_status?.toLowerCase().includes("active") ||
    user.status === "active";

  return (
    <div className="flex flex-col gap-6 bg-white rounded-[16px] p-[32px]">
      <SectionHeader title={t("workerDetail.professionalInfo")} />

      <DetailField
        label={t("workerDetail.jobStatus")}
        value={jobStatusLabel}
        valueColor={isActiveStatus ? JOB_STATUS_ACTIVE_COLOR : undefined}
        fullWidth
      />
      <DetailField
        label={t("workerDetail.activityType")}
        value={activityLabel}
        fullWidth
      />
      <DetailField
        label={t("workerDetail.salary")}
        value={salaryDisplay}
        valueColor={SALARY_COLOR}
        fullWidth
      />

      <div className="flex flex-col gap-2">
        <span className="font-semibold text-[14px] leading-[20px] tracking-[-0.006em] text-[#000000]">
          {t("workerDetail.specialization")}
        </span>
        <div className="flex flex-wrap gap-2 items-center rounded-[12px] border border-[#E2E8F0] bg-[#FFFFFF] p-3 min-h-[120px]">
          {specializations.map((s) => (
            <TagChip key={s} label={s} onRemove={() => { }} />
          ))}
          <button
            type="button"
            className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full bg-[#FFFFFF] text-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
            aria-label={t("common.add")}
          >
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.75 12.4167H17.0833M12.4167 7.75V17.0833M24.0833 12.4167C24.0833 18.86 18.86 24.0833 12.4167 24.0833C5.97334 24.0833 0.75 18.86 0.75 12.4167C0.75 5.97334 5.97334 0.75 12.4167 0.75C18.86 0.75 24.0833 5.97334 24.0833 12.4167Z" stroke="#224CD3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SectionHeader
          title={t("workerDetail.interests")}
          className="!text-[20px]"
        />
        <div className="flex flex-wrap gap-2">
          {interests.length > 0 ? (
            interests.map((item) => <TagChip key={item} label={item} />)
          ) : (
            <span className="text-[14px] leading-5 text-[#64748B]">—</span>
          )}
        </div>
      </div>
    </div>
  );
}
