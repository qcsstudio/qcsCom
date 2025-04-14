import React from "react";

const CaseStudies = () => {
  return (
    <div className="bg-white  min-h-screen w-[85%] mx-auto   ">
      <h2 className="text-4xl font-bold text-center mb-8">Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* CRM (SaaS) */}
        <div className="bg-gray-100 rounded-lg shadow p-1">
          <div className="w-full h-80 bg-gray-300 rounded mb-3"></div>
          <h3 className="font-bold text-3xl">CRM (SaaS)</h3>
          <p className="text-sm font-medium text-gray-600">
            We developed a custom CRM using Next.js, MongoDB, and Node.js for a B2B startup.
          </p>
        </div>

        {/* E-Commerce */}
        <div className="bg-gray-100 rounded-lg shadow p-1 mt-10">
          <div className="w-full h-80 bg-gray-300 rounded mb-3" />
          <h3 className="font-bold text-3xl">E-Commerce</h3>
          <p className="text-sm font-medium text-gray-600">
            We migrated their old WordPress store to Shopify with optimized mobile UX and integrated Google Shopping.
          </p>
        </div>

        {/* EdTech */}
        <div className="bg-gray-100 rounded-lg shadow p-1">
          <div className="w-full h-80 bg-gray-300 rounded mb-4" />
          <h3 className="font-bold text-3xl">EdTech</h3>
          <p className="text-sm font-medium text-gray-600">
            Lead Designer Created an LMS platform with student dashboards, real-time updates, and personalized content modules / Brand Strategist
          </p>
        </div>

        {/* CRM Stats Card */}
            <div className="bg-[#F1813B] mt-10 rounded-lg shadow p-2 flex flex-col justify-between">
          <h3 className="font-bold text-3xl mb-3">CRM (SaaS)</h3>

          <div className="bg-white text-black  border border-dashed rounded-3xl border-gray-400 p-2 mb-3">
                <div className="text-5xl font-bold ">20 <span className="text-[#F1813B] -ms-2">+</span></div>
            <div className="text-md font-medium">Students Skilled & Placed</div>
          </div>
 
          <div className="bg-white text-black  border border-dashed rounded-3xl border-gray-400  p-2 mb-3">
                <div className="text-5xl font-bold ">5 <span className="text-[#F1813B] -ms-2">+</span></div>
            <div className="text-md font-medium">Successful AI Projects Delivered</div>
          </div>

          <div className="bg-white text-black  border border-dashed rounded-3xl border-gray-400  p-2 mb-3">
                <div className="text-5xl font-bold ">2 <span className="text-[#F1813B] -ms-2">+</span></div>
            <div className="text-md font-medium">SaaS Tools in Development</div>
          </div>

          <button className="bg-black text-white py-2 text-md rounded-lg">Join Our Team</button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
