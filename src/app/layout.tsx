import type { Metadata } from "next";
import { Figtree, Roboto_Serif } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["500", "600", "700", "800"],
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-roboto-serif",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Zap! Story Gen",
  description: "Teacher-led classroom storytelling for ESL ages 6–8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${robotoSerif.variable}`}>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
