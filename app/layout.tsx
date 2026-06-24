import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "./components/SiteChrome";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tianfu-website.vercel.app"),
  title: {
    default: "Tian Fu Restaurant | Authentic Sichuan in Brossard",
    template: "%s | Tian Fu Restaurant",
  },
  description:
    "Tian Fu Restaurant serves authentic Sichuan cuisine in Brossard, minutes from Montreal. Explore bold signature dishes, hours, location, and delivery links.",
  keywords: [
    "Tian Fu Restaurant",
    "Sichuan restaurant Brossard",
    "Sichuan Montreal",
    "authentic Chinese food",
    "Mapo Tofu",
    "Gong Bao Chicken",
  ],
  openGraph: {
    title: "Tian Fu Restaurant | Authentic Sichuan Cuisine",
    description: "Premium Sichuan restaurant in Brossard, QC.",
    type: "website",
    images: ["/images/aeb7e8adb2744c5ba3661d2109274aff_1-300x200.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#0b0a08] text-stone-100">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
