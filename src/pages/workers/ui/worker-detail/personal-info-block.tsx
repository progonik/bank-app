"use client";

import { useMemo } from "react";
import {
  DetailInput,
  ProfileCard,
  SectionHeader,
  TagChip,
} from "@shared/ui";
import type { UserApi } from "@shared/api/users";
import { AVATAR_FALLBACK } from "../../model";
import { cn } from "@/src/shared";

export type TranslateFn = (key: string) => string;

export interface PersonalInfoBlockProps {
  readonly user: UserApi;
  readonly t: TranslateFn;
  readonly translateGender: (key: string) => string;
  readonly translateCountry: (key: string) => string;
  readonly translateRegion: (key: string) => string;
  readonly translateCategory?: (key: string) => string;
}

type DetailInputWidth = "default" | "full";

interface PersonalFieldConfig {
  readonly labelKey: string;
  readonly getValue: (user: UserApi) => string;
  readonly width?: DetailInputWidth;
  readonly gridSpan?: string;
  readonly placeholderKey?: string;
}

const normalizeKey = (v: string): string =>
  v.toLowerCase().replace(/\s+/g, "");

function createPersonalFields(
  translateGender: (k: string) => string,
  translateCountry: (k: string) => string,
  translateRegion: (k: string) => string
): readonly PersonalFieldConfig[] {
  return [
    { labelKey: "lastName", getValue: (u) => u.last_name ?? "" },
    { labelKey: "firstName", getValue: (u) => u.first_name ?? "" },
    { labelKey: "patronymic", getValue: (u) => u.patronymic ?? "-" },
    { labelKey: "phone", getValue: (u) => u.phone ?? "" },
    {
      labelKey: "telegram",
      getValue: (u) =>
        u.telegram ? `@${u.telegram.replace(/^@/, "")}` : "-",
    },
    {
      labelKey: "email",
      getValue: (u) => u.email ?? "",
      placeholderKey: "email",
    },
    {
      labelKey: "gender",
      getValue: (u) =>
        translateGender(normalizeKey(u.gender)) || u.gender || "-",
    },
    {
      labelKey: "country",
      getValue: (u) =>
        translateCountry(normalizeKey(u.country)) || u.country || "-",
    },
    {
      labelKey: "region",
      getValue: (u) =>
        translateRegion(normalizeKey(u.region)) || u.region || "-",
    },
    {
      labelKey: "nationality",
      getValue: (u) => u.nationality ?? "-",
      width: "full",
      gridSpan: "",
    },
  ] as const;
}

function getExperienceYears(user: UserApi): string | null {
  const exp = user.profile?.experience;
  if (!exp?.length) return null;
  const totalMonths = exp.reduce((acc, e) => {
    const start = e.start_date ? new Date(e.start_date).getTime() : 0;
    const end = e.end_date ? new Date(e.end_date).getTime() : Date.now();
    if (!start) return acc;
    return acc + Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
  }, 0);
  const years = Math.floor(totalMonths / 12);
  return years > 0 ? `${years}` : null;
}

function getSkills(user: UserApi): readonly string[] {
  return user.profile?.skills ?? [];
}

function getLanguages(user: UserApi): Array<{ name: string; level?: string }> {
  const lang = user.profile?.languages ?? [];
  return lang.map((l) => ({
    name: l.name,
    level: l.level?.trim() || undefined,
  }));
}

export function PersonalInfoBlock({
  user,
  t,
  translateGender,
  translateCountry,
  translateRegion,
  translateCategory = (k) => k,
}: PersonalInfoBlockProps) {
  const fullName = [user.last_name, user.first_name, user.patronymic]
    .filter(Boolean)
    .join(" ")
    .trim() || user.email || "—";

  const specializations = user.specializations ?? [];
  const primarySpec = specializations[0];
  const experienceYears = getExperienceYears(user);
  const skills = getSkills(user);
  const languages = getLanguages(user);
  const about = user.profile?.about?.trim();

  const avatarSrc = user.profile_pic_url || AVATAR_FALLBACK;

  const personalFields = useMemo(
    () =>
      createPersonalFields(
        translateGender,
        translateCountry,
        translateRegion
      ),
    [translateGender, translateCountry, translateRegion]
  );

  return (
    <div className="flex flex-col gap-8 bg-white rounded-[16px] p-[32px] min-w-[956px] w-full">
      <SectionHeader title={t("workerDetail.tabs.personal")} />

      <ProfileCard avatarSrc={avatarSrc} fullName={fullName}>
        <div className="flex flex-wrap items-center gap-2">
          {primarySpec && (
            <span className="font-inter font-medium text-sm leading-5 tracking-[-0.006em] text-[#1D4ED8]">
              {translateCategory(primarySpec) || primarySpec}
            </span>
          )}
          {specializations.slice(1, 2).map((s) => (
            <span className="font-inter font-medium text-sm leading-5 flex items-center gap-2 tracking-[-0.006em] text-[#334155]">
              <span className="text-[#CBD5E1]">|</span> {translateCategory(s) || s}
            </span>
          ))}
          {experienceYears && (
            <span className="font-inter font-medium text-sm leading-5 flex items-center gap-2 tracking-[-0.006em] text-[#334155]">
              <span className="text-[#CBD5E1]">|</span> {`${experienceYears} ${t("workerDetail.yearsExp")}`}
            </span>
          )}
          {user.gender && (
            <span className="font-inter font-medium text-sm leading-5 flex items-center gap-2 tracking-[-0.006em] text-[#334155]">
              <span className="text-[#CBD5E1]">|</span> {translateGender(normalizeKey(user.gender)) || user.gender}
            </span>
          )}
        </div>
      </ProfileCard>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {personalFields.map(({ labelKey, getValue, width = "default", gridSpan, placeholderKey }) => (
          <DetailInput
            key={labelKey}
            label={t(`workerDetail.${labelKey}`)}
            value={getValue(user)}
            placeholder={placeholderKey ? t(`workerDetail.${placeholderKey}`) : undefined}
            readOnly
            width={width}
            className={cn(gridSpan)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <SectionHeader
            title={t("workerDetail.skills")}
            className="!text-[20px]"
          />
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((s) => <TagChip key={s} label={s} />)
            ) : (
              <span className="text-[14px] leading-5 text-[#64748B]">—</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <SectionHeader
            title={t("workerDetail.languages")}
            className="!text-[20px]"
          />
          <div className="flex flex-wrap gap-2">
            {languages.length > 0 ? (
              languages.map((l) => (
                <TagChip
                  key={`${l.name}-${l.level || ""}`}
                  label={l.level ? `${l.name} — ${l.level}` : l.name}
                />
              ))
            ) : (
              <span className="text-[14px] leading-5 text-[#64748B]">—</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <SectionHeader
            title={t("workerDetail.aboutMe")}
            className="!text-[20px]"
          />
          <div className="text-[14px] leading-[22px] text-[#334155] whitespace-pre-wrap">
            {about || "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
