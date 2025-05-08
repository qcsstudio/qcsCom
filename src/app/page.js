import React from 'react';
import Homepage from '@/containers/MainContainer/Homepage';
import Head from 'next/head';

const page = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QuantumCrafters Studio", 
    "url": "https://qcsstudio.com",  
    "logo": "https://qcsstudio.com/Qcslogo.png",  // Replace with your logo URL (optional)
    "sameAs": [
      "https://www.linkedin.com/company/quantumcraftersstudio",  // Replace with your social profiles
      "https://www.instagram.com/quantumcraftersstudio"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-123-4567",  // Replace with your phone number
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Studio Lane",  // Replace with your office address
      "addressLocality": "Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <Head>
        <title>Canonical Tag Example</title>
        <link
          rel="canonical"
          href="https://qcsstudio.com"  // Replace with your URL
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
