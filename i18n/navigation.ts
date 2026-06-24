import { defaultLocale, type Locale, locales } from "./config";

export function localizedPath(locale: Locale, path = "/") {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function parseLocalizedPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (maybeLocale && locales.includes(maybeLocale as Locale)) {
    const locale = maybeLocale as Locale;
    const rest = segments.slice(1).join("/");
    return { locale, path: rest ? `/${rest}` : "/" };
  }

  return { locale: null, path: pathname || "/" };
}

export function switchLocalePath(pathname: string, nextLocale: Locale) {
  const { path } = parseLocalizedPathname(pathname);
  return localizedPath(nextLocale, path);
}

export function resolveLocale(value: string | null | undefined): Locale {
  if (value && locales.includes(value as Locale)) {
    return value as Locale;
  }
  return defaultLocale;
}
