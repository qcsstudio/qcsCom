  import { Geist, Geist_Mono, Syne, Unbounded } from "next/font/google";
  import "./globals.css";
  import { PolicyProvider } from "@/context/policyContext";
  import Scrollcardcontext from "@/context/scrollcardcontext";
  import Script from "next/script";

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

  export const metadata = {
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
          <Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
  {JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "QuantumCrafters Studio Pvt. Ltd.",
  "url": "https://www.qcsstudio.com/",
  "logo": "https://www.qcsstudio.com/images/Images/footerlogo.png",
  "description": "QuantumCrafters Studio offers AI-powered IT services, innovative AI-based SaaS products, and institutional training programs tailored for the digital age.",
  "email": "info@qcsstudio.com",
  "telephone": "+91 8264017346",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "D266 (C) 203, Second Floor Ram Hari Tower, Phase 8B",
    "addressLocality": "Mohali",
    "addressRegion": "Punjab",
    "postalCode": "160055",
    "addressCountry": "IN"
  },
 
  "sameAs": [
    "https://www.linkedin.com/company/qcsstudio/",
    "https://www.instagram.com/qcsstudio/"
  ],
  "department": [
    {
      "@type": "LocalBusiness",
      "name": "AI-Powered IT Services",
      "url": "https://www.qcsstudio.com/",
      "description": "AI-driven automation, analytics, and workflow optimization tailored for enterprise digital transformation."
    },
    {
      "@type": "LocalBusiness",
      "name": "AI-Based SaaS Products",
      "url": "https://www.qcsstudio.com/",
      "description": "Cutting-edge SaaS tools powered by artificial intelligence to streamline business operations and growth."
    },
    {
      "@type": "LocalBusiness",
      "name": "Institutional Training",
      "url": "https://www.qcsstudio.com/",
      "description": "Practical, hands-on training programs in AI, software development, and automation for institutions and learners."
    }
  ]
}
)}
</Script>

<Script id="localbiz-schema" type="application/ld+json" strategy="afterInteractive">
  {JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "QuantumCrafters Studio",
  "image": "https://www.qcsstudio.com/images/Images/footerlogo.png",
  "url": "https://www.qcsstudio.com",
  "telephone": "+91-8264017346",
  "email": "info@qcsstudio.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "D266 (C) 203, Second Floor Ram Hari Tower, Phase 8B",
    "addressLocality": "Mohali",
    "postalCode": "160055",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Fr 09:30-18:30",
  "sameAs": [
    "https://www.linkedin.com/company/qcsstudio/?viewAsMember=true",
    "https://www.instagram.com/qcsstudio/"
  ]
})}
</Script>
        </head>
        <body className={`${syne.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
          <Scrollcardcontext>
            <PolicyProvider>{children}</PolicyProvider>
          </Scrollcardcontext>

        </body>
      </html>
    );
  }
