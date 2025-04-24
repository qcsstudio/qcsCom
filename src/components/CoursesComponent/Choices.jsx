import React from "react";
import Image from "next/image";

// Reusable box component
const ChoiceBox = ({ title, description, className = "", extraTitle, extraDescription, button ,image}) => {
  return (
    <div className={`bg-[#F5F7F9] p-5 rounded-xl ${className} flex flex-col justify-between`}>
      <div>
        <div className="bg-black w-14 h-14 rounded-full mb-2">
          <Image src={image} width={58} height={58} alt="image"/>
        </div>
        <h3 className="text-2xl font-bold leading-snug mb-2" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="text-[15px] text-[#000000] mb-2">{description}</p>

        {extraTitle && (
          <>
            <h4 className="font-bold text-2xl mt-10">{extraTitle}</h4>
            <p className="text-[15px] text-[#000000] mt-4">{extraDescription}</p>
          </>
        )}
      </div>

      {button && (
        <button className="bg-[#F1813B] hover:bg-[#e4a882] text-white font-semibold text-sm py-2 px-4 rounded w-full mt-4">
          {button}
        </button>
      )}
    </div>
  );
};

const Choices = ({ title,data }) => {


  return (
    <div className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-16">{title}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
          {data.map((box, i) => (
            <ChoiceBox key={i} {...box} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choices;
