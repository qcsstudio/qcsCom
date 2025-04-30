'use client';
import { PolicyContext } from '@/context/policyContext';
import { useState, useEffect , useContext } from 'react';

export default function PolicyContainer() {

  const { fetchPolicies , policyData , loading} = useContext(PolicyContext)

  useEffect(() => {
    fetchPolicies('privacy_policy');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white text-gray-800">
      <div className="bg-black text-white py-8 px-6 mb-8">
        <h1 className="text-4xl font-bold text-center">privacy policy</h1>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        policyData.length > 0 ? (
          // Render data if it's available
          policyData.map((item, index) => (
            <div key={index} className="border-b py-4">
              
              <div dangerouslySetInnerHTML={{ __html: item.heading }  }  />
              <div dangerouslySetInnerHTML={{ __html: item.description }  }  />
            </div>
          ))
        ) : (
          <div className="text-center py-4">No policies available</div>
        )
      )}
    </div>
  );
}
