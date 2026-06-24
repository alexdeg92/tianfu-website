export type MenuItem = {
  name: string;
  category: string;
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
    ["Monday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
    ["Tuesday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
    ["Wednesday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
    ["Thursday", "Closed"],
    ["Friday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
    ["Saturday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
    ["Sunday", "11:00 AM - 2:00 PM, 4:00 PM - 8:30 PM"],
  ],
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
    name: "DoorDash",
    href: "https://www.doordash.com/search/store/tian%20fu%20brossard/",
    label: "Fast local delivery",
  },
  {
    name: "Uber Eats",
    href: "https://www.ubereats.com/ca/search?q=Tian%20Fu%20Brossard",
    label: "Order Sichuan classics",
  },
  {
    name: "SkipTheDishes",
    href: "https://www.skipthedishes.com/search?q=Tian%20Fu%20Brossard",
    label: "Pickup or delivery",
  },
];

export const categories = [
  "Appetizers",
  "Soups",
  "Chicken",
  "Beef",
  "Pork",
  "Seafood",
  "Tofu",
  "Vegetables",
  "Specialties",
  "Rice & Noodles",
];

const dishImages = [
  imageAssets.hero,
  imageAssets.logo,
  imageAssets.pattern,
  imageAssets.homeIcon,
  imageAssets.menuIcon,
];

export const menuItems: MenuItem[] = [
  {
    name: "Mapo Tofu",
    category: "Tofu",
    description: "Silken tofu, ground pork, broad bean paste, chili oil, and Sichuan peppercorn heat.",
    price: "$16.95",
    spice: 5,
    image: dishImages[0],
    featured: true,
  },
  {
    name: "Gong Bao Chicken",
    category: "Chicken",
    description: "Diced chicken wok-tossed with roasted peanuts, dried chilies, and aromatic sauce.",
    price: "$17.95",
    spice: 4,
    image: dishImages[1],
    featured: true,
  },
  {
    name: "Chongqing Spicy Chicken",
    category: "Chicken",
    description: "Crisp chicken nestled with toasted chilies and numbing Sichuan peppercorns.",
    price: "$18.95",
    spice: 5,
    image: dishImages[2],
    featured: true,
  },
  {
    name: "Sizzling Beef",
    category: "Beef",
    description: "Tender beef and vegetables served steaming on a hot iron plate.",
    price: "$19.95",
    spice: 3,
    image: dishImages[3],
    featured: true,
  },
  {
    name: "Beef with Black Bean Sauce",
    category: "Beef",
    description: "Sliced beef with fermented black beans, peppers, ginger, and scallions.",
    price: "$19.95",
    spice: 3,
    image: dishImages[4],
  },
  {
    name: "Hot & Sour Soup",
    category: "Soups",
    description: "Peppery broth with tofu, bamboo shoots, mushrooms, and egg ribbons.",
    price: "$5.95",
    spice: 3,
    image: dishImages[0],
  },
  {
    name: "Wonton Soup",
    category: "Soups",
    description: "Hand-folded wontons in a clear broth with greens and sesame aroma.",
    price: "$5.50",
    spice: 1,
    image: dishImages[1],
  },
  {
    name: "Duck Cheeks",
    category: "Specialties",
    description: "Tender duck cheeks braised and finished with Tian Fu's Sichuan sauce.",
    price: "$22.95",
    spice: 3,
    image: dishImages[2],
  },
  {
    name: "Beef Tongue",
    category: "Specialties",
    description: "Thin-sliced beef tongue with chili oil, sesame, and fragrant spices.",
    price: "$21.95",
    spice: 4,
    image: dishImages[3],
  },
  {
    name: "Sichuan Intestines",
    category: "Specialties",
    description: "A bold traditional preparation with chilies, aromatics, and deep savory sauce.",
    price: "$20.95",
    spice: 4,
    image: dishImages[4],
  },
  {
    name: "Garlic Pork Slices",
    category: "Pork",
    description: "Chilled pork ribbons with garlic, soy, chili oil, and cucumber.",
    price: "$15.95",
    spice: 3,
    image: dishImages[0],
  },
  {
    name: "Double-Cooked Pork",
    category: "Pork",
    description: "Pork belly, leeks, peppers, and fermented bean paste from the wok.",
    price: "$18.95",
    spice: 4,
    image: dishImages[1],
  },
  {
    name: "Spicy Fish Fillet Soup",
    category: "Seafood",
    description: "White fish in a vivid chili broth with bean sprouts and Sichuan pepper.",
    price: "$24.95",
    spice: 5,
    image: dishImages[2],
  },
  {
    name: "Salt & Pepper Shrimp",
    category: "Seafood",
    description: "Crisp shrimp tossed with garlic, chilies, scallions, and toasted spice.",
    price: "$22.95",
    spice: 2,
    image: dishImages[3],
  },
  {
    name: "Dry-Fried Green Beans",
    category: "Vegetables",
    description: "Blistered beans with preserved vegetables, garlic, and chili.",
    price: "$15.95",
    spice: 3,
    image: dishImages[4],
  },
  {
    name: "Eggplant Yu Xiang",
    category: "Vegetables",
    description: "Silky eggplant in sweet, sour, garlicky Sichuan fish-fragrant sauce.",
    price: "$16.95",
    spice: 3,
    image: dishImages[0],
  },
  {
    name: "Dan Dan Noodles",
    category: "Rice & Noodles",
    description: "Noodles with minced pork, sesame, chili oil, preserved vegetables, and scallion.",
    price: "$13.95",
    spice: 4,
    image: dishImages[1],
  },
  {
    name: "Yangzhou Fried Rice",
    category: "Rice & Noodles",
    description: "Classic fried rice with egg, vegetables, and wok fragrance.",
    price: "$14.95",
    spice: 0,
    image: dishImages[2],
  },
  {
    name: "Cucumber in Chili Oil",
    category: "Appetizers",
    description: "Crushed cucumber, garlic, vinegar, sesame, and bright chili oil.",
    price: "$9.95",
    spice: 2,
    image: dishImages[3],
  },
  {
    name: "Spicy Wontons",
    category: "Appetizers",
    description: "Wontons dressed with house chili oil, soy, sesame, and scallion.",
    price: "$10.95",
    spice: 4,
    image: dishImages[4],
  },
];

export const featuredItems = menuItems.filter((item) => item.featured);
