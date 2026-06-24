import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { THEME_INIT_SCRIPT } from "@/app/lib/theme";
import { imageAssets } from "@/app/data/site";
import { Footer } from "@/app/components/Footer";
import { SiteChrome } from "@/app/components/SiteChrome";
import { absoluteUrl } from "@/app/lib/seo";
import { siteUrl } from "@/app/lib/site";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { localizedPath } from "@/i18n/navigation";
import "../globals.css";

const openGraphLocale: Record<Locale, string> = {
  en: "en_CA",
  fr: "fr_CA",
  zh: "zh_CN",
};

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    applicationName: dict.meta.siteName,
    title: {
      default: dict.meta.defaultTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.defaultDescription,
    keywords: dict.meta.keywords,
    authors: [{ name: dict.meta.siteName, url: siteUrl }],
    creator: dict.meta.siteName,
    openGraph: {
      title: dict.meta.openGraphTitle,
      description: dict.meta.openGraphDescription,
      type: "website",
      locale: openGraphLocale[locale],
      siteName: dict.meta.siteName,
      url: absoluteUrl(localizedPath(locale, "/")),
      images: [
        {
          url: imageAssets.hero,
          width: 300,
          height: 200,
          alt: dict.meta.openGraphTitle,
        },
        {
          url: imageAssets.logo,
          width: 500,
          height: 311,
          alt: dict.meta.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.openGraphTitle,
      description: dict.meta.openGraphDescription,
      images: [imageAssets.hero],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: "/icon",
      apple: "/apple-icon",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full bg-app">
        <SiteChrome locale={locale} dict={dict}>
          {children}
          <Footer locale={locale} dict={dict} />
        </SiteChrome>
      </body>
    </html>
  );
}
