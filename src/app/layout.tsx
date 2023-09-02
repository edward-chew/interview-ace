import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mock Interview",
  description: "Practice interviewing online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-slate-800 bg-slate-50 min-h-screen`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
