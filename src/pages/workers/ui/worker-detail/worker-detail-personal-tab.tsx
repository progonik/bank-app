"use client";

import type { UserApi } from "@shared/api/users";
import { PersonalInfoBlock } from "./personal-info-block";

export type TranslateFn = (key: string) => string;

export interface WorkerDetailPersonalTabProps {
  readonly user: UserApi;
  readonly t: TranslateFn;
  readonly translateGender: (key: string) => string;
  readonly translateCountry: (key: string) => string;
  readonly translateRegion: (key: string) => string;
  readonly translateCategory: (key: string) => string;
}

export function WorkerDetailPersonalTab({
  user,
  t,
  translateGender,
  translateCountry,
  translateRegion,
  translateCategory,
}: WorkerDetailPersonalTabProps) {
  return (
    <div className="min-w-0 max-w-[900px]">
      <PersonalInfoBlock
        user={user}
        t={t}
        translateGender={translateGender}
        translateCountry={translateCountry}
        translateRegion={translateRegion}
        translateCategory={translateCategory}
      />
    </div>
  );
}
