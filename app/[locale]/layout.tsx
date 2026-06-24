import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/app/components/Footer";
import { SiteChrome } from "@/app/components/SiteChrome";
import { locales } from "@/i18n/config";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import "../globals.css";

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
    metadataBase: new URL("https://tianfu-website.vercel.app"),
    title: {
      default: dict.meta.defaultTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.defaultDescription,
    keywords: dict.meta.keywords,
    openGraph: {
      title: dict.meta.openGraphTitle,
      description: dict.meta.openGraphDescription,
      type: "website",
      images: ["/images/aeb7e8adb2744c5ba3661d2109274aff_1-300x200.webp"],
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
      <body className="min-h-full bg-app">
        <SiteChrome locale={locale} dict={dict}>
          {children}
          <Footer locale={locale} dict={dict} />
        </SiteChrome>
      </body>
    </html>
  );
}
