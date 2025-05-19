import { Geist, Geist_Mono, Syne, Unbounded } from "next/font/google";
import "./globals.css";
import { PolicyProvider } from "@/context/policyContext";
// import { Syne } from 'next/font/google';

// const syne = Syne({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-syne',  // Important for Tailwind
// });

// const unbounded = Unbounded({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-unbounded',
// });

const syne = Syne({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syne",
});
const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '700'],  // jo weight chahiye uske according
  variable: '--font-unbounded',
})

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
    <html lang="en" className={`${syne.variable} ${unbounded.variable}`}>
       <head>
        {/* Google Analytics Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TGNFYNFQQ2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TGNFYNFQQ2');
            `,
          }}
        />
      </head>
      <body className={`${syne.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
      <PolicyProvider>{children}</PolicyProvider>
      </body>
    </html>
  );
}
