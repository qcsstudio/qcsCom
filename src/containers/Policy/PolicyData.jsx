// 'use client';
// import { useState, useEffect } from 'react';
// import { FaPlus, FaMinus } from "react-icons/fa";

// export default function PolicyContainer() {
//   const [expandedSection, setExpandedSection] = useState(null);
//   const [policyData, setPolicyData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
    
//     // const dummyData = [
//     //   {
//     //     heading: "Introduction",
//     //     description: "This is a sample introduction to the Terms of Service."
//     //   },
//     //   {
//     //     heading: "User Agreement",
//     //     description: "Users must agree to follow the rules and regulations stated here."
//     //   },
//     //   {
//     //     heading: "Privacy Policy",
//     //     description: "Your data will be protected and handled responsibly."
//     //   }
//     // ];

   
//     // const formatted = dummyData.map(item => ({
//     //   title: item.heading,
//     //   content: [
//     //     {
//     //       type: "text",
//     //       value: item.description
//     //     }
//     //   ]
//     // }));

//     // setPolicyData(formatted);
//     // setLoading(false);

//     // ✅ Uncomment this and remove dummy when API is working

    
//     const fetchPolicies = async () => {
//       const url = '/api/admin/Policies?type=terms_service';
//       console.log("Fetching from:", url);

//       try {
//         const res = await fetch(url);
//         const data = await res.json();
//         console.log("Response:", data);

//         if (data && data.data && Array.isArray(data.data)) {
//           const formatted = data.data.map(item => ({
//             title: item.heading,
//             content: [
//               {
//                 type: "text",
//                 value: item.description
//               }
//             ]
//           }));
//           setPolicyData(formatted);
//         } else {
//           console.warn("No data found.");
//         }
//       } catch (err) {
//         console.error("Error fetching policies:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPolicies();
    
//   }, []);

//   const toggleSection = (index) => {
//     setExpandedSection(expandedSection === index ? null : index);
//   };

//   const renderContent = (contentArray) =>
//     contentArray.map((block, idx) => {
//       if (block.type === "text") {
//         return <p key={idx} className="mb-4">{block.value}</p>;
//       }
//       return null;
//     });

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8 bg-white text-gray-800">
//       <div className="bg-black text-white py-8 px-6 mb-8">
//         <h1 className="text-4xl font-bold text-center">Terms of Service</h1>
//       </div>

//       {loading ? (
//         <div className="text-center py-4">Loading...</div>
//       ) : policyData.length === 0 ? (
//         <div className="text-center py-4">No terms available</div>
//       ) : (
//         policyData.map((section, index) => (
//           <div key={index} className="border-b border-gray-200">
//             <button
//               onClick={() => toggleSection(index)}
//               className="flex justify-between items-center w-full py-4 px-2 text-left bg-gray-50 hover:bg-gray-100"
//             >
//               <span className="font-medium">{section.title}</span>
//               {expandedSection === index ? <FaMinus /> : <FaPlus />}
//             </button>
//             {expandedSection === index && (
//               <div className="py-4 px-6">{renderContent(section.content)}</div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
