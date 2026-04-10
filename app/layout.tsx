import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "YUEJIN — The Future of Wealth Gaming",
  description:
    "YUEJIN is a next-generation wealth gaming platform engineered for premium performance, transparent systems, and intelligent progression.",
  keywords: [
    "YUEJIN",
    "wealth gaming",
    "premium platform",
    "fintech UX",
    "global",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-aurix-void font-sans text-aurix-text">{children}</body>
    </html>
  );
}
