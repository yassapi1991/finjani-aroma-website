import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { SiteShell } from "@/components/layout/site-shell";
import { CartProvider } from "@/components/cart/cart-context";
import { brand } from "@/lib/brand";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://finjani-aroma-website.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: `${brand.name} | L'Art du Cafe Marocain`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Finjani Aroma est une maison de cafe premium marocaine, entre tradition, modernite et hospitalite raffinee.",
  keywords: [
    "café premium Maroc",
    "café spécialité Casablanca",
    "finjani aroma",
    "gelato artisanal",
    "café marocain moderne",
    "café premium bouskoura",
  ],
  openGraph: {
    title: `${brand.name} | L'Art du Cafe Marocain`,
    description:
      "Une experience cafe premium entre tradition marocaine et modernite.",
    url: "/",
    type: "website",
    siteName: brand.name,
    locale: "fr_MA",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${brand.name} - L'Art du Cafe Marocain`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: "L'Art du Cafe Marocain - experience premium et hospitalite raffinee.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--coffee-bg)] text-[var(--coffee-ink)]">
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider>
      </body>
    </html>
  );
}
