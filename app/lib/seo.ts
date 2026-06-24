import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/navigation";
import { siteUrl } from "./site";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function pageAlternates(locale: Locale, path: string): Pick<Metadata, "alternates"> {
  const languages = Object.fromEntries(
    locales.map((l) => [l, absoluteUrl(localizedPath(l, path))]),
  ) as Record<string, string>;

  languages["x-default"] = absoluteUrl(localizedPath(defaultLocale, path));

  return {
    alternates: {
      canonical: absoluteUrl(localizedPath(locale, path)),
      languages,
    },
  };
}
