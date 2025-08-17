import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeInit } from "../.flowbite-react/init";
import "./globals.css";
import { MainLayout } from "./components/main";
import { LoadingProvider } from "@/app/contexts/LoadingContext";
import ThemeSwitcher from "./components/theme/ThemeSwitch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GTaskAssistant",
  description: "AI-powered smart assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeSwitcher />
        <ThemeInit />
        <LoadingProvider>
          <MainLayout>{children}</MainLayout>
        </LoadingProvider>
      </body>
    </html>
  );
}
