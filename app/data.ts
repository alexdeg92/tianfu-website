import menuCatalog from "./data/menu-catalog.json";

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

export const restaurant = {
  name: "Tian Fu Restaurant",
  tagline: "Authentic Sichuan Cuisine",
  address: "8025 Taschereau Blvd, Brossard, QC J4Y 1A4",
  phone: "450-462-8888",
  email: "tianfu@gmail.com",
  rating: "4.1",
  reviews: "779",
  years: "13+",
  hours: [
    ["monday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
    ["tuesday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
    ["wednesday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
    ["thursday", "closed"],
    ["friday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
    ["saturday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
    ["sunday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
  ] as const,
};

export const imageAssets = {
  hero: "/images/aeb7e8adb2744c5ba3661d2109274aff_1-300x200.webp",
  logo: "/images/Image_20240309211911-500x311.webp",
  pattern: "/images/no_background-2560x1000.webp",
  homeIcon: "/images/home.webp",
  menuIcon: "/images/menu.webp",
};

export const orderingLinks = [
  {
    id: "doordash" as const,
    name: "DoorDash",
    href: "https://www.doordash.com/search/store/tian%20fu%20brossard/",
    label: "Fast local delivery",
  },
  {
    id: "ubereats" as const,
    name: "Uber Eats",
    href: "https://www.ubereats.com/ca/search?q=Tian%20Fu%20Brossard",
    label: "Order Sichuan classics",
  },
];

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
