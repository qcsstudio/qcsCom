'use client';
import { PolicyContext } from '@/context/policyContext';
import { useState, useEffect, useContext } from 'react';

const policyTypes = [
  { key: 'privacy_policy', label: 'Privacy Policy' },
  { key: 'terms_service', label: 'Terms of Service' },
  { key: 'refund_cancellation', label: 'Refund Policy' },
  { key: 'terms_condition', label: 'Terms and condition' },
  { key: 'intellectual_property', label: 'Intellectual Property Policy' },
  { key: 'Compliance_regulatory', label: 'Compliance & Regulatory Policies' },
  { key: 'liability_Disclaimer', label: 'Liability & Disclaimer Policy' },
];

export default function PolicyContainer() {
  const { fetchPolicies, policyData, loading } = useContext(PolicyContext);
  const [activePolicy, setActivePolicy] = useState('privacy_policy');

  useEffect(() => {
    fetchPolicies(activePolicy);
  }, [activePolicy]);

  return (
    <div className="w-[95%] mx-auto px-4 py-8 bg-white text-gray-800">
      <div className="bg-black text-white py-8 px-6 mb-8 rounded-xl ">
        <h1 className="text-4xl font-bold text-center capitalize">{activePolicy.replace(/_/g, ' ')}</h1>
      </div>

     

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : policyData.length > 0 ? (
        policyData.map((item, index) => (
          <div key={index} className=" py-4">
            <div dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
        ))
      ) : (
        <div className="text-center py-4">No policies available</div>
      )}

       {/* Buttons to switch policies */}
       <div className="flex  gap-4 mb-8 flex-wrap">
        {policyTypes.map((type) => (
          <button
            key={type.key}
            className={`px-4 py-2 rounded ${
              activePolicy === type.key ? 'bg-[#ec6b1a] text-white' : 'bg-[#F1813B] text-white'
            }`}
            onClick={() => setActivePolicy(type.key)}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
