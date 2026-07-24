"use client";

import type { UserApi } from "@shared/api/users";
import { PersonalInfoBlock } from "./personal-info-block";
import { WorkerDetailRightPanel } from "./worker-detail-right-panel";
import { EducationBlock } from "./education-block";
import { WorkExperienceBlock } from "./work-experience-block";
import { SectionHeader } from "@shared/ui";

export type TranslateFn = (key: string) => string;

export interface WorkerDetailGeneralTabProps {
  readonly user: UserApi;
  readonly t: TranslateFn;
  readonly translateTariff: (key: string) => string;
  readonly translateStatus: (key: string) => string;
  readonly translateJobStatus: (key: string) => string;
  readonly translateActivityType: (key: string) => string;
  readonly translateGender: (key: string) => string;
  readonly translateCountry: (key: string) => string;
  readonly translateRegion: (key: string) => string;
  readonly translateCategory: (key: string) => string;
}

export function WorkerDetailGeneralTab({
  user,
  t,
  translateTariff,
  translateStatus,
  translateJobStatus,
  translateActivityType,
  translateGender,
  translateCountry,
  translateRegion,
  translateCategory,
}: WorkerDetailGeneralTabProps) {
  return (
    <div>
      <SectionHeader title={t("workerDetail.tabs.general")} className="text-[20px] pb-4 leading-2" />
      <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:gap-8 mt-4">
        <div className="flex min-w-0 max-w-[956px] flex-1 flex-col gap-8">
          <PersonalInfoBlock
            user={user}
            t={t}
            translateGender={translateGender}
            translateCountry={translateCountry}
            translateRegion={translateRegion}
            translateCategory={translateCategory}
          />
          <WorkExperienceBlock
            experiences={user.profile?.experience ?? []}
            t={t}
          />
          <EducationBlock
            education={user.profile?.education ?? []}
            t={t}
          />
        </div>
        <aside className="shrink-0 max-w-[468px]">
          <WorkerDetailRightPanel
            user={user}
            t={t}
            translateTariff={translateTariff}
            translateStatus={translateStatus}
            translateJobStatus={translateJobStatus}
            translateActivityType={translateActivityType}
          />
        </aside>
      </div>
    </div>
  );
}
