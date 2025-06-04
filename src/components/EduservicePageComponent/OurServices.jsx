import React from "react";
import Image from "next/image";

const OurServices = ({ data, onEnrollClick }) => {
 
  return (
    <div className="p-8 max-w-6xl mx-auto" id="curriculum">
        <div className="w-[133px] mx-auto mb-10">
                <h4 className="flex justify-center gap-2 bg-gray-100 rounded-e-lg px-2 py-1">
                    <Image src="/images/Images/servicesLogo.png" width={5} height={5} alt="Services Logo" className="w-5 h-5" />
                    <span className="font-semibold text-sm mt-1">Our Services</span>
                </h4>
            </div>
      <h2 className="text-4xl font-bold text-center mb-12">
        What You'll Learn (Curriculum Overview)
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {data?.map((section, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-xl shadow-md">
            <h3 className="text-3xl font-bold mb-4 text-wrap">{section.title}</h3>
            <ul className="list-disc  space-y-2 text-sm marker:text-[#F1813B]">
              {section.items.map((item, idx) => (
                <li key={idx} className="text-[#000000]">{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="bg-[#F1813B] text-white p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-2">want to Learn ?</h3>
            <p className="text-sm mb-4">
              Our instructors are not just teachers; they are seasoned professionals who bring years of industry experience to the classroom
            </p>
          </div>
           <button 
            onClick={onEnrollClick}
            className="bg-black text-white py-2 px-4 rounded mt-4 hover:bg-gray-500"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default OurServices
