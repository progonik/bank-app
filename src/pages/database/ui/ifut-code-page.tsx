"use client";

import { useI18nStore } from "@shared/lib/i18n";
import { createTranslator } from "@shared/lib/i18n";
import { SIDEBAR_MENU_KEYS } from "@entities/navigation";

export function IfutCodePage() {
  const language = useI18nStore((s) => s.language);
  const t = createTranslator(language);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[#1E293B]">
        {t(SIDEBAR_MENU_KEYS.IFUT_CODE)}
      </h1>
      <p className="mt-4 text-[#64748B]">
        IFUT kodi sahifasi — tez orada qo&apos;shiladi.
      </p>
    </div>
  );
}
