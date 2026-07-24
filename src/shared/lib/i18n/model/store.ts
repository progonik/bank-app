"use client";

import { create } from "zustand";
import type { Language } from "./types";
import { isLanguage } from "./types";
import ruTranslations from "../locales/ru.json";
import uzTranslations from "../locales/uz.json";
import enTranslations from "../locales/en.json";

const TRANSLATIONS: Record<Language, typeof ruTranslations> = {
  ru: ruTranslations,
  uz: uzTranslations,
  en: enTranslations,
};

const STORAGE_KEY = "language";
const DEFAULT_LANGUAGE: Language = "ru";

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  language: DEFAULT_LANGUAGE,
  setLanguage: (lang: Language) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
    set({ language: lang });
  },
}));
