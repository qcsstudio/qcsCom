'use client';
import { useEffect, useContext } from 'react';
import { PolicyContext } from '@/context/policyContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/NavbarComponent/Navbar';

const policyTypes = {
  privacy_policy: 'Privacy Policy',
  terms_service: 'Terms of Service',
  refund_cancellation: 'Refund Policy',
  terms_condition: 'Terms and Condition',
  intellectual_property: 'Intellectual Property Policy',
  Compliance_regulatory: 'Compliance & Regulatory Policies',
  liability_Disclaimer: 'Liability & Disclaimer Policy',
};

export default function PolicyPage() {
  const { type } = useParams();
  const { fetchPolicies, policyData, loading } = useContext(PolicyContext);

  useEffect(() => {
    if (type) fetchPolicies(type);
  }, [type]);

  return (
    <>
    <Navbar/>
  
    <div className="w-[95%] mx-auto px-4 py-8 bg-white text-gray-800">
      <div className="bg-black text-white py-8 px-6 mb-8 rounded-xl">
        <h1 className="text-4xl font-bold text-center capitalize">
          {policyTypes[type]?.replace(/_/g, ' ') || 'Policy'}
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : policyData.length > 0 ? (
        policyData.map((item, index) => (
          <div key={index} className="py-4">
            <div dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
        ))
      ) : (
        <div className="text-center py-4">No policies available</div>
      )}

      <div className="flex gap-4 mb-8 flex-wrap">
        {Object.entries(policyTypes).map(([key, label]) => (
          <Link
            key={key}
            href={`/policy/${key}`}
            className={`px-4 py-2 rounded ${
              type === key ? 'bg-[#ec6b1a] text-white' : 'bg-[#F1813B] text-white'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
