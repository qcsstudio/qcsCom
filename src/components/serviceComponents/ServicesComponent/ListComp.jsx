import React from 'react';

const ListComp = () => {
  const services = [
    "Strategic AI & Digital Consulting",
    "Robotic Process Automation (RPA)",
    "Tailored Machine Learning Solutions",
    "Advanced Predictive Analytics",
    "Cloud Infrastructure & DevOps",
    "Custom Backend & Frontend Solutions",
    "Innovative Digital Marketing Automation",
    "Advanced Data Engineering"
  ];

  return (
    <div className="w-full lg:w-[40%]">
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
