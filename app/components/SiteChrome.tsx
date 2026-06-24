"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { imageAssets, orderingLinks } from "@/app/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { localizedPath } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const navKeys = [
  { key: "home" as const, path: "/" },
  { key: "menu" as const, path: "/menu" },
  { key: "about" as const, path: "/about" },
  { key: "locations" as const, path: "/locations" },
  { key: "order" as const, path: "/order" },
  { key: "contact" as const, path: "/contact" },
];

export function SiteChrome({
  children,
  locale,
  dict,
}: {
  children: React.ReactNode;
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (path: string) => {
    const href = localizedPath(locale, path);
    return pathname === href || (path !== "/" && pathname.startsWith(`${href}/`));
  };

  return (
    <div className="min-h-screen bg-app">
      <ThemeToggle lightLabel={dict.common.themeLight} darkLabel={dict.common.themeDark} />
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] flex-col border-r border-chrome bg-chrome px-7 py-8 backdrop-blur-xl xl:flex">
        <div className="shrink-0">
          <Link href={localizedPath(locale)} className="block">
            <Image
              src={imageAssets.logo}
              alt={dict.meta.siteName}
              width={190}
              height={118}
              priority
              className="site-logo h-auto w-[170px]"
            />
            <span className="mt-5 block text-xs uppercase tracking-[0.42em] text-gold">
              {dict.restaurant.tagline}
            </span>
          </Link>
        </div>

        <nav className="mt-10 min-h-0 flex-1 overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="grid gap-2">
            {navKeys.map((item) => {
              const href = localizedPath(locale, item.path);
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`nav-link ${isActive(item.path) ? "nav-link-active" : ""}`}
                >
                  {dict.nav[item.key]}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="mt-6 shrink-0 border-t border-subtle pt-6">
          <LanguageSwitcher locale={locale} variant="sidebar" />
        </div>
      </aside>

      <header className="mobile-site-header fixed left-0 right-0 top-0 z-50 border-b border-subtle bg-header px-4 py-3 backdrop-blur-xl xl:left-[280px] xl:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href={localizedPath(locale)} className="flex items-center">
            <Image src={imageAssets.logo} alt={dict.meta.siteName} width={88} height={55} className="site-logo h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={dict.common.openNavigation}
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="menu-button"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer-scrim ${open ? "drawer-scrim-open" : ""}`} onClick={() => setOpen(false)} />
      <div className={`mobile-drawer ${open ? "mobile-drawer-open" : ""}`}>
        <div className="flex items-start justify-between">
          <Image src={imageAssets.logo} alt={dict.meta.siteName} width={150} height={93} className="site-logo h-auto w-32" />
          <button type="button" aria-label={dict.common.closeNavigation} onClick={() => setOpen(false)} className="close-button">
            x
          </button>
        </div>
        <nav className="mt-10 grid gap-3">
          {navKeys.map((item) => (
            <Link key={item.key} href={localizedPath(locale, item.path)} className="drawer-link">
              {dict.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="mt-6">
          <LanguageSwitcher locale={locale} />
        </div>
        <div className="mt-10 grid gap-3">
          {orderingLinks.map((link) => (
            <a key={link.id} href={link.href} className="primary-button justify-center" target="_blank" rel="noreferrer">
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <main className="page-transition pt-[73px] xl:ml-[280px] xl:pt-0">{children}</main>
    </div>
  );
}
