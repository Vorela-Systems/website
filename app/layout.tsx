import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vorela Systems — Focused software",
  description: "Practical, privacy-conscious software for everyday routines and engineering decisions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
