"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  localeLabels,
  localeShortLabels,
  locales,
  type Locale,
} from "@/i18n/config";
import { switchLocalePath } from "@/i18n/navigation";

export function LanguageSwitcher({
  locale,
  variant = "inline",
}: {
  locale: Locale;
  variant?: "inline" | "sidebar";
}) {
  const pathname = usePathname();

  const isSidebar = variant === "sidebar";

  return (
    <div
      className={`flex ${isSidebar ? "flex-row gap-1" : "flex-wrap gap-2"}`}
      role="navigation"
      aria-label="Language"
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={switchLocalePath(pathname, code)}
            className={`rounded-sm border font-semibold transition ${
              isSidebar
                ? "min-w-0 flex-1 px-1.5 py-1 text-center text-[0.62rem] tracking-[0.12em]"
                : "px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.18em]"
            } ${active ? "lang-link-active" : "lang-link-inactive"}`}
            aria-current={active ? "page" : undefined}
            aria-label={localeLabels[code]}
            lang={code}
          >
            {isSidebar ? localeShortLabels[code] : localeLabels[code]}
          </Link>
        );
      })}
    </div>
  );
}
