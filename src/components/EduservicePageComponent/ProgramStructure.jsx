import React from "react";
import Image from "next/image";
import Heading from "../HeadingComponent/Heading";


const ProgramStructure = ({data}) => {

  return (
    <div className="bg-white text-center w-[90%] mx-auto">
      <Heading heading="Program Structure & Timeline"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#F5F7F9] rounded-2xl p-6 text-left  "
          >
            <div className="w-12 h-12 mb-4 ">
              <Image src={card.image} width={50} height={50} alt="ProgramUi" className="text-gray-300"/>
            </div>
            <h3 className={`text-2xl font-bold mb-3 text-[#0F0F0F] font-unbounded`}>{card.title}:</h3>
            <ul className={`list-disc pl-5 space-y-1 text-lg text-[#000000] marker:text-[#F1813B] font-montserrat`}>
              {card.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramStructure;
