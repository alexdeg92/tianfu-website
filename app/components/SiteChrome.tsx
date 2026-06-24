"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { imageAssets, orderingLinks, restaurant } from "../data";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/locations", label: "Locations" },
  { href: "/order", label: "Order" },
  { href: "/contact", label: "Contact" },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-[#0b0a08] text-stone-100">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] border-r border-[#d0a55d]/20 bg-[#0b0a08]/92 px-7 py-8 backdrop-blur-xl xl:block">
        <Link href="/" className="block">
          <Image
            src={imageAssets.logo}
            alt="Tian Fu Restaurant"
            width={190}
            height={118}
            priority
            className="h-auto w-[170px] brightness-0 invert"
          />
          <span className="mt-5 block text-xs uppercase tracking-[0.42em] text-[#d0a55d]">
            {restaurant.tagline}
          </span>
        </Link>

        <nav className="mt-14 grid gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? "nav-link-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-7 right-7">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Order now</p>
          <div className="mt-4 grid gap-2">
            {orderingLinks.map((link) => (
              <a key={link.name} href={link.href} className="order-chip" target="_blank" rel="noreferrer">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0b0a08]/82 px-4 py-3 backdrop-blur-xl xl:left-[280px] xl:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src={imageAssets.logo} alt="Tian Fu" width={88} height={55} className="h-10 w-auto brightness-0 invert" />
            <span className="text-xs uppercase tracking-[0.32em] text-[#d0a55d]">Sichuan</span>
          </Link>
          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="menu-button"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`drawer-scrim ${open ? "drawer-scrim-open" : ""}`} onClick={() => setOpen(false)} />
      <div className={`mobile-drawer ${open ? "mobile-drawer-open" : ""}`}>
        <div className="flex items-start justify-between">
          <Image src={imageAssets.logo} alt="Tian Fu" width={150} height={93} className="h-auto w-32 brightness-0 invert" />
          <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className="close-button">
            x
          </button>
        </div>
        <nav className="mt-10 grid gap-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="drawer-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10 grid gap-3">
          {orderingLinks.map((link) => (
            <a key={link.name} href={link.href} className="primary-button justify-center" target="_blank" rel="noreferrer">
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <main className="page-transition pt-[73px] xl:ml-[280px] xl:pt-0">{children}</main>
    </div>
  );
}
