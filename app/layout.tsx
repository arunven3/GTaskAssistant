import { ThemeProvider, ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeInit } from "../.flowbite-react/init";
import "@/styles/globals.css";
import { MainLayout } from "../components/main";
import { LoadingProvider } from "@/contexts/LoadingContext";
import ThemeSwitcher from "../components/theme/ThemeSwitch";
import { Theme } from "@/components/theme/ThemeProvider";

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
          <ThemeProvider theme={Theme}>
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
