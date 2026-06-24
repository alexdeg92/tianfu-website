import Link from "next/link";
import { restaurant } from "@/app/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { localizedPath } from "@/i18n/navigation";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  restaurant.address.replace(/,\s*/g, " "),
)}`;

const navKeys = [
  { key: "home" as const, path: "/" },
  { key: "menu" as const, path: "/menu" },
  { key: "about" as const, path: "/about" },
  { key: "locations" as const, path: "/locations" },
  { key: "order" as const, path: "/order" },
  { key: "contact" as const, path: "/contact" },
];

function todayHoursKey(): (typeof restaurant.hours)[number][0] {
  const weekday = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Montreal",
    weekday: "long",
  })
    .format(new Date())
    .toLowerCase();

  return weekday as (typeof restaurant.hours)[number][0];
}

function formatHours(
  hours: string,
  dict: Dictionary,
): string {
  return hours === "closed" ? dict.common.closed : hours;
}

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const todayKey = todayHoursKey();
  const todayEntry = restaurant.hours.find(([day]) => day === todayKey);
  const todayHours = todayEntry ? formatHours(todayEntry[1], dict) : "";
  const year = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Montreal",
    year: "numeric",
  }).format(new Date());
  const copyright = dict.footer.copyright
    .replace("{year}", year)
    .replace("{siteName}", dict.meta.siteName);

  return (
    <footer className="site-footer" aria-label={dict.footer.ariaLabel}>
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <p className="eyebrow">{dict.restaurant.tagline}</p>
            <h2 className="site-footer-title">{dict.meta.siteName}</h2>
            <address className="site-footer-address not-italic">
              <a href={mapsUrl} target="_blank" rel="noreferrer">
                {restaurant.address}
              </a>
              <a href={`tel:${restaurant.phone.replaceAll("-", "")}`}>
                {restaurant.phone}
              </a>
            </address>
          </div>

          <div className="site-footer-secondary">
            <div className="site-footer-hours">
              <h3>{dict.common.hours}</h3>
              <p className="site-footer-today">
                <span>{dict.footer.today}</span>
                <strong>{todayHours}</strong>
              </p>
              <Link
                href={localizedPath(locale, "/locations")}
                className="site-footer-link site-footer-hours-link"
              >
                {dict.footer.viewAllHours}
              </Link>
            </div>

            <nav className="site-footer-nav" aria-label={dict.footer.explore}>
              <h3>{dict.footer.explore}</h3>
              <ul>
                {navKeys.map((item) => (
                  <li key={item.key}>
                    <Link href={localizedPath(locale, item.path)} className="site-footer-link">
                      {dict.nav[item.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
