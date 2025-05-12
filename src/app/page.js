import React from 'react';
import Homepage from '@/containers/MainContainer/Homepage';
import Head from 'next/head';

const Page = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QuantumCrafters Studio",
    "url": "https://qcsstudio.com",
    "logo": "https://qcsstudio.com/favicon.ico",
    "sameAs": [
      "https://www.linkedin.com/company/qcsstudio",
      "https://www.instagram.com/qcsstudio"
    ],
    
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 8264017346",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Prosperity Arcade, D-229, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 160071",
      "addressLocality": "Mohali",
      "postalCode": "140307",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <Head>
        <title>QuantumCrafters Studio - AI & SaaS Solutions</title>
        <link
          rel="canonical"
          href="https://qcsstudio.com/"
          key="canonical"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <Homepage />
    </>
  );
};

export default Page;
