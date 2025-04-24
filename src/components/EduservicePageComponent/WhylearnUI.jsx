import React from "react";


export default function WhyLearnUIUX({title,data}) {
  return (
    <div className="px-4 py-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto ">
        {data.map(({ id, text,  }) => (
          <div
            key={id}
            className={` rounded-xl px-4 py-2 h-[118px] flex bg-[#F5F7F9] text-black  hover:bg-black hover:text-white hover:py-6 `}
          >
            <p className="text-left text-sm flex items-end ">{text}
              
            </p>
            <h1
              className={`  text-[112px] font-bold -mt-12 bg-gradient-to-b from-[#C6C6C6] to-[#ffffff] bg-clip-text text-transparent 
                 hover:text-[#F1813B] `}
            >
              {id}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
