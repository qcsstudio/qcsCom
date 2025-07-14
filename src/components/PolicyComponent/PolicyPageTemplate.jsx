'use client';
import { useEffect, useContext } from 'react';
import { PolicyContext } from '@/context/policyContext';
import PolicyNav from './PolicyNav';
import Navbar from '../NavbarComponent/Navbar';
import Footer from '@/containers/ServiceContainer/FooterContainer/Footer';

export default function PolicyPageTemplate({ type, title, activeKey }) {
  const { fetchPolicies, policyData, loading } = useContext(PolicyContext);

  useEffect(() => {
    fetchPolicies(type);
  }, [type]);

  return (
    <>
      <Navbar/>
      <div className="w-[95%] mx-auto px-4 py-8 bg-white text-gray-800">
        <div className="bg-black text-white py-8 px-6 mb-8 rounded-xl">
          <h2 className="text-4xl font-bold text-center">{title}</h2>
        </div>

        {loading ? (
          <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto my-5" />
        ) : policyData.length > 0 ? (
          policyData.map((item, index) => (
            <div key={index} className="py-4">
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
          ))
        ) : (
          <div className="text-center py-4">No policies available</div>
        )}

        <PolicyNav active={activeKey} />
      </div>
   <Footer/>
    </>
  );
}
