'use client';
import { useState, useEffect } from 'react';

export default function PolicyContainer() {
  const [policyData, setPolicyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    const url = `/api/privacy-policy`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Fetched data:", data);


      // Check if the response has the expected data structure
      if (data && data.data) {
        setPolicyData(data.data); // Set the data if it's available
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
  console.log("data: ", policyData)
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white text-gray-800">
      <div className="bg-black text-white py-8 px-6 mb-8">
        <h1 className="text-4xl font-bold text-center">privacy policy</h1>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        policyData.data.length > 0 ? (
          // Render data if it's available
          policyData.data.map((item, index) => (
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
