import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import apiClient from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import AppHeader from "@/app/app-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM Application",
  description: "A simple CRM application built with Next.js and NestJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
