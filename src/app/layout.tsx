import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description: "Real-time crypto data dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
