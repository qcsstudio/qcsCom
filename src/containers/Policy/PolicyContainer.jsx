'use client';
import { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

export default function PolicyContainer({ links }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const renderContent = (contentArray) =>
    contentArray.map((block, idx) => {
      if (block.type === "list") {
        return (
          <ul key={idx} className="list-disc list-inside mb-4">
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      }
      if (block.type === "text") {
        return <p key={idx} className="mb-4">{block.value}</p>;
      }
      if (block.type === "subsection") {
        return (
          <div key={idx} className="mb-4">
            <h4 className="font-semibold mb-1">{block.title}</h4>
            <ul className="list-disc list-inside">
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        );
      }
      return null;
    });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white text-gray-800">
      <div className="bg-black text-white py-8 px-6 mb-8">
        <h1 className="text-4xl font-bold text-center">Terms of Service</h1>
      </div>
      <div className="mb-8">
        <p className="mb-6">
          The following Terms of Service ("Service Terms") apply specifically to the products and services offered by
          QuantumCrafters Studio Private Limited...
        </p>
        <p>
          By procuring or using any of these services, you agree to these Service Terms. If you are an organization, the
          individual accepting these terms on your behalf represents that they have authority to bind the organization.
        </p>
      </div>
      <div className="border-t border-gray-200">
        {links.map((section, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleSection(index)}
              className="flex justify-between items-center w-full py-4 px-2 text-left focus:outline-none bg-gray-50 hover:bg-gray-100"
            >
              <span className="font-medium">{section.title}</span>
              {expandedSection === index ? <FaMinus /> : <FaPlus />}
            </button>
            {expandedSection === index && (
              <div className="py-4 px-6">
                {renderContent(section.content)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
