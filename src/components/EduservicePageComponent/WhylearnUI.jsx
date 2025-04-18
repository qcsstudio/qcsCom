import React from "react";

const reasons = [
  {
    id: 1,
    text: "Design is the core of every digital experience",
    highlight: true,
  },
  {
    id: 2,
    text: "High-paying creative roles in tech, SaaS, e-commerce & startups",
  },
  {
    id: 3,
    text: "No coding required—just a creative, user-focused mindset",
  },
  {
    id: 4,
    text: "Freelance & remote opportunities across the globe",
  },
];

export default function WhyLearnUIUX() {
  return (
    <div className="px-4 py-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10">Why Learn UI/UX Design?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {reasons.map(({ id, text, highlight }) => (
          <div
            key={id}
            className={` rounded-xl px-4 py-2 h-[118px] flex    ${
              highlight ? "bg-black text-white py-6" : "bg-[#F5F7F9] text-black"
            }`}
          >
            <p className="text-left text-sm flex items-end ">{text}</p>
            <h1
              className={`  text-[112px] font-bold -mt-12
                 ${highlight ? "text-[#F1813B] -mt-15" : " bg-gradient-to-b from-[#C6C6C6] to-[#ffffff] bg-clip-text text-transparent "}`}
            >
              {id}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
