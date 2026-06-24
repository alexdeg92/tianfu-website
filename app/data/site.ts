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
