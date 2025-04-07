import React from 'react';

const Cardscroll = ({ card }) => {
  const { services } = card;

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-[#F5F7F9]">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F0F0F] mb-2">{card.heading}</h2>
      <p className="text-[#0F0F0F] text-sm font-medium mb-4">{card.desc}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {services?.map((service, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-white text-[#0F0F0F] text-sm font-medium rounded-full flex items-center gap-1 border"
          >
            {service}
          </span>
        ))}
      </div>
      <button className="w-full font-semibold text-lg bg-white py-2 rounded-md hover:bg-gray-500 hover:text-white">
        Get Started
      </button>
    </div>
  );
};

export default Cardscroll;
