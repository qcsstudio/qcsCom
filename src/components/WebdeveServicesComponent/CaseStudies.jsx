import Link from "next/link";
import React from "react";



const CaseStudies = ({data,data2}) => {
  return (
    <div className="bg-white min-h-screen w-[85%] mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8">Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Main Case Studies */}
        {data.map((study, index) => (
          <div
            key={index}
            className={`bg-gray-100 rounded-lg shadow p-1 ${study.offsetTop ? "mt-10" : ""}`}
          >
            <div className="w-full h-80 bg-gray-300 rounded mb-3"></div>
            <h3 className="font-bold text-3xl">{study.title}</h3>
            <p className="text-sm font-medium text-gray-600">{study.description}</p>
          </div>
        ))}

        {/* CRM Stats Card */}
        <div className="bg-[#F1813B] mt-10 rounded-lg shadow p-2 flex flex-col justify-between">
          <h3 className="font-bold text-3xl mb-3">CRM (SaaS)</h3>

          {data2.map((stat, index) => (
            <div
              key={index}
              className="bg-white text-black border border-dashed rounded-3xl border-gray-400 p-2 mb-3"
            >
              <div className="text-5xl font-bold">
                {stat.number.split("+")[0]} <span className="text-[#F1813B] -ms-2">+</span>
              </div>
              <div className="text-md font-medium">{stat.label}</div>
            </div>
          ))}
          <Link href="/career">
          <button className="bg-black text-white py-2 text-md rounded-lg w-full">
            Join Our Team
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
