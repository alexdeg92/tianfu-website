import type { CategoryId } from "@/app/data";

export type Dictionary = {
  meta: {
    siteName: string;
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    keywords: string[];
    openGraphTitle: string;
    openGraphDescription: string;
  };
  nav: {
    home: string;
    menu: string;
    about: string;
    locations: string;
    order: string;
    contact: string;
  };
  common: {
    orderNow: string;
    openNavigation: string;
    closeNavigation: string;
    sichuan: string;
    heat: string;
    spiceLevel: string;
    dishes: string;
    years: string;
    reviews: string;
    rating: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    startOrder: string;
    openInMaps: string;
    closed: string;
    themeLight: string;
    themeDark: string;
  };
  restaurant: {
    tagline: string;
  };
  ordering: {
    doordash: { label: string };
    ubereats: { label: string };
    phone: { name: string; label: string; cta: string };
  };
  days: Record<string, string>;
  home: {
    eyebrow: string;
    title: string;
    description: string;
    orderDelivery: string;
    viewMenu: string;
    signatureHeat: string;
    signatureTitle: string;
    statYears: string;
    statReviews: string;
    statRating: string;
    featuredEyebrow: string;
    featuredTitle: string;
    orderEyebrow: string;
    orderTitle: string;
    heroImageAlt: string;
  };
  menu: {
    metaTitle: string;
    metaDescription: string;
    itemDetailLabel: string;
    closeItemDetail: string;
    categories?: Partial<Record<CategoryId, string>>;
    items?: Partial<Record<string, { name: string; description: string }>>;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    styleEyebrow: string;
    styleTitle: string;
    styleBody: string;
    imageAlt: string;
  };
  locations: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    addressEyebrow: string;
  };
  order: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    policiesTitle: string;
    policies: string[];
  };
  footer: {
    ariaLabel: string;
    explore: string;
    today: string;
    viewAllHours: string;
    copyright: string;
  };
};
