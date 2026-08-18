import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Syne, Zen_Dots, Black_Ops_One, Orbitron } from "next/font/google";
import Layout from "@/components/layout/Layout";
import "./globals.css";
import "./../styles/global/main.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--f-pera-1',
  display: 'swap',
});

export const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--f-link-1',
  display: 'swap',
});

export const zenDots = Zen_Dots({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-h-1",
  display: "swap",
});

export const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-h-2",
  display: "swap",
});

export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-h-3",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JAZBAH",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
