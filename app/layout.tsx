import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Joshua Fabricante | Portfolio",
  description: "Portfolio of Joshua Fabricante - Filipino developer and freelancer. Showcasing React, Laravel, and WordPress projects.",
  openGraph: {
    title: "Joshua Fabricante | Portfolio",
    description: "Portfolio of Joshua Fabricante - Filipino developer and freelancer.",
    url: "https://joshuafabricante.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-gray-950 text-gray-50 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
