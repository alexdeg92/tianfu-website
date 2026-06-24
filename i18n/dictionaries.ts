import type { Locale } from "./config";
import { locales } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default as Dictionary),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default as Dictionary),
  zh: () => import("./dictionaries/zh.json").then((module) => module.default as Dictionary),
};

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
