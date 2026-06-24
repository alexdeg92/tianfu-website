import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localizedPath } from "@/i18n/navigation";
import { siteUrl } from "@/app/lib/site";

const routes = ["/", "/menu", "/about", "/locations", "/order", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((path) => ({
      url: `${siteUrl}${localizedPath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.8,
    })),
  );
}
