import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aaditya Srinivasan — Backend Engineer",
    template: "%s | Aaditya Srinivasan",
  },
  description:
    "Backend Engineer & Systems Builder. Building scalable systems, low-latency backends, and contributing to open source.",
  keywords: [
    "backend engineer",
    "systems programming",
    "C++",
    "Java",
    "open source",
    "Apache Arrow",
  ],
  authors: [{ name: "Aaditya Srinivasan", url: "https://github.com/Reranko05" }],
  openGraph: {
    type: "website",
    title: "Aaditya Srinivasan — Backend Engineer",
    description:
      "Backend Engineer & Systems Builder. Building scalable systems, low-latency backends, and contributing to open source.",
    siteName: "Aaditya Srinivasan",
  },
  twitter: {
    card: "summary",
    title: "Aaditya Srinivasan — Backend Engineer",
    description:
      "Backend Engineer & Systems Builder. Building scalable systems, low-latency backends, and contributing to open source.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-gh-canvas)", color: "var(--color-gh-text)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
