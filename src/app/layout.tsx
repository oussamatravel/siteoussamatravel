import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Dancing_Script } from "next/font/google";
import "./globals.css";
import ChatSupport from "@/components/ChatSupport";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Oussama Travel | Partout dans le monde",
  description: "Agence de voyages, études et immigration. Votre avenir, notre expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${dancingScript.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <ChatSupport />
      </body>
    </html>
  );
}
