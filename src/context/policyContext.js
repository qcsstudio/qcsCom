
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

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

      // Check if the response has the expected data structure
      if (data && data.data) {
        setPolicyData(data.data.data); // Set the data if it's available
      } else {
        console.error("No data found in the response.");
        setPolicyData([]); // If no data, set empty array
      }
    } catch (err) {
      console.error("Error fetching policies:", err);
      setPolicyData([]); // In case of error, set empty data
    } finally {
      setLoading(false); // Once data is fetched, stop loading
    }
  };

  return (
    <PolicyContext.Provider value={{ policyData, loading, fetchPolicies }}>
      {children}
    </PolicyContext.Provider>
  );
};
