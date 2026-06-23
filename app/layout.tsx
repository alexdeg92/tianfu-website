import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tian Fu | Premium Sichuan Restaurant in Brossard, QC",
  description: "Experience authentic Sichuan culinary artistry at Tian Fu. Signature dishes include Mapo Tofu, Gong Bao Chicken, and premium specialty preparations. 13+ years of excellence.",
  keywords: "Sichuan restaurant, Brossard, Sichuan cuisine, authentic Chinese food, Mapo Tofu, Gong Bao Chicken",
  openGraph: {
    title: "Tian Fu | Authentic Sichuan Cuisine",
    description: "Premium Sichuan restaurant in Brossard, QC",
    type: "website",
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
      className={`${playfair.variable} ${lora.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </head>
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-100">{children}</body>
    </html>
  );
}
