"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { createTranslator } from "@shared/lib/i18n";
import { useI18nStore } from "@shared/lib/i18n";
import { Button, Tabs } from "@shared/ui";
import { useUserQuery } from "../../model";
import { WorkerDetailGeneralTab } from "./worker-detail-general-tab";
import { WorkerDetailPersonalTab } from "./worker-detail-personal-tab";

export interface WorkerDetailPageProps {
  readonly workerId: string;
}

export function WorkerDetailPage({ workerId }: WorkerDetailPageProps) {
  const language = useI18nStore((s) => s.language);
  const t = createTranslator(language);
  const [activeTab, setActiveTab] = useState<"general" | "personal" | "resume">("general");

  const { data: user, isLoading, isError, error, refetch } = useUserQuery({
    id: workerId,
    lang: language,
  });

  const translateTariff = useCallback(
    (key: string) => t(`workers.tariffTypes.${key}`) || key,
    [t]
  );
  const translateStatus = useCallback(
    (key: string) => t(`workers.statuses.${key}`) || key,
    [t]
  );
  const translateJobStatus = useCallback(
    (key: string) => t(`workers.jobStatuses.${key}`) || key,
    [t]
  );
  const translateActivityType = useCallback(
    (key: string) => t(`workers.activityTypes.${key}`) || key,
    [t]
  );
  const translateGender = useCallback(
    (key: string) => t(`workers.genders.${key}`) || key,
    [t]
  );
  const translateCountry = useCallback(
    (key: string) => t(`workers.countries.${key}`) || key,
    [t]
  );
  const translateRegion = useCallback(
    (key: string) => t(`workers.regions.${key}`) || key,
    [t]
  );
  const translateCategory = useCallback(
    (key: string) => t(`workers.categories.${key}`) || key,
    [t]
  );

  const tabs = useMemo(
    () => [
      { id: "general", label: t("workerDetail.tabs.general") },
      { id: "personal", label: t("workerDetail.tabs.personal") },
      { id: "resume", label: t("workerDetail.tabs.resume") },
    ],
    [t]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-8">
        <svg
          className="h-10 w-10 animate-spin text-[#3B82F6]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-8 flex flex-col gap-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="font-medium">{t("common.error")}</p>
          <p className="text-sm mt-1">
            {(error as Error)?.message ?? "Unknown error"}
          </p>
          <Button variant="outline" size="sm" className="mt-3" onClick={refetch}>
            {t("common.retry")}
          </Button>
        </div>
        <Link href="/ishchilar" className="text-[#2563EB] hover:underline">
          ← {t("workers.title")}
        </Link>
      </div>
    );
  }

  const fullName = [user.first_name, user.last_name, user.patronymic]
    .filter(Boolean)
    .join(" ")
    .trim() || user.email || user.id;

  return (
    <div className="flex flex-col gap-6 p-8 bg-[#f8fafc]">
      <div className="flex flex-col gap-6! max-w-[1444px] mx-auto">
       

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start gap-[9px]">
           
            <Tabs
              t={t}
              titleLink="/ishchilar"
              titleLinkLabel={t("workers.title")}
              tabs={tabs}
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "general" | "personal" | "resume")}
            >
              {activeTab === "general" && (
                <WorkerDetailGeneralTab
                  user={user}
                  t={t}
                  translateTariff={translateTariff}
                  translateStatus={translateStatus}
                  translateJobStatus={translateJobStatus}
                  translateActivityType={translateActivityType}
                  translateGender={translateGender}
                  translateCountry={translateCountry}
                  translateRegion={translateRegion}
                  translateCategory={translateCategory}
                />
              )}
              {activeTab === "personal" && (
                <WorkerDetailPersonalTab
                  user={user}
                  t={t}
                  translateGender={translateGender}
                  translateCountry={translateCountry}
                  translateRegion={translateRegion}
                  translateCategory={translateCategory}
                />
              )}
              {activeTab === "resume" && (
                <div className="text-[14px] text-[#64748B] py-4">
                  {t("workerDetail.tabs.resumePlaceholder")}
                </div>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
