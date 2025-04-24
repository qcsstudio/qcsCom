'use client'
import React, { useState } from 'react';
const TermsOfService = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const sections = [
    {
      title: "Scope of Services",
      content: "Details about the scope of services offered by QuantumCrafters Studio would go here..."
    },
    {
      title: "Service Onboarding and Delivery",
      content: "Information about service onboarding process and delivery timelines would go here..."
    },
    {
      title: "Client Responsibilities",
      content: "Explanation of client responsibilities and obligations would go here..."
    },
    {
      title: "Fees, Billing, and Renewal",
      content: "Details about pricing, billing cycles, and renewal terms would go here..."
    },
    {
      title: "Service Specific Terms",
      content: "Any service-specific terms and conditions would go here..."
    },
    {
      title: "Confidentiality and Data Protection",
      content: "Information about how confidential data is handled and protected would go here..."
    },
    {
      title: "Warranties and Disclaimers Specific to Services",
      content: "Service-specific warranties and disclaimers would go here..."
    },
    {
      title: "Suspension or Termination of Services",
      content: "Terms regarding service suspension or termination would go here..."
    },
    {
      title: "Additional Liability Limitation",
      content: "Additional limitations of liability specific to services would go here..."
    },
    {
      title: "Governing Law and Dispute Resolution for Services",
      content: "Information about applicable law and dispute resolution would go here..."
    },
    {
      title: "Incorporation of Other Terms",
      content: "Explanation of how other terms are incorporated would go here..."
    }
  ];
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms of Service</h1>
      <div className="mb-8 text-gray-600">
        <p className="mb-4">
          The following Terms of Service ("Service Terms") apply specifically to the products and services offered by QuantumCrafters Studio Private Limited, including our AI-powered solutions, SaaS (Software-as-a-Service) subscriptions, IT consulting services, and institutional training/mentorship programs. These Service Terms are in addition to (and incorporate) our general Terms and Conditions above, but are tailored to the nature of the services you purchase or use from us. In case of any conflict, the more specific term (either here or in a separately signed contract for a particular service) will take precedence for that service.
        </p>
        <p>
          By procuring or using any of these services, you agree to these Service Terms. If you are an organization, the individual accepting these terms on your behalf represents that they have authority to bind the organization.
        </p>
      </div>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => toggleSection(section.title)}
            >
              <span className="font-medium text-gray-800">{section.title}</span>
              <span className="text-gray-500">
                {expandedSections[section.title] ? '−' : '+'}
              </span>
            </button>
            {expandedSections[section.title] && (
              <div className="p-4 bg-white text-gray-600">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TermsOfService;
