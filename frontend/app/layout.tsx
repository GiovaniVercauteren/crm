import type { Metadata } from "next";
import { Lustria } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/common/theme-toggle";

export const lustriaRegular = Lustria({
  weight: "400",
  variable: "--font-lustria-regular",
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
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
