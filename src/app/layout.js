import { Geist, Geist_Mono, Montserrat, Unbounded } from "next/font/google";
import "./globals.css";
import { PolicyProvider } from "@/context/policyContext";
import Scrollcardcontext from "@/context/scrollcardcontext";
import { BlogContextProvider } from "@/context/blogContext";
import Script from "next/script";
import CalendlyBadge from "@/components/CalendlyBadge/CalendlyBadge";
import ChatBotComponent from "@/components/ChatBotComponent/ChatBotComponent";
import { BotProvider } from "@/context/Bot.context";


const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "700"], // jo weight chahiye uske according
  variable: "--font-unbounded",
});
const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "AI Software Development Companies - QuantumCrafters Studio",
  description:
    "Boost your business with QuantumCrafters—an AI Software Development Company building smart, scalable solutions that drive growth and real-world impact.",
  verification: {
    google: "MbqWeyYPvPzsogXFxsL8o_LZUqhL-lqb0C6-EeSNemM",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` ${unbounded.variable}`}>
      <head>
          <link
          rel="canonical"
          href="https://qcsstudio.com/"
          key="canonical"
        />
        {/* Google Analytics Script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TGNFYNFQQ2"
        ></script>
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

        {/* Calendly badge CSS
       <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"/>
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
<script type="text/javascript">window.onload = function() { Calendly.initBadgeWidget({ url: 'https://calendly.com/rksankhyan-qcsstudio?primary_color=f1813b', text: 'Schedule time with me', color: '#F1813B', textColor: '#FFFFFF', branding: true }) }</script> */}

        {/* Schema Scripts */}
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "QuantumCrafters Studio Pvt. Ltd.",
            url: "https://www.qcsstudio.com/",
            logo: "https://www.qcsstudio.com/images/Images/footerlogo.png",
            description:
              "QuantumCrafters Studio offers AI-powered IT services, innovative AI-based SaaS products, and institutional training programs tailored for the digital age.",
            email: "info@qcsstudio.com",
            telephone: "+91 8264017346",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "D266 (C) 203, Second Floor Ram Hari Tower, Phase 8B",
              addressLocality: "Mohali",
              addressRegion: "Punjab",
              postalCode: "160055",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.linkedin.com/company/qcsstudio/",
              "https://www.instagram.com/qcsstudio/",
            ],
            department: [
              {
                "@type": "LocalBusiness",
                name: "AI-Powered IT Services",
                url: "https://www.qcsstudio.com/",
                description:
                  "AI-driven automation, analytics, and workflow optimization tailored for enterprise digital transformation.",
              },
              {
                "@type": "LocalBusiness",
                name: "AI-Based SaaS Products",
                url: "https://www.qcsstudio.com/",
                description:
                  "Cutting-edge SaaS tools powered by artificial intelligence to streamline business operations and growth.",
              },
              {
                "@type": "LocalBusiness",
                name: "Institutional Training",
                url: "https://www.qcsstudio.com/",
                description:
                  "Practical, hands-on training programs in AI, software development, and automation for institutions and learners.",
              },
            ],
          })}
        </Script>

        <Script
          id="localbiz-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "QuantumCrafters Studio",
            image: "https://www.qcsstudio.com/images/Images/footerlogo.png",
            url: "https://www.qcsstudio.com",
            telephone: "+91-8264017346",
            email: "info@qcsstudio.com",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "D266 (C) 203, Second Floor Ram Hari Tower, Phase 8B",
              addressLocality: "Mohali",
              postalCode: "160055",
              addressCountry: "IN",
            },
            openingHours: "Mo-Fr 09:30-18:30",
            sameAs: [
              "https://www.linkedin.com/company/qcsstudio/?viewAsMember=true",
              "https://www.instagram.com/qcsstudio/",
            ],
          })}
        </Script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3149256841289272"
          crossOrigin="anonymous"></script>

<script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.40/build/spline-viewer.js"></script>

      </head>
      <body
        className={` ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1843305022905892');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1843305022905892&ev=PageView&noscript=1" />
        </noscript>
        <BlogContextProvider>
          <Scrollcardcontext>
            <PolicyProvider>
              <BotProvider>
                <ChatBotComponent>{children}</ChatBotComponent>
              </BotProvider>
            </PolicyProvider>
          </Scrollcardcontext>
        </BlogContextProvider>
        <CalendlyBadge />
      </body>
    </html>
  );
}
