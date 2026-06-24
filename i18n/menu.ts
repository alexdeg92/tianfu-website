import type { CategoryId, MenuItem } from "@/app/data";
import { categories } from "@/app/data";
import type { Locale } from "./config";
import type { Dictionary } from "./types";

export type ResolvedMenuItem = {
  id: MenuItem["id"];
  categoryId: CategoryId;
  price: string;
  spice: MenuItem["spice"];
  image: string;
  featured?: boolean;
  name: string;
  description: string;
  categoryLabel: string;
};

export function getCategoryLabel(categoryId: CategoryId, locale: Locale, dict: Dictionary) {
  const category = categories.find((entry) => entry.id === categoryId);
  if (!category) return categoryId;

  switch (locale) {
    case "zh":
      return category.labelZh;
    case "fr":
      return dict.menu.categories?.[categoryId] ?? category.label;
    default:
      return category.label;
  }
}

export function resolveMenuItem(item: MenuItem, locale: Locale, dict: Dictionary): ResolvedMenuItem {
  const name = locale === "zh" && item.nameZh ? item.nameZh : item.name;

  return {
    id: item.id,
    categoryId: item.categoryId,
    price: item.price,
    spice: item.spice,
    image: item.image,
    featured: item.featured,
    name,
    description: item.description,
    categoryLabel: getCategoryLabel(item.categoryId, locale, dict),
  };
}

export function resolveMenuItems(items: MenuItem[], locale: Locale, dict: Dictionary) {
  return items.map((item) => resolveMenuItem(item, locale, dict));
}

export function formatSpiceLevel(template: string, value: number) {
  return template.replace("{value}", String(value));
}
