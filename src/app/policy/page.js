'use client'
import React, { useState } from "react";

const TermsOfService = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      title: "Scope of Services",
      content:
        "Details about the scope of services offered by QuantumCrafters Studio would go here...",
    },
    {
      title: "Service Onboarding and Delivery",
      content:
        "Information about service onboarding process and delivery timelines would go here...",
    },
    {
      title: "Client Responsibilities",
      content:
        "Explanation of client responsibilities and obligations would go here...",
    },
    {
      title: "Fees, Billing, and Renewal",
      content:
        "Details about pricing, billing cycles, and renewal terms would go here...",
    },
    {
      title: "Confidentiality and Data Protection",
      content:
        "Information about how confidential data is handled and protected would go here...",
    },
    {
      title: "Warranties and Disclaimers",
      content:
        "Service-specific warranties and disclaimers would go here...",
    },
    {
      title: "Termination of Services",
      content:
        "Terms regarding service suspension or termination would go here...",
    },
    {
      title: "Liability Limitation",
      content:
        "Additional limitations of liability specific to services would go here...",
    },
    {
      title: "Governing Law",
      content:
        "Information about applicable law and dispute resolution would go here...",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms of Service</h1>
      <div className="mb-8 text-gray-600 space-y-4">
        <p>
          The following Terms of Service ("Service Terms") apply specifically to the products and
          services offered by QuantumCrafters Studio Private Limited...
        </p>
        <p>
          By procuring or using any of these services, you agree to these Service Terms...
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition"
              onClick={() => toggleSection(section.title)}
              aria-expanded={expandedSections[section.title] || false}
            >
              <span className="font-medium text-gray-800">{section.title}</span>
              <span className="text-xl text-gray-500">
                {expandedSections[section.title] ? "−" : "+"}
              </span>
            </button>
            {expandedSections[section.title] && (
              <div className="p-4 bg-white text-gray-600">
                <p>{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsOfService;
