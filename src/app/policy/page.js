'use client'
import { useState } from 'react';
import { FaPlus  } from "react-icons/fa";

export default function page() {
  const [expandedSection, setExpandedSection] = useState(null);
  const toggleSection = (index) => {
    if (expandedSection === index) {
      setExpandedSection(null);
    } else {
      setExpandedSection(index);
    }
  };
  const sections = [
    { title: 'Scope of Services', content: 'Content for Scope of Services...' },
    { title: 'Service Onboarding and Delivery', content: 'Content for Service Onboarding and Delivery...' },
    { title: 'Client Responsibilities', content: 'Content for Client Responsibilities...' },
    { title: 'Fees, Billing, and Renewal', content: 'Content for Fees, Billing, and Renewal...' },
    { title: 'Service Specific Terms', content: 'Content for Service Specific Terms...' },
    { title: 'Confidentiality and Data Protection', content: 'Content for Confidentiality and Data Protection...' },
    { title: 'Warranties and Disclaimers Specific to Services', content: 'Content for Warranties and Disclaimers...' },
    { title: 'Suspension or Termination of Services', content: 'Content for Suspension or Termination of Services...' },
    { title: 'Additional Liability Limitation', content: 'Content for Additional Liability Limitation...' },
    { title: 'Governing Law and Dispute Resolution for Services', content: 'Content for Governing Law and Dispute Resolution...' },
    { title: 'Incorporation of Other Terms', content: 'Content for Incorporation of Other Terms...' },
  ];
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white text-gray-800">
      {/* Header */}
      <div className="bg-black text-white py-8 px-6 mb-8">
        <h1 className="text-4xl font-bold text-center">Terms of Service</h1>
      </div>
      {/* Introduction Text */}
      <div className="mb-8">
        <p className="mb-6">
          The following Terms of Service ("Service Terms") apply specifically to the products and services offered by
          QuantumCrafters Studio Private Limited, including our AI-powered solutions, SaaS (Software-as-a-Service)
          subscriptions, IT consulting services, and institutional training/mentorship programs. These Service Terms are in
          addition to (and incorporate) our general Terms and Conditions above, but are tailored to the nature of the
          services you purchase or use from us. In case of any conflict, the more specific term (either here or in a
          separately signed contract for a particular service) will take precedence for that service.
        </p>
        <p>
          By procuring or using any of these services, you agree to these Service Terms. If you are an organization, the
          individual accepting these terms on your behalf represents that they have authority to bind the organization.
        </p>
      </div>
      {/* Collapsible Sections */}
      <div className="border-t border-gray-200">
        {sections.map((section, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleSection(index)}
              className="flex justify-between items-center w-full py-4 px-2 text-left focus:outline-none bg-gray-50 hover:bg-gray-100"
            >
              <span className="font-medium">{section.title}</span>
              <FaPlus size={20} />
            </button>
            {expandedSection === index && (
              <div className="py-4 px-6">
                <p>{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}