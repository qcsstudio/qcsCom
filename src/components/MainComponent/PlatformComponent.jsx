import React from 'react';

const platformImages = [
  {
    src: "/images/Images/Platform1.png",
    width: 437,
    height: 65,
  },
  {
    src: "/images/Images/Platform2.png",
    width: 264,
    height: 113,
  },
  {
    src: "/images/Images/platform3.png",
    width: 174,
    height: 65,
  },
  {
    src: "/images/Images/platform4.png",
    width: 163,
    height: 65,
  },
];

const PlatformComponent = () => {
  return (
    <div className="w-[95%] flex flex-wrap justify-evenly m-auto my-10">
      {platformImages.map((item, index) => (
        <img
          key={index}
          src={item.src}
          alt={`Platform ${index + 1}`}
          style={{
            width: `${item.width}px`,
            height: `${item.height}px`,
            objectFit: 'contain',
          }}
        />
      ))}
    </div>
  );
};

export default PlatformComponent;



// import React from 'react';

// const AISection = () => {
//   return (
//     <section className="bg-white rounded-2xl shadow p-6 md:p-10 w-[95%] mx-auto my-10">
//       {/* Tabs */}
//       <div className="flex space-x-6 border-b border-gray-200 mb-6">
//         <div className="px-4 py-2 text-white bg-orange-500 rounded-t-lg font-semibold">
//           AI-Powered IT Services
//         </div>
//         <div className="px-4 py-2 text-gray-500 font-medium cursor-pointer">
//           AI-Based SaaS Products
//         </div>
//         <div className="px-4 py-2 text-gray-500 font-medium cursor-pointer">
//           Institutional Training
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-8">
//         {/* Left Content */}
//         <div className="flex-1">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//             Smart AI Solutions Tailored for Your Business.
//           </h2>
//           <p className="text-gray-700 mb-4">
//             We offer customized AI consulting, process automation, machine learning integrations,
//             and predictive analytics, enabling startups and SMEs to:
//           </p>
//           <ul className="text-gray-800 space-y-2 mb-6">
//             <li><strong>Increase Productivity</strong> – Automate routine tasks.</li>
//             <li><strong>Improve Efficiency</strong> – Integrate intelligent AI systems.</li>
//             <li><strong>Accelerate Growth</strong> – Leverage data-driven insights.</li>
//           </ul>
//           <button className="bg-orange-500 text-white px-5 py-2 rounded-md shadow hover:bg-orange-600 transition">
//             Explore AI Services &rarr;
//           </button>
//         </div>

//         {/* Right Placeholder (Image/Video) */}
//         <div className="w-full md:w-[300px] h-[200px] bg-gray-200 rounded-xl" />
//       </div>
//     </section>
//   );
// };

// export default AISection;
