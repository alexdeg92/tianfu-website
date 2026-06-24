export const locales = ["en", "fr", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  zh: "中文",
};

export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  zh: "中",
};
