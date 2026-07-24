"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@shared/ui";
import { useI18nStore } from "@shared/lib/i18n";
import type { Language } from "@shared/lib/i18n";
import { LANGUAGE_NAMES, LANGUAGE_FLAGS } from "../../model/config";

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18nStore();

  return (
    <Select
      value={language}
      onValueChange={(value: Language) => setLanguage(value)}
    >
      <SelectTrigger className="w-auto border-none shadow-none p-0 h-auto hover:bg-transparent focus:ring-0 bg-transparent">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src={`/flags/${LANGUAGE_FLAGS[language]}`}
            alt={language}
            width={24}
            height={24}
          />
          <span className="text-[14px] leading-[20px] font-medium text-[#64748B]">
            {LANGUAGE_NAMES[language]}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[140px]">
        {(Object.keys(LANGUAGE_NAMES) as Language[]).map((lang) => (
          <SelectItem key={lang} value={lang}>
            <div className="flex items-center gap-2">
              <Image
                src={`/flags/${LANGUAGE_FLAGS[lang]}`}
                alt={LANGUAGE_NAMES[lang]}
                width={24}
                height={24}
              />
              <span>{LANGUAGE_NAMES[lang]}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
