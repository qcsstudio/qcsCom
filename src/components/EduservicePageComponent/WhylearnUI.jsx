import React from "react";
import Heading from "../HeadingComponent/Heading";
import IconNtext from "../iconNtextComponent/IconNtext";



export default function WhyLearnUIUX({ title, data }) {
  return (
    <>
      <IconNtext text="Why This" link="/images/Icons/Our Services.png" />
      <div className="text-center max-w-[90%] min-w-[90%] mx-auto">
        <Heading heading={title} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.map(({ id, text }) => (
            <div
              key={id}
              className="group rounded-xl px-4 py-2 h-[118px] bg-[#F5F7F9] text-black hover:bg-black hover:text-white hover:py-6 transition-all duration-300 flex justify-between items-end"
            >
              <p className={`text-left text-sm w-[65%] font-montserrat`}>{text}</p>
              <h2 className="text-[112px] font-bold bg-gradient-to-b from-[#C6C6C6] to-[#ffffff] bg-clip-text text-transparent leading-none transition-all duration-300 group-hover:text-[#F1813B] group-hover:bg-none group-hover:bg-clip-border">
                {id}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
