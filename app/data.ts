import menuCatalog from "./data/menu-catalog.json";
export { imageAssets, orderingLinks, restaurant } from "./data/site";

export type CategoryId = (typeof menuCatalog.categories)[number]["id"];
export type MenuItemId = (typeof menuCatalog.items)[number]["id"];

export type MenuCategory = {
  id: CategoryId;
  label: string;
  labelZh: string;
};

export type MenuItem = {
  id: MenuItemId;
  sourceId: string;
  categoryId: CategoryId;
  category: string;
  categoryZh: string;
  name: string;
  nameZh: string;
  description: string;
  price: string;
  spice: 0 | 1 | 2 | 3 | 4 | 5;
  image: string;
  featured?: boolean;
};

export const categories: MenuCategory[] = menuCatalog.categories;
export const categoryIds: CategoryId[] = categories.map((category) => category.id);

export const menuItems: MenuItem[] = menuCatalog.items.map((item) => ({
  id: item.id as MenuItemId,
  sourceId: item.sourceId,
  categoryId: item.categoryId as CategoryId,
  category: item.category,
  categoryZh: item.categoryZh,
  name: item.name,
  nameZh: item.nameZh,
  description: item.description,
  price: item.price,
  spice: item.spice as MenuItem["spice"],
  image: item.image,
  featured: item.featured,
}));

export const menuItemsByCategory = categoryIds.map((categoryId) => ({
  categoryId,
  items: menuItems.filter((item) => item.categoryId === categoryId),
}));

export const featuredItems = menuItems.filter((item) => item.featured);

export function categoryAnchor(categoryId: CategoryId) {
  return categoryId;
}

export const menuCatalogMeta = {
  source: menuCatalog.source,
  fetchedAt: menuCatalog.fetchedAt,
  placeholderImage: menuCatalog.placeholderImage,
  totalItems: menuItems.length,
  itemsWithImages: menuItems.filter((item) => item.image !== menuCatalog.placeholderImage).length,
  itemsWithoutImages: menuItems.filter((item) => item.image === menuCatalog.placeholderImage).length,
};
