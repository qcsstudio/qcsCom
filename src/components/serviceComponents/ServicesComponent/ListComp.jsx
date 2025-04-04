import React from 'react'

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
    <div className="w-[40%] justify-center">
     
       
        
        <div className="grid grid-cols-1 ">
          {services.map((service, index) => (
            <div 
              key={index}
              className=" py-3 "
            >
              
                
               
                  <h3 className="text-xl font-medium text-gray-900">{service}</h3>
                
              
            </div>
          ))}
        </div>
     
    </div>
  );
};
export default ListComp;