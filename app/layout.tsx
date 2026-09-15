import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Golden Hive | Artisanal Raw Honey",
  description: "Experience nature's purest liquid gold. Sustainably sourced from pristine wildflower meadows and remote organic apiaries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900 selection:bg-indigo-600 selection:text-white`}
      >
        <CartProvider>
          {/* Promotional Delivery Bar */}
          <div className="bg-amber-800 text-amber-50 text-[11px] sm:text-xs py-1.5 px-3 text-center font-medium tracking-wide">
            🍯 Free delivery on all orders over $50 • Use code <span className="underline font-bold text-amber-200">GOLDEN2026</span> for 10% off
          </div>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
