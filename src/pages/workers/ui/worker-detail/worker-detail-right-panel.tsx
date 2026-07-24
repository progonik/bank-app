"use client";

import { DetailPanel } from "@shared/ui";
import type { UserApi } from "@shared/api/users";
import { AdditionalInfoBlock } from "./additional-info-block";
import { ProfessionalInfoBlock } from "./professional-info-block";

export type TranslateFn = (key: string) => string;

export interface WorkerDetailRightPanelProps {
  readonly user: UserApi;
  readonly t: TranslateFn;
  readonly translateTariff: (key: string) => string;
  readonly translateStatus: (key: string) => string;
  readonly translateJobStatus: (key: string) => string;
  readonly translateActivityType: (key: string) => string;
}

export function WorkerDetailRightPanel({
  user,
  t,
  translateTariff,
  translateStatus,
  translateJobStatus,
  translateActivityType,
}: WorkerDetailRightPanelProps) {
  return (
    <DetailPanel>
      <AdditionalInfoBlock
        user={user}
        t={t}
        translateTariff={translateTariff}
        translateStatus={translateStatus}
      />
      <ProfessionalInfoBlock
        user={user}
        t={t}
        translateJobStatus={translateJobStatus}
        translateActivityType={translateActivityType}
      />
    </DetailPanel>
  );
}
