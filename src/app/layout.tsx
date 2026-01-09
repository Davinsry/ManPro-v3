import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PandawaX45 Kost Eksklusif | Fasilitas Hotel, Harga Kost",
  description: "Kost nyaman dengan konsep Executive. Fasilitas lengkap: AC, Kamar Mandi Dalam, Gratis Token Listrik. Lokasi strategis dekat Pakuwon Mall & Kampus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
