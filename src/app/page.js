import React from 'react';
import Homepage from '@/containers/MainContainer/Homepage';
import Head from 'next/head';

const page = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Company",
    "name": "QuantumCrafters Studio", 
    "url": "https://qcsstudio.com",  
    "logo": "https://qcsstudio.com/images/Images/Qcslogo.png",  
    "sameAs": [
      "https://www.linkedin.com/company/qcsstudio", 
      "https://www.instagram.com/qcsstudio"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 8264017346",  
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Prosperity Arcade, D-229, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 160071",  // Replace with your office address
      "addressLocality": "Mohali",
      "postalCode": "140307",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <Head>
        <title>Canonical Tag Example</title>
        <link
          rel="canonical"
          href="https://qcsstudio.com" 
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

export default page;
