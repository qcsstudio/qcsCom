import { Geist, Geist_Mono } from "next/font/google";
import { Syne } from "next/font/google";
import "./globals.css";
import { PolicyProvider } from "@/context/policyContext";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata  = {
  title: " Leading SaaS & Software Development Company in Mohali - QuantumCrafters",
  description: " QuantumCrafters is a top-tier software development firm in Mohali, specializing in AI-driven SaaS products and professional IT training to fuel business transformation.",
  verification: {
    google: "MbqWeyYPvPzsogXFxsL8o_LZUqhL-lqb0C6-EeSNemM",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={syne.variable}>
      
      <body className={`${syne.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PolicyProvider>{children}</PolicyProvider>
      </body>
    </html>
  );
}
