
"use client"
import React, { createContext, useState } from 'react';

export const PolicyContext = createContext();

export const PolicyProvider = ({ children }) => {
  const [policyData, setPolicyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolicies = async (type) => {
    setLoading(true);
    const url = `/api/privacy-policy?type=${type}`; 

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Fetched data:", data);

     
      if (data && data.data) {
        setPolicyData(data.data.data); 
      } else {
        console.error("No data found in the response.");
        setPolicyData([]); 
      }
    } catch (err) {
      console.error("Error fetching policies:", err);
      setPolicyData([]);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <PolicyContext.Provider value={{ policyData, loading, fetchPolicies }}>
      {children}
    </PolicyContext.Provider>
  );
};
