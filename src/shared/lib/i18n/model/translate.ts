import type { Language } from "./types";
import ruTranslations from "../locales/ru.json";
import uzTranslations from "../locales/uz.json";
import enTranslations from "../locales/en.json";

const TRANSLATIONS: Record<Language, typeof ruTranslations> = {
  ru: ruTranslations,
  uz: uzTranslations,
  en: enTranslations,
};

function resolveKey(
  data: Record<string, unknown>,
  key: string
): string | undefined {
  const keys = key.split(".");
  let value: unknown = data;
  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
    if (value === undefined) return undefined;
  }
  return typeof value === "string" ? value : undefined;
}

function interpolate(
  template: string,
  params?: Record<string, string | number>
): string {
  if (!params) return template;
  return template.replace(
    /\{\{(\w+)\}\}/g,
    (_, paramKey) => params[paramKey]?.toString() ?? ""
  );
}

export function createTranslator(language: Language) {
  const data = TRANSLATIONS[language] ?? TRANSLATIONS.ru;
  return function t(
    key: string,
    params?: Record<string, string | number>
  ): string {
    const value = resolveKey(data as Record<string, unknown>, key);
    return value ? interpolate(value, params) : key;
  };
}
