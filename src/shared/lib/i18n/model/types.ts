export type Language = "ru" | "uz" | "en";

export const SUPPORTED_LANGUAGES: Language[] = ["ru", "uz", "en"];

export const isLanguage = (value: string | null): value is Language =>
  SUPPORTED_LANGUAGES.includes(value as Language);
