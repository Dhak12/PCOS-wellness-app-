
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bloom — Women's Wellness",
  description:
    "Your personal companion for cycle tracking, nutrition, and wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
