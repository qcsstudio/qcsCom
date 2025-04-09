import React from 'react';

const ListComp = () => {
  const services = [
    "Custom Web Development (Frontend & Backend)",
    "Robotic Process Automation (RPA)",
    " Digital Marketing & Automation",
    " AI Strategy & Consulting",
    " Business Process Automation",
    "Predictive Analytics & Insights",
    "DevOps",
    " End-to-End AI Integrations"
  ];

  return (
    <div className="w-full lg:w-[40%] hidden lg:block">
      <div className="grid grid-cols-1 gap-3">
        {services.map((service, index) => (
          <div key={index} className="py-2">
            <h3 className="text-lg md:text-xl font-medium text-gray-900">{service}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComp;
